<template>
   <!-- page-wrapper Start-->
    <div class="page-wrapper">
        <div class="container-fluid">
            <!-- sign up page start-->
            <div class="authentication-main">
                <div class="row">
                    <div class="col-sm-12 p-0">
                        <div class="auth-innerright">
                            <div class="authentication-box">
                                <div class="text-center"><img src="../assets/images/endless-logo.png" alt=""></div>
                                <div class="card to-shake mt-4 p-4">
                                    <h4 class="text-center"> SIGNUP </h4>
                                    <h6 class="text-center"> Provide Your Details To Signup </h6>
                                    <form class="theme-form">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="col-form-label">First Name</label>
                                                    <input v-model="form.first_name.value" :class=" form.first_name.error !== ''  ? 'form-error' : '' " class="form-control" type="text" placeholder="First Name">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="col-form-label">Last Name</label>
                                                    <input v-model="form.last_name.value" :class=" form.last_name.error !== ''  ? 'form-error' : '' " class="form-control" type="text" placeholder="Last Name">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Phone Number</label>
                                            <input v-model="form.phone_number.value" :class=" form.phone_number.error !== ''  ? 'form-error' : '' " class="form-control" type="text" placeholder="Phone Number">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Password</label>
                                            <input v-model="form.password.value" :class=" form.password.error !== ''  ? 'form-error' : '' " class="form-control" type="password" placeholder="Your Password">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Confirm Password</label>
                                            <input v-model="form.confirm_password.value" autocomplete="" :class=" form.confirm_password.error !== ''  ? 'form-error' : '' " class="form-control" type="password" placeholder="Confirm Password">
                                        </div>
                                        <div class="form-row">
                                            <div class="col-sm-4">
                                                <button @click="signUp" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                                                    <span v-if="!loading">SignUp</span>

                                                    <img v-if="loading" style="width: 20px;" src="../assets/images/loader.gif" alt="">
                                                </button>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="text-left mt-2 m-l-20">Are you already a Member ?  <router-link class="btn-link text-capitalize" to="/auth/login">Login</router-link ></div>
                                            </div>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- sign up page ends-->
        </div>
    </div>
    <!-- page-wrapper Ends-->
</template>

<script>

import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../api/apiurl"
import { mapState } from "vuex"
import { mapMutations } from "vuex"
import spiderVerify from "../store/modules/spider_verify"

export default {
    name: 'signUp',
    data() {
        return {
            loading: false,
            form: {
                first_name: {
                    error: '',
                    value: ''
                },
                last_name: {
                    error: '',
                    value: ''
                },
                phone_number: {
                    error: '',
                    value: ''
                },
                password: {
                    error: '',
                    value: ''
                },
                confirm_password: {
                    error: '',
                    value: ''
                }
            }
        }
    },
    computed: {
        ...mapState({
            phone_number: state => state.spiderverify.phone_number
        })
    },
    methods: {
        
        signUp() {
            
            if(this.form.first_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = 'field can\'t be empty'
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`First Name : ${this.form.first_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.first_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = 'First Name Too Short'
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`First Name : ${this.form.first_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.last_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = 'field can\'t be empty'
                this.form.phone_number.error = ''
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`Last Name : ${this.form.last_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.last_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = 'Last Name is too short'
                this.form.phone_number.error = ''
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`Last Name : ${this.form.last_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.phone_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = 'field can\'t be empty'
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`Phone Number : ${this.form.phone_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.phone_number.value.length < 10) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = 'Invalid Phone Number'
                this.form.password.error = ''
                this.form.confirm_password.error = ''
                this.$toasted.show(`Phone Number : ${this.form.phone_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.password.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = 'field can\'t be empty'
                this.form.confirm_password.error = ''
                this.$toasted.show(`Password : ${this.form.password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.password.value.length < 6) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = 'Password should be atleast 6 characters'
                this.form.confirm_password.error = ''
                this.$toasted.show(`Password : ${this.form.password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.password.value !== this.form.confirm_password.value) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = 'Your Passwords must match'
                this.form.confirm_password.error = 'Your Passwords must match'
                this.$toasted.show(`Passwords : ${this.form.password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.phone_number.error = ''
                this.form.password.error = ''
                this.form.confirm_password.error = ''

                this.loading = true

                let data = {
                    user: {
                        first_name: this.form.first_name.value,
                        last_name: this.form.last_name.value,
                        phone_number: this.form.phone_number.value,
                        raw_password: this.form.password.value,
                        confirm_password: this.form.confirm_password.value,
                        role: "spider-010-norm"
                    }
                }

                let self = this

                axios.post(`${ApiUrl.url}users`, data)
                .then( (resp) => {

                    setTimeout(function() {

                        self.loading = false

                        if(resp.status == 201) {

                            spiderVerify.mutations.change(spiderVerify.state, self.form.phone_number.value)
                            self.$toasted.show("Registration Successfull", {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
                            self.$router.replace(`/auth/verify/${resp.data.data.id}`)

                        }

                    }, 2000)

                } )

                .catch( (err) => {
                    
                    setTimeout(function() {

                        self.loading = false

                        if(err.response) {

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "first_name") {
                                        self.form.first_name.error = err.response.data.errors.first_name[0]
                                        self.$toasted.show(`${key.split("_").join(" ")} : ${err.response.data.errors.first_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "last_name") {
                                        self.form.last_name.error = err.response.data.errors.last_name[0]
                                        self.$toasted.show(`${key.split("_").join(" ")} : ${err.response.data.errors.last_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "phone_number") {
                                        self.form.phone_number.error = err.response.data.errors.phone_number[0]
                                        self.$toasted.show(`${key.split("_").join(" ")} : ${err.response.data.errors.phone_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "raw_password") {
                                        self.form.password.error = err.response.data.errors.raw_password[0]
                                        self.$toasted.show(`${key.split("_").join(" ")} : ${err.response.data.errors.raw_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "confirm_password") {
                                        self.form.confirm_password.error = err.response.data.errors.confirm_password[0]
                                        self.$toasted.show(`${key.split("_").join(" ")} : ${err.response.data.errors.confirm_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "role") {
                                        self.form.role.error = err.response.data.errors.role[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.role[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else {
                                        console.log("Oops!! Error Occured")
                                    }
                                }

                            } else if(err.response.status == 302) {

                                spiderVerify.mutations.change(spiderVerify.state, self.form.phone_number.value)
                                self.$toasted.show(`${err.response.data.message}`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
                                self.$router.replace(`/auth/verify/${err.response.data.data.id}`)

                            }

                        }

                    }, 2000)

                } )

            } 
        }
    }
}
</script>

<style scoped>
    .form-error {
        border: 1px solid red !important;
    }
</style>
