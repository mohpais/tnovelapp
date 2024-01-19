<!-- MyFormProvider.vue -->
<template>
  <form ref="formProvider" :id="props.id" @submit.prevent="onSubmit" novalidate>
    <slot />
  </form>
</template>

<script setup>
import { ref, provide } from "vue";
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

provide('validation', formValidation);

const onSubmit = () => {
  let isValid = formValidation.submitValidation(formProvider.value, props.formData).isValid.value;
  console.log(formValidation.errors);

  if (isValid) {
    console.log('Form is valid. Submitting...');
    // Add your submission logic here
  } else {
    console.log('Form validation failed. Please check errors.');
  }
};

const validateForm = () => {
  for (const field in props.formData) {
    if (props.formData.hasOwnProperty(field)) {
      const elementInput = formProvider.value.querySelector(`input#${field}`);
      const elementLabel = formProvider.value.querySelector(`#${field}-label`);
      const value = elementInput.value;
      const attributeNames = elementInput.getAttributeNames();

      if (attributeNames.includes('required')) {
        formValidation.validateRequired(field, value);
      }

      if (attributeNames.includes('min')) {
        const fieldMin = elementInput.getAttribute('min');
        formValidation.validateMin(field, value, fieldMin);
      }

      if (attributeNames.includes('max')) {
        const fieldMax = elementInput.getAttribute('max');
        formValidation.validateMax(field, value, fieldMax);
      }

      if (attributeNames.includes('type')) {
        switch (elementInput.getAttribute('type')) {
          case "email":
            formValidation.validateEmail(field, value);
            break;
          case "file":
            formValidation.validateFile(field, value);
            break;
          // Add more cases for other input types as needed
        }
      }
    }
  }

  // Check if there are any validation errors
  const hasErrors = Object.keys(formValidation.errors).some(field => formValidation.errors[field] !== '');

  return !hasErrors;
};

</script>
