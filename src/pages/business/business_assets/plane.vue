<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Planes</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-flights/'+businessProfile.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> View </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" @click="create_plane" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                </div>

            </div>

        </div>

        <CreatePlane id="create-plane" style="display: none;" :businessProfile="businessProfile" />

        <UpdatePlane id="update-plane" style="display: none;" :planeData="plane_data" />

    </div>

</template>

<script>

import CreatePlane from "./assets_forms/plane/create"
import UpdatePlane from "./assets_forms/plane/update"

export default {
    data() {
        return {
            plane_data: {
                unique_number: 763727,
                role: "meat-transporter",
                user_id: 63,
                business_id: 34
            }
        }
    },
    props: {
        businessProfile: Object
    },
    created() {


    },
    components: {
        CreatePlane,
        UpdatePlane
    },
    methods: {
        create_plane: function() {

            let modal = new Custombox.modal({
            content: {
                    effect: 'slip',
                    target: '#create-plane'
                }
            })

            modal.open()

        },
        edit_plane: function() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-plane'
                    }
                })

            modal.open()

        }
    }
}
</script>

<style>

</style>