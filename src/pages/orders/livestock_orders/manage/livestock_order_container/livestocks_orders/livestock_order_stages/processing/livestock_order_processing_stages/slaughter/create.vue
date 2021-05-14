<template>
  
    <div class="container-fluid">
        <div @click.self="close" class="row">
            <div class="col-md-6 offset-md-3">

                <div class="card"> 
                    <div class="card-body">
                        <form-wizard color="#4466f2" :start-index="0" title="Make A Slaughter Order" subtitle="Split a complicated flow in multiple steps" back-button-text="Go back!" next-button-text="Go next!" finish-button-text="We're there">
                            <tab-content :before-change="checkSelectedSlaughterOrderBundler" title="Select Slaughter House/Abattor">
                                <div class="setup-content" id="step-1">
                                <div class="col-xs-12 p-0">
                                    <div class="col-md-12 p-0">

                                        <div v-if="!slaughter_order_bundlers.length" class="row text-center font-danger">
                                            <div class="col-12">
                                                <h5> <b> No Abattor or Slaughter House Available </b> </h5>
                                            </div>
                                        </div>

                                        <div v-if="slaughter_order_bundlers.length" class="row op p-2">
                                            <div class="col-6 ">
                                                <b-input-group class="pill-input-group">
                                                    <b-form-input placeholder="Search....." type="text"></b-form-input>
                                                    <b-input-group-append is-text><i class="icofont icofont-stock-search"></i></b-input-group-append>
                                                </b-input-group>
                                            </div>
                                        </div>
                                        
                                        <vueper-slides
                                            v-if="slaughter_order_bundlers.length"
                                            3d
                                            arrows-outside
                                            ref="vueperslides1"
                                            fixed-height="300px"
                                            @slide="$refs.vueperslides2 && $refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
                                            :slide-ratio="1 / 4"
                                            :bullets="false">
                                            <vueper-slide
                                                style="height: 300px; "
                                                v-for="(slaughter_order_bundler, index) in slaughter_order_bundlers"
                                                :key="index"
                                                >

                                                <template v-slot:content>
                                                
                                                    <!-- Container-fluid starts-->
                                                    <div class="container-fluid fix-it">
                                                        <div class="user-profile">
                                                        <div class="row">
                                                            <!-- user profile first-style start-->
                                                            <div class="col-sm-12 p-0">
                                                            <div class="card hovercard text-center">
                                                                <div class="info infor">
                                                                <div class="row">
                                                                    <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">
                                                                        <div class="row">

                                                                            <div class="col-md-6">
                                                                                <div class="font-success text-left">
                                                                                    <h6>Business Name</h6><span> {{ slaughter_order_bundler.business.business_name }} </span>
                                                                                </div>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                                <div class="font-success text-left">
                                                                                    <h6>Sub Category</h6><span> {{ slaughter_order_bundler.business.sub_category }} </span>
                                                                                </div>                                    
                                                                            </div>
                                                                            
                                                                            
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-6 mt-3 offset-3">
                                                                                <div class="avatar"><img class="img-50 rounded-circle" :src='"../../../../../../../../../../assets/images/user/1.jpg"' alt="#"></div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-6 offset-md-3 font-secondary"> {{ slaughter_order_bundler.business.user.first_name }} {{ slaughter_order_bundler.business.user.last_name }} </div>
                                                                        </div>

                                                                        <div class="row pt-3">

                                                                            <div class="col-6">
                                                                                <div><feather type="phone"></feather></div> <div class="font-secondary"> {{ slaughter_order_bundler.business.user.phone_number }} </div>
                                                                            </div>

                                                                            <div class="col-6">
                                                                                <div><feather type="mail"></feather></div> <div class="font-secondary"> {{ slaughter_order_bundler.business.user | getMail }} </div>
                                                                            </div>

                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-6 offset-3 pt-2">

                                                                                <button id="default-outline-secondary" @click="setSelected(slaughter_order_bundler)" type="button" class="btn btn-pill btn-xs btn-outline-secondary btn-block">
                                                                                    <span v-if="Object.keys(selectedSlaughterOrderBundler).length == 0">SELECT</span>
                                                                                    <span v-if="Object.keys(selectedSlaughterOrderBundler).length > 0 && selectedSlaughterOrderBundler.id !== slaughter_order_bundler.id">SELECT</span>
                                                                                    <span v-if="Object.keys(selectedSlaughterOrderBundler).length > 0 && selectedSlaughterOrderBundler.id == slaughter_order_bundler.id">SELECTED</span>
                                                                                </button>

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                                                                                        
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <!-- user profile first-style end-->
                                                            
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <!-- Container-fluid Ends-->

                                                </template>


                                            </vueper-slide>
                                        </vueper-slides>

                                    </div>
                                </div>
                                </div>
                            </tab-content>
                            <tab-content title="Select Final Outputs">
                                <div class="setup-content" id="step-3">
                                    <div class="container-fluid no-guttars">
                                        <div class="row">

                                            <div class="col-md-6 p-1 mb-4">
                                                
                                                <div class="card-body animate-chk">
                                                    <div class="row">
                                                        <div class="col p-0">
                                                            <div :class="d_livestock_slaughter_outputs.length > 5 ? 'scrollable' : ''" class="checkbox-animated">
                                                                <label v-for="(d_livestock_slaughter_output, index) in d_livestock_slaughter_outputs" :key="index" class="d-block" for="chk-ani">
                                                                    <input :checked="d_livestock_slaughter_output.checked ? true : false" :value="d_livestock_slaughter_output.id" class="checkbox_animated" @click="checkIt($event)" type="checkbox"> {{ d_livestock_slaughter_output.output_name }}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-md-6 p-1 mb-4 border-left">
                                                
                                                <!-- <div class="container-fluid text-center">

                                                    <div class="row p-2">
                                                        <div class="col-md-6 p-0 mt-2 text-md-left  text-primary">OutPut : </div>
                                                        <div class="col-md-6 p-0 mt-2 text-md-left font-secondary">OutPut Name</div>

                                                        <div class="col-12 p-0 mt-3 text-primary">Quantity</div>
                                                        <div class="col-12 p-0">

                                                            <b-input-group>

                                                                <b-input-group-prepend>
                                                                    <b-button class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="num--" variant="primary"><i class="fa fa-minus"></i></b-button>
                                                                </b-input-group-prepend>

                                                                <b-input-group-prepend>
                                                                    <span class="input-group-text">Kgs</span>
                                                                </b-input-group-prepend>
                                                                
                                                                <b-form-input class="touchspin" type="text" v-model="num"></b-form-input>

                                                                <b-input-group-append>
                                                                    <b-button class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="num++" variant="primary"><i class="fa fa-plus"></i></b-button>
                                                                </b-input-group-append>

                                                            </b-input-group>

                                                        </div>
                                                    </div>

                                                </div> -->

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </tab-content>
                            <tab-content :before-change="checkDesc" title="Order Description">
                                <div class="setup-content" id="step-3">
                                <div class="col-xs-12">
                                    <div class="col-md-12">
                                        <ckeditor :editor="editor"  v-model="editorData"></ckeditor>
                                    </div>
                                </div>
                                </div>
                            </tab-content>
                            <tab-content title="Select Date And Send">
                                <div class="setup-content" id="step-4">
                                    <div class="container-fluid">
                                    <div class="row p-0">

                                        <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body p-0">

                                                <div class="media feather-main">
                                                <div class="media-body align-self-center">
                                                    <h6> Select Dates </h6>
                                                </div>
                                                </div>

                                                <div class="media feather-main">

                                                <div class="col-xl-6 xl-100">
                                                    <div class="row pt-4">

                                                        <div class="col-md-6">
                                                            <datepicker v-model="dates.starting_date" input-class="datepicker-here form-control digits" placeholder="Starting Date" :format="format" ></datepicker>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <datepicker v-model="dates.ending_date" input-class="datepicker-here form-control digits" placeholder="Ending Date" :format="format" ></datepicker>
                                                        </div>

                                                    </div>
                                                </div>
                                                
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-12">


                                        <div class="row">
                                            <div class="col-6 offset-md-3">
                                                <button @click="sendRequest" id="default-outline-warning" type="button" class="btn btn-pill btn-outline-warning btn-block">
                                                    <span v-if="!loading">Send</span>
                                                    <img style="width: 20px;" v-if="loading" src="../../../../../../../../../../assets/images/loader.gif" alt="">
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    </div>  
                                    </div>                                  
                                </div>
                            </tab-content>
                        </form-wizard>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from 'vuejs-datepicker';

