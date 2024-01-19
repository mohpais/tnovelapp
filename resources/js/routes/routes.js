// import Cookies from 'js-cookie'
import { useAuthStore } from "@/stores";
import helpers from '@/global/helpers';

async function requireLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated, roles;
    roles = authStore.roleUser;
    authenticated = !!authStore.authenticated;
    if (authenticated) {
        if (to.meta.roles && !helpers.isSubArray(to.meta.roles, roles)) {
            next('/forbidden');
        } else {
            next()
        }
    } else {
        next({ name: "SignIn" })
    }
}

async function isLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated, roles;
    authenticated = !!authStore.authenticated;
    roles = authStore.roleUser;
    if (authenticated) {
        if (helpers.isSubArray(['super-admin', 'admin-base', 'admin-content'], roles)) {
            next({ name: "Dashboard" });
        } else {
            next({ name: "Main" });
        }
    } else {
        next();
    }
}

export default [
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        meta: { layout: 'error-layout' },
        component: () => import("@/views/_errors/NotFound.vue"),
    },
    {
        path: "",
        name: "Main",
        redirect: { name: "Home" },
        meta: { layout: 'main-layout' },
        children: [
            {
                path: "/",
                name: "Home",
                component: () => import('@/views/Home.vue'),
            },
            {
                path: "/categories",
                name: "Category",
                component: () => import('@/views/Category.vue'),
            },
            {
                path: "/detail/:slug",
                name: "Detail",
                component: () => import('@/views/Detail.vue'),
            },
            {
                path: "/premium",
                name: "Premium",
                meta: { roles: ['premium-user'] },
                beforeEnter: requireLogin,
                component: () => import('@/views/Premium.vue'),
            }
        ]
    },
    {
        path: "/account",
        name: "Account",
        redirect: { name: "SignIn" },
        meta: { layout: 'logging-layout' },
        beforeEnter: isLogin,
        children: [
            {
                path: "/account/sign-in",
                name: "SignIn",
                component: () => import('@/views/_credentials/SignIn.vue'),
            },
        ]
    },
    {
        path: "/panel",
        name: "Panel",
        redirect: { name: "Dashboard" },
        meta: { layout: "logged-layout", roles: ['super-admin', 'admin-base', 'admin-content'] },
        beforeEnter: requireLogin,
        children: [
            {
                path: "/panel/dashboard",
                name: "Dashboard",
                component: () => import('@/views/_panels/Dashboard.vue'),
                meta: {
                    title: "Dashboard",
                    breadcrumbs: [
                        { name: `Home`, link: `` },
                        { name: "Dashboard", link: "/panel/dashboard" },
                    ],
                },
            },
            {
                path: "/panel/users",
                name: "User",
                redirect: { name: "UserList" },
                children: [
                    {
                        path: "/panel/users/",
                        name: "UserList",
                        component: () => import('@/views/_panels/User.vue'),
                        meta: {
                            title: "User List",
                            breadcrumbs: [
                                { name: `Home`, link: `` },
                                { name: "User", link: "/panel/users" },
                            ],
                        },
                    },
                    {
                        path: "/panel/users/add",
                        name: "UserAdd",
                        component: () => import('@/views/_panels/UserAdd.vue'),
                        meta: {
                            title: "User Add",
                            breadcrumbs: [
                                { name: `Home`, link: `` },
                                { name: "User", link: "" },
                                { name: "User", link: "/panel/users/add" },
                            ],
                        },
                    }
                ]
            },
            {
                path: "/panel/profile",
                name: "Profile",
                component: () => import('@/views/_panels/Profile.vue'),
                meta: {
                    title: "Profile",
                    breadcrumbs: [
                        { name: 'Home', link: '' },
                        { name: "Profile", link: "/panel/profile" },
                    ],
                },
            }
        ]
    }
];
