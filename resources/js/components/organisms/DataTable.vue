<template>
    <div class="col-sm-12 table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, index) in columns" :key="index">
                        {{ column.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="(column, index) in columns" :key="index">
                        {{ item[column.value] }}
                    </td>
                </tr>
            </tbody>
        </table>
        <Pagination :pagination="props.pagination" @page-change="handlePageChange" />
    </div>
</template>
  
<script setup>
    import { ref } from "vue";
    /** Import component */
    import Pagination from '@/components/molekuls/Pagination.vue'; // Adjust the path accordingly

    /** Define props */
    const props = defineProps({
        data: {
            type: Array,
            required: true,
        },
        columns: {
            type: Array,
            required: true,
        },
        pagination: {
            type: Object,
            required: true,
        },
    });

    const emits = defineEmits(["page-change"]);

    /**  Define method */
    const handlePageChange = (page) => {
        // Emit an event to notify the parent component about the page change
        return emits('page-change', page);
    }
</script>
  
<style lang="scss" scoped>
</style>