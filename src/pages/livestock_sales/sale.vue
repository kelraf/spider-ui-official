<template>
  
    <b-card no-body class="mb-1">
        <b-card-header header-tag="div" class="bg-secondary">
          <h5 class="mb-0">
            <b-button v-b-toggle="'primary_' + int_id " variant="secondary" > {{ livestock_sale.d_livestock.category }} .::. {{ livestock_sale.d_livestock.type }} </b-button>
          </h5>
        </b-card-header>
        <b-collapse :id="'primary_' + int_id" visible accordion="my-accordion-primary" role="tabpanel">
          <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
              <div class="media-accordion">

                <div class="media">
                        
                    <div class="container-fluid pt-2">

                        <div class="row mb-2">

                            <div class="col-md-4">
                                <div class="row">
                                    <b class="font-success">
                                        Quantity
                                    </b>
                                </div>
                                <div class="row">
                                    {{ livestock_sale.quantity }}
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="row">
                                    <b class="font-success">
                                        Price Per Animal
                                    </b>
                                </div>
                                <div class="row">
                                    {{ livestock_sale.price_per_animal }}
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="row">
                                    <b class="font-success">
                                        Total Price
                                    </b>
                                </div>
                                <div class="row">
                                    {{ livestock_sale.total_price }}
                                </div>
                            </div>

                        </div>

                        <div class="row mt-2 mb-2">

                            <div class="col-md-4">
                                <div class="row">
                                    <b class="font-success">
                                        Status
                                    </b>
                                </div>
                                <div class="row">
                                    <b-badge v-if="livestock_sale.status == 1" variant="info">PENDING</b-badge>
                                    <b-badge v-if="livestock_sale.status == 2" variant="warning">ACCEPTED</b-badge>
                                    <b-badge v-if="livestock_sale.status == 3" variant="success">COMPLETED</b-badge>
                                    <b-badge v-if="livestock_sale.status == 0" variant="danger">CANCLED</b-badge>
                                </div>
                            </div>

                            <div class="col-md-4 pt-3">
                                <!-- <button id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block text-center">
                                    Accept
                                </button> -->
                            </div>

                        </div>

                    </div>

                </div>

                <div class="container-fluid text-center">
                    <div class="row">
                        <div class="col-md-12 pt-2">
                            <h6> <b>PAYMENT DETAILS</b> </h6>
                        </div>
                    </div>
                </div>

                <div class="media">
                    <div class="text-left">
                        <p>PayMent Status</p>
                        <p>Amount Expected</p>
                        <p>Amount Received</p>
                    </div>
                    <div class="media-body text-right">
                        <p>
                            <b-badge v-if="livestock_sale.status == 1" variant="info">PENDING</b-badge>
                            <b-badge v-if="livestock_sale.status == 2" variant="warning">ACCEPTED</b-badge>
                            <b-badge v-if="livestock_sale.status == 3" variant="success">COMPLETED</b-badge>
                            <b-badge v-if="livestock_sale.status == 0" variant="danger">CANCLED</b-badge>
                        </p>
                        <p class="font-primary"> Kshs {{ livestock_sale.total_price }} </p>
                        <p class="font-secondary"> Kshs 0 </p>
                    </div>
                </div>

                <div v-if="payment_made" class="container-fluid">
                    <div class="row">
                        
                        <div class="col-6 offset-3 pb-3">
                            <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                More On Payment
                            </button>
                        </div>

                    </div>
                </div>

                <div class="container-fluid text-center">
                    <div class="row">
                        <div class="col-md-12 pt-2">
                            <h6> <b>COLLECTION DETAILS</b> </h6>
                        </div>
                    </div>
                </div>

                <div class="media">
                    <div class="text-left">
                        <p>Vehicle Number</p>
                        <p>Vehicle Type</p>
                        <p>Date</p>
                    </div>
                    <div class="media-body text-right">
                        <p>
                            <b-badge variant="info">PENDING</b-badge>
                            <!-- <b-badge variant="success">COMPLETED</b-badge>
                            <b-badge variant="danger">FAILED</b-badge> -->
                        </p>
                        <p class="font-primary"> Kshs {{ livestock_sale.total_price }} </p>
                        <p class="font-secondary"> Kshs 0 </p>
                    </div>
                </div>

                <!-- <div class="container-fluid">
                    <div class="row">
                        
                        <div class="col-6 offset-3 pb-3">
                            <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                More On Payment
                            </button>
                        </div>

                    </div>
                </div> -->

              </div>
            </div>
          </b-card-body>
        </b-collapse>
    </b-card>

</template>

<script>
export default {
    data() {
        return {
            int_id: 0,
            livestock_sale: {},
            payment_made: true
        }
    },
    props: {
        livestockSale: Object
    },
    watch: {
        livestockSale: {
            immediate: true,
            handler() {
                if(this.livestockSale !== undefined && Object.keys(this.livestockSale).length > 0) this.livestock_sale = this.livestockSale
            }
        }
    },
    created() {

        this.int_id = this.$attrs.index
        this.generated_id = `primary_${this.$attrs.index}`
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