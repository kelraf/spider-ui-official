<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form text-center">
                                    <h5 class="f-16 mb-3 f-w-600"> SEND REQUEST </h5>

                                    <div class="container-fluid">

                                        <div class="row pt-2">

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>Number To Sell</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ possible_sell.to_sell }} </b>
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>Price Per Animal</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ animal_to_sell.price }} </b>
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>Total Price</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ possible_sell.total_price }} </b>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div class="row">
                                            <div class="col-12">
                                                <p class="font-secondary">
                                                    <b>Edit Number To Sell Here</b>
                                                </p>
                                            </div>
                                        </div>

                                        <div class="row mb-3">
                                            <div class="col-md-6 offset-md-3">

                                                <b-input-group>

                                                    <b-input-group-prepend>
                                                        <b-button class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="decrease" variant="primary"><i class="fa fa-minus"></i></b-button>
                                                    </b-input-group-prepend>

                                                    <b-form-input class="touchspin" @keyup="checkUpdate" type="text" v-model="possible_sell.to_sell"></b-form-input>

                                                    <b-input-group-append>
                                                        <b-button class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="increase" variant="primary"><i class="fa fa-plus"></i></b-button>
                                                    </b-input-group-append>

                                                </b-input-group>

                                            </div>
                                        </div>


                                        <div class="row pt-2">

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>Stock Level</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ animal_to_sell.quantity }} </b>
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>Animals To Sell</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ possible_sell.to_sell }} </b>
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="row">
                                                    <p class="font-secondary">
                                                        <b>New Stock Level</b>
                                                    </p>
                                                </div>
                                                <div class="row">
                                                    <p class="font-success">
                                                        <b> {{ possible_sell.new_quantity }} </b>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>


                                    </div>

                                    <div class="form-group form-row mb-0">
                                        <div class="col-md-12 btn-c">
                                            <div class="btn-container">
                                                <b-button-group class="btn-group-pill">
                                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                    <b-button :class=" loading ? 'loading' : '' " @click="create" variant="outline-primary">
                                                        <span v-if="!loading">SendIt</span>

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
import Loader from "../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import { mapState } from "vuex";

