<!-- MyInput.vue -->
<template>
    <div>
      <label :for="props.id">{{ props.labelName }}</label>
      <component
        :is="getInputType()"
        v-bind="inputProps"
        :class="addClass"
        v-model="input"
        @change="handleChange"
        @input="handleChange"
      />
      <div v-if="errors[props.id]" class="invalid-feedback d-block">{{ errors[props.id] }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  import useFormValidation from "@/global/useFormValidation";
  
  const props = defineProps({
    id: String,
    name: String,
    type: String,
    min: [String, Number],
    max: [String, Number],
    placeholder: String,
    className: String,
    readonly: Boolean,
    disabled: Boolean,
    modelValue: {
      type: [String, Number],
      required: false,
      default: "",
    },
    required: Boolean,
    labelName: String,
    ariaDescribeby: String,
    options: Array, // For select input
  });
  
  const emit = defineEmits(["update:modelValue"]);
  
  const input = ref(props.modelValue);
  
  const { validateRequired, validateMin, validateMax, validateEmail, validateFile, errors } = useFormValidation();
  
  const addClass = computed(() => {
    let className = "form-control mb-0 ";
    if (errors[props.id]) className += "is-invalid ";
    if (props.className) className += props.className;
    return className;
  });
  
  const inputProps = computed(() => {
    return {
      id: props.id,
      name: props.name,
      type: props.type,
      placeholder: props.placeholder,
      readonly: props.readonly,
      disabled: props.disabled,
      required: props.required,
      "aria-describedby": props.ariaDescribeby,
      ...(props.type === "radio" && { value: props.modelValue }), // For radio input
      ...(props.type === "select" && { options: props.options }), // For select input
    };
  });
  
  const handleChange = (event) => {
    input.value = event.target.value;
  };
  
  const getInputType = () => {
    // Handle different input types here
    switch (props.type) {
      case "radio":
        return "input";
      case "select":
        return "select-input";
      case "textarea":
        return "textarea-input";
      default:
        return "input";
    }
  };
  
  watch(input, (newVal) => {
    switch (props.type) {
      case "radio":
        // Radio buttons don't need validation
        break;
      case "email":
        validateEmail(props.id, newVal);
        break;
      case "file":
        validateFile(props.id, newVal);
        break;
      default:
        if (props.required) {
          validateRequired(props.id, newVal);
        }
        if (props.min) {
          validateMin(props.id, newVal, props.min);
        }
        if (props.max) {
          validateMax(props.id, newVal, props.max);
        }
        break;
    }
  });
  
  </script>
  