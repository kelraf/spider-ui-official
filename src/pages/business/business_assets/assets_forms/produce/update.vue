<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Edit Produce </h5>

                                    <div class="form-group">
                                        <label class="col-form-label">Quantity</label>
                                        <input v-model="form.quantity.value" :class="form.quantity.error ? 'form-error' : ''" class="form-control" type="number" placeholder="Produce Quantity">
                                    </div>
                                    
                                    <div class="form-group form-row mb-0">
                                        <div class="col-md-12 btn-c">
                                            <div class="btn-container">
                                                <b-button-group class="btn-group-pill">
                                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                    <b-button :class=" loading ? 'loading' : '' " @click="create" variant="outline-primary">
                                                        <span v-if="!loading">Update</span>

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

import Multiselect from 'vue-multiselect'

export default {
    data() {
        return {
            loading: false,
            form: {
                quantity: {
                    error: '',
                    value: ''
                },
                dproduce_id: null,
                business_id: null,
                user_id: null
            }
        }
    },
    components: {
        Loader,
        Multiselect
    },
    props: {
        produceData: Object
    },
    mounted() {

    },
    watch: {
        produceData: {
            immediate: true,
            handler() {

                this.form.business_id = this.produceData.business_id
                this.form.user_id = this.produceData.user_id
                this.form.quantity.value = this.produceData.quantity
                this.form.dproduce_id = this.produceData.dproduce_id,
                this.form.id = this.produceData.id

            }
        }
    },
    methods: {
        getImgUrl(path) {
            return require("../../../../../assets/images/" + path);
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

            if(this.form.dproduce_id == null) {

                this.$toasted.show(`Oops!! An Error Occured. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

            }  else if(this.form.quantity.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");
                
                this.form.quantity.error = 'field can\'t be empty'

                this.$toasted.show(`Quantity : ${this.form.quantity.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_id == null) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

            } else {

                    this.form.quantity.error = ''
    
                    this.loading = true
    
                    let data = {
                        produce : {
                            dproduce_id : this.form.dproduce_id,
                            quantity : this.form.quantity.value,
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
    
                    axios.put(`${ApiUrl.url}produces/${this.form.id}`, data, headers) 
                    .then( (resp) => {
                        setTimeout(function() {
    
                            self.loading = false
                            self.$emit("action-success", resp.data.data)
                            self.$toasted.show(`Live Created Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                            Custombox.modal.close()
    
                        }, 2000)
                    } )
    
                    .catch( (err) => {

                        this.form.quantity.error = ''
    
                        if(err.response) {
    
                            setTimeout(function() {
    
                                self.loading = false
    
                                if(err.response.status == 422) {
    
                                    for (const key of Object.keys(err.response.data.errors)) {
    
                                        if(key == "quantity") {
                                            self.form.quantity.error = err.response.data.errors.quantity[0]
                                            self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.quantity[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                        } else if(key == "dproduce_id") {
                                            self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 003-003`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                        }  else if(key == "business_id") {
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

                                    this.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                                } else if(err.response.status == 400) {
    
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    Custombox.modal.close()
    
                                } else if(err.response.status == 500) {
    
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    Custombox.modal.close()
    
                                }
    
                            }, 3000)
    
                        }
    
                    } )                

            } 

        }
    }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

    .btn-container {
        margin: auto;
        width: 50%;
    }

    .form-error {
        border: 1px solid red !important;
    }

    .fields {
        display: flex !important;
        flex-direction: row !important;
    }

    .fields span {
        flex: 1 !important;
    }

</style>