export default {
    data() {
        return {
            loading: false,
            num: 23,
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
            },
            center_order: {},
            animal_to_sell: {},
            possible_sell: {
                to_sell: 0, 
                total_price: 0, 
                new_quantity: 0
            },
            new_quantity_set: false
        }
    },
    components: {
        Loader
    },
    computed: {
        ...mapState({
            businessData: state => state.businessData.businessData
        })
    },
    created() {
        if(Object.keys(this.businessData).length) this.business_id = this.businessData.id
    },
    props: {
        centerOrder: Object,
        animalToSell: Object
    },
    watch: {
        centerOrder: {
            immediate: true,
            handler() {
                if(Object.keys(this.centerOrder).length > 0) {
                    this.center_order = this.centerOrder
                    this.possibleSell()
                }
            },
            deep: true
        },
        animalToSell: {
            immediate: true,
            handler() {
                if(Object.keys(this.animalToSell).length > 0) {
                    this.animal_to_sell = this.animalToSell
                    this.possibleSell()
                }
            },
            deep: true
        },
        businessData: function() {
            if(Object.keys(this.businessData).length > 0) this.business_id = this.businessData.id
        }
    },
    methods: {
        possibleSell() {

            let capacity = this.center_order.required_animals - this.center_order.available_animals

            if(this.animal_to_sell.quantity >= capacity) {

                this.possible_sell = {
                    to_sell: capacity, 
                    total_price: capacity * this.animal_to_sell.price, 
                    new_quantity: this.animal_to_sell.quantity - capacity
                }

            } else if(this.animal_to_sell.quantity < capacity) {

                this.possible_sell = {
                    to_sell: this.animal_to_sell.quantity, 
                    total_price: this.animal_to_sell.quantity * this.animal_to_sell.price, 
                    new_quantity: 0
                }

            }

        },
        checkUpdate() { 

            this.new_quantity_set = true

            if(this.possible_sell.to_sell > this.animal_to_sell.quantity) {
                this.$toasted.show(`Your Stock Level Cannot be exceeded.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                return
            } else if(this.possible_sell.to_sell == 1) {
                this.possible_sell.total_price = this.possible_sell.to_sell * this.animal_to_sell.price
                this.possible_sell.new_quantity = this.animal_to_sell.quantity - this.possible_sell.to_sell
            } else if(this.possible_sell.to_sell < 1) {
                this.$toasted.show(`Oops!! Thats Too Low.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                return
            } else {

                this.possible_sell.total_price = this.possible_sell.to_sell * this.animal_to_sell.price
                this.possible_sell.new_quantity = this.animal_to_sell.quantity - this.possible_sell.to_sell

            }

        },
        increase() {

            this.new_quantity_set = true

            let current_value = this.possible_sell.to_sell

            let increased = current_value++

            if(increased > this.animal_to_sell.quantity) {
                this.$toasted.show(`Your Stock Level Cannot be exceeded.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                return
            }

            this.possible_sell.to_sell++
            
            this.possible_sell.total_price = this.possible_sell.to_sell * this.animal_to_sell.price
            this.possible_sell.new_quantity = this.animal_to_sell.quantity - this.possible_sell.to_sell

        },
        decrease() {

            this.new_quantity_set = true

            let current_value = this.possible_sell.to_sell
            
            let decreased = current_value--

            if(decreased <= 1) {
                this.$toasted.show(`Oops!! Thats Too Low.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                return
            }

            this.possible_sell.to_sell--
            
            this.possible_sell.total_price = this.possible_sell.to_sell * this.animal_to_sell.price
            this.possible_sell.new_quantity = this.animal_to_sell.quantity - this.possible_sell.to_sell

        },
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

            if(this.possible_sell.to_sell > this.animal_to_sell.quantity) {

                $(".to-shake").addClass("animated").addClass("shake");

                // this.form.unique_number.error = 'field can\'t be empty'
                // this.form.type.error = ''

                this.$toasted.show(`Your Stock Level Cannot be exceeded.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            }  else if(this.possible_sell.to_sell < 1) {

                $(".to-shake").addClass("animated").addClass("shake");

                // this.form.unique_number.error = 'is too short'
                // this.form.type.error = ''

                this.$toasted.show(`Oops!! Number Of Animals is Too Low.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.possible_sell.to_sell > this.center_order.required_animals) {

                $(".to-shake").addClass("animated").addClass("shake");

                // this.form.unique_number.error = 'is too short'
                // this.form.type.error = ''

                this.$toasted.show(`Oops!! You Exceeded The required Animals.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.business_id == null || Object.keys(this.center_order).length < 1) {

                $(".to-shake").addClass("animated").addClass("shake");

                // this.form.unique_number.error = ''
                // this.form.type.error = 'can\'t be empty'

                this.$toasted.show(`Oops!! Something Went Wrong. Please Refresh This Page.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.loading = true
                let self = this

                let data = function() {
                    if(self.new_quantity_set) {
                        return {
                            livestock_sale : {
                                business_id: self.business_id,
                                center_order_id: self.center_order.id,
                                quantity: self.possible_sell.to_sell
                            }
                        }
                    } else {
                        return {
                            livestock_sale : {
                                business_id: self.business_id,
                                center_order_id: self.center_order.id,
                            }
                        }
                    }
                }   
                
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}livestock-sales`, data(), headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("sale-made-success", resp.data.data)
                        self.$toasted.show(`Request Sent Successfully.`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})
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

                                    if(key == "livestock") {
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.livestock[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "livestock_order") {
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.livestock_order[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "completed") {
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.completed[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "quantity") {
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.quantity[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "price_per_animal") {
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.price_per_animal[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else {
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