import {ApiUrl} from "../../../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            loading: false,
            businesses: [],
            num: 20,
            selectedBusiness: {},
            editorData: '',
            format: "dd/MM/yyyy",
            editor: ClassicEditor,
            d_livestock_slaughter_outputs: [],
            slaughter_order_outputs: [],
            dates: {
                starting_date: "",
                ending_date: ""
            },
            slaughter_order_bundlers: [],
            selectedSlaughterOrderBundler: {}
        }
    },
    components: { 
        VueperSlides, 
        VueperSlide,
        ckeditor: CKEditor.component,
        Datepicker
    },
    props: {
        livestockOrderProcessingStageData: Object
    },
    watch: {
        livestockOrderProcessingStageData: {
            immediate: true,
            handler() {
                this.livestock_order_processing_stage_data = this.livestockOrderProcessingStageData
                this.get_d_livestock_slaughter_outputs()
            }
        }
    },
    mounted() {


        axios.get(`${ApiUrl.url}slaughter-order-bundlers`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.slaughter_order_bundlers = resp.data.data

            this.slaughter_order_bundlers.map((slaughter_order_bundler) => {
                delete slaughter_order_bundler.livestock_order_slaughter_orders
            })
                    
        } )

        .catch( (err) => {

            if(err.response) {

            if(err.response.status == 404) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

            } else if(err.response.status == 401) {

                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

            }

            }

        } )

        axios.get(`${ApiUrl.url}businesses`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.businesses = resp.data.data
                    
        } )

        .catch( (err) => {

            if(err.response) {

            if(err.response.status == 404) {

                this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

            } else if(err.response.status == 401) {

                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

            }

            }

        } )

    },
    methods: {
        close() {

            Custombox.modal.close()

        },
        checkIt(e) {
            if(e.target.checked) {

                let {livestock_order_id, livestock_order_stage_id, id} = this.livestock_order_processing_stage_data

                let slaughter_order_output = {
                    livestock_order_id: livestock_order_id,
                    livestock_order_stage_id: livestock_order_stage_id,
                    livestock_order_processing_stage_id: id,
                    d_livestock_slaughter_output_id: e.target.value
                }

                this.slaughter_order_outputs.push(slaughter_order_output)

            } else {

                this.slaughter_order_outputs = this.slaughter_order_outputs.filter((slaughter_order_output) => { if(slaughter_order_output.d_livestock_slaughter_output_id !== e.target.value) return slaughter_order_output })

            }
        },
        setSelected(slaughter_order_bundler) {

            this.selectedSlaughterOrderBundler = slaughter_order_bundler

        },
        checkSelectedSlaughterOrderBundler() {
            if(Object.keys(this.selectedSlaughterOrderBundler).length == 0) {
                this.$toasted.show(`Please Select A Business`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                return false
            } else {
                return true
            }
        },
        checkDesc() {
            if(this.editorData == '') {
                this.$toasted.show(`Description is Required`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                return false
            } else {
                return true
            }
        },
        checkDates() {

            if(this.dates.starting_date == "") {
                this.$toasted.show(`Please Select Starting Date`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                return [false]
            } else if(this.dates.ending_date == "") {
                this.$toasted.show(`Please Select Ending Date`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                return [false]
            } else {
                let new_dates = {
                    starting_date: this.dates.starting_date.toDateString(),
                    ending_date: this.dates.ending_date.toDateString()
                }
                
                return [true, new_dates]
            }

        },
        sendRequest() {

            if(Object.keys(this.livestock_order_processing_stage_data).length <= 0) return

            else if(!this.checkDates()[0]) return

            let {livestock_order_id, livestock_order_stage_id, id} = this.livestock_order_processing_stage_data

            let data = {
                livestock_order_slaughter_order: {
                    dates: this.checkDates()[1],
                    business_id: this.selectedSlaughterOrderBundler.business.id,
                    slaughter_order_bundler_id: this.selectedSlaughterOrderBundler.id,
                    livestock_order_id: livestock_order_id,
                    livestock_order_stage_id: livestock_order_stage_id,
                    livestock_order_processing_stage_id: id,
                    description: this.editorData,
                    livestock_order_slaughter_order_outputs: this.slaughter_order_outputs
                }
            }

            let self = this
            this.loading = true
                    
            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.post(`${ApiUrl.url}livestock-order-slaughter-orders`, data, headers) 
            .then( (resp) => {
                setTimeout(function() {

                    self.loading = false
                    self.$emit("livestock-order-slaughter-order-created-success", resp.data.data)
                    self.$toasted.show(`Request Sent Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                    Custombox.modal.close()

                }, 2000)
            } )

            .catch( (err) => {

                if(err.response) {

                    setTimeout(function() {

                        self.loading = false

                        if(err.response.status == 422) {

                            for (const key of Object.keys(err.response.data.errors)) {

                                if(key == "dates") {
                                    self.$toasted.show(`Oops!! Something Went Wrong: Dates`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "export_zone_bundler_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong: Export Zone`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "livestock_order_stage_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong: Livestock Order Stage`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                }  else if(key == "description") {
                                    self.$toasted.show(`Oops!! Something Went Wrong: Description`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "livestock_order_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong: Livestock Order`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                } else if(key == "slaughter_order_bundler_id") {
                                    self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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

                    }, 2000)

                }

            } ) 

        },
        get_d_livestock_slaughter_outputs() {

            if(Object.keys(this.livestock_order_processing_stage_data).length <= 0) return false

            axios.get(`${ApiUrl.url}livestock-orders/${this.livestock_order_processing_stage_data.livestock_order_id}`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                this.livestock_order = resp.data.data                
                axios.get(`${ApiUrl.url}d-livestock-slaughter-outputs/d-livestocks/${this.livestock_order.d_livestock_id}`, {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                })

                .then( (resp) => {

                    this.d_livestock_slaughter_outputs = resp.data.data

                    this.d_livestock_slaughter_outputs.map( (d_livestock_slaughter_output) => {

                        if(d_livestock_slaughter_output.checked) {

                            let {livestock_order_id, livestock_order_stage_id, id} = this.livestock_order_processing_stage_data

                            let slaughter_order_output = {
                                livestock_order_id: livestock_order_id,
                                livestock_order_stage_id: livestock_order_stage_id,
                                livestock_order_processing_stage_id: id,
                                d_livestock_slaughter_output_id: d_livestock_slaughter_output.id
                            }
                        
                            this.slaughter_order_outputs.push(slaughter_order_output)

                        }

                    } )
                            
                } )

                .catch( (err) => {

                    if(err.response) {

                    if(err.response.status == 404) {

                        this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                    } else if(err.response.status == 401) {

                        this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                        this.$router.replace("/auth/login")

                    }

                    }

                } )

                        
            } )

            .catch( (err) => {

                if(err.response) {

                    if(err.response.status == 404) {

                        this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                    } else if(err.response.status == 401) {

                        this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                        this.$router.replace("/auth/login")

                    }

                }

            } )

        }
    },
    filters: {
        getMail(user) {

            return user.email == null ? "No Email Available" : user.email

        }
    }
}
</script>

<style >

    .fix-it {
        height: 300px;
    }

    .infor {
        height: 300px;
        background: white;
    }

    .scrollable {
        overflow-y: scroll;
    }

</style>