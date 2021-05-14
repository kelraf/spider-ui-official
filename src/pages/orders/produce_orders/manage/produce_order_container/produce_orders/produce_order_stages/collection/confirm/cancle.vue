<template>
  
    <div @click.self="close" class="container-fluid">

        <div @click.self="close" class="row p-3 pt-5">
            <div style="height: 50vh;" class="col-md-4 col-xl-4 bg-white offset-md-4 offset-xl-4 pt-5 modal-col">

                <div class="container">

                    <div class="row">
                        <div class="col-12 font-danger text-center pt-3">
                            <i class="fa fa-question-circle fa-4x"></i>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 text-center font-warning pt-4">
                            <h5>
                                <b class="font-danger"> Are You Sure To Cancle ?</b>
                            </h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 offset-md-2 mt-5">
                            <b-button-group style="width: 100%;" class="btn-group-pill">
                                <b-button @click="close" variant="outline-primary">No</b-button>
                                <b-button :class=" loading ? 'loading' : '' " @click="go" variant="outline-primary">
                                    <span v-if="!loading">Yes</span>

                                    <img style="width: 20px;" v-if="loading" src="../../../../../../../../../assets/images/loader.gif" alt="">
                                </b-button>
                            </b-button-group>
                        </div>
                    </div>
                      
                </div>

            </div>
        </div>

    </div>

</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../../auth/js/spider_auth"
import { mapState } from "vuex";

export default {
    data() {
        return {
            loading: false,
            livestock_sale: {}
        }
    },
    components: {
        
    },
    computed: {
        
    },
    props: {
        livestockSale: Object
    },
    watch: {
        livestockSale: {
            immediate: true,
            handler() {
                if(this.livestockSale !== undefined && Object.keys(this.livestockSale).length > 0) {

                    this.livestock_sale = this.livestockSale

                }

            },
            deep: true
        }
    },
    methods: {
        close() {

            Custombox.modal.close()

        },
        go() {

            let self = this
            this.loading = true

            let data = {
                livestock_sale: {
                    business_id: self.livestock_sale.business_id,
                    center_order_id: self.livestock_sale.center_order_id,
                    quantity: 0,
                    status: 0,
                    accept_cancle: true
                }
            }

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.put(`${ApiUrl.url}livestock-sales/${this.livestock_sale.id}`, data, headers) 
            .then( (resp) => {
                setTimeout(function() {

                    self.loading = false
                    self.$emit("sale-edit-success", resp.data.data)
                    self.$toasted.show(`Sale Request Cancled Successfully.`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})
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

                    }, 2000)

                }

            } )

        }
    }
}
</script>

<style>

    .modal-col {
        border-radius: 10px;
    }

</style>