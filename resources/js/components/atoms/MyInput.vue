<template>
  <input
    v-bind="$attrs"
    :id="props.id"
    :name="props.name"
    :type="props.type"
    :class="addClass"
    :placeholder="props.placeholder"
    :min="props.min"
    :max="props.max"
    :value="input"
    @input="updateInput"
    :readonly="props.readonly"
    :disabled="props.disabled"
    :required="props.required"
    :aria-describedby="props.ariaDescribeby"
  />
</template>

<script setup>
import { computed, ref, watch, defineProps, defineEmits, onMounted } from "vue";
import useFormValidation from "@/global/useFormValidation";

const props = defineProps({
  id: String,
  type: String,
  min: String,
  max: String,
  placeholder: String,
  className: String,
  readonly: Boolean,
  disabled: Boolean,
  modelValue: {
    type: [String, Number],
    required: false,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  labelName: {
    type: String,
    default: "",
  },
  numberFormat: {
    type: Boolean,
    default: false,
  },
  ariaDescribeby: {
    type: String,
    default: null,
  },
  numericOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const input = ref(props.modelValue);

const updateInput = (event) => {
  input.value = event.target.value;
  emit("update:modelValue", event.target.value);
};

const {
  validateRequired,
  validateMin,
  validateMax,
  validateEmail,
  validateFile,
  errors,
} = useFormValidation();

const addClass = computed(() => {
  let className = "form-control mb-0 ";
  if (errors[props.id]) className += "is-invalid ";
  if (props.className) className += props.className;
  return className;
});

// onMounted(() => {
//   console.log(errors);
// })

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
