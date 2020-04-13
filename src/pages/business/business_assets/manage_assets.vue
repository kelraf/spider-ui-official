<template>
  
    <!-- Container-fluid starts-->
    <div class="container-fluid">

        <div class="row">
            <div class="col-xl-6 xl-100">

                <div class="row">
                    <h4>Business Assets</h4>
                </div>

                <div class="row">

                    <div class="col-md-6">
                      <Vehicle :businessProfile="business_profile" />
                    </div>

                    <div v-for="business_asset in business_profile.business_assets" :key="business_asset.id" class="col-md-6">

                      <!-- <Manage :businessProfile="business_profile" v-if="business_asset.asset_name == 'manage'" /> -->

                      <Plane v-if="business_asset.asset_name == 'plane'" :businessProfile="business_profile" />

                      <Vessle v-if="business_asset.asset_name == 'vessle'" :businessProfile="business_profile" />

                      <Trains :businessProfile="business_profile" v-if="business_asset.asset_name == 'train'" />
                      
                      <Produce v-if="business_asset.asset_name == 'produce'" />

                      <Products v-if="business_asset.asset_name == 'product'" />

                      <Livestock v-if="business_asset.asset_name == 'livestock'" />

                    </div>

                </div>

            </div>
        </div>

    </div>

</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"

import Produce from "./produce"
import Products from "./products"
import Trains from "./trains"
import Plane from "./plane"
import Livestock from "./livestock"
import Vehicle from "./vehicle"
import Vessle from "./vessle"
import Manage from "./manage"

export default {
    data() {
        return {
            business_profile: {}
        }
    },
    components: {
      Produce,
      Products,
      Trains,
      Plane,
      Livestock,
      Vehicle,
      Vessle,
      Manage
    },
    mounted () {

      axios.get(`${ApiUrl.url}businesses/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.business_profile = resp.data.data

      } )
      .catch( (err) => {

        if(err.response) {

          if(err.response.status == 401) {

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