// import Cookies from 'js-cookie'
import { useAuthStore } from "@/stores";

async function requireLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated;
    authenticated = !!authStore.authenticated;
    if (authenticated) {
        next()
    } else {
        next({ name: "SignIn" })
    }
}

async function isLogin(to, from, next) {
    const authStore = useAuthStore();
    await authStore.checkLogin();
    let authenticated;
    authenticated = !!authStore.authenticated;

    if (authenticated) {
        next({ name: "Dashboard" })
    } else {
        next()
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
        meta: { layout: "logged-layout" },
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
                component: () => import('@/views/_panels/User.vue'),
                meta: {
                    title: "User",
                    breadcrumbs: [
                        { name: `Home`, link: `` },
                        { name: "User", link: "/panel/users" },
                    ],
                },
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
