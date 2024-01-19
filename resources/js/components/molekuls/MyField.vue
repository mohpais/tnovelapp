<template>
    <div v-if="type === 'horizontal'" class="row" :class="class">
        <label :for="props.id" class="col-sm-2 col-form-label">{{ props.labelName }}</label>
        <div class="col-sm-10">
            <slot></slot>
            <div :id="`${props.id}-label`" class=""></div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: String,
        type: String,
        class: String,
        label: String,
    })
</script>