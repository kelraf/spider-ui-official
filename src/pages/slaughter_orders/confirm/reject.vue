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
                                <b class="font-danger"> Are You Sure To Reject ?</b>
                            </h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 offset-md-2 mt-5">
                            <b-button-group style="width: 100%;" class="btn-group-pill">
                                <b-button @click="close" variant="outline-primary">No</b-button>
                                <b-button :class=" loading ? 'loading' : '' " @click="go" variant="outline-primary">
                                    <span v-if="!loading">Yes</span>

                                    <img style="width: 20px;" v-if="loading" src="../../../assets/images/loader.gif" alt="">
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
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"
import { mapState } from "vuex";

export default {
    data() {
        return {
            loading: false,
            action_data: {}
        }
    },
    components: {
        
    },
    computed: {
        
    },
    props: {
        actionData: Object
    },
    watch: {
        actionData: {
            immediate: true,
            handler() {
                if(this.actionData !== undefined && Object.keys(this.actionData).length > 0) {

                    this.action_data = this.actionData

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
                livestock_order_slaughter_order: {
                    status: 0,
                }
            }

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.put(`${ApiUrl.url}livestock-order-slaughter-orders/${this.action_data.id}`, data, headers) 
            .then( (resp) => {
                setTimeout(function() {

                    self.loading = false
                    self.$emit("livestock-order-slaughter-order-edit-success", resp.data.data)
                    self.$toasted.show(`Slaughter Order Rejected Successfully.`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})
                    Custombox.modal.close()

                }, 2000)
            } )

            .catch( (err) => {

                if(err.response) {

                    setTimeout(function() {

                        self.loading = false

                        if(err.response.status == 422) {

                            for (const key of Object.keys(err.response.data.errors)) {

                                if(key == "dates") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "status") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "slaughter_order_bundler_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "livestock_order_stage_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "livestock_order_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else {
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : Unknown`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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