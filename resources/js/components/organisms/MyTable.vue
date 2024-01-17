<template>
    <div class="col-sm-12">
        <div class="row justify-content-between">
            <div class="col-sm-12 col-md-6">
                <div class="d-inline-block" id="reponsive_length">
                    <label>
                        Show 
                        <select name="reponsive_length" aria-controls="reponsive" class="form-select form-select-sm d-inline-block" style="width: auto;">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> 
                        Entries
                    </label>
                </div>
            </div>
            <div class="col-sm-12 col-md-auto d-flex">
                <button class="btn btn-sm btn-text fz-16">
                    <i class="bi bi-funnel"></i>
                </button>
                <!-- <button class="btn btn-sm btn-secondary me-2 my-auto fz-13">
                    <i class="bi bi-gear-fill me-1"></i>
                    <span>Advance filter</span>
                </button> -->
                <div class="ms-0 input-with-icon my-auto">
                    <input style="width: auto;" v-if="props.search" class="form-control" placeholder="Search..." v-model="state.q" ref="search"/>
                </div>
            </div>
        </div>
        <div class="row mt-2 d-none">
            <div class="col-12">
                <div class="card card-body shadow-none bg-light border p-2 mb-1">
                    <div class="row">
                        <div class="col-auto my-auto" v-for="(filter, i) in filters" :key="i">
                            <div v-if="filter.type === 'select-range'">
                                <select v-model="filter.modal" class="form-select">
                                    <option :value="undefined">{{ filter.defaultOption }}</option>
                                    <option
                                    v-for="(option, j) in filter.options"
                                    :value="option.value"
                                    :key="j"
                                    >
                                    {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div v-else-if="filter.type === 'input-date'">
                                <input
                                    class="form-control"
                                    type="date"
                                    v-model="filter.modal"
                                    :min="filter.min"
                                    :max="filter.max"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row position-relative">
            <!-- {{ filteredItems }} -->
            <div class="col-sm-12 table-responsive">
                <table class="table dataTable table-bordered table-striped">
                    <thead>
                        <tr>
                            <th
                                :class="{
                                    'sorting': !header.type,
                                    'sorting_asc': state.sortByKey === header.key && state.order === 'ASC',
                                    'sorting_desc': state.sortByKey === header.key && state.order === 'DESC'
                                }"
                                v-for="(header, i) in props.headers"
                                @click="handleShort(header.key, state.order === 'ASC' ? 'DESC' : 'ASC', header.dataType ? header.dataType : 'string' )"
                                :key="i"
                                :style="{ 
                                    width: header.width ?? 'auto', 
                                    visibility: header.visibility ? 'visible' : 'hidden'
                                }"
                            >
                                <span>{{ helpers.toTitleCase(header.key)  }}</span>
                            </th>
                            <th v-if="props.actions" style="width: 9.7%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, index) in filteredItems"
                            :key="index"
                            :class="{
                                'odd': index % 2 !== 0,
                                'event': index % 2 === 1
                            }">
                            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
                            <slot name="actions"></slot>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Url Reference */
    // https://github.dev/devatquarxss/reusable-data-table-component-vue/blob/master/components/data-table.vue
    // https://demo.adminkit.io/tables-datatables-fixed-header

    /** Import package */
    import { reactive, watch, ref, nextTick, onMounted, computed } from "vue";
    import { Tooltip } from 'bootstrap';

    /** Import global */
    import helpers from '@/global/helpers';

    /** Define props */
    const props = defineProps({
        defaultSortBy: {
            type: String,
            default: '',
        },
        orderBy: {
            type: String,
            default: 'DESC',
        },
        headers: {
            type: Array,
            default: [],
        },
        items: {
            type: Array,
            default: []
        },
        filters: {
            type: Array,
            default: []
        },
        search: {
            type: Boolean,
            default: true
        },
        actions: {
            type: Array,
            default: true
        }
    });

    /** Define ref */
    const editRef = ref(null); // Create a ref to store the DOM element reference
    const searchRef = ref("search");
    /** Define Variable */
    let searchedItems = []
    let state = reactive({
        editRow: 0,
        editDialog: false,
        q: '',
        sortByKey: '',
        order: '',
        dataType: '',
        mobileFilterDialog: false,
    });

    const filteredItems = computed(() => {
        return filter(); // Replace filter() with the appropriate function call
    });

    const isAnyFilterSelected = computed(() => {
        return isFilterSelected(); // Replace isFilterSelected() with the appropriate function call
    });

    /**  Define method */
    const filter = () => {
        debugger;
        let arrOfItems = []
        for (let i in props.filters) {
            let filter = props.filters[i];
            if (filter.modal) {
                arrOfItems.push([])
                let itemsIndex = arrOfItems.length - 1
                for (let j in props.items) {
                    let item = props.items[j]
                    if (filter.type === 'input-date') {
                        if (item[filter.key].includes(filter.modal)) {
                            arrOfItems[itemsIndex].push(JSON.stringify(item)) // 1
                        }
                    }
                    if (filter.type === 'select-range') {
                        if (
                            parseFloat(filter.modal.min) <= parseFloat(item[filter.key]) &&
                            parseFloat(filter.modal.max) >= parseFloat(item[filter.key])
                        ) {
                            arrOfItems[itemsIndex].push(JSON.stringify(item)) // 2
                        }
                    }
                }
            }
        }

        let filteredItems = []
        if (arrOfItems.length === 0) {
            filteredItems = props.items
        }
        else {
            let isAnyOneItemsArrEmpty = false
            for (let i in arrOfItems) {
                let items = arrOfItems[i]
                if (items.length === 0) {
                    isAnyOneItemsArrEmpty = true
                }
            }

            if (isAnyOneItemsArrEmpty) {
                filteredItems = []
            } else {
                if (arrOfItems.length === 1) {
                    filteredItems = arrOfItems[0]
                } else {
                    filteredItems = helpers.INTERSECTION({ arrOfArr: arrOfItems })
                }
            }
        }

        let parsedItems = []
        for (let i in filteredItems) {
            let item = filteredItems[i]

            if (typeof item === 'string') {
                item = JSON.parse(item)
            }

            parsedItems.push(item)
        }

        let searchedItems = []
        if (state.search && state.q.length > 0) {
            for (let i in parsedItems) {
                let item = parsedItems[i];
                let isMatch = false
                for (let key in item) {
                    let val = JSON.stringify(item[key])
                    if (val.toLowerCase().includes(state.q.toLowerCase())) {
                        isMatch = true
                    }
                }

                if (isMatch) {
                    searchedItems.push(item)
                }
            }
        } else {
            searchedItems = parsedItems
        }

        // SORT
        let sortedArr;
        if (state.sortByKey.length > 0) {
            sortedArr = helpers.sortArrOfObj({
                arr: searchedItems,
                key: state.sortByKey,
                order: state.order,
                dataType: state.dataType
            })
        } else {
            sortedArr = searchedItems
        }

        return sortedArr
    };

    // Function to shorten text
    const shortenText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const handleShort = (headerKey, orderType, dataType) => {
        state.sortByKey = headerKey; 
        state.order = orderType; 
        state.dataType = dataType ? dataType : 'string'
    }

    const openEditDialog = (index, item, k) => {
        state.editDialog = true;
        state.editRow = index;
        props.actions[k].modal = { ...item }; // Using spread syntax to create a shallow copy
    };

    const initDefaultSort = () => {
        for (let i in props.headers) {
            let header = props.headers[i]

            // if (header.defaultSortBy) {
            //     state.sortByKey = header.key
            //     state.order = header.defaultOrder
            // }
            if (props.defaultSortBy) {
                state.sortByKey = props.defaultSortBy
                state.order = props.orderBy
            }
        }
    };

    const editAction = ({ row, func }) => {
        console.log(row);
        func({ row, index: row.dbIndex, vm: this })
    };

    const isFilterAvailable = () => {
        if (props.filters) {
            if (props.filters.length === 0) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    };

    const isFilterSelected = () => {
        if (props.filters) {
            for (let i in props.filters) {
                let filter = props.filters[i]

                if (filter.modal) {
                    if (JSON.stringify(filter.modal).length > 0) {
                        return true
                    }
                }
            }
        }
        return false
    };

    // Initialize Bootstrap tooltips
    onMounted(() => {
        initDefaultSort(); // Call the function to initialize default sorting when the component is mounted

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl);
        });
    });

    watch(() => state.editDialog, (newValue) => {
        if (newValue) {
            nextTick(() => {
                if (editRef.value) {
                    editRef.value.focus();
                }
            });
        }
    });
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