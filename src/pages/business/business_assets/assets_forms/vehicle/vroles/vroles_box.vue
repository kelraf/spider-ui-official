<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">

                                <VRole v-on:action-success="action_success" v-for="temp_vrole in tempvroles" :tempVRole="temp_vrole" :key="temp_vrole.drole_id" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import VRole from "./vrole"
import axios from "axios"
import { ApiUrl } from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"

export default {
	data(){
		return{
            vehicle_data: {},
            droles: [],
            vroles: [],
            tempvroles: []
		}
    },
    props: {
        vehicleData: Object
    },
    watch: {
        vehicleData: {
            immediate: true,
            handler() {

                this.vehicle_data = this.vehicleData

                this.tempvroles = []

                let available_count = this.vehicle_data.vroles.length

                for (const drole of this.droles) {

                    if(available_count <= 0) {
                        
                        let tempvrole = {
                            set: false,
                            capacity: 0,
                            capacity_units: drole.capacity_units,
                            vehicle_id: this.vehicle_data.id,
                            drole_id: drole.id,
                            drole: drole.role,
                            id: null
                        }

                        this.tempvroles.push(tempvrole)

                    } else {

                        for (const vrole of this.vehicle_data.vroles) {

                            if(vrole.drole_id == drole.id) {

                                let tempvrole = vrole

                                tempvrole.set = true
                                tempvrole.drole = drole.role
                                tempvrole.capacity_units = drole.capacity_units

                                this.tempvroles.push(tempvrole)

                                available_count--

                            }
                    
                        }

                    }

                }                

            }
        }
    },
    mounted() {

        this.vehicle_data = this.vehicleData
        this.get_droles()
       
    },
    components: {
        VRole
    },
	methods: {
		get_droles: function() {

             axios.get(`${ApiUrl.url}d-roles`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })
            .then( (resp) => {

                this.droles = resp.data.data

            } )
            .catch( (err) => {

                if(err.response) {

                if(err.response.status == 401) {

                    this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon: 'info', type: 'info', duration: 4000})
                    this.$router.replace("/auth/login")

                }

                }

            } )

        },
        action_success(data) {
            this.$emit("action-success", data)
        }
	}
}
</script>

<style>
   
</style>