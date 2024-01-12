<template>
    <main class="logging-in-wrapper d-flex align-items-center">
        <div class="container">
            <div class="row">
                <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3 animated fadeIn">
                    <div class="panel bg-white">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
</script>

<style>
    a {
        text-decoration: none;
    }
    
    .logging-in-wrapper {
        min-height: 100vh;
        background-image: url('../assets/images/backgrounds/anime-background.jpg');
        background-color: #e7e7e7;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    /* desktop */
    @media (min-width: 770px) {
        
    }

    /* mobile */
    @media (max-width: 769px) {
        .form-submit {
            padding: 0 2rem;
        }
    }

    .panel-heading{
        text-align: center;
        margin-bottom: 10px;
    }
    
    .form-inline label {
        padding-left: 10px;
        margin: 0;
        cursor: pointer;
    }

    .panel{
        min-height: 380px;
        box-shadow: 20px 20px 80px rgb(218, 218, 218);
        border-radius: 12px;
    }
</style>