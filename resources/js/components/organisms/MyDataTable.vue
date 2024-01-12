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
                            <th class="sorting sorting_asc" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 153px;" aria-sort="ascending" aria-label="Name: activate to sort column descending">Name</th>
                            <th class="sorting" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 233px;" aria-label="Position: activate to sort column ascending">Position</th>
                            <th class="sorting" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 111px;" aria-label="Office: activate to sort column ascending">Office</th>
                            <th class="sorting" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 45px;" aria-label="Age: activate to sort column ascending">Age</th>
                            <th class="sorting" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 96px;" aria-label="Start date: activate to sort column ascending">Start date</th>
                            <th class="sorting" tabindex="0" aria-controls="datatables-reponsive" rowspan="1" colspan="1" style="width: 87px;" aria-label="Salary: activate to sort column ascending">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="odd">
                            <td class="dtr-control sorting_1" tabindex="0">Airi Satou</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                            <td>33</td>
                            <td>2018/11/28</td>
                            <td>$162,700</td>
                        </tr>
                        <tr class="even">
                            <td class="sorting_1 dtr-control">Angelica Ramos</td>
                            <td>Chief Executive Officer (CEO)</td>
                            <td>London</td>
                            <td>47</td>
                            <td>2019/10/09</td>
                            <td>$1,200,000</td>
                        </tr>
                        <tr class="odd">
                            <td class="dtr-control sorting_1" tabindex="0">Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                            <td>66</td>
                            <td>2019/01/12</td>
                            <td>$86,000</td>
                        </tr>
                        <tr class="even">
                            <td class="sorting_1 dtr-control">Bradley Greer</td>
                            <td>Software Engineer</td>
                            <td>London</td>
                            <td>41</td>
                            <td>2022/10/13</td>
                            <td>$132,000</td>
                        </tr>
                        <tr class="odd">
                            <td class="sorting_1 dtr-control">Brenden Wagner</td>
                            <td>Software Engineer</td>
                            <td>San Francisco</td>
                            <td>28</td>
                            <td>2023/06/07</td>
                            <td>$206,850</td>
                        </tr>
                        <tr class="even">
                            <td class="dtr-control sorting_1" tabindex="0">Brielle Williamson</td>
                            <td>Integration Specialist</td>
                            <td>New York</td>
                            <td>61</td>
                            <td>2022/12/02</td>
                            <td>$372,000</td>
                        </tr>
                        <tr class="odd">
                            <td class="sorting_1 dtr-control">Bruno Nash</td>
                            <td>Software Engineer</td>
                            <td>London</td>
                            <td>38</td>
                            <td>2023/05/03</td>
                            <td>$163,500</td>
                        </tr>
                        <tr class="even">
                            <td class="sorting_1 dtr-control">Caesar Vance</td>
                            <td>Pre-Sales Support</td>
                            <td>New York</td>
                            <td>21</td>
                            <td>2023/12/12</td>
                            <td>$106,450</td>
                        </tr>
                        <tr class="odd">
                            <td class="sorting_1 dtr-control">Cara Stevens</td>
                            <td>Sales Assistant</td>
                            <td>New York</td>
                            <td>46</td>
                            <td>2023/12/06</td>
                            <td>$145,600</td>
                        </tr>
                        <tr class="even">
                            <td class="dtr-control sorting_1" tabindex="0">Cedric Kelly</td>
                            <td>Senior Javascript Developer</td>
                            <td>Edinburgh</td>
                            <td>22</td>
                            <td>2022/03/29</td>
                            <td>$433,060</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-5">
                <div class="dataTables_info" id="datatables-reponsive_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div>
            </div>
            <div class="col-sm-12 col-md-7">
                <div class="dataTables_paginate paging_simple_numbers" id="datatables-reponsive_paginate">
                    <ul class="pagination">
                        <li class="paginate_button page-item previous disabled" id="datatables-reponsive_previous"><a aria-controls="datatables-reponsive" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="datatables-reponsive" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="1" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="2" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="3" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="4" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="5" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="datatables-reponsive_next"><a href="#" aria-controls="datatables-reponsive" aria-role="link" data-dt-idx="next" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
    <!-- <table id="tableComponent" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th v-for="field in props.fields" :key='field' @click="sortTable(field)" > 
                    {{ field }} <i class="bi bi-sort-alpha-down" aria-label='Sort Icon'></i>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key='item'>
                <td v-for="field in props.fields" :key='field'>{{ item[field] }}</td>
                <td class="table-action">
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                </td>
            </tr>
        </tbody>
    </table>  -->
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
</style>