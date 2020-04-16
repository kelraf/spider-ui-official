<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add Vehicle </h5>

                                    <div class="form-group">
                                        <label class="col-form-label">Registration Number</label>
                                        <input v-model="form.registration_number.value" :class="form.registration_number.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Vehicle Registration Number">
                                    </div>

                                    <div class="mb-2">
                                        <div class="col-form-label"> Vehicle Type </div>
                                        <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.type.error ? 'form-error' : ''" v-model="form.type.value" :options="form.type.options"></b-form-select>
                                    </div>

                                    <div class="mb-2">
                                        <div class="col-form-label"> Vehicle Role </div>
                                        <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.status.error ? 'form-error' : ''" v-model="form.status.value" :options="form.status.options"></b-form-select>
                                    </div>

                                    <div class="form-group form-row mb-0">
                                        <div class="col-md-12 btn-c">
                                            <div class="btn-container">
                                                <b-button-group class="btn-group-pill">
                                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                    <b-button :class=" loading ? 'loading' : '' " @click="create" variant="outline-primary">
                                                        <span v-if="!loading">Create</span>

                                                        <Loader v-if="loading" />
                                                    </b-button>
                                                </b-button-group>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import $ from "jquery"
import Loader from "../../../../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            vehicle_data: {},
            form: {
                registration_number: {
                    error: '',
                    value: ''
                },
                type: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Vehicle Type' },
                        { value: 'truck', text:'Truck' },
                        { value: 'pick-up', text:'Pick Up' }
                    ]
                },
                status: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Vehicle Status' },
                        { value: 'available', text:'Available' },
                        { value: 'not-available', text:'Not Available' }
                    ]
                },
                business_id: null,
                user_id: null
            }
        }
    },
    components: {
        Loader
    },
    props: {
        vehicleData: Object
    },
    watch: {
        vehicleData: {
            immediate: true,
            handler() {

                this.vehicle_data = this.vehicleData

                this.form.registration_number.value = this.vehicle_data.registration_number
                this.form.type.value = this.vehicle_data.type
                this.form.status.value = this.vehicle_data.status
                this.form.user_id = this.vehicle_data.user_id
                this.form.business_id = this.vehicle_data.business_id
                
            }
        }
    },
    methods: {
        close: function() {
            Custombox.modal.close()
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function() {

            if(this.form.registration_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.registration_number.error = 'field can\'t be empty'
                this.form.type.error = ''
                this.form.status.error = ''

                this.$toasted.show(`Registration Number : ${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            }  else if(this.form.registration_number.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.registration_number.error = 'is too short'
                this.form.type.error = ''
                this.form.status.error = ''

                this.$toasted.show(`Registration Number : ${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.type.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.registration_number.error = ''
                this.form.type.error = 'can\'t be empty'
                this.form.status.error = ''

                this.$toasted.show(`Vehicle Type : ${this.form.type.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.status.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.registration_number.error = ''
                this.form.type.error = ''
                this.form.status.error = 'can\'t be empty'

                this.$toasted.show(`Vehicle Status : ${this.form.status.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.user_id == null) {

                $(".to-shake").addClass("animated").addClass("shake");

                his.form.registration_number.error = ''
                this.form.type.error = ''
                this.form.status.error = ''

                this.$toasted.show(` Oops!! An Error Occured. Please Try Again. : 001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.registration_number.error = ''
                this.form.type.error = ''
                this.form.status.error = ''

                this.loading = true


                let data = {
                    vehicle : {
                        registration_number : this.form.registration_number.value,
                        type : this.form.type.value,
                        status : this.form.status.value,
                        user_id: this.form.user_id,
                        business_id: this.form.business_id
                    }
                }                

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.put(`${ApiUrl.url}vehicles/${this.vehicle_data.id}`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("vehicle-updated-success", resp.data.data)
                        self.$toasted.show(`Vehicle Updated Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        Custombox.modal.close()

                    }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "registration_number") {
                                        self.form.registration_number.error = err.response.data.errors.registration_number[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.registration_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "type") {
                                        self.form.type.error = err.response.data.errors.type[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.type[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "status") {
                                        self.form.status.error = err.response.data.errors.status[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.status[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "business_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "user_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 002-002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }  else {
                                        console.log("Oops!! Error Occured")
                                    }
                                }

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else if(err.response.status == 404) {

                                Custombox.modal.close()
                                self.$toasted.show(`Oops!! An Error Occured Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                            } else if(err.response.status == 500) {

                                console.log("500 Error")

                            }

                        }, 3000)

                    }

                } )

            }

        }
    }

}
</script>

<style>

    .btn-container {
        margin: auto;
        width: 50%;
    }

    .form-error {
        border: 1px solid red !important;
    }

</style>