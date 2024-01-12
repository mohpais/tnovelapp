<template>
    <div class="container-fluid p-0">
        <!-- <h1 class="h3 mb-3">User List</h1> -->
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header border-bottom d-flex justify-content-between">
                        <div class="title">
                            <h5 class="card-title">User List Table</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the Hidayah app.</h6>
                        </div>
                        <div class="action my-auto">
                            <button class="btn btn-sm btn-success">
                                <i class="bi bi-plus fz-16 fw-bold"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- <MyTable :fields="fields" :data="studentData"></MyTable> -->
                        <MyTable 
                            :headers="fields"
                            :items="studentData"
                            :filters="filters"
                            :search="true"
                            :actions="actions" />
                    </div>
                    <!-- <table class="table">
                        <thead>
                            <tr>
                                <th class="text-center" style="width:5%;">#</th>
                                <th style="width:35%;">Name</th>
                                <th style="width:25%">Phone Number</th>
                                <th class="d-none d-md-table-cell" style="width:25%">Date of Birth</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th class="text-center">1</th>
                                <td>Vanessa Tucker</td>
                                <td>864-348-0485</td>
                                <td class="d-none d-md-table-cell">June 21, 1961</td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-center">2</th>
                                <td>William Harris</td>
                                <td>914-939-2458</td>
                                <td class="d-none d-md-table-cell">May 15, 1948</td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-center">3</th>
                                <td>Sharon Lessman</td>
                                <td>704-993-5435</td>
                                <td class="d-none d-md-table-cell">September 14, 1965</td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-center">4</th>
                                <td>Christina Mason</td>
                                <td>765-382-8195</td>
                                <td class="d-none d-md-table-cell">April 2, 1971</td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-center">5</th>
                                <td>Robin Schneiders</td>
                                <td>202-672-1407</td>
                                <td class="d-none d-md-table-cell">October 12, 1966</td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { reactive, defineAsyncComponent, computed, watch } from "vue";

    /**  Define variables */
    const MyTable = defineAsyncComponent(() =>
        import("@/components/organisms/MyTable.vue")
    );

    const studentData = [
        { ID:"01", Name: "Abiola Esther", Description:"Computer Science", Date:"2023-12-22 14:57", Age:"17" },
        { ID:"02", Name: "Robert V. Kratz", Description:"Philosophy", Date:"2023-12-22 14:57", Age:'19' },
        { ID:"03", Name: "Kristen Anderson", Description:"Economics", Date:"2022-12-22 14:57", Age:'20' },
        { ID:"04", Name: "Adam Simon", Description:"Food science", Date:"2023-12-22 14:57", Age:'21' },
        { ID:"05", Name: "Daisy Katherine", Description:"Business studies", Date:"2023-12-22 14:57", Age:'22' },   
    ];

    const fields = [
        { key: 'ID', width: '7%', sortable: true },
        { key: 'Name', sortable: true },
        { key: 'Description', sortable: true, shorten: true, restrictToLen: 50 },
        {
          key: 'Date',
          sortable: true,
          defaultSortBy: true,
          defaultOrder: 'DESC'
        },
        { key: 'Age',  sortable: true, dataType: 'float' },
        // { type: 'actions', key: '',  width: '10%' }
    ];

    const filters = [
        {
          type: 'input-date',
          key: 'Date',
          min: '2017-05-04',
          max: '2019-10-28',
          label: 'Date'
        },
        {
          type: 'select-range',
          key: 'Age',
          defaultOption: '-- Select One --',
          options: [
            { label: '-1000 to -501', value: { min: -1000, max: -501 } },
            { label: '-500 to -1', value: { min: -500, max: -1 } },
            { label: '0 to 499', value: { min: 0, max: 499 } },
            { label: '500 to 1000', value: { min: 500, max: 1000 } }
          ],
          label: 'Age'
        }
    ];

    const updatePayment = () => {
        return 'payments/UPDATE_PAYMENT';
    }

    const actions = [
        {
            type: 'edit',
            key: ['Description'],
            func: updatePayment(),
            icon: 'edit',
            name: 'Edit'
        }
    ];
</script>