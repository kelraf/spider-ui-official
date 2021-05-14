<template>
  

    <div class="col-12 p-0">

        <div class="card" v-if="Object.keys(current_order).length && current_order.order_exists">
            <div class="card-header b-l-primary">
                <h5 class="font-secondary">Slaughter Order Details</h5>
            </div>
            <div v-if="Object.keys(current_order).length > 0" class="card-body tab-content p-0 market-tabcontent">

                <b-tabs pills bottom nav-wrapper-class="card-footer b-t-primary market-tabs p-0">

                    <b-tab style="max-height: 500px;" :class="current_order.livestock_order_slaughter_order_outputs.length > 5 ? 'scroll' : ''" title="OutPut" active>

                        <div class="market-table table-responsive tab-pane">
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">OutPut Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Units</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(livestock_order_slaughter_order_output, index) in current_order.livestock_order_slaughter_order_outputs" :key="index">
                                    <td>
                                        <p class="font-primary"> {{ livestock_order_slaughter_order_output.d_livestock_slaughter_output.output_name }} </p>
                                    </td>
                                    <td>
                                        <p> {{ livestock_order_slaughter_order_output.quantity | displayQuantity }} </p>
                                    </td>
                                    <td>
                                        <p> {{ livestock_order_slaughter_order_output.quantity | displayUnits }} </p>
                                        <!-- <div class="text-center"><feather class="font-primary" type="arrow-up"></feather></div> -->
                                    </td>
                                </tr>
                                
                            </tbody>
                            </table>
                        </div>
                        
                    </b-tab>

                    <b-tab style="max-height: 500px;" title="Order Details" active>

                        <!-- Container-fluid starts-->
                        <div class="container-fluid order-details-fit-it">
                            <div class="user-profile">
                            <div class="row">
                                <!-- user profile first-style start-->
                                <div class="col-sm-12 p-0">
                                <div class="card hovercard text-center">
                                    <div class="info">
                                    <div class="row">
                                        <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">

                                            <div class="row">
                                                <div class="col-8 offset-2 pb-3 text-left">
                                                    <button :disabled="current_order.status <= 0 ? true : false " @click="openEditModal" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                                                        EDIT
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="row mt-3">

                                                <div class="col-md-4">
                                                    <div class="font-success text-left">
                                                        <h6>Status</h6>
                                                        <span> 
                                                            <b-badge style="color: white !important;" v-if="current_order.status == 1" variant="info">PENDING</b-badge>
                                                            <b-badge style="color: white !important;" v-if="current_order.status == 2" variant="warning">ACCEPTED</b-badge>
                                                            <b-badge style="color: white !important;" v-if="current_order.status == 3" variant="success">IN PROGRESS</b-badge>
                                                            <b-badge style="color: white !important;" v-if="current_order.status == 4" variant="success">COMPLETED</b-badge>
                                                            <b-badge style="color: white !important;" v-if="current_order.status == 0" variant="danger">REJECTED</b-badge>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="col-md-8">
                                                    <div class="row">

                                                        <div class="col-md-12">
                                                            <div class="font-success text-left">
                                                                <h6>Starting Date</h6><span> {{ current_order.dates.starting_date }} </span>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-12 pt-2">
                                                            <div class="font-success text-left">
                                                                <h6>Ending Date</h6><span> {{ current_order.dates.ending_date }} </span>
                                                            </div>
                                                        </div>

                                                    </div>                                    
                                                </div>
                                                
                                                
                                            </div>

                                        </div>
                                    </div>

                                    <hr />

                                    <div class="row mt-3">
                                        <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <div class="font-secondary text-left">
                                                        <h6>Order Description</h6>
                                                    </div>
                                                </div>
                                                
                                            </div>

                                            <div class="row">

                                                <div class="col-12">
                                                    <div id="description" v-html="current_order.description" class="ttl-info text-left">
                                                    
                                                    </div>
                                                </div>
                                                
                                            </div>

                                        </div>
                                    </div>

                                    
                                    </div>
                                </div>
                                </div>
                                <!-- user profile first-style end-->
                                
                            </div>
                            </div>
                        </div>
                        <!-- Container-fluid Ends-->

                    </b-tab>

                </b-tabs>

            </div>

        </div>

        <div v-if="Object.keys(current_order).length && !current_order.order_exists" class="row">
            <div class="col-md-8 text-center offset-md-2 pt-5 mt-5">

                <div class="container">

                    <div class="row pt-3 font-danger">
                        <div class="col-12 text-center">
                            <i class="fa fa-ellipsis-h fa-4x"></i>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 pt-3">
                            <p class="font-success">
                                <b>MORE DETAILS ABOUT THIS PROCESSING STAGE APPEARS HERE</b>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>


</template>

<script>
export default {
    data() {
        return {
            current_order: {},
            show: true
        }
    },
    props: {
        currentProcessingStageData: Object,
        currentOrder: Object
    },
    watch: {
        currentOrder: {
            immediate: true,
            handler() {

                if(this.currentOrder !== undefined && Object.keys(this.currentOrder).length) this.current_order = this.currentOrder
                
            },
            deep: true
        }
    },
    methods: {
        openEditModal() {
            this.$emit("open-edit-modal")
        },
        openMakeOrderEvent() {
            this.$emit("open-make-slaughter-order-modal")
        }
    },
    filters: {
        displayQuantity(quantity) {
            if(quantity == null) return "pending"
            else return quantity
        },
        displayUnits(units) {
            if(units == null) return "pending"
            else return units
        },
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

    .scroll {
        overflow-y: scroll;
    }

    .order-details-fit-it {
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>