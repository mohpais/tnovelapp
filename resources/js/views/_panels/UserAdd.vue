<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header border-bottom d-flex">
                        <div class="action my-auto me-2">
                            <router-link class="btn btn-sm btn-success" :to="{ name: 'UserList'}"><i class="bi bi-arrow-left fz-16 fw-bold"></i></router-link>
                        </div>
                        <div class="title">
                            <h5 class="card-title">Add User</h5>
                            <h6 class="card-subtitle text-muted fz-13">The following is a list of users in the Hidayah app.</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <!-- <form autocomplete="off" @submit="onSubmit" novalidate>
                            <MyInput
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                v-model="formData.username"
                                :required="true"
                                labelName="Username"
                            />
                            <button type="submit">Submit</button>

                        </form> -->
                        <MyFormProvider :id="formId" :formData="formData" @submit="onSubmit" ref="formProvider">
                            <MyInput
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                v-model="formData.username"
                                :required="true"
                                labelName="Username"
                            />

                            <MyInput
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                v-model="formData.password"
                                :required="true"
                                labelName="Password"
                            />

                            <MyInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                v-model="formData.email"
                                :required="true"
                                labelName="Email"
                            />
                            <button type="submit">Submit</button>
                        </MyFormProvider>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue';

    import MyInput from '@/components/atoms/MyInput.vue';
    import MyFormProvider from '@/components/organisms/MyFormProvider.vue';
    import useFormValidation from "@/global/useFormValidation";
    const { errors } = useFormValidation();

    const formId = 'yourForm';
    const formProvider = ref(null)
    const formData = reactive({
        username: '',
        password: '',
        email: '',
        // Add other form fields as needed
    });
    const onSubmit = () => {
        console.log(formProvider.value);
        // Trigger validation
        // const isValid = formProvider.value.validateForm();

        // if (isValid) {
        //     // Proceed with form submission logic
        //     console.log('Form submitted:', formData.value);
        // } else {
        //     console.log('Form validation failed. Please check errors.');
        // }
    };
</script>