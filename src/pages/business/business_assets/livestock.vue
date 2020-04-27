<template>
  
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
                <div class="feather-icon-block"><feather type="navigation"></feather></div>
                <div class="media-body align-self-center">
                    <h6>Business Livestoke</h6>
                </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" :to="'/businesses/all-livestocks/'+businessProfile.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button @click="open_livestock_modal" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateLivestock style="display: none;" id="create-livestock" :businessProfile="businessProfile" />

    </div>

</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"
import { DLivestockProcessor } from "../../../helpers/livestock"
import CreateLivestock from "./assets_forms/livestock/create"

export default {
    components: {
        CreateLivestock
    },props: {
        businessProfile: Object
    },
    methods: {
        get_dlivestock() {

            axios.get(`${ApiUrl.url}d-livestock`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

                let processed = DLivestockProcessor.group_d_livestock(resp.data.data)
                console.log(processed)

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
        open_livestock_modal: function() {

            let modal = new Custombox.modal({
                content: {
                effect: 'slip',
                target: '#create-livestock'
                }
            })

            modal.open()

        }
    }
}
</script>

<style>

</style>