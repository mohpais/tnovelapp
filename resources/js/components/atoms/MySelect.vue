<!-- MySelectInput.vue -->
<template>
    <select v-bind="options" v-model="input">
      <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </template>
  
<script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    options: Array,
  });
  
  const input = ref(props.modelValue);
</script>
  