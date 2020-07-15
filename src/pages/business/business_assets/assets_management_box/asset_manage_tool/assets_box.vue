<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">

                                <OneAsset v-on:action-success="action_success" v-for="(processed_asset, index) in processed_assets" :processedAsset="processed_asset" :key="index" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import OneAsset from "./one_asset"
import axios from "axios"
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"

export default {
	data(){
		return {
            business_profile: {},
            processed_assets: [],
            business_assets: [],
            available_assets: [],
            all_assets: [
                "vehicles",
                "plane",
                "trains",
                "products",
                "produce",
                "livestocks"
            ]
		}
    },
    props: {
        businessProfile: Object
    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {

                if(this.businessProfile !== undefined && Object.keys(this.businessProfile).length > 0) {

                    this.business_profile = this.businessProfile
                    this.business_assets = this.business_profile.business_assets
                    this.process_assets()

                }

            },
            deep: true
        }
    },
    mounted() { 

        this.business_profile = this.businessProfile
       
    },
    components: {
        OneAsset
    },
	methods: {
        action_success(data) {

            if(data.action == "post") {
                this.businessProfile.business_assets.push(data.response)
            } else if(data.action == "put") {

                for (const business_asset of this.businessProfile.business_assets) {

                    if(business_asset.id == data.response.id) {

                        business_asset.status = data.response.status
                       
                    }
                    
                }

            }

            this.$emit("action-success", this.businessProfile.business_assets)

        },
        process_assets: function() {

            this.processed_assets = []
            this.available_assets = []

            // Get Available Assets
            for (const asset of this.business_assets) {  

                this.available_assets.push(asset.asset_name)
                this.processed_assets.push(asset) 

            }

            // Process Full List Of Assets
            for (const asset_name of this.all_assets) {
                if(!this.available_assets.includes(asset_name)) {

                    let asset = {
                        id: null,
                        asset_name: asset_name,
                        status: 0,
                        business_id: this.business_profile.id
                    }

                    this.processed_assets.push(asset)
                }
            }

        }
	}
}
</script>

<style>
   
</style>