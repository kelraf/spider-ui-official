<template>
  
    <div class="card pt-0 pb-0 custom-card to-shake">
        
        <div class="card-footer row">

            <div class="col-3">

                <h6> Image </h6>

            </div>
        
            <div class="col-4">

                <h6>{{ asset_name }}</h6>

            </div>

            <div class="col-5 col-sm-5 pt-3">

                <button title="Delete" v-if="status == 2" @click="delete_restore(1)" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                    <i class="fa fa-trash-o btn-icons"></i>
                </button>

                <button title="Add"  v-if="status == 0" id="default-outline-primary" @click="add_asset" type="button" class="btn btn-pill btn-outline-primary btn-block">
                    <i class="fa fa-plus btn-icons"></i>
                </button>

                <button title="Restore"  v-if="status == 1" id="default-outline-primary" @click="delete_restore(2)" type="button" class="btn btn-c btn-pill btn-outline-primary btn-block">
                    <!-- <i class="fa fa-pencil-square-o btn-icons"></i> --> Restore
                </button>

            </div>
        </div>
    </div>

</template>

<script>

import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"

export default {
    data(){
		return{
            asset_name: "",
            status: 0,
            business_id: null,
            id: null
		}
    },
    props: {
        processedAsset: Object
    },
    watch: {
        processedAsset: {
            immediate: true,
            handler() {

                this.asset_name = this.processedAsset.asset_name
                this.status = this.processedAsset.status
                this.id = this.processedAsset.id
                this.business_id = this.processedAsset.business_id
                
            }
        }
    },
	methods: {
		add_asset() {

            let data = {
                business_asset: {
                    asset_name: this.asset_name,
                    business_id: this.business_id
                }
            }

            let self = this
                
            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.post(`${ApiUrl.url}business-assets`, data, headers) 
            .then( (resp) => {
                // setTimeout(function() {

                    // self.loading = false

                    this.$emit("action-success", {
                        action: "post",
                        response: resp.data.data
                    })

                    this.id = resp.data.data.id
                    this.status = resp.data.data.status

                    this.$toasted.show(`Successfully Added Asset.`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})

                // }, 2000)
            } )

            .catch( (err) => {

                if(err.response) {

                    setTimeout(function() {

                        // self.loading = false

                        if(err.response.status == 422) {

                            for (const key of Object.keys(err.response.data.errors)) {

                                if(key == "asset_name") {
                                    self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.asset_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else {
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : Unknown Key`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                }
                            }


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

        },
        delete_restore(status) {

            let data = {
                business_asset: {
                    asset_name: this.asset_name,
                    business_id: this.business_id,
                    status: status
                }
            }

            let self = this
                
            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.put(`${ApiUrl.url}business-assets/${this.id}`, data, headers) 
            .then( (resp) => {
                // setTimeout(function() {

                    // self.loading = false

                    this.$emit("action-success", {
                        action: "put",
                        response: resp.data.data
                    })

                    this.status = resp.data.data.status

                    if(status == 1) {
                        this.message = "Successfully Moved Asset To Trash."
                    } else if(status == 2) {
                        this.message = "Successfully Restored Asset."
                    } else {
                        this.message = "Success"
                    }

                    this.$toasted.show(`${this.message}`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})

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