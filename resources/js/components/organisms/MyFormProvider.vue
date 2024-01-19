<!-- MyFormProvider.vue -->
<template>
  <form ref="formProvider" :id="props.id" @submit.prevent="onSubmit" autocomplete="off" novalidate>
    <slot />
  </form>
</template>

<script setup>
import { ref } from "vue";
import useFormValidation from "@/global/useFormValidation";

const props = defineProps({
  id: String,
  formData: {
    type: Object,
    default: {},
  },
});

const formProvider = ref(null);
const formValidation = useFormValidation();

const onSubmit = () => {
  let isValid = formValidation.submitValidation(formProvider.value, props.formData).isValid.value;
  // console.log(formValidation.errors);

  // if (isValid) {
  //   console.log('Form is valid. Submitting...');
  //   // Add your submission logic here
  // } else {
  //   console.log('Form validation failed. Please check errors.');
  // }
};

formProvider.validateForm = () => {
  const formData = {};

  // Collect form data
  const formInputs = formProvider.value.querySelectorAll('input');
  formInputs.forEach(input => {
    const fieldName = input.getAttribute('id');
    const value = input.value;
    formData[fieldName] = value;
  });

  // Validate form data
  const fieldNames = Object.keys(props.formData);

  for (const fieldName of fieldNames) {
    const value = formData[fieldName];
    formValidation.validateRequired(fieldName, value);
  }

  // Check if there are any validation errors
  const hasErrors = Object.keys(formValidation.errors).some(field => formValidation.errors[field] !== '');

  return !hasErrors;
};

</script>
