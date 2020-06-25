<template>
  
    <div class="follow">
        <div v-if="export_zone_livestock_orders.length > 0" class="row">
            <div class="col-md-6 text-md-right border-right">

                <ExportZoneDataReview 
                    v-on:open-edit-event="open_request" 
                    :exportZoneLivestockOrders="export_zone_livestock_orders" 
                />

            </div>
            <div class="col-md-6 text-md-left">

                <div class="row pt-5">
                    <div class="col-md-6 text-center offset-md-3">
                        <h2> No Activities Yet </h2>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="export_zone_livestock_orders.length == 0" class="row pt-5">
            <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> No Export zone Livestock Order Available </h2>

                <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <button 
                                @click="open_request" 
                                id="default-outline-primary" 
                                type="button" 
                                class="btn btn-pill btn-outline-primary btn-block"
                            >
                                Make
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Request 
            v-on:export-zone-request-updated-success="exportZoneRequestCreatedSuccess" 
            v-on:export-zone-request-created-success="exportZoneRequestCreatedSuccess" 
            :stageData="stage" 
            :exportZones="export_zones" 
            id="request" 
            style="display: none;" 
        />

    </div>

</template>

<script>

import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

import CenterOrder from "../../center_order"
import ExportZoneDataReview from "./export_zone_data_review"
import Request from "./request"

export default {
    data() {
        return {
            stage: {},
            export_zone_livestock_orders: [],
            export_zones: []
        }
    },
    components: {
        CenterOrder,
        ExportZoneDataReview,
        Request
    },
    mounted() {

        axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })

        .then( (resp) => {

            this.stage = resp.data.data            
            if(this.stage.export_zone_livestock_order !== null) {
                this.export_zone_livestock_orders = this.stage.export_zone_livestock_orders
            }
                    
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
        open_request: function() {

            axios.get(`${ApiUrl.url}export-zone-bundlers`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                this.export_zones = resp.data.data

                if(this.stage !== undefined && this.stage.export_zone_livestock_order !== null) {


                    this.export_zones = this.export_zones.map((export_zone) => { 

                        if(export_zone.id == this.stage.export_zone_livestock_order.export_zone_bundler.id) {
                            export_zone.selected = true
                            return export_zone
                        } else {
                            export_zone.selected = false
                            return export_zone
                        } 

                    })

                } else {

                    this.export_zones = this.export_zones.map((export_zone) => { 

                        export_zone.selected = false
                        return export_zone
                        
                    })    

                }

                let modal = new Custombox.modal({
                    content: {
                        effect: 'slip',
                        target: '#request'
                    }
                })

                modal.open()
                        
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
        exportZoneRequestCreatedSuccess(data) {
            this.export_zone_livestock_order = data
            this.stage.export_zone_livestock_order = data
        }
    }
}
</script>

<style>

</style>