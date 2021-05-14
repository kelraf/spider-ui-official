<template>
  
    <div class="container-fluid">

        <div class="row pt-3 pb-3">
            <div class="col-12 text-center font-success">
                <b>Create Processing Stage To Continue</b>
            </div>
        </div>

        <div class="row">
            <div class="col-12 text-center pt-1 pb-5">
                <button :disabled="loading ? true : false" @click="createStage" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary text-center">
                    <b v-if="!loading">CREATE</b>
                    <img v-if="loading" src="../../../../../../../../../../assets/images/loader.gif" style="width: 20px;" />
                </button>
            </div>
        </div>

    </div>

</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false
        }
    },
    props: {
        currentProcessingStage: Object
    },
    watch: {
        currentProcessingStage: {
            immediate: true,
            handler() {
                // console.log("currentProcessingStage", this.currentProcessingStage)
            },
            deep: true
        }
    },
    methods: {
        createStage() {

            // console.log(this.currentProcessingStage)

            // let data = {
            //     "status": 1,
            //     "stage_name": "slaughter",
            //     "livestock_order_stage_id": 9,
            //     "livestock_order_slaughter_orders": [],
            //     "livestock_order_id": 1,
            //     "id": 2
            // }

            // this.$emit("processing-stage-created-successfully", data)

            if(this.currentProcessingStage.stages_available.includes(this.currentProcessingStage.stage_name)) {

                this.$toasted.show(` ${this.currentProcessingStage.stage_name.toUpperCase().split('_').join(' ')} STAGE EXISTS. `, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

            } else {
                   
                this.loading = true

                let data = {
                    livestock_order_processing_stage : {
                        stage_name: this.currentProcessingStage.stage_name,
                        livestock_order_id: this.currentProcessingStage.livestock_order_stage.livestock_order_id,
                        livestock_order_stage_id: this.currentProcessingStage.livestock_order_stage.id
                    }
                }  
                
                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}livestock-order-processing-stages`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$toasted.show(`Processing Stage Added Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})

                        self.$emit("processing-stage-created-successfully", resp.data.data)

                    }, 2000)
                } )

                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                            } else if(err.response.status == 401) {

                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else if(err.response.status == 400) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                            } else if(err.response.status == 500) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                            }

                        }, 2000)

                    }

                } ) 
            
            }

        }
    }
}
</script>

<style>

</style>