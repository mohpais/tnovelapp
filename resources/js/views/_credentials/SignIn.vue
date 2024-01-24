<template>
    <div class="panel-body py-5">
            <div class="row justify-content-center">
                <div class="col-sm-10 text-center animated fadeInDown">
                    <h4 class="fw-bold">Sign in to <router-link class="fw-bold" to="/">TNovel</router-link></h4>
                    <div class="d-flex authentication-third mb-4">
                        <div class="w-60 mx-auto">
                            <button class="btn btn-text">
                                <i class="bi bi-facebook" style="font-size: 18px;"></i>
                            </button>
                            <button class="btn btn-text">
                                <i class="bi bi-google fz-16"></i>
                            </button>
                        </div>
                    </div>
                    <small class="text-secondary fz-12">Or use your <span class="fw-bold fz-11">Registed account!</span></small>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-sm-9 form-submit">
                    <form @submit.prevent="onSubmit" novalidate autocomplete="off">
                        <div class="form-group mb-2 animated fadeInUp">
                            <label for="email" class="fz-11 font-poppins-bold">Username</label>
                            <input type="text" class="form-control my-input" name="email" id="email"
                                placeholder="Silahkan ketik username Anda" v-model="signin.email" required>
                        </div>
                        <div class="form-group mb-4 position-relative animated fadeInUp delay-1">
                            <label for="password" class="fz-11 font-poppins-bold">Password</label>
                            <input :type="!showPass ? 'password' : 'text'" class="form-control my-input pe-5" name=""
                                id="password" placeholder="Silahkan ketik password Anda" v-model="signin.password" required>
                            <i v-if="!showPass" @click="showPass = true" class="bi bi-eye-fill cursor" 
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                            <i v-if="showPass" @click="showPass = false" class="bi bi-eye-slash-fill cursor"
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                        </div>
                        <div class="row">
                            <div class="my-auto col animated fadeInRight fz-12">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div class="my-auto col-auto">
                                <button ref="btnSignIn" type="submit"
                                    :disabled="isLoading"
                                    class="px-4 btn btn-primary rounded-pill muli-ex-bold animated fadeInLeft my-btn">
                                    <span class="trantition" v-if="!isLoading">Sign In</span>
                                    <span class="trantition" v-else>Please wait! </span>
                                    <i v-if="!isLoading" class="bi bi-arrow-right d-inline ms-2 font-13"></i>
                                    <div v-if="isLoading" class="spinner-border spinner-border-sm ms-2" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </button>
                                <!-- pake loading ini ketika memuat data -->
                                <i v-if="isLoading" class="fas fa-spinner fa-spin ms-2"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<script setup>
    /** Import package */
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";

    /** Import global */
    import { DoLogin } from "@/services"; // Import from Global Packages
    import helpers from '@/global/helpers';

    /**  Define variables */
    let btnSignIn = ref(false); 
    let showPass = ref(false); 
    let isLoading = ref(false); 

    const router = useRouter();
    const signin = reactive({
        email: "",
        password: ""
    });

    /** Define method */
    const onSubmit = async (e) => {
        e.preventDefault();
        isLoading.value = true;
        await DoLogin(signin)
            .then(function successCallBack(response) {
                var data = response.data;
                if (data.success) {
                    var btnElement = btnSignIn.value;
                    btnElement.setAttribute('disabled', true);
                    // btnElement.innerHTML = errors.value[fieldName];
                    var authorization = data.token;
                    var user = data.user;
                    var role = data.role;
                    sessionStorage.setItem("_xa", authorization);
                    sessionStorage.setItem("_us", helpers.enc(JSON.stringify(user), 1, 6));
                    sessionStorage.setItem("_rl", helpers.enc(JSON.stringify(role), 1, 6));
                    window.location.reload();
                }
            })
            .catch(function errorCallBack(err) {
                console.log(err);
                helpers.alertToast("error", "Something wrong when login!");
            });

        isLoading.value = false;
    }
</script>

<style>
    .authentication-third {
        position: relative;
        /* background-color: aquamarine; */
    }

    .authentication-third > div::before {
        content: "";
        display: block;
        width: 90px;
        height: 1px;
        background: #d6d6d6;
        left: 0;
        top: 50%;
        position: absolute;
    }

    .authentication-third > div::after {
        content: "";
        display: block;
        width: 90px;
        height: 1px;
        background: #d6d6d6;
        right: 0;
        top: 50%;
        position: absolute;
    }

    .authentication-third button {
        margin: 0 5px;
    }
</style>