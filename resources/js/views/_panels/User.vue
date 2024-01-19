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
                            <!-- <button class="btn btn-sm btn-success" @click="openModal()">
                                <i class="bi bi-plus fz-16 fw-bold"></i>
                            </button> -->
                            <router-link class="btn btn-sm btn-success" :to="{ name: 'UserAdd'}"><i class="bi bi-plus fz-16 fw-bold"></i></router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-table :options="state.dataTable">
                             <!-- Custom actions for each row -->
                            <template #actions="{ item }">
                                <button class="btn btn-sm btn-info me-1" @click.prevent="openModal(item)"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteUser(item)"><i class="bi bi-trash"></i></button>
                                <!-- Add more custom actions as needed -->
                            </template>
                        </data-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal add -->
    <Modal id="modal-add" title="Add User" ref="modalAdd">
        <template #body>This should be in the body</template>
        <template #footer>
            <button class="btn btn-primary">Save</button>
        </template>
    </Modal>
    <!-- Modal edit -->
    <Modal id="modal-edit" title="Edit User" ref="modalEdit">
        <template #body>This should be in the body</template>
        <template #footer>
            <button class="btn btn-warning">Save</button>
        </template>
    </Modal>
</template>

<script setup>
    /** Import package */
    import { ref, reactive, defineAsyncComponent } from "vue";
    /** Import global */
    import helpers from '@/global/helpers';
    /** Import Component */
    const DataTable = defineAsyncComponent(() =>
        import("@/components/organisms/DataTable.vue")
    );
    const Modal = defineAsyncComponent(() =>
        import("@/components/organisms/Modal.vue")
    );

    /**  Define variables */
    let modalAdd = ref(null);
    let modalEdit = ref(null);
    let state = reactive({
        dataTable: {
            api: 'user/list-datatables',
            columns: [
                { data: 'id', width: '5%' },
                { text: 'Full Name', data: 'fullname', searchable: true },
                { data: 'email', searchable: true, orderable: false },
                { data: 'birthday', orderable: false },
                { 
                    data: 'gender', 
                    orderable: false, 
                    render:  function ( data, type, row, meta ) {
                        console.log(data, type, row, meta);
                        return `<span class="badge bg-success p-1">${data}</span>`;
                    },
                    // render: function ( data, type, row, meta ) {
                    //     return type === 'display' && data.length > 40 ?
                    //         '<span title="'+data+'">'+data.substr( 0, 38 )+'...</span>' :
                    //         data;
                    // }
                },
                // Add more column definitions as needed
            ],
            orders: [
                {
                    column: 0,
                    dir: "asc"
                },
                // {
                //     column: 1,
                //     dir: "asc"
                // }
            ],
            searchable: true
        }
    });

    /** Define method */
    const openModal = (item) => {
        // Default action logic
        if (item) {
            return modalEdit.value.show();
        }

        return modalAdd.value.show();
    }

    const deleteUser = async (item) => {
        // console.log('Default action for item:', item);
        let msg = `Are you sure you want to delete this user? (${item.fullname})`;
        const isConfirmed = await helpers.confirmDeleteAction(msg);
        if (isConfirmed) {
            console.log('Delete action for item:', item);
        }
    }
</script>