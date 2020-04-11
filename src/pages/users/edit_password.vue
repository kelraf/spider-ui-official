<template>
  
    <div>
		<!-- <div class="page-wrapper"> -->
			<div class="container-fluid">
				<!-- Reset Password page start-->
				<div class="row">
                    <div class="col-md-12 p-0">
                        <div class="auth-innerright">
                            <div class="authentication-box">
                                <div class="card mt-4 p-4 to-shake">
                                    <form class="theme-form">
                                        <h5 class="f-16 mb-3 f-w-600">UPDATE YOUR PASSWORD</h5>
                                        <div class="form-group">
                                            <label class="col-form-label">Currency Password</label>
                                            <input v-model="form.current_password.value" :class=" form.current_password.error !== ''  ? 'form-error' : '' " class="form-control" type="password" placeholder="*****">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">New Password</label>
                                            <input v-model="form.new_password.value" :class=" form.new_password.error !== ''  ? 'form-error' : '' " class="form-control" type="password" placeholder="*****">
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Retype Password</label>
                                            <input v-model="form.confirm_password.value" :class=" form.confirm_password.error !== ''  ? 'form-error' : '' " class="form-control" type="password" placeholder="*****">
                                        </div>
                                        <div class="form-group form-row mb-0">
                                            <div class="col-md-12 btn-c">
                                                <div class="btn-container">
                                                    <b-button-group class="btn-group-pill">
                                                        <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                        <b-button :class=" loading ? 'loading' : 'not-loading'" @click="update" variant="outline-primary">
                                                            <span v-if="!loading">Update</span>
                                                            <Loader v-if="loading" class="mini-loader" />
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
import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Loader from "../../components/loader"
import Auth from "../../auth/js/spider_auth"

export default {

    data() {
        return {
            form: {
                current_password: {
                    error: '',
                    value: ''
                },
                new_password: {
                    error: '',
                    value: ''
                },
                confirm_password: {
                    error: '',
                    value: ''
                },
                current_password_hash: '',
                first_name: '',
                last_name: '',
                phone_number: '',
                role: ''
            },
            loading: false
        }
    },
    components: {
        Loader
    },
    props: {
        userProfile: Object
    },
    watch: {
        userProfile: {
            immediate: true,
            handler() {

                this.form.current_password_hash = this.userProfile.password_hash
                this.form.first_name = this.userProfile.first_name
                this.form.last_name = this.userProfile.last_name
                this.form.phone_number = this.userProfile.phone_number
                this.form.role = this.userProfile.role

            }
        }
    },
    methods: {
        close: function() {
            this.$emit("close-modal", {
                just_close: true
            })
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        update: function() {

            if(this.form.current_password.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.current_password.error = 'Current Password : Can\'t be empty'
                this.form.new_password.error = ''
                this.form.confirm_password.error = ''

                this.$toasted.show(`${this.form.current_password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.new_password.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.current_password.error = ''
                this.form.new_password.error = 'New Password : Can\'t be empty'
                this.form.confirm_password.error = ''

                this.$toasted.show(`${this.form.new_password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.new_password.value.length < 6) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.current_password.error = ''
                this.form.new_password.error = 'New Password : Should be atleast be 6 characters'
                this.form.confirm_password.error = ''

                this.$toasted.show(`${this.form.new_password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isAlphanumeric(this.form.new_password.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.current_password.error = ''
                this.form.new_password.error = 'New Password : Contains Invalid characters'
                this.form.confirm_password.error = ''

                this.$toasted.show(`${this.form.new_password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.new_password.value !== this.form.confirm_password.value) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.current_password.error = ''
                this.form.new_password.error = 'Passwords : Should Match'
                this.form.confirm_password.error = 'Passwords : Should Match'

                this.$toasted.show(`${this.form.new_password.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.current_password.error = ''
                this.form.new_password.error = ''
                this.form.confirm_password.error = ''

                this.loading = true

                let data = {
                    user: {
                        raw_password: this.form.new_password.value,
                        confirm_password: this.form.confirm_password.value,
                        current_password: this.form.current_password.value,
                        current_password_hash: this.form.current_password_hash,
                        first_name: this.form.first_name,
                        last_name: this.form.last_name,
                        phone_number: this.form.phone_number,
                        role: this.form.role
                    }
                }

                let self = this

                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.put(`${ApiUrl.url}users/${this.userProfile.id}`, data, headers)
                .then( (resp) => {

                    self.form.current_password_hash = resp.data.data.password_hash

                    setTimeout(function() {

                        self.$toasted.show("Password Update Success", {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        self.loading = false
                        self.close()

                    }, 3000)

                } )
                .catch( (err) => {

                    setTimeout(function() {

                        if(err.response) {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    var state = 0

                                    if(key == "first_name" || key == "last_name" || key == "phone_number" && state == 0) {
                                        state = 1
                                        self.$toasted.show("Oops!! Something Went Wrong", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "raw_password") {
                                        self.form.password.error = err.response.data.errors.raw_password[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.raw_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "confirm_password") {
                                        self.form.confirm_password.error = err.response.data.errors.confirm_password[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.confirm_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "role") {
                                        self.form.role.error = err.response.data.errors.role[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.role[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "current_password") {
                                        self.form.current_password.error = err.response.data.errors.current_password[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.current_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else {
                                        console.log("Oops!! Error Occured : 001")
                                    }

                                }

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            }

                        }

                    }, 3000)

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

    .mini-loader {
        width: 20px;
    }

    .loading {
        padding-left: 40px !important;
        padding-right: 40px !important;
    }

</style>