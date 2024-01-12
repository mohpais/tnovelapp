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
            <!-- <div class="col-auto">
                <div class="ms-0 input-with-icon">
                    <i class="bi bi-search"></i>
                    <input style="width: auto;" v-if="props.search" class="form-control" placeholder="Search..." v-model="state.q" ref="search"/>
                </div>
            </div>
            <div class="col-auto">
                <button class="btn btn-sm btn-secondary fz-13">
                    <i class="bi bi-gear-fill me-1"></i>
                    <span>Advance filter</span>
                </button>
            </div> -->
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
            {{ filteredItems }}
            <div class="col-sm-12">
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
                                :style="{ width: header.width ?? 'auto' }"
                            >
                                <span>{{ header.key }}</span>
                            </th>
                            <th v-if="props.actions" style="width: 9.7%;"></th>
                        </tr>
                        <!-- <tr v-for="(item, index) in filteredItems" :key="index">
                            <th v-for="(value, key) in item" :key="key">{{ value }}</th>
                            <th></th>
                        </tr> -->
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
                            <td v-if="props.actions" class="">
                                <button class="btn btn-sm btn-warning me-2 rounded">
                                    <i class="bi bi-pencil-square"></i>
                                </button>
                                <button class="btn btn-sm btn-danger rounded">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- <hr>
    <div class="data-table">
        <div class="filter-and-search-container">
            <div class="filter-container hidden-xs-only">
                <div v-for="(filter, i) in props.filters" :key="i">
                    <div v-if="filter.type === 'input-date'">
                        <div class="input-with-icon date-input">
                            <i class="bi bi-calendar3"></i>
                            <input
                                type="date"
                                v-model="filter.modal"
                                :min="filter.min"
                                :max="filter.max"
                            />
                        </div>
                    </div>
                    
                    <div v-else-if="filter.type === 'select-range'">
                        <select v-model="filter.modal" class="select-box">
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
                </div>
            </div>

            <div class="input-with-icon search-input">
                <i class="bi bi-search"></i>
                <input v-if="props.search" class="form-control" placeholder="Search..." v-model="state.q" ref="search"/>
            </div>
        </div>

        <div class="data-container hidden-xs-only">
            <div
                v-for="(header, i) in props.headers"
                :key="i"
                :style="{ width: header.width ?? '0' }"
            >
                <div class="header-container">
                    <div class="header">
                        {{ header.key }}
                    </div>

                    <div
                        class="sort-buttons"
                        :style="{ visibility: header.sortable ? 'visible' : 'hidden' }"
                    >
                        <i 
                            class="bi bi-arrow-up-short" 
                            @click="state.sortByKey = header.key; state.order = 'ASC'; state.dataType = header.dataType ? header.dataType : 'string'"
                            :class="header.key === state.sortByKey && state.order === 'ASC' ? `selected-sort`: `unselected-sort`"></i>
                        
                        <i
                            @click="state.sortByKey = header.key; state.order = 'DESC'; state.dataType = header.dataType ? header.dataType : 'string'"
                            :class="header.key === state.sortByKey && state.order === 'DESC' ? `selected-sort` : `unselected-sort`"
                            class="bi bi-arrow-down-short"></i>
                    </div>
                </div>

                <div class="content-container">
                <div
                    class="content-row"
                    v-for="(item, j) in filteredItems"
                    :key="j"
                    :style="{ background: j % 2 === 0 ? '#fafafa' : '#ffffff' }"
                >
                    <div v-if="header.shorten">
                        <span
                            :id="'tooltip-' + header.key"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            :title="item[header.key]"
                            ref="tooltipActivator"
                        >
                            <template v-if="item[header.key].length > header.restrictToLen">
                                <span>{{ shortenText(item[header.key], header.restrictToLen) }}</span>
                            </template>
                            <template v-else>
                                <span>{{ item[header.key] }}</span>
                            </template>
                        </span>
                    </div>
                    <div v-else>
                        {{ item[header.key] }}
                    </div>

                    <div
                        v-if="header.type === 'actions'"
                        class="actions hidden-xs-only"
                    >
                    <div
                        v-for="(action, k) in actions"
                        :key="`action-${k}`"
                        class="loop"
                    >
                        <div v-if="action.type === 'edit'" class="content">
                            <button 
                                class="btn btn-sm" 
                                @click="openEditDialog(j, item, k)"
                                :class="{
                                    btnWarning: action.type === 'edit'
                                }">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                {{ action.name }}
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="mobile-content hidden-sm-and-up">
            <div v-for="(items, i) in filteredItems" class="items-row" :key="i">
                <div
                    v-for="(header, j) in headers"
                    class="header-row"
                    :key="`header-${j}`"
                >
                    <div v-if="header.type !== 'actions'" class="key-content">
                        <div class="key">{{ header.key }}</div>
                        <div class="content">{{ items[header.key] }}</div>
                    </div>
                </div>
            </div>
        </div>

        <button
            v-if="isFilterAvailable()"
            class="hidden-sm-and-up filter-float-button"
            @click="state.mobileFilterDialog = true"
        >
            <i class="bi bi-filter"></i>
        </button>
        <div class="modal" tabindex="-1" role="dialog" :style="{ display: state.editDialog ? 'block' : 'none' }">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Modal</h5>
                        <button type="button" class="close" @click="state.editDialog = false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-for="(action, i) in props.actions" :key="i">
                            <div v-if="action.type === 'edit'">
                                <div
                                    v-for="(key, j) in action.key"
                                    :key="`key-${j}`"
                                    v-if="action.modal"
                                >
                                    <div class="edit-text-area">
                                    <textarea
                                        ref="edit"
                                        :placeholder="key"
                                        v-model="action.modal[key]"
                                    ></textarea>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="btn btn-primary"
                                @click="updateAction({ row: action.modal, func: action.func })"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <v-bottom-sheet v-model="mobileFilterDialog" width="300">
            <v-card class="bottom-sheet-card">
                <div class="close-n-clear-container">
                <button
                    class="hidden-sm-and-up close-filter"
                    @click="mobileFilterDialog = false"
                >
                    <i class="material-icons">
                    keyboard_arrow_down
                    </i>
                </button>

                <div class="filter-heading">Filters</div>

                <button
                    :style="{ visibility: isAnyFilterSelected ? 'visible' : 'hidden' }"
                    class="hidden-sm-and-up clear-filter"
                    @click="clearAllFilters()"
                >
                    Clear
                </button>
                </div>

                <div class="filter-container">
                <div v-for="(filter, i) in filters" :key="i">
                    <div class="filter-label">{{ filter.label }}</div>
                    <div v-if="filter.type === 'input-date'">
                    <div class="input-with-icon date-input">
                        <i class="material-icons calendar-icon">
                        calendar_today
                        </i>
                        <input
                        type="date"
                        v-model="filter.modal"
                        :min="filter.min"
                        :max="filter.max"
                        />
                    </div>
                    </div>

                    <div v-else-if="filter.type === 'select-range'">
                    <select v-model="filter.modal" class="select-box">
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
                </div>
                </div>
            </v-card>
        </v-bottom-sheet>
    </div> -->
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
            type: Boolean,
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

            if (header.defaultSortBy) {
                state.sortByKey = header.key
                state.order = header.defaultOrder
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