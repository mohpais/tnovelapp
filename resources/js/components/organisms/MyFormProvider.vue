<!-- MyFormProvider.vue -->
<template>
  <form ref="formProvider" :id="props.id" @submit.prevent="onSubmit" autocomplete="off" novalidate>
    <slot />
  </form>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
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

// onMounted(() => {
//   formProvider.value.validateForm = () => {
//     const fieldNames = Object.keys(props.formData);

//     for (const fieldName of fieldNames) {
//       const elementInput = formProvider.value.querySelector(`input#${fieldName}`);
//       const elementLabel = formProvider.value.querySelector(`#${fieldName}-label`);
//       const value = elementInput.value;
//       formValidation.validateRequired(fieldName, value);

//       // Add "is-invalid" class if there is an error
//       if (formValidation.errors[fieldName]) {
//         elementInput.classList.add("is-invalid");
//         elementLabel.classList.add("invalid-feedback", "d-block");
//         elementLabel.innerHTML = formValidation.errors[fieldName];
//       } else {
//         // Remove "is-invalid" class if there is no error
//         elementInput.classList.remove("is-invalid");
//         elementLabel.classList.remove("invalid-feedback", "d-block");
//         elementLabel.innerHTML = "";
//       }
//     }

//     // Check if there are any validation errors
//     const hasErrors = Object.keys(formValidation.errors).some(field => formValidation.errors[field] !== '');

//     return !hasErrors;
//   };
// });

const emits = defineEmits(["onSubmit"]);

const onSubmit = () => {
  let isValid = formValidation.submitValidation(formProvider.value, props.formData).isValid.value;
  // console.log(formValidation.errors.value);
  return emits('onSubmit', isValid);
  // if (isValid) {
  //   console.log('Form is valid. Submitting...');
  //   // Add your submission logic here
  // } else {
  //   console.log('Form validation failed. Please check errors.');
  // }
};

</script>
