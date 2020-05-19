<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add Product </h5>

                                    <div class="form-group">
                                        <label class="col-form-label">Produce Name</label>
                                        <input v-model="form.product_name.value" :class="form.product_name.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Product Name">
                                    </div>

                                    <div class="form-group mb-2">
                                        <div class="col-form-label"> Product Type </div>
                                        <input v-model="form.type.value" :class="form.type.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Product Type">
                                    </div>

                                    <div class="form-group mb-2">
                                        <div class="col-form-label"> Product Category </div>
                                        <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.category.error ? 'form-error' : ''" v-model="form.category.value" :options="form.category.options"></b-form-select>
                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6 mb-2">
                                            <div class="col-form-label"> Product Quantity </div>
                                            <input v-model="form.quantity.value" :class="form.quantity.error ? 'form-error' : ''" class="form-control" type="number" placeholder="Product Quantity">
                                        </div>

                                        <div class="col-md-6 mb-2">
                                            <div class="col-form-label"> Units </div>
                                            <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.units.error ? 'form-error' : ''" v-model="form.units.value" :options="form.units.options"></b-form-select>
                                        </div>

                                    </div>

                                    <div class="form-group mb-2">
                                        <div class="col-form-label"> Price Per Product </div>
                                        <b-input-group :prepend="businessProfile.currency" append=".00">
                                            <b-form-input v-model="form.price.value" :class="form.price.error ? 'form-error' : ''" type="number" placeholder="Price Per Product"></b-form-input>
                                        </b-input-group>
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
                product_name: {
                    error: '',
                    value: ''
                },
                type: {
                    error: '',
                    value: ''
                },
                category: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Product Category' },
                        { value: 'pasture-and-feeds', text:'pasture and feeds' },
                        { value: 'accesories-and-equipments', text:'accesories and equipments' },
                        { value: 'vetcare', text:'vetcare' },
                        { value: 'agrovet', text:'agrovet' },
                        { value: 'processed', text:'processed' }
                    ]
                },
                quantity: {
                    error: '',
                    value: ''
                },
                price: {
                    error: '',
                    value: ''
                },
                units: {
                    error: '',
                    value: '',
                    options : [
                        { value: '', text:'Select Units' },
                        { value: 'kgs', text:'kgs' },
                        { value: 'ltrs', text:'ltrs' },
                        { value: 'no-units', text:'No Units' }
                    ]
                },
                currency: "",
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
                this.form.currency = this.businessProfile.currency
            }
        }
    },
    methods: {
        close: function() {

            this.form.product_name.error = ''
            this.form.type.error = ''
            this.form.category.error = ''
            this.form.quantity.error = ''
            this.form.units.error = ''
            this.form.price.error = ''
            Custombox.modal.close()

        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function() {

            if(this.form.product_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = 'field can\'t be empty'
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Name : ${this.form.product_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            }  else if(this.form.product_name.value.length < 2) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = 'is too short'
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Name : ${this.form.product_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.type.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = 'can\'t be empty'
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Type : ${this.form.type.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.category.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = 'can\'t be empty'
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Category : ${this.form.category.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.quantity.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = 'can\'t be empty'
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Quantity : ${this.form.quantity.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.quantity.value <= 0) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = 'invalid quantity'
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(`Product Quantity : ${this.form.quantity.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.units.value <= 0) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = 'field can\'t be empty'
                this.form.price.error = ''

                this.$toasted.show(`Product Quantity : ${this.form.quantity.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.price.value == "") {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = 'field can\'t be empty'

                this.$toasted.show(`Product Price : ${this.form.price.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.user_id == null) {

                $(".to-shake").addClass("animated").addClass("shake");

                his.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.$toasted.show(` Oops!! An Error Occured. Please Try Again. : 001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.form.product_name.error = ''
                this.form.type.error = ''
                this.form.category.error = ''
                this.form.quantity.error = ''
                this.form.units.error = ''
                this.form.price.error = ''

                this.loading = true


                let data = {
                    product : {
                        name : this.form.product_name.value,
                        type : this.form.type.value,
                        category : this.form.category.value,
                        quantity: this.form.quantity.value,
                        units: this.form.units.value,
                        price: this.form.price.value,
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

                axios.post(`${ApiUrl.url}products`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("product-create-success", resp.data.data)
                        self.$toasted.show(`Product Created Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        Custombox.modal.close()

                    }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "name") {
                                        self.form.product_name.error = err.response.data.errors.name[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "type") {
                                        self.form.type.error = err.response.data.errors.type[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.type[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "category") {
                                        self.form.category.error = err.response.data.errors.category[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.category[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "units") {
                                        self.form.units.error = err.response.data.errors.units[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.units[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }  else if(key == "price") {
                                        self.form.price.error = err.response.data.errors.price[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.price[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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

                            } else if(err.response.status == 500) {

                                console.log("500 Error")

                            }

                        }, 2000)

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