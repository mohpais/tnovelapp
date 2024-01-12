<template>
    <!-- Header Section Begin -->
    <Header />
    <!-- Header End -->
    <router-view></router-view>
    <!-- Footer Section Begin -->
    <Footer />
    <!-- Footer End -->

</template>

<script setup>
    /** Import custom css */
    import '@/assets/css/main.css';
    /** Import components */
    import Header from '@/components/organisms/main/Header.vue';
    import Footer from '@/components/organisms/main/Footer.vue';
</script>