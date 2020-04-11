<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Manage Business Assets</h6>
                <p>8569</p>
            </div>
            </div>

            <div class="media feather-main">

            <div class="col-xl-6 xl-100">
                <div class="row pt-4">

                <div class="col-md-6">
                    <!-- <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Remove </button> -->
                </div>

                <div class="col-md-6">
                    <button @click="open_assets" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Manage </button>
                </div>

                </div>
            </div>
            
            </div>

        </div>

        <Assets :businessProfile="business_profile" style="display: none;" id="assets" />

    </div>

</template>

<script>

import Assets from "./assets"

export default {
    data() {
        return {
            business_profile: {}
        }
    },
    components: {
        Assets
    },
    props: {
        businessProfile: Object
    },
    mounted() {
        this.business_profile = this.businessProfile
    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {
                this.business_profile = this.businessProfile

                console.log("From Manage :", this.business_profile)

            }
        }
    },
    methods: {
        open_assets: function() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#assets'
                    }
                })

            modal.open()

        }
    }
}
</script>

<style>

</style>