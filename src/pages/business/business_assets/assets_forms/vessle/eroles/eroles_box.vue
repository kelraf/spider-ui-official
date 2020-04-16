<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">

                                <ERole v-on:action-success="action_success" v-for="temp_erole in temperoles" :tempERole="temp_erole" :key="temp_erole.drole_id" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import ERole from "./erole"
import axios from "axios"
import { ApiUrl } from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"

export default {
	data(){
		return{
            vessle_data: {},
            droles: [],
            eroles: [],
            temperoles: []
		}
    },
    props: {
        vessleData: Object
    },
    watch: {
        vessleData: {
            immediate: true,
            handler() {

                this.vessle_data = this.vessleData
                this.temperoles = []

                if(Object.keys(this.vessle_data).length > 0) {

                    var available_count = this.vessle_data.eroles.length

                    for (const drole of this.droles) {

                        if(available_count <= 0) {
                            
                            let temperole = {
                                set: false,
                                capacity: 0,
                                capacity_units: drole.capacity_units,
                                vessle_id: this.vessle_data.id,
                                drole_id: drole.id,
                                drole: drole.role,
                                id: null
                            }

                            this.temperoles.push(temperole)

                        } else {

                            for (const erole of this.vessle_data.eroles) {

                                if(erole.drole_id == drole.id) {

                                    let temperole = erole

                                    temperole.set = true
                                    temperole.drole = drole.role
                                    temperole.capacity_units = drole.capacity_units

                                    this.temperoles.push(temperole)

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

        this.vessle_data = this.vessleData
        this.get_droles()
       
    },
    components: {
        ERole
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