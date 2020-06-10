<template>
  
    <div v-if="Object.keys(c_c_p_l_order_data).length > 0" class="col-md-6">
        <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body text-left align-self-center">
                <h6> {{ c_c_p_l_order_data.purpose }} </h6>
            </div>
            </div>

            <div class="media feather-main">

                <div class="container-fluid mt-3">
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <b-button-group class="btn-group-pill">
                                <b-button variant="outline-secondary">View</b-button>
                                <b-button @click="delete_it" variant="outline-secondary">Delete</b-button>
                            </b-button-group>
                        </div>
                    </div>
                </div>
            
            </div>

        </div>

        </div>
    </div>

</template>

<script>

import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            c_c_p_l_order_data: {}
        }
    },
    props: {
        c_c_p_l_order: Object
    },
    watch: {
        c_c_p_l_order: {
            immediate: true,
            handler() {
                if(Object.keys(this.c_c_p_l_order).length > 0) this.c_c_p_l_order_data = this.c_c_p_l_order
            }
        }
    },
    methods: {
        delete_it: function() {

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
            
            axios.delete(`${ApiUrl.url}c-c-p-l-orders/${this.c_c_p_l_order_data.id}`, headers)
            .then( (resp) => {

                if(resp.status == 204) {
                    


                    this.$emit("file-delete-success", {id: this.c_c_p_l_order_data.id})

                } else {
                    this.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                }

            } )
            .catch( (err) => {

            if(err.response) {

                if (err.response.status == 401) {
                
                    this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                    this.$router.replace("/auth/login")

                } else if(err.response.status == 404) {
                    this.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                }

            }

            } )

        }
    }
}
</script>

<style>

</style>