<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Vessle</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-vessles/'+businessProfile.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> View </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" type="button" @click="create_vessle" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                </div>

            </div>

        </div>

        <CreateVessle id="create-vessle" style="display: none;" :businessProfile="businessProfile" />

    </div>

</template>

<script>

import CreateVessle from "./assets_forms/vessle/create"

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
        CreateVessle
    },
    methods: {
        create_vessle: function() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#create-vessle'
                    }
            })

            modal.open()

        }
    }
}
</script>

<style>

</style>