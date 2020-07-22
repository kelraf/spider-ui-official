<template>
    
    <div class="card">
        <div class="card-body">

            <div class="media feather-main">
            <div class="feather-icon-block"><feather type="navigation"></feather></div>
            <div class="media-body align-self-center">
                <h6>Business Vehicle</h6>
            </div>
            </div>

            <div class="row pt-4">

                <div class="col-4">
                    <!-- <button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger mt-2 mb-2 btn-block"> Delete </button> -->
                </div>

                <div class="col-4">
                    <router-link id="default-outline-primary" to="/dashboard/vehicles" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> 
                        <i class="icon-eye"></i>
                    </router-link>
                </div>

                <div class="col-4">
                    <button id="default-outline-primary" @click="create_vehicle" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
                        <i class="icon-plus"></i>
                    </button>
                </div>

            </div>

        </div>

        <CreateVehicle v-on:vehicle-create-success="vehicle_roles" style="display: none;" id="create-vehicle" :businessProfile="business_profile" />
        <UpdateVehicle v-on:vehicle-update-success="vehicle_roles" style="display: none;" id="update-vehicle" :vehicleData="vehicle_data" />

        <VRolesBox style="display: none;" id="v-roles" :vehicleData="vehicle_data" />

    </div>

</template>

<script>
import CreateVehicle from "./assets_forms/vehicle/create"
import UpdateVehicle from "./assets_forms/vehicle/update"
import VRolesBox from "./assets_forms/vehicle/vroles/vroles_box"

import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"

export default {
    data() {
        return {
            vehicle_data: {},
            business_profile: {}
        }
    },
    components: {
        CreateVehicle,
        UpdateVehicle,
        VRolesBox
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
        create_vehicle: function() {

            this.business_profile = this.businessProfile

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#create-vehicle'
                }
            })

            modal.open()

        },
        update_vehicle: function() {

            this.vehicle_data = {
                id: 7837,
                user_id: 2,
                status: "available",
                type: "truck",
                "registration_number" : "KCD 453T",
                "business_id" : 5
            }

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-vehicle'
                    }
            })

            modal.open()

        },
        vehicle_roles: function() {

            axios.get(`${ApiUrl.url}vehicles/2`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

                this.vehicle_data = resp.data.data

			} )
			.catch( (err) => {

			if(err.response) {

				if(err.response.status == 401) {

				this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
				this.$router.replace("/auth/login")

				}

			}

			} )

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#v-roles'
                    }
            })

            modal.open()

        }
    }
}
</script>

<style>

</style>