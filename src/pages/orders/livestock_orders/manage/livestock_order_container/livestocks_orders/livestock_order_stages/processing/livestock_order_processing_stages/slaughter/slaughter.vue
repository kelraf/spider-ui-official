<template>
  
    <div>

        <div v-if="livestock_order_slaughter_orders.length" class="container-fluid text-left text-bold">

            <div class="row">
                <div class="col-12pt-3 pb-3 font-secondary">
                    <b>SLAUGHTER</b>
                </div>
            </div>

            <!-- Oparations Starts -->

            <div class="container-fluid">

                <div v-if="rejected_ && rejected.length > 1" class="row">
                    <div class="col-6 offset-3 pb-3 text-left">

                        <b-button-group style="width: 100%;" class="btn-group-pill">
                            <b-button style="font-size: 5px !important;" ref="back" @click="goBack" class="btn-xs pt-1 text-center" variant="outline-warning">
                                <feather type="arrow-left-circle"></feather>
                            </b-button>
                            <b-button style="font-size: 5px !important;" @click="goNext" ref="next" class="btn-xs pt-1 text-center" variant="outline-warning">
                                <feather type="arrow-right-circle"></feather>
                            </b-button>
                        </b-button-group>

                    </div>
                </div>

                <div v-if="rejected.length > 0 && others.length > 0" class="row">
                    <div class="col-12 pb-3 text-center">

                        <b-button-group class="btn-group-pill">
                            <b-button @click="showRejected" class="btn-sm" :variant="livestock_order_slaughter_order.status <= 0 ? 'danger' : 'outline-danger'">REJECTED</b-button>
                            <b-button @click="showOthers" class="btn-sm" :variant="livestock_order_slaughter_order.status > 0 ? 'warning' : 'outline-warning'">OTHERS</b-button>
                        </b-button-group>

                    </div>
                </div>

                <div v-if="rejected.length >= 1 && others.length <= 0" class="row">
                    <div class="col-8 offset-2 pt-3">
                        <button style="text-align: center;" id="default-outline-secondary" @click="makeOrder" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                            MAKE NEW ORDER
                        </button>
                    </div>
                </div>

            </div>

            <!-- Oparation Ends -->

            <div class="row">
                <div class="col-12 text-center pt-3 pb-3 font-secondary">
                    <h6>
                        <b>BUSINESS DETAILS</b>
                    </h6>
                </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">STATUS</div>
                <div class="col-6 font-secondary">
                    <b-badge style="color: white !important;" v-if="livestock_order_slaughter_order.status == 1" variant="info">PENDING</b-badge>
                    <b-badge style="color: white !important;" v-if="livestock_order_slaughter_order.status == 2" variant="warning">ACCEPTED</b-badge>
                    <b-badge style="color: white !important;" v-if="livestock_order_slaughter_order.status == 3" variant="success">IN PROGRESS</b-badge>
                    <b-badge style="color: white !important;" v-if="livestock_order_slaughter_order.status == 4" variant="success">COMPLETED</b-badge>
                    <b-badge style="color: white !important;" v-if="livestock_order_slaughter_order.status == 0" variant="danger">REJECTED</b-badge>
                </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Business Name</div>
                <div class="col-6 font-success"> {{ livestock_order_slaughter_order.business.business_name.toUpperCase() }} </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Sub Category</div>
                <div class="col-6 font-primary"> {{ livestock_order_slaughter_order.business.sub_category.split("-").join(" ").toUpperCase() }} </div>
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
                <div class="col-6 font-success"> {{ livestock_order_slaughter_order.business.user.phone_number }} </div>
            </div>

            <div class="row">
                <div class="col-6 text-muted">Email Address</div>
                <div class="col-6 font-primary">{{ livestock_order_slaughter_order.business.user | getMail }}</div>
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
            v-if="!current_processing_stage.exists || !livestock_order_slaughter_orders.length"
        >

            <NoOrder
                v-if="current_processing_stage.exists && !livestock_order_slaughter_orders.length" 
                :currentProcessingStage="current_processing_stage"
                @livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess"
                @make-order="makeOrder"
            />

        </processing-stage-get-started>

         <LivestockOrderSlaughterOrderCreate
            :livestockOrderProcessingStageData="current_processing_stage"
            @livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess"
            id="livestock-order-slaughter-order" 
            style="display: none;"
        />

    </div>

