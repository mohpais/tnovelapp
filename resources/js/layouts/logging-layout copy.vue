<template>
    <main class="logging-in-wrapper d-flex align-items-center">
        <div class="container w-75 mx-auto" style="height: 80vh;">
            <div class="row bg-white rounded shadow h-100">
                <div class="col-sm-5 login-left animated fadeIn d-none d-lg-block position-relative">
                    <!-- <img :src="ImgBottom" class="w-100" alt="..." style="position: absolute; left: 0; right: 0; top: 0;transform: rotate(180deg);"> -->
                    <div class="row p-3 animated fadeInDown" style="height: 20%;">
                        <!-- <div class="my-auto col-auto px-1">
                            <img :src="mylogo" width="42" alt="">
                        </div> -->
                        <div class="my-auto col ps-3">
                            <h5 class="mb-1 fw-bold text-white">T<span class="text-danger">Novel</span></h5>
                            <h6 class="mb-0 fz-12 text-white">Management Information System</h6>
                        </div>
                    </div>
                    <div class="row justify-content-center align-items-center text-white" style="height: 60%;">
                        <div class="col-auto text-center">
                            <img :src="Metrics" width="280" alt="..." class="animated fadeInUp" />
                            <!-- <div class="d-flex align-items-center justify-content-center">
                                <img :src="Logo" width="47" alt="..." class="me-1" />
                                <div class="fs-3 my-auto fw-bold">Hidayah App</div>
                            </div> -->
                            <!-- <div class="fs-3 my-auto fw-bold">Hidayah App</div>
                            <div class="fs-5">Management Information System</div> -->
                        </div>
                    </div>
                    <!-- <div class="" style="position: absolute; background: #000; left: 0; top: 0; width: 100%; height: 100%; opacity: .4;"></div> -->
                    <img :src="ImgBottom" class="w-100" alt="..." style="position: absolute; left: 0; right: 0; bottom: 0;">
                </div>
                <div class="col-lg-7 col-md-12 my-auto">
                    <router-view></router-view>
                </div>
            </div>
            <div class="row mt-3 d-none d-lg-block">
                <div class="col-sm-12 text-center">
                    <p class="mb-0 fw-bold">
                        Copyright by <a href="/" class="text-success">TNovel</a> © 2023
                    </p>
                </div>
            </div>
        </div>
        <!-- <div class="w-80 mx-auto" style="height: 100%;">
        </div> -->
    </main>
</template>

<script setup>
    /** Import bootstrap css */
    import "bootstrap/dist/css/bootstrap.min.css";
    /** Import custom css */
    import '@/assets/css/logging.css';
    import ImgBottom from '@/assets/images/backgrounds/bg-bottom.svg';
    import MainBg from '@/assets/images/illustraations/login.svg';
    import Metrics from '@/assets/images/illustrations/metrics.svg';
    // import Logo from '@/assets/images/logo/logo-app-2.png';
    import mylogo from '@/assets/images/logo/logo.png';
</script>

<style>
    .login-left {
        /* background-color: #4bbc38; */
        /* background-color: #209c62; */
        /* background-color: #3ead37; */
        border-top-left-radius: 0.375rem;
        border-bottom-left-radius: 0.375rem;
        min-height: 80vh;
        background-image: url('../assets/images/backgrounds/left-side.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /* background-image: url('../assets/images/illustrations/metrics.svg');
        background-repeat: no-repeat;
        background-size: 270px;
        background-position: center; */
    }
    

    /* desktop */
    @media (min-width: 770px) {
        .logging-in-wrapper {
            min-height: 100vh;
            background-color: #e7e7e7;

            /* background-image: url('../assets/images/backgrounds/bg-auth.png'); */
            /* background-image: url('../assets/images/backgrounds/bg-left.jpg'); */
            background-size: cover;
            background-repeat: no-repeat;
            /* background-attachment: fixed; */
            background-position: center center;
        }
    }

    /* mobile */
    @media (max-width: 769px) {
        .logging-in-wrapper {
            min-height: 100vh;
            background-color: #4b72fe !important;
        }
    }
</style>