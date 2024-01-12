<template>
    <div id="datatables-reponsive_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="dataTables_length" id="datatables-reponsive_length">
                    <label>
                        Show 
                        <select name="datatables-reponsive_length" aria-controls="datatables-reponsive" class="form-select form-select-sm">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select> 
                        entries
                    </label>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div id="datatables-reponsive_filter" class="dataTables_filter">
                    <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="datatables-reponsive"></label>
                </div>
            </div>
        </div>
        <div class="row dt-row">
            <div class="col-sm-12">
                <table id="datatables-reponsive" class="table table-striped dataTable no-footer dtr-inline" style="width: 100%;" aria-describedby="datatables-reponsive_info">
                    <thead>
                        <tr>
                            <!-- loop through each value of the fields to get the table header -->
                            <th v-for="field in props.fields" :key='field' @click="sortTable(field)" > 
                                {{ field }} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Loop through the list get the each student data -->
                        <tr v-for="item in filteredList" :key='item'>
                            <td v-for="field in props.fields" :key='field'>{{ item[field] }}</td>
                            <td class="table-action">
                                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                            </td>
                        </tr>
                    </tbody>
                </table> 
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <div class="info">Showing 1 to 10 of 57 entries</div>
            </div>
            <div class="col-sm-12 col-md-7">
                <div class="" id="datatables-reponsive_paginate">
                    <ul class="pagination">
                        <li class="paginate_button page-item previous disabled" id="datatables-reponsive_previous">
                            <a aria-controls="datatables-reponsive" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="0" class="page-link">Previous</a>
                        </li>
                        <li class="paginate_button page-item active">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a>
                        </li>
                        <li class="paginate_button page-item ">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a>
                        </li>
                        <li class="paginate_button page-item ">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a>
                        </li>
                        <li class="paginate_button page-item ">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a>
                        </li>
                        <li class="paginate_button page-item ">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a>
                        </li>
                        <li class="paginate_button page-item next" id="datatables-reponsive_next">
                            <a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { ref, onMounted, computed } from "vue";
    import { sortBy } from "lodash";

    /**  Define props */
    const props = defineProps({
        fields: {
            type: Array,
            default: [],
        },
        data: {
            type: Array,
            default: []
        },
        shown: {
            type: Int,
            default: 5,
        }
    });

    /**  Define variables */
    let sort = ref(false);
    let updatedList = ref([]);
    let searchQuery = ref("");
    

    const filteredList = computed(() => {
        return sortedList.value.filter((product) => {
            return (
                // converts the query and value to lower case  index
                product.Name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
            )
        });
    });

    /** Define method */
    const sortTable = (col) => {
        sort.value = true
        updatedList.value = sortBy(props.data, col)
    };

    const sortedList = computed(() => {
        if (sort.value) {
            return updatedList.value
        }
        else{
            return props.data;
        }
    });

    onMounted(() => {
        console.log(updatedList);
    })
</script>

<style scoped>
    table th:hover {
        background:#f2f2f2;
        cursor: pointer;
    }

    table .info {
        padding-top: 0.85em;
    }
</style>