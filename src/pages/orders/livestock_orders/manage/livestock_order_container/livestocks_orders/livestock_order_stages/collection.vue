<template>
  
    <div class="follow">
        <div v-if="Object.keys(center_order).length > 0" class="row">
            <div class="col-md-6 text-md-right border-right">
            
                <!-- Center Orders -->
                <CenterOrder :centerOrder="center_order" />

            </div>
            <div class="col-md-6 text-md-left">
            
                <!-- Livestock Sales -->
                <LivestockSales v-if="livestock_sales.length > 0" />

                <div v-if="livestock_sales.length <= 0" class="row pt-5">
                    <div class="col-md-6 text-center offset-md-3 mt-5 pt-5">
                        <h2> No Sales Requests Yet </h2>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="Object.keys(center_order).length == 0" class="row pt-5">
            <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> No Center Order Not Available </h2>

                <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

import {ApiUrl} from "../../../../../../../api/apiurl"
import Auth from "../../../../../../../auth/js/spider_auth"
import axios from "axios"

import CenterOrder from "../center_order"
import LivestockSales from "../livestock_sales"

export default {
    data() {
        return {
            stage: {},
            center_order: {},
            livestock_sales: []
        }
    },
    components: {
        CenterOrder,
        LivestockSales
    },
    mounted() {

        axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.stage = resp.data.data
            
            if(this.stage.center_order !== null) this.center_order = this.stage.center_order

            if(this.stage.center_order.livestock_sales.length > 0) this.livestock_sales = this.stage.center_order.livestock_sales
                    
        } )

        .catch( (err) => {

            if(err.response) {

            if(err.response.status == 404) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

            } else if(err.response.status == 401) {

                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

            }

            }

        } )

    }
}
</script>

<style>

</style>