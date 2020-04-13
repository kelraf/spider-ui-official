<template>
  
    <div class="card custom-card to-shake">
        
        <div class="text-center profile-details">
            <h4> {{ drole }} </h4>
        </div>
        <div class="card-footer row">
        
            <div class="col-8 col-sm-8">

                <h6>Capacity</h6>
                
                <b-input-group :class="capacity_error ? 'form-error' : ''" >
                    <b-input-group-prepend>
                        <b-button class="btn-square resize bootstrap-touchspin-down" :disabled="capacity <= 0 ? true : false" type="button" @click="capacity--" variant="primary"><i class="fa icons fa-minus minus"></i></b-button>
                    </b-input-group-prepend>
                    
                    <b-form-input class="touchspin" type="text" v-model="capacity"></b-form-input>

                    <b-input-group-append class="b-resize">
                        <span class="input-group-text">%</span>
                    </b-input-group-append>
                    <b-input-group-append>
                        <b-button class="btn-square resize bootstrap-touchspin-down" type="button" @click="capacity++" variant="primary"><i class="fa icons fa-plus plus"></i></b-button>
                    </b-input-group-append>
                </b-input-group>

            </div>

        <div class="col-4 col-sm-4 pt-3">

            <button v-if="set" @click="delete_role" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                <i class="fa fa-trash-o btn-icons"></i>
            </button>

            <button v-else id="default-outline-primary" @click="add_role" type="button" class="btn btn-pill btn-outline-primary btn-block">
                <i class="fa fa-plus btn-icons"></i>
            </button>

            <button id="default-outline-primary" :disabled="!set" @click="update_role" type="button" class="btn btn-c btn-pill btn-outline-primary btn-block">
                <i class="fa fa-pencil-square-o btn-icons"></i>
            </button>

        </div>
        </div>
    </div>

</template>

<script>

import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"

export default {
    data(){
		return{
            capacity_error: '',
            vehicle_id: null,
            id: null,
            drole_id: null,
            capacity: 0,
            set: false,
            drole: '',
            capacity_units: '',
		}
    },
    props: {
        tempVRole: Object
    },
    watch: {
        tempVRole: {
            immediate: true,
            handler() {

                this.vehicle_id = this.tempVRole.vehicle_id,
                this.id = this.tempVRole.id,
                this.drole_id = this.tempVRole.drole_id,
                this.capacity = this.tempVRole.capacity,
                this.set = this.tempVRole.set,
                this.drole = this.tempVRole.drole,
                this.capacity_units = this.tempVRole.capacity_units

            }
        }
    },
	methods: {
		add_role() {

            if(this.capacity <= 0) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.capacity_error = 'Capacity Can\'t be blank'

                this.$toasted.show(`Capacity Can't be blank`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)
            
            } else {

                this.capacity_error = ''

                let data = {
                    v_role: {
                        drole_id: this.drole_id,
                        capacity: this.capacity,
                        vehicle_id: this.vehicle_id
                    }
                }

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}v-roles`, data, headers) 
                .then( (resp) => {
                    // setTimeout(function() {

                        // self.loading = false

                        // self.$emit("vrole-changed", data_resp)

                        this.id = resp.data.data.id
                        this.set = true

                        this.$toasted.show(`Vehicle Role Created Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})

                    // }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            // self.loading = false

                            if(err.response.status == 422) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else if(err.response.status == 500) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                            }

                        }, 2000)

                    }

                } )

            }

        },
        update_role() {

            if(this.capacity <= 0) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.capacity_error = 'Capacity Can\'t be blank'

                this.$toasted.show(`Capacity Can't be blank`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                this.capacity_error = ''

                let data = {
                    v_role: {
                        drole_id: this.drole_id,
                        capacity: this.capacity,
                        vehicle_id: this.vehicle_id
                    }
                }

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                if(this.id !== null || this.id !== undefined) {
    
                    axios.put(`${ApiUrl.url}v-roles/${this.id}`, data, headers)
                    .then( (resp) => {
    
                        if(resp.status == 200) {
    
                            this.$toasted.show(`Successfully Updated Vehicle Role Capacity.`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 4000})
    
                        }
    
                    } )
                    .catch( (err) => {
    
                        if(err.response) {
    
                            if(err.response.status == 401) {
    
                                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                this.$router.replace("/auth/login")
    
                            } else if(err.response.status == 404) {
    
                                this.$toasted.show(`Oops An Error Occurred. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
    
                            } else if(err.response.status == 422) {
    
                                this.$toasted.show(`Oops An Error Occurred. Please Try Again. : 422`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
    
                            } else if(err.response.status == 500) {
    
                                this.$toasted.show(`Oops An Error Occurred. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
    
                            }
    
                        }
    
                    } )
    
                }

            }
            

        },
        delete_role() {

            if(this.id !== null || this.id !== undefined) {

                axios.delete(`${ApiUrl.url}v-roles/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                })
                .then( (resp) => {

                    if(resp.status == 204) {

                        this.id = null
                        this.set = false
                        this.capacity = 0

                        this.$toasted.show(`Successfully Deleted Vehicle Role`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 4000})

                    }

                } )
                .catch( (err) => {

                    if(err.response) {

                        if(err.response.status == 401) {

                            this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                            this.$router.replace("/auth/login")

                        } else if(err.response.status == 404) {

                            this.$toasted.show(`Oops An Error Occurred. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                        } else if(err.response.status == 500) {

                            this.$toasted.show(`Oops An Error Occurred. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                        }

                    }

                } )

            }

        }
	}
}
</script>

<style>

    .icons {
        font-size: 10px !important;
    }

    .resize {
        height: 37.5px !important;
        width: 20px !important;
    }

    .btn-icons {
        font-size: 15px !important;
        margin-bottom: 5px !important;
    }

    .form-error {
        border: 1px solid red !important;
    }

</style>