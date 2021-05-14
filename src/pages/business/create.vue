<template>
  
    <div>
		<!-- <div class="page-wrapper"> -->
			<div class="container-fluid">
				<!-- Reset Password page start-->
				<div class="row">
                    <div class="col-md-12 p-0">
                        <div class="auth-innerright">
                            <div class="authentication-box">
                                <div class="card to-shake mt-4 p-4">
                                    <form class="theme-form">
                                        <h5 class="f-16 mb-3 f-w-600">CREATE YOUR BUSINESS</h5>
                                        <div class="form-group">
                                            <label class="col-form-label">Business Name</label>
                                            <input v-model="form.business_name.value" :class="form.business_name.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Business Name">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Registration Number</label>
                                            <input class="form-control" v-model="form.registration_number.value" :class="form.registration_number.error ? 'form-error' : ''" type="text" placeholder="Registration Number">
                                        </div>

                                        <div class="mb-2">
                                            <div class="col-form-label"> Business Type </div>
                                            <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.business_type.error ? 'form-error' : ''" v-model="form.business_type.value" :options="form.business_type.options"></b-form-select>
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
				<!-- Reset Password page end-->
			</div>
		<!-- </div> -->
	</div>

</template>

<script>

import $ from "jquery"
import Loader from "../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            form: {
                business_name: {
                    error: '',
                    value: ''
                },
                registration_number: {
                    error: '',
                    value: ''
                },
                business_type: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Business Type' },
                        { value: 'sole_proprietor', text:'Sole Proprietor' },
                        { value: 'co-oparative', text:'Co-oparative' },
                        { value: 'group_ranch', text:'Group Ranch' },
                        { value: 'association', text:'Association' }
                    ]
                },
                category: '',
                sub_category: '',
                user_id: parseInt(Auth.isAuthenticatedUser().sub)
            }
        }
    },
    components: {
        Loader
    },
    props: {
        data: Object
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                this.form.category = this.data.category,
                this.form.sub_category = this.data.sub_category
            }
        }
    },
    methods: {
        close: function() {
            this.$emit("close-modal")
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function() {

            if(this.form.business_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = 'field can\'t be empty'
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.$toasted.show(`Business Name : ${this.form.business_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isAlphanumeric(this.form.business_name.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = 'is invalid'
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.$toasted.show(`Business Name : ${this.form.business_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = 'is too short'
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.$toasted.show(`Business Name : ${this.form.business_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.registration_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.registration_number.error = 'can\'t be empty'
                this.form.business_type.error = ''

                this.$toasted.show(`Registration Number : ${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isNumeric(this.form.registration_number.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.registration_number.error = 'is invalid'
                this.form.business_type.error = ''

                this.$toasted.show(`Registration Number : ${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_type.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.registration_number.error = ''
                this.form.business_type.error = 'Not Selected'

                this.$toasted.show(` Business Type : ${this.form.business_type.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_type == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.$toasted.show(` Oops!! An Error Occured. Please Try Again. : 001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.user_id == null) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.$toasted.show(` Oops!! An Error Occured. Please Try Again. : 002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.business_name.error = ''
                this.form.registration_number.error = ''
                this.form.business_type.error = ''

                this.loading = true


                let data = {
                    business : {
                        business_name : this.form.business_name.value,
                        registration_number : this.form.registration_number.value,
                        business_type: this.form.business_type.value,
                        category: this.form.category,
                        sub_category: this.form.sub_category,
                        user_id: this.form.user_id
                    }
                }                

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}businesses`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("close-modal")
                        self.$toasted.show(`Business Created Successfully`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})

                        self.business = resp.data.data

						console.log("Created Business Data", self.business)

						self.$store.dispatch("menu/processMenuFor", self.business.sub_category)
                    	self.$store.dispatch('businessData/updateBusinessData', self.business) 

                        self.$router.replace({path: "/dashboard"})

                    }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "business_name") {
                                        self.form.business_name.error = err.response.data.errors.business_name[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.business_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "registration_number") {
                                        self.form.registration_number.error = err.response.data.errors.registration_number[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.registration_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "sub_category") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 003-003`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "business_type") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "category") {
                                        self.form.business_category.error = err.response.data.errors.category[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.category[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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