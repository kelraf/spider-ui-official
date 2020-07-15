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
                        <label class="form-label">Business Name</label>
                        <input v-model="form.business_name.value" :class=" form.business_name.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Business Name">
                    </div>
                </div>

                <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                        <label class="form-label">Business Type</label>
                        <input disabled v-model="form.business_type.value" class="form-control" type="text" placeholder="Business Type">
                    </div>
                </div>
                <!-- Names End -->

                <!-- Contact Infor -->
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Business Category</label>
                        <input disabled v-model="form.business_category.value" class="form-control" type="text" placeholder="Business Category">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Registration Number</label>
                        <input v-model="form.registration_number.value" class="form-control" :class=" form.registration_number.error !== '' ? 'form-error' : '' " type="text" placeholder="Registration Number">
                    </div>
                </div>
                <!-- Contact Infor End -->

                <!-- Confidential Infor -->
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Business Email</label>
                        <input disabled v-model="form.business_email.value" class="form-control" type="text" placeholder="Business Email">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Business Phone Number</label>
                        <input disabled v-model="form.business_phone_number.value" class="form-control" type="text" placeholder="Business Phone Number">
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Pin</label>
                        <input v-model="form.business_pin_number.value" :class=" form.business_pin_number.error !== '' ? 'form-error' : '' " class="form-control" type="text" placeholder="Pin Number">
                    </div>
                </div>
                <!-- Confidential Infor End -->

                <div class="group-btn text-center">

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
                        <input class="form-control" type="text" placeholder="Country">
                    </div>
                </div>

                <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                        <label class="form-label">Currency name</label>
                        <input v-model="form.location.currency_name" class="form-control" type="text" placeholder="Currency Name">
                    </div>
                </div>

                <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                        <label class="form-label">Continent Code</label>
                        <input v-model="form.location.continent_code" class="form-control" type="number" placeholder="Continent Code">
                    </div>
                </div>
                </div>
            </div>

            <div class="card-footer text-right">
                
                <b-button-group class="btn-group-pill">
                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                    <b-button :class=" loading ? 'loading' : '' " @click="update" variant="outline-primary">
                        <span v-if="!loading">Update</span>
                        <img v-if="loading" class="loader" src="../../assets/images/loader.gif" alt="">
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
            form: {
                business_name: {
                    error: '',
                    value: ''
                },
                business_type: {
                    error: '',
                    value: ''
                },
                business_category: {
                    error: '',
                    value: ''
                },
                registration_number: {
                    error: '',
                    value: ''
                },
                business_email: {
                    error: '',
                    value: ''
                },
                business_phone_number: {
                    error: '',
                    value: ''
                },
                business_pin_number: {
                    error: '',
                    value: ''
                }, 
                location: {
                    latitude: '',
                    longitude: '',
                    country_calling_code: '',
                    country_name: '',
                    currency: '',
                    currency_name: '',
                    continent_code: ''
                }
            },
            loading: false
        }
    },
    components: {
        
    },
    props : {
        businessProfile: Object
    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {

                this.form.business_name.value = this.businessProfile.business_name == null ? '' : this.businessProfile.business_name
                this.form.business_type.value = this.businessProfile.business_type == null ? '' : this.businessProfile.business_type
                this.form.business_category.value = this.businessProfile.category == null ? '' : this.businessProfile.category
                this.form.registration_number.value = this.businessProfile.registration_number == null ? '' : this.businessProfile.registration_number
                this.form.business_pin_number.value = this.businessProfile.business_pin == null ? '' : this.businessProfile.business_pin
                this.form.location.latitude = this.businessProfile.latitude == null ? '' : this.businessProfile.latitude
                this.form.location.longitude = this.businessProfile.longitude == null ? '' : this.businessProfile.longitude
                this.form.location.country_calling_code = this.businessProfile.country_calling_code == null ? '' : this.businessProfile.country_calling_code
                this.form.location.country_name = this.businessProfile.country_name == null ? '' : this.businessProfile.country_name
                this.form.location.continent_code = this.businessProfile.continent_code == null ? '' : this.businessProfile.continent_code

            }
        }
    },
    methods: {
        close: function() {
            this.$emit('close-modal', {
                just_close: true
            })
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        update: function() {

            if(this.form.business_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = 'Business Name : Can\'t be blank'
                this.form.business_type.error = ''
                this.form.business_category.error = ''
                this.form.registration_number.error = ''
                this.form.business_pin_number.error = ''

                this.$toasted.show(`${this.form.business_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isAlphanumeric(this.form.business_name.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = 'Business Name : is invalid'
                this.form.business_type.error = ''
                this.form.business_category.error = ''
                this.form.registration_number.error = ''
                this.form.business_pin_number.error = ''

                this.$toasted.show(`${this.form.business_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.registration_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.business_type.error = ''
                this.form.business_category.error = ''
                this.form.registration_number.error = 'Registration Number : Can\'t be blank'
                this.form.business_pin_number.error = ''

                this.$toasted.show(`${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(!this.isNumeric(this.form.registration_number.value)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.business_type.error = ''
                this.form.business_category.error = ''
                this.form.registration_number.error = 'Registration Number : is invalid'
                this.form.business_pin_number.error = ''

                this.$toasted.show(`${this.form.registration_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_pin_number.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.business_name.error = ''
                this.form.business_type.error = ''
                this.form.business_category.error = ''
                this.form.registration_number.error = ''
                this.form.business_pin_number.error = ' Business Pin : Can\'t be blank '

                this.$toasted.show(`${this.form.business_pin_number.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                let data = {
                    business: {
                        user_id: this.businessProfile.user_id,
                        registration_number: this.form.registration_number.value,
                        business_name: this.form.business_name.value,
                        category:  this.form.business_category.value,
                        business_pin: this.form.business_pin_number.value,
                        business_type: this.form.business_type.value,
                        country_calling_code: this.form.location.country_calling_code,
                        country_name: this.form.location.country_name,
                        currency_name: this.form.location.currency_name,
                        currency: this.form.location.currency,
                        continent_code: this.form.location.continent_code,
                        latitude: this.form.location.latitude,
                        longitude: this.form.location.longitude
                    }
                }

                this.loading = true
                let self = this

                axios.put(`${ApiUrl.url}businesses/${this.businessProfile.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                })
                .then( (resp) => {

                    setTimeout(function() {

                        self.loading = false
                        self.$toasted.show(`Business Successfully Updated`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})

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

                                    if(key == "business_name") {
                                        self.form.business_name.error = err.response.data.errors.business_name[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.business_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "registration_number") {
                                        self.form.registration_number.error = err.response.data.errors.registration_number[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.registration_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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
    
    .loading {
        padding-left: 40px !important;
        padding-right: 40px !important;
    }

    .loader {
        height: 20px !important;
    }

</style>