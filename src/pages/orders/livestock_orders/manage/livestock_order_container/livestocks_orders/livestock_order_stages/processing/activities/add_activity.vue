<template>
  
    <div>
        <div class="container to-shake">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="card to-shake mt-4 p-4">
                        <form class="theme-form">
                            <h5 class="f-16 mb-3 f-w-600 text-center"> ADD PROCESSING STAGES </h5>

                            <div class="row mt-4 mb-2">
                                <a href="javascript:void(0)" :class="livestock_order_processing_stages_identify.includes('slaughter') ? 'done' : 'current'" class="u-pearl col-4 to-hover">
                                    <div @click="create('slaughter')" class="u-pearl-icon"><i class="hovered" :class="livestock_order_processing_stages_identify.includes('slaughter') ? 'icon-check' : 'icofont icofont-plus'" aria-hidden="true"></i></div><span class="u-pearl-title"> SLAUGHTER </span>
                                </a>
                                <a href="javascript:void(0)" :class="livestock_order_processing_stages_identify.includes('value_addition') ? 'done' : 'current'" class="u-pearl col-4 to-hover">
                                    <div @click="create('value_addition')" class="u-pearl-icon"><i class="hovered" :class="livestock_order_processing_stages_identify.includes('value_addition') ? 'icon-check' : 'icofont icofont-plus'" aria-hidden="true"></i></div><span class="u-pearl-title"> VALUE ADDITION </span>
                                </a>
                                <a href="javascript:void(0)" :class="livestock_order_processing_stages_identify.includes('branding_and_packaging') ? 'done' : 'current'" class="u-pearl col-4 to-hover">
                                    <div @click="create('branding_and_packaging')" class="u-pearl-icon"><i class="hovered" :class="livestock_order_processing_stages_identify.includes('branding_and_packaging') ? 'icon-check' : 'icofont icofont-plus'" aria-hidden="true"></i></div><span class="u-pearl-title">BRANDING & PACKAGING</span>
                                </a>
                            </div>

                            <div v-if="loading" class="row">
                                <div class="col-12 text-center">
                                    <img src="../../../../../../../../../assets/images/loader.gif" style="width: 20px;" />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

	</div>

</template>

<script>

import $ from "jquery"
import Loader from "../../../../../../../../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            livestock_order_stage_data: {},
            livestock_order_processing_stages: [],
            livestock_order_processing_stages_identify: [],
        }
    },
    components: {
        Loader,
    },
    props: {
        livestockOrderStageData: Object
    },
    mounted() {

    },
    watch: {
        livestockOrderStageData: {
            immediate: true,
            handler() {
                if(this.livestockOrderStageData) {

                    this.livestock_order_stage_data = this.livestockOrderStageData

                    if(this.livestockOrderStageData.livestock_order_processing_stages !== undefined && this.livestockOrderStageData.livestock_order_processing_stages.length) {
                        
                        this.livestock_order_processing_stages = this.livestockOrderStageData.livestock_order_processing_stages
                        this.livestock_order_processing_stages_identify = this.livestock_order_processing_stages.map((livestock_order_processing_stage) => {
                            return livestock_order_processing_stage.stage_name
                        })

                    }
                }

            }
        }
    },
    methods: {
        close: function() {
            this.form.activity_name.error = '' 
            Custombox.modal.close()
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function(stage_name) {

            if(this.livestock_order_processing_stages_identify.includes(stage_name)) {

                $(".to-shake").addClass("animated").addClass("shake");

                this.$toasted.show(` ${stage_name.toUpperCase().split('_').join(' ')} STAGE EXISTS. `, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 400)

            } else {
                   
                this.loading = true

                let data = {
                    livestock_order_processing_stage : {
                        stage_name: stage_name,
                        livestock_order_id: this.livestock_order_stage_data.livestock_order_id,
                        livestock_order_stage_id: this.livestock_order_stage_data.id
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
                        self.$emit("livestock-order-processing-stage-add-success", resp.data.data)
                        self.$toasted.show(`Processing Stage Added Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        // Custombox.modal.close()

                        console.log("XXXXXXXX", resp.data.data)
                        self.livestock_order_processing_stages.push(resp.data.data)
                        self.livestock_order_processing_stages_identify.push(resp.data.data.stage_name)

                    }, 2000)
                } )

                .catch( (err) => {

                    this.form.stage_name.error = ''

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                                // for (const key of Object.keys(err.response.data.errors)) {

                                //     if(key == "quantity") {
                                //         self.form.quantity.error = err.response.data.errors.quantity[0]
                                //         self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.quantity[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                //     } else if(key == "dproduce_id") {
                                //         self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 003-003`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                //     }  else if(key == "business_id") {
                                //         self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                //     } else if(key == "user_id") {
                                //         self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 002-002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                //     }  else {
                                //         console.log("Oops!! Error Occured")
                                //     }
                                // }

                            } else if(err.response.status == 401) {

                                Custombox.modal.close()
                                self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                self.$router.replace("/auth/login")

                            } else if(err.response.status == 400) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                Custombox.modal.close()

                            } else if(err.response.status == 500) {

                                self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                Custombox.modal.close()

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

    .btn-container {
        margin: auto;
        width: 50%;
    }

    .form-error {
        border: 1px solid red !important;
    }

    .fields {
        display: flex !important;
        flex-direction: row !important;
    }

    .fields span {
        flex: 1 !important;
    }

    .hovered {
        transition-duration: .5s;
    }

    .to-hover:hover .hovered {
        transform: scale(.6) !important;
    }

</style>