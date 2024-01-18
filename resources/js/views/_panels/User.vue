<template>
    <div class="container-fluid p-0">
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
                        <data-table
                            :options="state.dataTable"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    /** Import package */
    import { reactive, defineAsyncComponent } from "vue";
    /** Import Component */
    const DataTable = defineAsyncComponent(() =>
        import("@/components/organisms/DataTable.vue")
    );

    /**  Define variables */
    let state = reactive({
        dataTable: {
            api: 'user/list-datatables',
            columns: [
                { data: 'id', width: '5%' },
                { text: 'Full Name', data: 'fullname', searchable: true },
                { data: 'email', orderable: false },
                // Add more column definitions as needed
            ],
            orders: [
                {
                    column: 0,
                    dir: "asc"
                }
            ],
            searchable: true
        }
    });
</script>