<template>
    <div class="col-sm-12" style="max-height: fit-content; height: 100%;">
        <div class="row justify-content-between">
            <div class="col-sm-12 col-md-6 my-auto">
                <div class="d-inline-block fz-12" id="reponsive_length">
                    <label>
                        Show 
                        <select id="length-select" class="form-select form-select-sm d-inline-block" v-model="state.selectedLength" style="width: auto;">
                            <option  v-for="lengthOption in state.lengthOptions" :key="lengthOption" :value="lengthOption">
                                {{ lengthOption }}
                            </option>
                        </select> 
                        Entries
                    </label>
                </div>
            </div>
        </div>
        <div class="row position-relative">
            <div class="col-sm-12 table-responsive">
                <table class="table dataTable table-bordered table-striped">
                    <thead>
                        <tr>
                            <th 
                                class="sorting_disabled"
                                v-for="(column, index) in options.columns" 
                                :key="index" 
                                :style="{ width: column.width }" 
                                @click="handleSort(column.data)"
                                :class="{
                                    'sorting': column.orderable ?? true,
                                    'sorting_disabled': !column.orderable,
                                    'sorting_asc': column.orderable && getSortIcon(index) === 'asc',
                                    'sorting_desc': column.orderable && getSortIcon(index) === 'desc'
                                }">
                                    {{ helpers.toTitleCase(column.text ?? column.data)  }}
                            </th>
                        </tr>
                        <tr v-if="state.searchable && helpers.hasProperty(options.columns, 'searchable')">
                            <th
                                v-for="(column, index) in options.columns" :key="index">
                                <input v-if="column.searchable" type="text" :id="column.data" class="form-control" @change="handleSearch" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="state.isLoading">
                            <td :colspan="options.columns.length" class="text-center py-4">
                                <div class="spinner-border text-secondary me-1" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border text-secondary me-1" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="spinner-border text-secondary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                        <tr v-else-if="!state.isLoading && state.data.length == 0">
                            <td :colspan="options.columns.length" class="text-center">
                                <h6>No data entry!</h6>
                            </td>
                        </tr>
                        <tr v-else-if="!state.isLoading && state.data.length > 0" v-for="(item, index) in state.data" :key="index">
                            <td v-for="(column, index) in options.columns" :key="index">
                                {{ item[column.data] }}
                            </td>
                            <!-- <td>
                                <slot name="actions" :item="item">
                                    <button @click="defaultAction(item)">Default Action</button>
                                </slot>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row justify-content-between">
            <div class="col"></div>
            <div class="col-auto">
                <Pagination v-if="!state.isLoading" :pagination="state.pagination" @page-change="loadData" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    /** Import package */
    import { computed, reactive, onMounted, watch } from "vue";
    /** Import component */
    import Pagination from '@/components/molekuls/Pagination.vue'; // Adjust the path accordingly
    /** Import global */
    import helpers from '@/global/helpers';
    /** Import service */
    import { GetListDataTables } from "@/services"; // Import from Global Packages GetListDataTables
    /** Define props */
    const props = defineProps({
        options: {
            type: Object,
            required: true,
        }
    });
    /** Define variable */
    let state = reactive({
        isLoading: true,
        query: '',
        lengthOptions: computed(() => props.options.lengthOptions ?? [10, 25, 50, 100]),
        selectedLength: computed(() => props.options.displayLength ?? 10),
        sortOrders: computed(() => props.options.order ?? new Array()),
        searchable: computed(() => props.options.searchable ?? true),
        searchData: computed(() => filterObjectsByProperty(props.options.columns, 'searchable')), 
        data: null,
        pagination: {
            currentPage: 3,
            perPage: 1,
            lastPage: 4,
            total: 4
        },
    });

    const filterObjectsByProperty = (array, propertyName) => {
        return array
            .filter(obj => obj.hasOwnProperty(propertyName))
            .map(obj => ({ column: array.findIndex(x => x.data === obj['data']), value: '' }));
    };
    console.log(filterObjectsByProperty(props.options.columns, 'searchabless'));

    onMounted(async () => await loadData());

    const loadData = async (page = 1) => {
        let payload = {
            page, 
            columns: props.options.columns,
            displayLength: state.selectedLength,
            orders: state.sortOrders,
            search: state.searchData
        }
        console.log(payload);
        await GetListDataTables(props.options.api, payload)
            .then(response => {
                state.data = response.data.data;
                state.pagination = response.data.pagination;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // const handleSort = async (columnValue) => {
    //     // Find the existing order for the clicked column
    //     const existingOrder = sortOrders.find(order => order.column === columnValue);

    //     if (existingOrder) {
    //         // If the column is already in the sorting orders, toggle the direction
    //         existingOrder.dir = existingOrder.dir === 'asc' ? 'desc' : 'asc';
    //     } else {
    //         // If the column is not in the sorting orders, add a new order with default direction
    //         sortOrders.push({
    //             column: columnValue,
    //             dir: 'asc',
    //         });
    //     }

    //     // Remove any duplicate orders (keep only the last one)
    //     sortOrders = sortOrders.filter((order, index, self) =>
    //         index === self.findIndex(o => o.column === order.column)
    //     );

    //     // Load data with the updated sort orders
    //     await loadData();
    // }
    
    const getSortIcon = (columnIndex) => {
        if (!props.options.orders) return '';

        let dataOrders = props.options.orders;
        const order = dataOrders.find(order => order.column === columnIndex);
        if (order) return order.dir;

        return '';
    }

    watch(
        () => state.data,
        async (data) => {
            if (data) {
                state.isLoading = false
            }
        },
        { immediate: true }
    )

    const handleLengthChange = () => {
    //   this.$emit('length-change', state.selectedLength);
    }
</script>
  
<style lang="scss" scoped>
    @mixin font($size, $color, $weight) {
        font-size: $size;
        color: $color;
        font-weight: $weight;
    }

    $mobileFilterFont: 16px;
    .dataTable {
        font-size: 12px;
        thead {
            tr {
                th {
                    background-color: #eeeeee;
                    .sorting {
                        cursor: pointer;
                        padding-right: 26px;
                        position: relative;
                    }
                }
            }
        }
    }
</style>