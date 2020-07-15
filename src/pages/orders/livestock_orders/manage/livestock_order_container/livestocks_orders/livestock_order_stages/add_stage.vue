<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add Stage </h5>

                                    <div class="mb-2">
                                        <div class="col-form-label"> Select Stage </div>
                                        <b-form-select class="form-control form-control-primary-fill btn-square" :class="form.stage_name.error ? 'form-error' : ''" v-model="form.stage_name.value" :options="form.stage_name.options"></b-form-select>
                                    </div>
                                    
                                    <div class="form-group form-row mb-0">
                                        <div class="col-md-12 btn-c">
                                            <div class="btn-container">
                                                <b-button-group class="btn-group-pill">
                                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                    <b-button :class=" loading ? 'loading' : '' " @click="create" variant="outline-primary">
                                                        <span v-if="!loading">Create</span>

                                                        <Loader v-if="loading" />
                                                    </b-button>
                                                </b-button-group>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

	</div>

</template>

<script>

import $ from "jquery"
import Loader from "../../../../../../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../../../../../../api/apiurl"
import Auth from "../../../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            form: {
                stage_name: {
                    error: '',
                    value: '',
                    options: [
                        { value: '', text:'Select Stage' },
                        { value: 'ccp', text:'CCP' },
                        // { value: 'collection', text:'Collection' },
                        { value: 'export-zone', text:'Export Zone' },
                        { value: 'feedlot', text:'FeedLot' },
                        { value: 'processing', text:'Processing' }
                    ]
                },
                user_id: parseInt(Auth.isAuthenticatedUser().sub)
            }
        }
    },
    components: {
        Loader,
    },
    props: {
        livestockOrder: Object
    },
    mounted() {

    },
    watch: {
        
    },
    methods: {
        close: function() {
            this.form.stage_name.error = '' 
            Custombox.modal.close()
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function() {

            if(this.form.stage_name.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.stage_name.error = 'field can\'t be empty'

                this.$toasted.show(`Stage : ${this.form.stage_name.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {
                   
                this.form.stage_name.error = ''    
                this.loading = true

                let data = {
                    livestock_order_stage : {
                        stage_name: this.form.stage_name.value,
                        livestock_order_id: this.livestockOrder.id,
                        stage_number: this.livestockOrder.livestock_order_stages.length += 2
                    }
                }  
                
                console.log(data)

                let self = this
                    
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}livestock-order-stages`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("add-stage-success", resp.data.data)
                        self.$toasted.show(`Stage Added Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                        Custombox.modal.close()

                    }, 2000)
                } )

                .catch( (err) => {

                    this.form.stage_name.error = ''

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "quantity") {
                                        self.form.quantity.error = err.response.data.errors.quantity[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.quantity[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "dproduce_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 003-003`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }  else if(key == "business_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "user_id") {
                                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 002-002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    }  else {
                                        console.log("Oops!! Error Occured")
                                    }
                                }

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

                        }, 3000)

                    }

                } ) 

            

        }
    }

    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

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

</style>