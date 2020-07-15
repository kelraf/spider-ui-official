<template>
    <!-- page-wrapper Start-->
    <div class="page-wrapper">
        <div class="container-fluid p-0">
            <!-- login page start-->
            <div class="authentication-main">
                <div class="row">
                    <div class="col-md-12">
                        <div class="auth-innerright">
                            <div class="authentication-box">
                                <!-- <div class="text-center"><img alt="" src="../assets/images/endless-logo.png"></div> -->
                                <div class="card mt-4 to-shake">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <h4>LOGIN</h4>
                                            <h6>Enter your Phone Number and Password </h6>
                                        </div>
                                        <form class="theme-form">
                                            <div class="form-group">
                                                <label class="col-form-label pt-0">Phone Number</label>
                                                <input v-model="form.phone_number.value" :class="form.phone_number.error ? 'form-error' : ''" class="form-control" required="" type="text">
                                            </div>
                                            <div class="form-group">
                                                <label class="col-form-label">Password</label>
                                                <input v-model="form.password.value" autocomplete="" :class="form.password.error ? 'form-error' : ''" class="form-control" required="" type="password">
                                            </div>
                                            <div class="checkbox p-0">
                                                <input id="checkbox1" type="checkbox">
                                                <label for="checkbox1">Remember me</label>
                                            </div>
                                            <div class="form-group login-btn-cont form-row mt-3 mb-0">
                                                <span>
                                                    <button @click="login" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                                                        <span v-if="!loading">Login</span>
                                                        <img style="width: 20px; margin-left: 20px; margin-right: 20px;" v-if="loading" src="../assets/images/loader.gif" alt="">
                                                    </button>
                                                </span>
                                            </div>

                                            <div class="col-sm-8">
                                                <div class="text-left mt-2 m-l-5">Don't Have an Account ?  <router-link class="btn-link text-capitalize" to="/auth/register">Register</router-link ></div>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- login page end-->
        </div>
    </div>
    <!-- latest jquery-->
</template>

<script>
// import Userauth from '../auth/js/index'

import axios from "axios"
import { mapState } from "vuex";
import { ApiUrl } from "../api/apiurl"

import Auth from "../auth/js/spider_auth"

import $ from "jquery"

export default {
    name: 'login',
    data() {
        return {
            loading: false,
            form: {
                phone_number: {
                    error: false,
                    value: ''
                },
                password: {
                    error: false,
                    value: ''
                }

            }
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.userProfile.userProfile,
            businessData: state => state.businessData.businessData
        })
    },
    methods: {
        login: function () {
            if (this.form.phone_number.value == "" && this.form.password.value == '') {
                    
                    $(".to-shake").addClass("animated").addClass("shake");

                    this.form.password.error = true
                    this.form.phone_number.error = true

                    setTimeout(function() {
                        $(".to-shake").removeClass("animated").removeClass("shake");
                    }, 500)


            } else if(this.form.phone_number.value !== "" && this.form.password.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.password.error = true
                this.form.phone_number.error = false

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.phone_number.value == "" && this.form.password.value !== '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.password.error = false
                this.form.phone_number.error = true

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if( this.form.phone_number.value.length < 10 ) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.password.error = false
                this.form.phone_number.error = true

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if( this.form.password.value.length < 6 ) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.password.error = true
                this.form.phone_number.error = false

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.password.error = false
                this.form.phone_number.error = false

                let data = {
                    "user_credentials" : {
                        "phone_number" : this.form.phone_number.value,
                        "password" : this.form.password.value
                    }
                }

                this.loading = true
                let self = this

                axios.post(`${ApiUrl.url}auth/login`, data)

                .then((resp) => {

                    setTimeout(function() {

                        self.loading = false

                        if(resp.data.status == "auth_error") {

                        $(".to-shake").addClass("animated").addClass("shake");

                        self.form.password.error = true
                        self.form.phone_number.error = true

                        setTimeout(function() {
                            $(".to-shake").removeClass("animated").removeClass("shake");
                        }, 500)

                        self.$toasted.show(`${resp.data.message}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                    } else if(resp.data.status == "not_verified") {

                        self.$toasted.show(" Oops!! Your Account is not Verified Please Wait Redirecting ", {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 1600}) 
                        self.$router.replace("/auth/not-verified")

                    } else if(resp.data.status == "success") {

                        self.$toasted.show(" Login Success ", {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 2000})

                        let respo = Auth.localAuthLogin(resp.data.token)

                        if(respo) {

                            self.$store.dispatch('userProfile/updateUserProfile', resp.data.data)
                            
                            if(resp.data.data.business !== null) {

                                let business_data = resp.data.data.business

                                let user = resp.data.data

                                delete user.business

                                business_data = {
                                    ...business_data,
                                    user
                                }

                                self.$store.dispatch('businessData/updateBusinessData', business_data)

                            }

                            self.$router.replace("/dashboard")
                            
                        } else {
                            self.$toasted.show(" Oops!! Something Went Wrong. Please Try Again", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                        }

                    } else if(resp.data.status == "gen_token_error") {

                        self.$toasted.show(" Oops!! Something Went Wrong. Please Try Again", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                    }

                    }, 2000)
                })
                .catch(err => console.log(err))

            }
        }
    }
}
</script>

<style scoped>
    .login-btn-cont span {
        margin: auto;
    }

    .form-error {
        border: 1px solid red !important;
    }
</style>