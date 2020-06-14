<template>
  
    <div class="follow">
        <div v-if="livestock_order_processing_stages.length > 0" class="row">
            <div class="col-md-6 text-md-right border-right">

                 <div class="col-6 offset-3 pb-3">
                    <button @click="openAddActivityModal" id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block">
                        Add Activity
                    </button>
                </div>
            
                <Activities v-on:current-processing-stage="currentProcessingStage" :livestockOrderProcessingStages="livestock_order_processing_stages" />

            </div>
            <div class="col-md-6 text-md-left">
            
                <SlaughterOrderView class="animated bounceIn" v-if="Object.keys(current_processing_stage_data).length > 0 && current_processing_stage_data.stage_name == 'slaughter'" />

                <ValueAdditionOrderView class="animated bounceIn" v-if="Object.keys(current_processing_stage_data).length > 0 && current_processing_stage_data.stage_name == 'value_addition'" />

                <div v-if="Object.keys(current_processing_stage_data).length <= 0" class="row pt-5">
                    <div class="col-md-6 text-center offset-md-3 mt-5 pt-5">
                        <h2> Please Select a Stage To View Details </h2>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="livestock_order_processing_stages.length <= 0" class="row pb-5 pt-5">
            <div class="col-md-6 text-center offset-md-3 pb-5 pt-5">
                <h2> No Livestock Order Processing Stage Available </h2>

                <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <button @click="openAddActivityModal" id="default-outline-primary" type="button" class="btn btn-pill btn-sm btn-outline-primary btn-block">
                                ADD STAGE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AddActivity v-on:livestock-order-processing-stage-add-success="livestockOrderProcessingStageAddSuccess" :livestockOrderStageData="stage" style="display: none;" id="open-add-activity" />

    </div>

</template>

<script>

import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

import Activities from "./activities/activities"
import AddActivity from "./activities/add_activity"
import SlaughterOrderView from "./activities/activities_orders/view/slaughter/view"
import ValueAdditionOrderView from "./activities/activities_orders/view/value_addition/view"

export default {
    data() {
        return {
            stage: {},
            livestock_order_processing_stages: [],
            current_processing_stage_data: {}
        }
    },
    components: {
        Activities,
        AddActivity,
        SlaughterOrderView,
        ValueAdditionOrderView
    },
    mounted() {

        axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.stage = resp.data.data
            this.livestock_order_processing_stages = this.stage.livestock_order_processing_stages
            console.log("Stage Here", this.stage)
                    
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
        openAddActivityModal() {

           let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#open-add-activity'
                }
            })

            modal.open()

       },
       livestockOrderProcessingStageAddSuccess(data) {
           this.livestock_order_processing_stages.push(data)
       },
       currentProcessingStage(data) {

            this.current_processing_stage_data = data

       }
    }
}
</script>

<style>

</style>