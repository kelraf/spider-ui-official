<template>
  
    <b-card no-body class="mb-1">
        <b-card-header header-tag="div" class="bg-secondary">
        <h5 class="mb-0">
            <b-button v-b-toggle="'primary_' + int_id" variant="secondary" > Activity Name </b-button>
        </h5>
        </b-card-header>
        <b-collapse :id="generated_id" visible accordion="my-accordion-secondary" role="tabpanel">
        <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
            <div class="media-accordion">

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
                        <p>Business Category</p>
                    </div>
                    <div class="media-body text-right">
                        <p>PENDING</p>
                        <p>Business Name</p>
                        <p>Business Category</p>
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
                        <p class="font-primary">0718089771</p>
                        <p class="font-secondary">mail@gmail.com</p>
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
            </div>
        </b-card-body>
        </b-collapse>
    </b-card>

</template>

<script>
export default {
    data() {
        return {
            generated_id: "",
            int_id: 0
        }
    },
    created() {
        this.int_id = this.$attrs.index
        this.generated_id = `primary_${this.$attrs.index}`
    },
    computed() {
        // this.generated_id = `primary_${this.$attrs.index}`
    },
    props: {
        
    },
    mounted() {
        
    }
}
</script>

<style>

</style>