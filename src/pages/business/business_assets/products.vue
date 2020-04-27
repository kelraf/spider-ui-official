<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Products</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-products/'+businessProfile.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" @click="create_product" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateProduct style="display: none;" :businessProfile="business_profile" id="create-product" />

    </div>

</template>

<script>
import CreateProduct from "./assets_forms/products/create"

import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"

export default {
    data() {
        return {
            business_profile: {}
        }
    },
    components: {
        CreateProduct
    },
    props: {
        businessProfile: Object
    },
    watch: {
        
    },
    created() {
        this.business_profile = this.businessProfile
    },
    methods: {
        create_product: function() {

            this.business_profile = this.businessProfile

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#create-product'
                }
            })

            modal.open()

        }
    }
}
</script>
<style>

</style>