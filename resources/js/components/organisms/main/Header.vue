<template>
    <header class="header sticky-top d-flex align-items-center shadow-sm">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-auto my-auto">
                    <router-link class="navbar-brand" to="/">
                        <img :src="mylogo" alt="..." />
                    </router-link>
                </div>
                <div class="col-8">
                    <div class="header__nav row my-auto">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li><a href="./index.html">Home</a></li>
                                <li><a href="">Categories <i class="bi bi-chevron-down"></i></a>
                                    <ul class="dropdown">
                                        <li><a href="./categories.html">Categories</a></li>
                                        <li><a href="./anime-details.html">Anime Details</a></li>
                                        <li><a href="./anime-watching.html">Anime Watching</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                        <li><a href="./signup.html">Sign Up</a></li>
                                        <li><a href="./login.html">Login</a></li>
                                    </ul>
                                </li>
                                <li class="active"><a href="./blog.html">Our Blog</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="header__right">
                        <a href="#" class="search-switch">
                            <i class="bi bi-search"></i>
                        </a>
                        <router-link :to="{ name: 'Account' }">
                            <i class="bi bi-person"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header>
    <!-- <header class="header bg-danger">
        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo">
                        <router-link to="/">
                            <img :src="mylogo" alt="">
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="header__nav row my-auto">
                        <nav class="header__menu mobile-menu">
                            <ul>
                                <li><a href="./index.html">Homepage</a></li>
                                <li><a href="">Categories <i class="bi bi-chevron-down"></i></a>
                                    <ul class="dropdown">
                                        <li><a href="./categories.html">Categories</a></li>
                                        <li><a href="./anime-details.html">Anime Details</a></li>
                                        <li><a href="./anime-watching.html">Anime Watching</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                        <li><a href="./signup.html">Sign Up</a></li>
                                        <li><a href="./login.html">Login</a></li>
                                    </ul>
                                </li>
                                <li class="active"><a href="./blog.html">Our Blog</a></li>
                                <li><a href="#">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="header__right">
                        <a href="#" class="search-switch">
                            <i class="bi bi-search"></i>
                        </a>
                        <router-link :to="{ name: 'Account' }">
                            <i class="bi bi-person fz-24"></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div id="mobile-menu-wrap"></div>
        </div>
    </header> -->
</template>

<script setup>
    /** Import images asset */
    import mylogo from '@/assets/images/logo/logo.png';
</script>