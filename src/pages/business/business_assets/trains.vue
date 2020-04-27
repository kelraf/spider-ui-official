<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Train</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-trains/'+businessProfile.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" type="button" @click="create_train" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateTrain id="create-train" style="display: none;" :businessProfile="businessProfile" />

    </div>

</template>

<script>

import CreateTrain from "./assets_forms/train/create"

export default {
    data() {
        return {
            
        }
    },
    props: {
        businessProfile: Object
    },
    created() {


    },
    components: {
        CreateTrain
    },
    methods: {
        create_train: function() {

            let modal = new Custombox.modal({
            content: {
                effect: 'slip',
                target: '#create-train'
                }
            })

            modal.open()

        }
    }
}
</script>

<style>

</style>