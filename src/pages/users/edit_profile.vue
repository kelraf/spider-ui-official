<template>

    <form class="card to-shake">

        <div class="card-header">
            <h4 class="card-title mb-0">Edit Profile</h4>
            <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>
        </div>

        <div style="background: white;" class="card-body">
            <div class="row">

            <!-- Names -->
            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                    <label class="form-label">First Name</label>
                    <input v-model="form.first_name.value" :class=" form.first_name.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="First Name">
                </div>
            </div>

            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <input v-model="form.last_name.value" :class=" form.last_name.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Last Name">
                </div>
            </div>
            <!-- Names End -->

            <!-- Contact Infor -->
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input v-model="form.email.value" :class=" form.email.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Your Email">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input v-model="form.phone_number.value" :class=" form.phone_number.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Phone Number">
                </div>
            </div>
            <!-- Contact Infor End -->

            <!-- Confidential Infor -->
            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-label">Id Number</label>
                    <input v-model="form.id_number.value" :class=" form.id_number.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Your Id Number">
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label class="form-label">Pin</label>
                    <input v-model="form.pin.value" :class=" form.pin.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Pin Number">
                </div>
            </div>
            <!-- Confidential Infor End -->

            <div class="group-btn">

                <div class="location-title">
                <h5 class="text-center">My Location</h5>
                </div>

                <div class="col-xl-6 col-md-8 col-sm-12">
                <b-button-group class="btn-group-pill">
                    <b-button variant="outline-primary">View</b-button>
                    <b-button variant="primary">Load</b-button>
                    <b-button variant="outline-primary">Select</b-button>
                </b-button-group>
                </div>
            </div>

            <div class="col-sm-6 col-md-4">
                <div class="form-group">
                <label class="form-label">City</label>
                <input class="form-control" type="text" placeholder="City">
                </div>
            </div>
            <div class="col-sm-6 col-md-3">
                <div class="form-group">
                <label class="form-label">Postal Code</label>
                <input class="form-control" type="number" placeholder="ZIP Code">
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                <label class="form-label">Country</label>
                <select class="form-control btn-square">
                    <option value="0">--Select--</option>
                    <option value="1">Germany</option>
                    <option value="2">Canada</option>
                    <option value="3">Usa</option>
                    <option value="4">Aus</option>
                </select>
                </div>
            </div>

            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                <label class="form-label">Currency name</label>
                <input class="form-control" type="text" placeholder="Currency Name">
                </div>
            </div>

            <div class="col-sm-6 col-md-6">
                <div class="form-group">
                <label class="form-label">Continent Name</label>
                <input class="form-control" type="number" placeholder="Continent Name">
                </div>
            </div>
            </div>
        </div>

        <div class="card-footer text-right">
            
            <b-button-group class="btn-group-pill">
                <b-button @click="close" variant="outline-primary">Cancel</b-button>
                <b-button @click="update" variant="outline-primary">
                    <span v-if="!loading" >Update</span>

                    <img v-if="loading" style="width: 20px; margin-left: 10px; margin-right: 10px;" src="../../assets/images/loader.gif" alt="Loader">

                </b-button>
            </b-button-group>
                    
        </div>

    </form>

</template>

<script>

