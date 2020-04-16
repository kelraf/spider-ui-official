<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">

                                <TRole v-on:action-success="action_success" v-for="temp_trole in temptroles" :tempTRole="temp_trole" :key="temp_trole.drole_id" />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import TRole from "./trole"
import axios from "axios"
import { ApiUrl } from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"

export default {
	data(){
		return{
            train_data: {},
            droles: [],
            troles: [],
            temptroles: []
		}
    },
    props: {
        trainData: Object
    },
    watch: {
        trainData: {
            immediate: true,
            handler() {

                this.train_data = this.trainData
                this.temptroles = []

                if(Object.keys(this.train_data).length > 0) {

                    var available_count = this.train_data.troles.length

                    for (const drole of this.droles) {

                        if(available_count <= 0) {
                            
                            let temptrole = {
                                set: false,
                                capacity: 0,
                                capacity_units: drole.capacity_units,
                                train_id: this.train_data.id,
                                drole_id: drole.id,
                                drole: drole.role,
                                id: null
                            }

                            this.temptroles.push(temptrole)

                        } else {

                            for (const trole of this.train_data.troles) {

                                if(trole.drole_id == drole.id) {

                                    let temptrole = trole

                                    temptrole.set = true
                                    temptrole.drole = drole.role
                                    temptrole.capacity_units = drole.capacity_units

                                    this.temptroles.push(temptrole)

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

        this.train_data = this.trainData
        this.get_droles()
       
    },
    components: {
        TRole
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