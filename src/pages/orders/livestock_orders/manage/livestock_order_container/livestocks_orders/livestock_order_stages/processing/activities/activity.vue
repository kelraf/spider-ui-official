<template>
  
    <b-card no-body class="mb-1">
        <b-card-header header-tag="div" class="bg-secondary">
        <h5 class="mb-0">
            <b-button v-b-toggle="'primary_' + int_id" variant="secondary" > {{ livestock_order_processing_stage_data_.stage_name.toUpperCase().split("_").join(" ") }} </b-button>
        </h5>
        </b-card-header>
        <b-collapse v-on:show="emitCurrentProcessingStage" :id="generated_id" visible accordion="my-accordion-secondary" role="tabpanel">
        <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">

                <div v-if="Object.keys(livestock_order_processing_stage_data_).length > 0 && Object.keys(general).length > 0" class="media-accordion">

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>BUSINESS DETAILS</b> </h6>
                            </div>
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
                                    <b-button @click="showRejected" class="btn-sm" :variant="general.status <= 0 ? 'danger' : 'outline-danger'">REJECTED</b-button>
                                    <b-button @click="showOthers" class="btn-sm" :variant="general.status > 0 ? 'warning' : 'outline-warning'">OTHERS</b-button>
                                </b-button-group>

                            </div>
                        </div>

                        <div v-if="rejected.length >= 1 && others.length <= 0" class="row">
                            <div class="col-8 offset-2 pt-3">
                                <button style="text-align: center;" id="default-outline-secondary" @click="openMakeOrder" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                                    MAKE NEW ORDER
                                </button>
                            </div>
                        </div>

                    </div>

                    <!-- Oparation Ends -->

                    <div class="media text-left">

                        <div>
                            <p>STATUS</p>
                            <p>Business Name</p>
                            <p>Sub Category</p>
                        </div>
                        <div class="media-body text-right">
                            <p> 
                                <b-badge style="color: white !important;" v-if="general.status == 1" variant="info">PENDING</b-badge>
                                <b-badge style="color: white !important;" v-if="general.status == 2" variant="warning">ACCEPTED</b-badge>
                                <b-badge style="color: white !important;" v-if="general.status == 3" variant="success">IN PROGRESS</b-badge>
                                <b-badge style="color: white !important;" v-if="general.status == 4" variant="success">COMPLETED</b-badge>
                                <b-badge style="color: white !important;" v-if="general.status == 0" variant="danger">REJECTED</b-badge>
                            </p>
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
            livestock_order_processing_stage_data_: {},
            general: {},
            accepted: [],
            rejected: [],
            rejected_: false
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

            this.livestock_order_processing_stage_data_ = this.livestockOrderProcessingStage

            if(this.livestock_order_processing_stage_data_.livestock_order_slaughter_orders.length <= 0) return false

            let {stage_name, livestock_order_stage_id, livestock_order_id, id} = this.livestock_order_processing_stage_data_
            this.imploded = {stage_name, livestock_order_stage_id, livestock_order_id, id}

            let interSection = {}

            if(stage_name == "slaughter") {

                let livestock_order_slaughter_orders = this.livestock_order_processing_stage_data_.livestock_order_slaughter_orders

                if(livestock_order_slaughter_orders.length <= 0) return

                this.others = livestock_order_slaughter_orders.filter((livestock_order_slaughter_order) => {

                    if(livestock_order_slaughter_order.status >= 1) return livestock_order_slaughter_order

                })

                this.rejected = livestock_order_slaughter_orders.filter((livestock_order_slaughter_order) => {

                    if(livestock_order_slaughter_order.status <= 0) return livestock_order_slaughter_order

                })

                if(this.rejected.length > 0 && this.others <= 0) {

                    interSection.business = this.rejected[0].business
                    interSection.status = this.rejected[0].status
                    this.livestock_order_processing_stage_data = {
                        ...this.imploded,
                        livestock_order_slaughter_order: this.rejected[0]
                    }

                    if(this.rejected.length > 1) this.rejected_ = true

                } else {

                    interSection.business = this.others[0].business
                    interSection.status = this.others[0].status
                    this.livestock_order_processing_stage_data = {
                        ...this.imploded,
                        livestock_order_slaughter_order: this.others[0]
                    }

                }

                
                this.general = { 
                    ...this.imploded, 
                    ...interSection
                }

                console.log("Rejected", this.rejected)

            } else if(stage_name == "value_addition") {
                this.general = {
                    // ...this.imploded, 
                    // ...{
                    //     business: this.livestock_order_processing_stage_data_.livestock_order_slaughter_orders.business == null ? {} : this.livestock_order_processing_stage_data_.livestock_order_slaughter_order.business,
                    //     status: this.livestock_order_processing_stage_data_.livestock_order_slaughter_orders.status
                    // }
                }
            } else if(stage_name == "branding_and_packaging") {
                this.general = {
                    // ...this.imploded, 
                    // ...{
                    //     business: this.livestock_order_processing_stage_data_.livestock_order_slaughter_orders.business == null ? {} : this.livestock_order_processing_stage_data_.livestock_order_slaughter_order.business,
                    //     status: this.livestock_order_processing_stage_data_.livestock_order_slaughter_order.status
                    // }
                }
            }

        },
        goBack() {

            let maxLength = this.rejected.length
            let current_rejected_request = this.livestock_order_processing_stage_data.livestock_order_slaughter_order

            let currentOrderIndex = this.rejected.findIndex(rejected_$ => rejected_$.id == current_rejected_request.id)

            let newIndex = currentOrderIndex - 1

            if(newIndex < 0) {
                return
            } 

            this.livestock_order_processing_stage_data = {
                ...this.imploded,
                livestock_order_slaughter_order: this.rejected[newIndex]
            }

            this.general.business = this.rejected[newIndex].business
            this.general.status = this.rejected[newIndex].status

            this.$emit("current-processing-stage", this.livestock_order_processing_stage_data)

            // if((newIndex-=1) < 0) {
            //     this.$refs.next.disabled = false
            //     this.$refs.back.disabled = true
            // }

        },
        goNext() {

            let maxLength = this.rejected.length
            let current_rejected_request = this.livestock_order_processing_stage_data.livestock_order_slaughter_order

            let currentOrderIndex = this.rejected.findIndex(rejected_$ => rejected_$.id == current_rejected_request.id)

            let newIndex = currentOrderIndex + 1

            if(newIndex > (maxLength-=1)) return

            this.livestock_order_processing_stage_data = {
                ...this.imploded,
                livestock_order_slaughter_order: this.rejected[newIndex]
            }

            this.general.business = this.rejected[newIndex].business
            this.general.status = this.rejected[newIndex].status

            this.$emit("current-processing-stage", this.livestock_order_processing_stage_data)

            // if((newIndex+=1) > (maxLength)) {
            //     this.$refs.next.disabled = true
            //     this.$refs.back.disabled = false
            // }

        },
        showRejected() {

            this.rejected_ = true
            this.livestock_order_processing_stage_data = {
                ...this.imploded,
                livestock_order_slaughter_order: this.rejected[0]
            }

            this.general.business = this.rejected[0].business
            this.general.status = this.rejected[0].status

            this.$emit("current-processing-stage", this.livestock_order_processing_stage_data)

        },
        showOthers() {

            this.rejected_ = false
            this.livestock_order_processing_stage_data = {
                ...this.imploded,
                livestock_order_slaughter_order: this.others[0]
            }
            
            this.general.business = this.others[0].business
            this.general.status = this.others[0].status

            this.$emit("current-processing-stage", this.livestock_order_processing_stage_data)

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