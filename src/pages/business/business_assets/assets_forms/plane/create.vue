<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add Flight </h5>

                                    <div class="form-group">
                                        <label class="col-form-label">Unique Number</label>
                                        <input v-model="form.unique_number.value" :class="form.unique_number.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Flight Unique Number">
                                    </div>

                                    <div class="mb-2">
                                        <div class="col-form-label"> Flight Type </div>
                                        <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.type.error ? 'form-error' : ''" v-model="form.type.value" :options="form.type.options"></b-form-select>
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
            form: {
                unique_number: {
                    error: '',
                    value: ''
                },
                type: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Flight Type' },
                        { value: 'plane', text:'Plane' },
                        { value: 'helicopter', text:'Helicopter' }
                    ]
                },
                business_id: null,
                user_id: parseInt(Auth.isAuthenticatedUser().sub)
            }
        }
    },
    components: {
        Loader
    },
    props: {
        businessProfile: Object
    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {
                this.business_id = this.businessProfile.id
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

            if(this.form.unique_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.unique_number.error = 'field can\'t be empty'
                this.form.type.error = ''

                this.$toasted.show(`Unique Number : ${this.form.unique_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            }  else if(this.form.unique_number.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.unique_number.error = 'is too short'
                this.form.type.error = ''

                this.$toasted.show(`Unique Number : ${this.form.unique_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.type.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.unique_number.error = ''
                this.form.type.error = 'can\'t be empty'

                this.$toasted.show(`Flight Type : ${this.form.type.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.user_id == null) {

                $(".to-shake").addClass("animated").addClass("shake");

                his.form.unique_number.error = ''
                this.form.type.error = ''

                this.$toasted.show(` Oops!! An Error Occured. Please Try Again. : 001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.unique_number.error = ''
                this.form.type.error = ''

                this.loading = true


                let data = {
                    flight : {
                        unique_number : this.form.unique_number.value,
                        type : this.form.type.value,
                        user_id: this.form.user_id,
                        business_id: this.business_id
                    }
                }                

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}flights`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("plane-create-success", resp.data.data)
                        self.$toasted.show(`Flight Created Successfully`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        Custombox.modal.close()

                    }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                // console.log(err.response)

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "unique_number") {
                                        self.form.unique_number.error = err.response.data.errors.unique_number[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.unique_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "type") {
                                        self.form.type.error = err.response.data.errors.type[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.type[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "business_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "user_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 002-002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }  else {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : Unknown Key`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }
                                }

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login: 401`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else if(err.response.status == 400) {

                                Custombox.modal.close()
                                self.$toasted.show(`Oops!! Something Went Wrong. Please Try Again : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                                
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