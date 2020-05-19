<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Defined LiveStocks</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-d-livestock'" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" @click="create_dlivestocks" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateDLivestocks id="create-dlivestocks" style="display: none;" :businessProfile="businessProfile" />

        <UpdatePlane id="update-plane" style="display: none;" :planeData="plane_data" />

    </div>

</template>

<script>

import CreateDLivestocks from "../../management/dlivestocks/create"
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
        CreateDLivestocks,
        UpdatePlane
    },
    methods: {
        create_dlivestocks: function() {

            let modal = new Custombox.modal({
            content: {
                    effect: 'slip',
                    target: '#create-dlivestocks'
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