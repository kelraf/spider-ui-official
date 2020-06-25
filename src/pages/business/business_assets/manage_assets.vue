<template>
  
    <!-- Container-fluid starts-->
    <div class="container-fluid">

        <Breadcrumbs main="Manage Assets" title="Manage"/>

        <div class="row">
            <div class="col-xl-6 xl-100">
                <div class="row">

                    <div class="col-md-6">
                      <Manage v-on:action-success="action_success" :businessProfile="business_profile" />
                    </div>

                    <div v-for="business_asset in business_assets" :key="business_asset.id" class="col-md-6">

                      <Vehicle v-if="business_asset.asset_name == 'vehicles' && business_asset.status == 2 " :businessProfile="business_profile" />

                      <Plane v-if="business_asset.asset_name == 'plane' && business_asset.status == 2" :businessProfile="business_profile" />

                      <Vessle v-if="business_asset.asset_name == 'vessles' && business_asset.status == 2" :businessProfile="business_profile" />

                      <Trains :businessProfile="business_profile" v-if="business_asset.asset_name == 'train' && business_asset.status == 2" />
                      
                      <Produce :businessProfile="business_profile" v-if="business_asset.asset_name == 'produce' && business_asset.status == 2" />

                      <Products :businessProfile="business_profile" v-if="business_asset.asset_name == 'products' && business_asset.status == 2" />

                      <Livestock :businessProfile="business_profile" v-if="business_asset.asset_name == 'livestocks' && business_asset.status == 2" />

                      <DLivestocks :businessProfile="business_profile" v-if="business_asset.asset_name == 'dlivestocks' && business_asset.status == 2" />

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
import DLivestocks from "./dlivestocks"
import Manage from "./assets_management_box/manage"

export default {
    data() {
        return {
            business_profile: {},
            business_assets: []
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
      Manage,
      DLivestocks
    },
    mounted () {

      axios.get(`${ApiUrl.url}businesses/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.business_profile = resp.data.data
        this.business_assets = this.business_profile.business_assets

      } )
      .catch( (err) => {

        if(err.response) {

          if(err.response.status == 401) {

            this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            this.$router.replace("/auth/login")

          }

        }

      } )

      },
      methods: {
        action_success(data) {

          this.business_profile.business_assets = data
          this.business_assets = this.business_profile.business_assets

        }
      }

}
</script>

<style>

</style>