</template>

<script>

import ProcessingStageGetStarted from "../processing_stage_get_started/processing_stage_get_started"
import NoOrder from "../processing_stage_get_started/no_order"
import LivestockOrderSlaughterOrderCreate from "../slaughter/create"

export default {
    data() {
        return {
            current_processing_stage: {},
            livestock_order_slaughter_orders: [],
            livestock_order_slaughter_order: {},
            rejected: [],
            others: [],
            rejected_: false
        }
    },
    components: {
        "processing-stage-get-started": ProcessingStageGetStarted,
        NoOrder,
        LivestockOrderSlaughterOrderCreate
    },
    mounted() {
        
    },
    props: {
        currentProcessingStage: Object
    },
    watch: {
        currentProcessingStage: {
            immediate: true,
            handler() {

                if(this.currentProcessingStage !== undefined) this.current_processing_stage = this.currentProcessingStage
                if(this.currentProcessingStage !== undefined && "livestock_order_slaughter_orders" in this.currentProcessingStage && this.currentProcessingStage.livestock_order_slaughter_orders.length) this.livestock_order_slaughter_orders = this.currentProcessingStage.livestock_order_slaughter_orders
                this.livestockOrderProcessingStageHandler()

            },
            deep: true
        }
    },
    methods: {
        livestockOrderSlaughterOrderCreatedSuccess(data) {
            this.$emit("livestock-order-slaughter-order-created-success", data)
        },
        processingStageCreatedSuccessfully(data) {

            this.$emit("processing-stage-created-successfully", data)

        },
        livestockOrderProcessingStageHandler() {

            if(!this.livestock_order_slaughter_orders.length) {
                this.emitCurrentOrder()
            } else {

                this.others = this.livestock_order_slaughter_orders.filter((livestock_order_slaughter_order) => {

                    if(livestock_order_slaughter_order.status >= 1) return livestock_order_slaughter_order

                })

                this.rejected = this.livestock_order_slaughter_orders.filter((livestock_order_slaughter_order) => {

                    if(livestock_order_slaughter_order.status <= 0) return livestock_order_slaughter_order

                })

                if(this.rejected.length && !this.others.length) {

                    this.livestock_order_slaughter_order = this.rejected[0]

                    if(this.rejected.length > 1) this.rejected_ = true

                } else {

                    this.livestock_order_slaughter_order = this.others[0]

                }

                this.emitCurrentOrder()

            }

        },
        emitCurrentOrder() {

            if(Object.keys(this.livestock_order_slaughter_order).length) {

                this.$emit("current-order", {
                    order_exists: true,
                    ...this.livestock_order_slaughter_order,
                    processing_stage: this.current_processing_stage
                })

            } else {
                this.$emit("current-order", {
                    order_exists: false,
                    processing_stage: this.current_processing_stage
                })
            }
        },
        goBack() {

            let maxLength = this.rejected.length

            let currentOrderIndex = this.rejected.findIndex(rejected_$ => rejected_$.id == this.livestock_order_slaughter_order.id)

            let newIndex = currentOrderIndex - 1

            if(newIndex < 0) {
                return
            }

            this.livestock_order_slaughter_order = this.rejected[newIndex]

            this.emitCurrentOrder()

        },
        goNext() {

            let maxLength = this.rejected.length

            let currentOrderIndex = this.rejected.findIndex(rejected_$ => rejected_$.id == this.livestock_order_slaughter_order.id)

            let newIndex = currentOrderIndex + 1

            if(newIndex > (maxLength-=1)) return

            this.livestock_order_slaughter_order = this.rejected[newIndex]

            this.emitCurrentOrder()

        },
        showRejected() {

            this.rejected_ = true
            
            this.livestock_order_slaughter_order = this.rejected[0]
            this.emitCurrentOrder()

        },
        showOthers() {

            this.rejected_ = false
            
            this.livestock_order_slaughter_order = this.others[0]
            this.emitCurrentOrder()

        },
        makeOrder() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#livestock-order-slaughter-order'
                }
            })

            modal.open()
            
        }
    },
    filters: {
        getMail(user) {

            return user.email == null ? "No Email Available" : user.email

        }
    }
}
</script>

<style>
    
</style>