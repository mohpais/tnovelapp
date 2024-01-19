<!-- MyTextareaInput.vue -->
<template>
    <textarea v-bind="props" v-model="input"></textarea>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    id: String,
    name: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
    required: Boolean,
    ariaDescribeby: String,
    rows: [String, Number],
  });
  
  const input = ref(props.modelValue);
  </script>
  