import $ from "jquery"

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default {
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
                email: {
                    error: '',
                    value: ''
                },
                phone_number: {
                    error: '',
                    value: ''
                },
                id_number: {
                    error: '',
                    value: ''
                },
                pin: {
                    error: '',
                    value: ''
                },
                role: '',
                status: '',
                location: {
                    latitude: '',
                    longitude: '',
                    country_calling_code: '',
                    country_name: '',
                    currency: '',
                    currency_name: '',
                    continent_code: ''
                }
            }
        }
    },
    props: {
        userProfile: Object
    },
    watch: {
        userProfile: {
            immediate: true,
            handler() {
                
                this.form.first_name.value = this.userProfile.first_name == null ? '' : this.userProfile.first_name
                this.form.last_name.value = this.userProfile.last_name == null ? '' : this.userProfile.last_name
                this.form.email.value = this.userProfile.email == null ? '' : this.userProfile.email
                this.form.phone_number.value = this.userProfile.phone_number == null ? '' : this.userProfile.phone_number
                this.form.id_number.value = this.userProfile.national_id_number == null ? '' : this.userProfile.national_id_number
                this.form.pin.value = this.userProfile.pin == null ? '' : this.userProfile.pin
                this.form.location.latitude = this.userProfile.latitude == null ? '' : this.userProfile.latitude
                this.form.location.longitude = this.userProfile.longitude == null ? '' : this.userProfile.longitude
                this.form.location.country_calling_code = this.userProfile.country_calling_code == null ? '' : this.userProfile.country_calling_code
                this.form.location.country_name = this.userProfile.country_name == null ? '' : this.userProfile.country_name
                this.form.location.currency = this.userProfile.currency == null ? '' : this.userProfile.currency
                this.form.location.currency_name = this.userProfile.currency_name == null ? '' : this.userProfile.currency_name
                this.form.location.continent_code = this.userProfile.continent_code == null ? '' : this.userProfile.continent_code
                this.form.status = this.userProfile.status == null ? '' : this.userProfile.status
                this.form.role = this.userProfile.role == null ? '' : this.userProfile.role

            }
        }
    },
    methods: {
        close: function() {
            this.$emit('close-modal', {
                just_close: true
            })
        },
        emailIsValid: function (email) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        },
        phoneIsValid: function (txtPhone) {

            var phoneno = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

            if ((txtPhone.match(phoneno))) {
                return true
            }
            else {
                return false
            }

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        update: function() {

            if(this.form.first_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = "First Name : Can't be empty"
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.first_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.first_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = "First Name : Is too short"
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.first_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.last_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ''
                this.form.last_name.error = 'Last Name : can\'t be empty'
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.last_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.last_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = 'Last Name : Is too short'
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.last_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.email.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = 'Email : Can\'t be empty'
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.email.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.emailIsValid(this.form.email.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = 'Email : Is Invalid'
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.email.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.phone_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = 'Phone Number : Can\'t be Empty'
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.phone_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.phoneIsValid(this.form.phone_number.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = 'Phone Number : Is Invalid'
                this.form.id_number.error = ''
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.phone_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.id_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = 'Id Number : Can\'t be Empty'
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.id_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isNumeric(this.form.id_number.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = 'Id Number : Is Invalid'
                this.form.pin.error = ''

                this.$toasted.show(`${this.form.id_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.pin.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = 'Pin Number : Can\'t be Empty'

                this.$toasted.show(`${this.form.pin.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isAlphanumeric(this.form.pin.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.first_name.error = ""
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = 'Pin Number : Is Invalid'

                this.$toasted.show(`${this.form.pin.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.loading = true
                
                this.form.first_name.error = ''
                this.form.last_name.error = ''
                this.form.email.error = ''
                this.form.phone_number.error = ''
                this.form.id_number.error = ''
                this.form.pin.error = ''

                let data = {
                    user : {
                        first_name : this.form.first_name.value,
                        last_name : this.form.last_name.value,
                        email : this.form.email.value,
                        phone_number : this.form.phone_number.value,
                        national_id_number : this.form.id_number.value,
                        pin : this.form.pin.value,
                        latitude : this.form.location.latitude,
                        longitude : this.form.location.longitude,
                        country_calling_code : this.form.location.country_calling_code,
                        country_name : this.form.location.country_name,
                        currency : this.form.location.currency,
                        currency_name : this.form.location.currency_name,
                        continent_code : this.form.location.continent_code,
                        status : this.form.status,
                        role : this.form.role
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

                    setTimeout(function() {

                        self.loading = false
                        self.$store.dispatch('userProfile/updateUserProfile', resp.data.data)

                        self.$toasted.show(`Profile Updated Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 4000})

                        self.$emit('close-modal', {
                            just_close: false,
                            data: resp.data.data
                        })

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
                                        self.$toasted.show(`${key} : ${err.response.data.errors.first_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "last_name") {
                                        self.form.last_name.error = err.response.data.errors.last_name[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.first_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "phone_number") {
                                        self.form.phone_number.error = err.response.data.errors.phone_number[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.phone_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "raw_password") {
                                        self.form.password.error = err.response.data.errors.raw_password[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.raw_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "confirm_password") {
                                        self.form.confirm_password.error = err.response.data.errors.confirm_password[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.confirm_password[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "role") {
                                        self.form.role.error = err.response.data.errors.role[0]
                                        self.$toasted.show(`${key} : ${err.response.data.errors.role[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else {
                                        console.log("Oops!! Error Occured : 001")
                                    }

                                }

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else {
                                console.log("Oops!! Error Occured : 002")
                            }

                        }

                    }, 2000)
                    
                } )

            }

        }
    }
}
</script>

<style>

    .form-error {
        border: 1px solid red !important;
    }

</style>