<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Produce</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" to="/dashboard/produces" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" type="button" @click="open_create_produce_modal" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateProduce style="display: none;" id="create-produce" :businessProfile="businessProfile" />

    </div>

</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"
import CreateProduce from "./assets_forms/produce/create"

export default {
    components: {
        CreateProduce
    },
    props: {
        businessProfile: Object
    },
    methods: {
        open_create_produce_modal: function() {

            let modal = new Custombox.modal({
                content: {
                effect: 'slip',
                target: '#create-produce'
                }
            })

            modal.open()

        }
    }
}
</script>

<style>

</style>