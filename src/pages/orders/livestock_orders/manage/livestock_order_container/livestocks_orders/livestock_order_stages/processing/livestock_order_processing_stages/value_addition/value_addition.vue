<template>

    <div>
  
        <div v-if="livestock_order_value_addition_orders.length" class="container-fluid text-left">

            <div class="row">
                <div class="col-12pt-3 pb-3 font-secondary">
                    <b>VALUE ADDITION</b>
                </div>
            </div>

            <div class="row">
                <div class="col-12 text-center pt-3 pb-3 font-secondary">
                    <h6>
                        <b>BUSINESS DETAILS</b>
                    </h6>
                </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">STATUS</div>
                <div class="col-6 font-secondary">Status</div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Business Name</div>
                <div class="col-6 font-success">Business Name</div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Sub Category</div>
                <div class="col-6 font-primary">Sub Category</div>
            </div>

            <div class="row">
                <div class="col-12 text-center font-secondary pt-4 pb-4">
                    <h6>
                        <b>BUSINESS CONTACT DETAILS</b>
                    </h6>
                </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Phone Number</div>
                <div class="col-6 font-success">Phone Number</div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Email Address</div>
                <div class="col-6 font-primary">Email Address</div>
            </div>

            <div class="row">
                <div class="col-12 text-center font-secondary pt-4 pb-4">
                    <h6>
                        <b>BUSINESS LOCATION DETAILS</b>
                    </h6>
                </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Country</div>
                <div class="col-6 font-success">Country</div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">City</div>
                <div class="col-6 font-primary">City</div>
            </div>

            <div class="row">
                <div class="col-12 text-center pt-3 pb-3">
                    <button id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary text-center">
                        <b>VIEW LOCATION</b>
                    </button>
                </div>
            </div>

        </div>

        <processing-stage-get-started 
            :currentProcessingStage="currentProcessingStage"
            @processing-stage-created-successfully="processingStageCreatedSuccessfully"
            v-if="!current_processing_stage.exists || !livestock_order_value_addition_orders.length"
        >

            <NoOrder
                v-if="current_processing_stage.exists && !livestock_order_value_addition_orders.length" 
                :currentProcessingStage="current_processing_stage"
                @livestock-order-slaughter-order-created-success="livestockOrderValueAdditionOrderCreatedSuccess"
            />

        </processing-stage-get-started>

    </div>

</template>

<script>

import ProcessingStageGetStarted from "../processing_stage_get_started/processing_stage_get_started"
import NoOrder from "../processing_stage_get_started/no_order"

export default {
    data() {
        return {
            current_processing_stage: {},
            livestock_order_value_addition_orders: [],
            livestock_order_value_addition_order: {},
            rejected: [],
            others: [],
            rejected_: false
        }
    },
    components: {
        "processing-stage-get-started": ProcessingStageGetStarted,
        NoOrder
    },
    props: {
        currentProcessingStage: Object
    },
    watch: {
        currentProcessingStage: {
            immediate: true,
            handler() {

                if(this.currentProcessingStage !== undefined) this.current_processing_stage = this.currentProcessingStage
                if(this.currentProcessingStage !== undefined && "livestock_order_value_addition_orders" in this.currentProcessingStage && this.currentProcessingStage.livestock_order_value_addition_orders.length) this.livestock_order_value_addition_orders = this.currentProcessingStage.livestock_order_value_addition_orders
                this.livestockOrderProcessingStageHandler()

            },
            deep: true
        }
    },
    methods: {
        livestockOrderValueAdditionOrderCreatedSuccess() {

        },
        processingStageCreatedSuccessfully(data) {

            this.$emit("processing-stage-created-successfully", data)

        },
        livestockOrderProcessingStageHandler() {

            if(!this.livestock_order_value_addition_orders.length) {
                this.emitCurrentOrder()
            } else {

                this.others = this.livestock_order_value_addition_orders.filter((livestock_order_value_addition_order) => {

                    if(livestock_order_value_addition_order.status >= 1) return livestock_order_value_addition_order

                })

                this.rejected = this.livestock_order_value_addition_orders.filter((livestock_order_value_addition_order) => {

                    if(livestock_order_value_addition_order.status <= 0) return livestock_order_value_addition_order

                })

                if(this.rejected.length && !this.others.length) {

                    this.livestock_order_value_addition_order = this.rejected[0]

                    if(this.rejected.length > 1) this.rejected_ = true

                } else {

                    this.livestock_order_value_addition_order = this.others[0]

                }

                this.emitCurrentOrder()

            }

        },
        emitCurrentOrder() {

            if(Object.keys(this.livestock_order_value_addition_order).length) {

                this.$emit("current-value-addition-order", {
                    order_exists: true,
                    ...this.livestock_order_value_addition_order,
                    processing_stage: this.current_processing_stage
                })

            } else {
                this.$emit("current-value-addition-order", {
                    order_exists: false,
                    processing_stage: this.current_processing_stage
                })
            }
        }
    }
}
</script>

<style>
    
</style>