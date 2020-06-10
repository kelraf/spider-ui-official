<template>
  
    <div class="container-fluid">
        <div class="row">
            <div class="col-6 offset-3">
                <button id="default-outline-success" @click="open_ccp_upload" type="button" class="btn btn-pill btn-outline-success btn-block">
                    ADD
                </button>
            </div>
        </div>

        <div v-if="c_c_p_l_orders.length > 0" class="row mt-5">

            <CCP v-on:file-delete-success="file_delete_success" v-for="(c_c_p_l_order, index) in c_c_p_l_orders" :key="index" :c_c_p_l_order="c_c_p_l_order" />

        </div>

        <div v-if="c_c_p_l_orders.length <= 0" class="row pt-5">
            <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> No Cirtification, Conforming or Permission Document Uploaded </h2>

                <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <!-- <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                Create
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <UploadCCP v-on:file-upload-success="file_upload_success" :stageData="stage" id="upload-ccp" style="display: none;" />

    </div>

</template>

<script>

import { ApiUrl } from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

import CCP from "./c_c_p"
import UploadCCP from "./upload_c_c_p"

export default {
    data() {
        return {
            stage: {},
            c_c_p_l_orders: []
        }
    },
    components: {
        CCP,
        UploadCCP
    },
    mounted() {

        axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.stage = resp.data.data
            
            if(this.stage.center_order !== null) this.center_order = this.stage.center_order

            if(this.stage.c_c_p_l_orders.length > 0) this.c_c_p_l_orders = this.stage.c_c_p_l_orders
                    
        } )

        .catch( (err) => {

            if(err.response) {

            if(err.response.status == 404) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

            } else if(err.response.status == 401) {

                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

            }

            }

        } )

    },
    methods: {
        file_upload_success: function(data) {
            this.c_c_p_l_orders.push(data)
        },
        open_ccp_upload() {
            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#upload-ccp'
                }
            })

            modal.open()
        },
        file_delete_success(data) {

            let new_items = []

            for (const c_c_p_l_order of this.c_c_p_l_orders) {
                
                if(c_c_p_l_order.id !== data.id) new_items.push(c_c_p_l_order)

            }

            this.c_c_p_l_orders = new_items

            // this.c_c_p_l_orders = this.c_c_p_l_orders.filter( (c_c_p_l_order) => { c_c_p_l_order.id !== data.id } )


        }
    }
}
</script>

<style>

</style>