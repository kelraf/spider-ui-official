<template>
  
    <div class="follow">

        <div class="row">
            <div class="col-md-6 text-md-right border-right">

                 <!-- <div class="col-6 offset-3 pb-3">
                    <button @click="openAddActivityModal" id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block">
                        Add Activity
                    </button>
                </div> -->

                <LivestockOrderProcessingStageTabs
                    :stage="stage"
                    @current-processing-stage="currentProcessingStage_"
                />

                <LivestockOrderProcessingStages
                    @current-order="currentOrder"
                    @switch-it="switchIt"
                    @current-value-addition-order="currentValueAdditionOrder"
                    :currentProcessingStage="current_processing_stage_"
                    @livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess"
                    @processing-stage-created-successfully="processingStageCreatedSuccessfully"
                />
            
                <!-- <Activities 
                    v-on:current-processing-stage="currentProcessingStage" 
                    :livestockOrderProcessingStages="livestock_order_processing_stages"
                    :openMakeSlaughterOrderModalFromSlaughterView="open_make_slaughter_order_modal_from_slaughter_view" 
                /> -->

            </div>
            <div class="col-md-6 text-md-left">
            
                <SlaughterOrderView 
                    v-on:open-make-slaughter-order-modal="openMakeSlaughterOrderModalFromSlaughterView" 
                    v-on:open-edit-modal="openEditModal" 
                    class="animated fadeIn" 
                    :currentOrder="current_order"
                    v-if="switch_it == 'slaughter'" 
                />

                <ValueAdditionOrderView 
                    :currentValueAdditionOrder="current_value_addition"
                    class="animated fadeIn" 
                    v-if="switch_it == 'value_addition'" 
                />

                <!-- <ValueAdditionOrderView 
                    :currentProcessingStageData="current_processing_stage_data" 
                    class="animated fadeIn" 
                    v-if="switch_it == 'branding_and_packaging'" 
                /> -->

                <div v-if="Object.keys(current_order).length <= 0" class="row pt-5">
                    <div class="col-md-6 text-center offset-md-3 mt-5 pt-5">
                        <h2> Please Select a Stage To View Details </h2>
                    </div>
                </div>

            </div>
        </div>

        <!-- <div v-if="livestock_order_processing_stages.length <= 0" class="row pb-5 pt-5">
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
        </div> -->

        <!-- <AddActivity 
            v-on:livestock-order-processing-stage-add-success="livestockOrderProcessingStageAddSuccess" 
            :livestockOrderStageData="stage" 
            style="display: none;" 
            id="open-add-activity" 
        /> -->

        <LivestockOrderSlaughterOrderEdit 
            v-on:livestock-order-slaughter-order-updated-success="livestockOderSlaughterOrderUpdatedSuccess" 
            :currentOrder="current_order"
            id="open-edit-modal" 
            style="display: none;"
        />

    </div>

</template>

<script>

import { ApiUrl } from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

// import Activities from "./activities/activities"
// import AddActivity from "./activities/add_activity"
import SlaughterOrderView from "./livestock_order_processing_stages/slaughter/view"
import ValueAdditionOrderView from "./livestock_order_processing_stages/value_addition/view"
import LivestockOrderSlaughterOrderEdit from "./livestock_order_processing_stages/slaughter/edit"
import LivestockOrderProcessingStageTabs from "./livestock_order_processing_stages_tabs"
import LivestockOrderProcessingStages from "./livestock_order_processing_stages/livestock_order_processing_stages"

export default {
    data() {
        return {
            stage: {},
            open_make_slaughter_order_modal_from_slaughter_view: false,
            livestock_order_processing_stages: [],
            current_processing_stage_data: {},
            position: 0,
            current_processing_stage_: {},
            current_order: {},
            switch_it: null,
            current_value_addition: {}
        }
    },
    components: {
        Activities,
        AddActivity,
        SlaughterOrderView,
        ValueAdditionOrderView,
        LivestockOrderSlaughterOrderEdit,
        LivestockOrderProcessingStageTabs,
        LivestockOrderProcessingStages
    },
    mounted() {

        this.loadData()

    },
    methods: {
        loadData() {

            axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })
            .then( (resp) => {

                this.stage = resp.data.data
                this.livestock_order_processing_stages = this.stage.livestock_order_processing_stages
                        
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
        switchIt(val) {
            this.switch_it = val
        },
        currentProcessingStage_(data) {
            // console.log("current processing stage", data)
            this.current_processing_stage_ = data
        },
        currentOrder(data) {
            this.current_order = data
        },
        currentValueAdditionOrder(data) {
            this.current_value_addition = data
        },
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
       livestockOderSlaughterOrderUpdatedSuccess(data) {

            let slaughter_stage_index = this.stage.livestock_order_processing_stages.findIndex(stage => stage.stage_name == "slaughter")

            if(slaughter_stage_index >= 0) {

                let order_index = this.stage.livestock_order_processing_stages[slaughter_stage_index].livestock_order_slaughter_orders.findIndex( order => order.id = data.id )
                
                if(order_index >= 0) {

                    this.stage.livestock_order_processing_stages[slaughter_stage_index].livestock_order_slaughter_orders[order_index] = data

                    this.current_order.description = data.description
                    this.current_order.dates = data.dates

                } else console.log("Oops!! Something Went Wrong.")

            } else console.log("Oops!! Something Went Wrong.")

       },
       currentProcessingStage(data) {

            this.current_processing_stage_data = data

       },
       openMakeSlaughterOrderModalFromSlaughterView() {
           this.open_make_slaughter_order_modal_from_slaughter_view = true
       },
       openEditModal() {

           let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#open-edit-modal'
                }
            })

            modal.open()

       },
       livestockOrderSlaughterOrderCreatedSuccess(data) {

            let slaughter_stage_index = this.stage.livestock_order_processing_stages.findIndex(stage => stage.stage_name == "slaughter")

            if(slaughter_stage_index >= 0) this.stage.livestock_order_processing_stages[slaughter_stage_index].livestock_order_slaughter_orders.push(data)
            else console.log("Oops!! Something Went Wrong.")

        },
        processingStageCreatedSuccessfully(data) {

            this.stage.livestock_order_processing_stages.push(data)
            
            console.log("Data", data)

        }
    }
}
</script>

<style>

</style>