<template>
  
    <b-card no-body class="mb-1">
        <b-card-header header-tag="div" class="bg-secondary">
          <h5 class="mb-0">
            <b-button v-b-toggle="'primary_' + int_id " variant="secondary" > {{ export_zone_request.status | displayStatus }} </b-button>
          </h5>
        </b-card-header>
        <b-collapse :id="'primary_' + int_id" visible accordion="my-accordion-primary" role="tabpanel">
          <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
              <div class="media-accordion">

                <div class="media">
                        
                    <div class="container-fluid pt-2">

                        <div class="row mb-2">

                            <div class="col-md-6">
                                <div class="row">
                                    <b class="font-success">
                                        Starting Date
                                    </b>
                                </div>
                                <div class="row">
                                    {{ export_zone_request.dates.starting_date }}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="row">
                                    <b class="font-success">
                                        Ending Date
                                    </b>
                                </div>
                                <div class="row">
                                    {{ export_zone_request.dates.ending_date }}
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
                                    <b-badge v-if="export_zone_request.status == 1" variant="info">PENDING</b-badge>
                                    <b-badge v-if="export_zone_request.status == 2" variant="warning">ACCEPTED</b-badge>
                                    <b-badge v-if="export_zone_request.status == 3" variant="success">IN PROGRESS</b-badge>
                                    <b-badge v-if="export_zone_request.status == 4" variant="success">COMPLETED</b-badge>
                                    <b-badge v-if="export_zone_request.status == 0" variant="danger">REJECTED</b-badge>
                                </div>
                            </div>

                        </div>

                        <div v-if="export_zone_request.status == 1" class="row mt-2">
                            <div class="col-md-6">
                                <button @click="openConfirmModal('reject')" id="default-outline-danger" type="button" class="btn btn-sm btn-pill btn-outline-danger btn-block text-center">
                                    REJECT
                                </button>
                            </div>
                            <div class="col-md-6">
                                <button @click="openConfirmModal('accept')" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block text-center">
                                    ACCEPTED
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="container-fluid text-center">
                    <div class="row">
                        <div class="col-md-12 pt-2">
                            <h6> <b>LIVESTOCK DETAILS</b> </h6>
                        </div>
                    </div>
                </div>

                <div class="media">
                    <div class="text-left">
                        <p>Category</p>
                        <p>Type</p>
                        <p>Quantity</p>
                    </div>
                    <div class="media-body text-right">
                        <p>
                            {{ export_zone_request.livestock_order.d_livestock.category }}
                        </p>
                        <p class="font-primary"> 
                            {{ export_zone_request.livestock_order.d_livestock.type }} 
                        </p>
                        <p class="font-secondary"> 
                            {{ export_zone_request.livestock_order.quantity }} 
                        </p>
                    </div>
                </div>

                <div v-if="export_zone_request.status > 1" class="container-fluid text-center">
                    <div class="row">
                        <div class="col-md-12 pt-2">
                            <h6> <b> TRANSPORTATION DETAILS </b> </h6>
                        </div>
                    </div>
                </div>

                <div v-if="export_zone_request.status > 1" class="media">
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
                        <p class="font-primary"> Kshs  </p>
                        <p class="font-secondary"> Kshs 0 </p>
                    </div>
                </div>

                <div class="container-fluid">
                    <div class="row">
                        
                        <div class="col-6 offset-3 pb-3">
                            <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                More
                            </button>
                        </div>

                    </div>
                </div>

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
            export_zone_request: {},
            payment_made: true,
        }
    },
    props: {
        exportZoneRequest: Object
    },
    watch: {
        exportZoneRequest: {
            immediate: true,
            handler() {
                if(this.exportZoneRequest !== undefined && Object.keys(this.exportZoneRequest).length > 0) this.export_zone_request = this.exportZoneRequest
            }
        },
        deep: true
    },
    created() {

        this.int_id = this.$attrs.index
        this.generated_id = `primary_${this.$attrs.index}`
    },
    methods: {
        openConfirmModal(action) {

            this.$emit("edit-export-zone-request", {
                action: action,
                ...this.export_zone_request
            })

        }
    },
    filters: {
        getMail(user) {

            return user.email == null ? "No Email Available" : user.email

        },
        displayStatus(statusValue) {

            if(statusValue == 1) return "PENDING"
            if(statusValue == 2) return "ACCEPTED"
            if(statusValue == 3) return "IN PROGRESS"
            if(statusValue == 4) return "COMPLETED"
            if(statusValue == 0) return "REJECTED"
            else return 0

        }
    }

}
</script>

<style>

</style>