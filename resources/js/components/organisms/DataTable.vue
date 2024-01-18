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
                                v-for="(column, index) in options.columns" 
                                :key="index" 
                                :style="{ width: column.width }" 
                                @click="handleSort(index)"
                                :class="{
                                    'sorting': !column.hasOwnProperty('orderable'),
                                    'sorting_disabled': column.hasOwnProperty('orderable') && column.orderable === false,
                                    'sorting_asc': (!column.hasOwnProperty('orderable') || (column.hasOwnProperty('orderable') && column.orderable === true)) && getSortIcon(index) === 'asc',
                                    'sorting_desc': (!column.hasOwnProperty('orderable') || (column.hasOwnProperty('orderable') && column.orderable === true)) && getSortIcon(index) === 'desc'
                                }">
                                    {{ helpers.toTitleCase(column.text ?? column.data)  }}
                            </th>
                            <th v-if="hasActions">Actions</th>
                        </tr>
                        <tr v-if="state.searchable && helpers.hasProperty(options.columns, 'searchable')">
                            <th
                                v-for="(column, index) in options.columns" :key="index">
                                <input v-if="column.searchable" type="text" :id="column.data" class="form-control" @change="handleSearch" />
                            </th>
                            <th v-if="hasActions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="state.isLoading">
                            <td :colspan="hasActions ? options.columns.length + 1 : options.columns.length" class="text-center py-4">
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
                        <tr v-else-if="!state.isLoading && !state.data">
                            <td :colspan="hasActions ? options.columns.length + 1 : options.columns.length" class="text-center">
                                <h6>No data entry!</h6>
                            </td>
                        </tr>
                        <tr v-else-if="!state.isLoading && state.data.length > 0" v-for="(item, row) in state.data" :key="row">
                            <td v-for="(column, col) in options.columns" :key="col" :class="{
                                'text-center': !item[column.data]
                            }">
                                <!-- Check if the column has a render function -->
                                <template v-if="typeof column.render === 'function'">
                                    <!-- Call the render function with appropriate parameters -->
                                    <div v-html="column.render(item[column.data], 'display', item, { row, col })"></div>
                                </template>
                                <template v-else>
                                    <!-- Display item[column.data] for regular columns -->
                                    {{ item[column.data] ?? '-' }}
                                </template>

                            </td>
                            <td v-if="hasActions">
                                <slot name="actions" :item="item"></slot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row justify-content-between">
            <div class="col my-auto">
                <span>Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries</span>
            </div>
            <div class="col-auto">
                <Pagination v-if="!state.isLoading" :pagination="state.pagination" @page-change="loadData" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
    /** Import package */
    import { ref, computed, reactive, onMounted, getCurrentInstance, watch, toRefs } from "vue";
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
        },
        performAction: {
            type: Function,
            default: () => {},
        }
    });
    /** Define variable */
    const hasActions = computed(() => {
        const instance = getCurrentInstance();
        return instance.slots.actions !== undefined;
    });

    let state = reactive({
        isLoading: false,
        lengthOptions: props.options.lengthOptions ?? [10, 25, 50, 100],
        selectedLength: props.options.displayLength ?? 10,
        sortOrders: props.options.orders ?? new Array(),
        searchable: props.options.searchable ?? true,
        searchData: computed(() => {
            return props.options.columns
                .filter(obj => obj.hasOwnProperty('searchable'))
                .map(obj => ({ column: props.options.columns.findIndex(x => x.data === obj['data']), value: '' }));
        }), 
        data: null,
        pagination: {},
    });
    let startEntry = computed(() => (state.pagination.currentPage - 1) * state.pagination.perPage + 1);
    let endEntry = computed(() => {
        const lastEntry = startEntry.value + state.pagination.perPage - 1;
        return lastEntry > state.pagination.total ? state.pagination.total : lastEntry;
    });
    let totalEntries = computed(() => state.pagination.total);


    onMounted(async () => await loadData());

    const loadData = async (page = 1) => {
        state.isLoading = true;
        let payload = {
            page, 
            // columns: props.options.columns,
            columns: props.options.columns.map(column => column.data),
            displayLength: state.selectedLength,
            orders: state.sortOrders,
            search: state.searchData
        }
        
        try {
            const response = await GetListDataTables(props.options.api, payload);
            state.data = response.data.data;
            state.pagination = response.data.pagination;
        } catch (error) {
            console.error('Error fetching data:', error);
            state.data = [];
        } finally {
            state.isLoading = false;
        }
    }
    const handleSort = async (columnIndex) => {
        let existingOrder = state.sortOrders.find(order => order.column === columnIndex);
        if (existingOrder) {
            const existingOrderIndex = state.sortOrders.findIndex(order => order.column === columnIndex);
            if (existingOrderIndex !== -1) {
                // If the column is already in the sorting orders, remove it
                existingOrder = state.sortOrders.splice(existingOrderIndex, 1)[0];
                existingOrder.dir = existingOrder.dir === 'asc' ? 'desc' : 'asc';
                // Add the existing order to the first index
                state.sortOrders.unshift(existingOrder);
            }
        } else {
            // Use unshift to add the new order to the beginning of the array
            state.sortOrders.unshift({
                column: columnIndex,
                dir: 'asc',
            });
        }
        // Remove any duplicate orders (keep only the last one)
        state.sortOrders = state.sortOrders.filter((order, index, self) =>
            index === self.findIndex(o => o.column === order.column)
        );

        await loadData();
    }
    
    const getSortIcon = (columnIndex) => {
        if (!props.options.orders) return '';
        const order = props.options.orders.find(order => order.column === columnIndex);
        return order ? order.dir : '';
    };

    watch(
        () => state.data,
        (newData) => {
            if (newData) {
                state.isLoading = false;
            }
        },
        { immediate: true }
    );

    const defaultAction = (item) => {
      // Default action logic
      console.log('Default action for item:', item);
    }

    // const handleLengthChange = () => {
    // //   this.$emit('length-change', state.selectedLength);
    // }
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