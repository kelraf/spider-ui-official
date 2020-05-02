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
                    <button @click="open_assets_management_tool_modal" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Manage </button>
                </div>

                </div>
            </div>
            
            </div>

        </div>

        <AssetsBox v-on:action-success="action_success" :businessProfile="business_profile" style="display: none;" id="assets" />

    </div>

</template>

<script>

import AssetsBox from "./asset_manage_tool/assets_box"

export default {
    data() {
        return {
            business_profile: {}
        }
    },
    components: {
        AssetsBox
    },
    props: {
        businessProfile: Object
    },
    mounted() {

        this.business_profile = this.businessProfile
        delete this.business_profile.user
        delete this.business_profile.business_pin
        delete this.business_profile.registration_number

    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {

                this.business_profile = this.businessProfile

                delete this.business_profile.user
                delete this.business_profile.business_pin
                delete this.business_profile.registration_number

            },
            deep: true
        }
    },
    methods: {
        open_assets_management_tool_modal: function() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#assets'
                    }
                })

            modal.open()

        },
        action_success: function(data) {
            this.$emit("action-success", data)
        }
    }
}
</script>

<style>

</style>