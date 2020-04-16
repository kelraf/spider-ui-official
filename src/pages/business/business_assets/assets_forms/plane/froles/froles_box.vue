<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">

                                <FRole v-on:action-success="action_success" v-for="temp_frole in tempfroles" :tempFRole="temp_frole" :key="temp_frole.drole_id" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import FRole from "./frole"
import axios from "axios"
import { ApiUrl } from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"

export default {
	data(){
		return{
            flight_data: {},
            droles: [],
            froles: [],
            tempfroles: []
		}
    },
    props: {
        flightData: Object
    },
    watch: {
        flightData: {
            immediate: true,
            handler() {

                this.flight_data = this.flightData
                this.tempfroles = []

                if(Object.keys(this.flight_data).length > 0) {

                    var available_count = this.flight_data.froles.length

                    for (const drole of this.droles) {

                        if(available_count <= 0) {
                            
                            let tempfrole = {
                                set: false,
                                capacity: 0,
                                capacity_units: drole.capacity_units,
                                flight_id: this.flight_data.id,
                                drole_id: drole.id,
                                drole: drole.role,
                                id: null
                            }

                            this.tempfroles.push(tempfrole)

                        } else {

                            for (const frole of this.flight_data.froles) {

                                if(frole.drole_id == drole.id) {

                                    let tempfrole = frole

                                    tempfrole.set = true
                                    tempfrole.drole = drole.role
                                    tempfrole.capacity_units = drole.capacity_units

                                    this.tempfroles.push(tempfrole)

                                    available_count--

                                }
                        
                            }

                        }

                    }                

                }


            }
        }
    },
    mounted() {

        this.flight_data = this.flightData
        this.get_droles()
       
    },
    components: {
        FRole
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