<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add Produce </h5>

                                    <multiselect 
                                        :class="!form.produce_value.error == '' ? 'form-error' : ''"
                                        v-model="form.produce_value.value" 
                                        placeholder="Select Produce To Add" 
                                        label="reference" 
                                        track-by="['reference', 'type', 'breed']" 
                                        :options="form.produce.options" 
                                        :option-height="104" 
                                        :show-labels="false"
                                        >
                                        
                                        <template slot="singleLabel" slot-scope="props">
                                            
                                            <img class="img-fluid img-50" :src="getImgUrl(props.option.img)" alt="#">
                                            
                                            <div class="option__desc">
                                                
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-4 text-center"> {{ props.option.reference }} </div>
                                                        <div v-if="props.option.type != null" class="col-4"> {{ props.option.type }} </div>
                                                        <div v-if="props.option.breed != null" class="col-4"> {{ props.option.breed }} </div>
                                                    </div>
                                                </div>

                                            </div>
                                            
                                        </template>

                                        <template slot="option" slot-scope="props">

                                            <img class="img-fluid img-50" :src="getImgUrl(props.option.img)" alt="#">
                                            
                                            <div class="option__desc">

                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <div class="col-4 text-center"> {{ props.option.reference }} </div>
                                                        <div v-if="props.option.type != null" class="col-4"> {{ props.option.type }} </div>
                                                        <div v-if="props.option.breed != null" class="col-4"> {{ props.option.breed }} </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </template>

                                    </multiselect>

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
                produce_value: {
                    error: '',
                    value: ''
                },
                produce: {
                    error: '',
                    options: []
                },
                business_id: null,
                user_id: parseInt(Auth.isAuthenticatedUser().sub)
            }
        }
    },
    components: {
        Loader,
        Multiselect
    },
    props: {
        businessProfile: Object
    },
    mounted() {

    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {
                this.form.business_id = this.businessProfile.id
                this.get_dproduces()
            }
        }
    },
    methods: {
        getImgUrl(path) {
            return require("../../../../../assets/images/" + path);
        },
        get_dproduces() {

            axios.get(`${ApiUrl.url}d-produces`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

                let data = []
                for (const item of resp.data.data) {
                    
                    item.img = "c1.jpg"
                    data.push(item)
                }

                this.form.produce.options = data;

			} )
			.catch( (err) => {

			if(err.response) {

				if(err.response.status == 401) {

				this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
				this.$router.replace("/auth/login")

				}

			}

			} )

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

            if(this.form.produce_value.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.produce_value.error = 'field can\'t be empty'
                this.form.quantity.error = ''

                this.$toasted.show(`Produce Reference : ${this.form.produce_value.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            }  else if(this.form.quantity.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.produce_value.error = ''
                this.form.quantity.error = 'field can\'t be empty'

                this.$toasted.show(`Quantity : ${this.form.quantity.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.business_id == null) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. ccccc`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

            } else if(Object.keys(this.form.produce_value.value).length > 0) {

                    this.form.produce_value.error = ''
                    this.form.quantity.error = ''
    
                    this.loading = true
    
                    let data = {
                        produce : {
                            dproduce_id : this.form.produce_value.value.id,
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
    
                    axios.post(`${ApiUrl.url}produces`, data, headers) 
                    .then( (resp) => {
                        setTimeout(function() {
    
                            self.loading = false
                            self.$emit("action-success", resp.data.data)
                            self.$toasted.show(`Live Created Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                            Custombox.modal.close()
    
                        }, 2000)
                    } )
    
                    .catch( (err) => {

                        this.form.produce_value.error = ''
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

            } else {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
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