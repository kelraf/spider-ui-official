<template>
  
    <b-card no-body class="mb-1">
        <b-card-header header-tag="div" class="bg-secondary">
        <h5 class="mb-0">
            <b-button v-b-toggle="'primary_' + int_id" variant="secondary" > {{ livestock_order_processing_stage_data.stage_name.toUpperCase().split("_").join(" ") }} </b-button>
        </h5>
        </b-card-header>
        <b-collapse v-on:show="emitCurrentProcessingStage" :id="generated_id" visible accordion="my-accordion-secondary" role="tabpanel">
        <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">

                <div v-if="Object.keys(livestock_order_processing_stage_data).length > 0 && Object.keys(general).length > 0" class="media-accordion">

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>BUSINESS DETAILS</b> </h6>
                            </div>
                        </div>
                    </div>

                    <div class="media text-left">

                        <div>
                            <p>STATUS</p>
                            <p>Business Name</p>
                            <p>Sub Category</p>
                        </div>
                        <div class="media-body text-right">
                            <p> {{ general.status | displayStatus }} </p>
                            <p> {{ general.business.business_name.toUpperCase() }} </p>
                            <p> {{ general.business.sub_category.split("-").join(" ").toUpperCase() }} </p>
                        </div>
                    </div>

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>BUSINESS CONTACT DETAILS</b> </h6>
                            </div>
                        </div>
                    </div>

                    <div class="media text-left">
                        <div>
                            <!-- <h6>BTC/GBP</h6> -->
                            <p>Phone Number</p>
                            <p>Email Address</p>
                        </div>
                        <div class="media-body text-right">
                            <!-- <p>1459.9</p> -->
                            <p class="font-primary"> {{ general.business.user.phone_number }} </p>
                            <p class="font-secondary"> {{ general.business.user | getMail }} </p>
                        </div>
                    </div>

                    <div class="container-fluid">
                        <div class="row">
                            
                            <div class="col-6 offset-3 pb-3">
                                <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                    View Location
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

                <div v-if="Object.keys(general).length <= 0" class="row">
                    <div class="col-md-8 text-center offset-md-2 pt-4">
                        <h3 class="font-warning"> No Order Available </h3>

                        <div class="container">
                            <div class="row">
                                <div class="col-8 offset-2 pt-3">
                                    <button style="text-align: center;" id="default-outline-secondary" @click="openMakeOrder" type="button" class="btn btn-pill btn-outline-secondary btn-block">
                                        MAKE ORDER
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </b-card-body>
        </b-collapse>

        <LivestockOrderSlaughterOrder 
            :livestockOrderProcessingStageData="livestock_order_processing_stage_data"
            v-on:livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess" 
            id="livestock-order-slaughter-order" 
            style="display: none;" 
        />

    </b-card>

</template>

<script>

import LivestockOrderSlaughterOrder from "../activities/activities_orders/create/slaughter_order/create"

export default {
    data() {
        return {
            generated_id: "",
            int_id: 0,
            order_available: false,
            livestock_order_processing_stage_data: {},
            general: {}
        }
    },
    components: {
        LivestockOrderSlaughterOrder
    },
    created() {
        this.int_id = this.$attrs.index
        this.generated_id = `primary_${this.$attrs.index}`
    },
    computed() {
        // this.generated_id = `primary_${this.$attrs.index}`
    },
    props: {
        livestockOrderProcessingStage: Object,
        openMakeSlaughterOrderModalFromSlaughterView: Boolean
    },
    watch: {
        openMakeSlaughterOrderModalFromSlaughterView: {
            immediate: true,
            handler() {
                if(this.openMakeSlaughterOrderModalFromSlaughterView) this.openMakeOrder()
            }
        },
        livestockOrderProcessingStage: {
            immediate: true,
            handler() {

                this.livestockOrderProcessingStageHandler()

            }
        }
    },
    methods: {
        livestockOrderProcessingStageHandler() {

            this.livestock_order_processing_stage_data = this.livestockOrderProcessingStage

            if(this.livestock_order_processing_stage_data.livestock_order_slaughter_order == null) return false

            let {stage_name, livestock_order_stage_id, livestock_order_id, id} = this.livestock_order_processing_stage_data
            let data = {stage_name, livestock_order_stage_id, livestock_order_id, id}

            if(stage_name == "slaughter") {
                this.general = {
                    ...data, 
                    ...{
                        business: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business == null ? {} : this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business,
                        status: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.status
                    }
                }
            } else if(stage_name == "value_addition") {
                this.general = {
                    // ...data, 
                    // ...{
                    //     business: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business == null ? {} : this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business,
                    //     status: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.status
                    // }
                }
            } else if(stage_name == "branding_and_packaging") {
                this.general = {
                    // ...data, 
                    // ...{
                    //     business: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business == null ? {} : this.livestock_order_processing_stage_data.livestock_order_slaughter_order.business,
                    //     status: this.livestock_order_processing_stage_data.livestock_order_slaughter_order.status
                    // }
                }
            }

        },
        openMakeOrder() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#livestock-order-slaughter-order'
                }
            })

            modal.open()

        },
        emitCurrentProcessingStage() {
            this.$emit("current-processing-stage", this.livestock_order_processing_stage_data)
        },
        livestockOrderSlaughterOrderCreatedSuccess(data) {

            this.livestockOrderProcessingStage.livestock_order_slaughter_order = data
            this.livestockOrderProcessingStageHandler()
            this.emitCurrentProcessingStage()

        }
    },
    filters: {
        getMail(user) {

            return user.email == null ? "No Email Available" : user.email

        },
        displayStatus(statusValue) {

            if(statusValue == 1) return "PENDING"
            if(statusValue == 2) return "ACCEPTED"
            if(statusValue == 3) return "PROCESSING"
            if(statusValue == 4) return "COMPLETED"
            else return 0

        }
    }
}
</script>

<style>

</style>