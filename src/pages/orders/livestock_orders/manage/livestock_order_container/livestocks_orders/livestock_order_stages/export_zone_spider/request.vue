<template>
    <div class="container-fluid">
        <div @click.self="close" class="row">
            <div class="col-md-6 offset-md-3">

                <form-wizard color="#4466f2" class="bg-white p-4 m-2" :start-index="0"  title="Export Zone Request Wizard" subtitle="Go Through The Wizard To Complete Request Info" back-button-text="Go back!" next-button-text="Go next!" finish-button-text="We're there">
                    <tab-content :before-change="checkSelected" class="p-0" title="Select Who To Send To Or Leave It">
                        <div class="setup-content p-0" id="step-2">
                            <div class="col-md-12 p-0">
                                
                                <div class="row p-0">
                                    <div class="col-md-12 p-0">
                                        <div class="card">
                                            <div class="card-body p-0">
                                                <div class="datatable-vue m-0">

                                                <div class="row m-0 filter-smart">
                                                    <div class="col-sm-4">
                                                        <!-- <input class="form-control" v-model="filters.unique_number.value" placeholder="Unique Number"/> -->
                                                    </div>
                                                    <div class="col-sm-3">
                                                        <!-- <input class="form-control" v-model="filters.type.value" placeholder="Type" /> -->
                                                    </div>
                                                </div>
                                                <div class="table-responsive vue-smart">
                                                
                                                <v-table
                                                    :data="export_zones" class="table"
                                                    :currentPage.sync="filter.currentPage"
                                                    :pageSize="1"
                                                    @totalPagesChanged="filter.totalPages = $event"
                                                    :filters="filters"
                                                >

                                                <thead slot="head">
                                                    <v-th sortKey="business_name">Name</v-th>
                                                    <v-th sortKey="capacity">Capacity</v-th>
                                                    <v-th sortKey="startdate">Select</v-th>
                                                </thead>
                                                <tbody slot="body" slot-scope="{displayData}">
                                                    <tr v-for="row in displayData" :key="row.id">
                                                        <td>{{ row.business.business_name }}</td>
                                                        <td>{{ row.capacity }}</td>
                                                        <td>

                                                            <button v-if="!row.selected" @click="selectIt(row)" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                                                Select
                                                            </button>

                                                            <button v-if="row.selected" @click="selectIt(row)" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                                                Selected
                                                            </button>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </v-table> 
                                            </div>

                                            <smart-pagination
                                            :currentPage.sync="filter.currentPage"
                                            :totalPages="filter.totalPages"
                                            />
                                        </div>
                                            </div>
                                    </div>
                                </div>
                                    
                                </div>

                            </div>
                        </div>
                    </tab-content>
                    <tab-content :before-change="checkDesc" title="Request Description">
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
                                            <img style="width: 20px;" v-if="loading" src="../../../../../../../../assets/images/loader.gif" alt="">
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
</template>

<script>

import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            export_zones: [],
            stage_data: {},
            loading: false,
            center_order: {},
            selected_export_zone: {},
            d_livestock_data: [],
            export_zone_livestock_order: {},
            editor: ClassicEditor,
            send_sms: false,
            dates: {
                starting_date: "",
                ending_date: ""
            },
            editorData: '',
            format: "dd/MM/yyyy",
            filter: {
                currentPage: 1,
                totalPages: 0,
            },
            selectrow: {
                currentPage: 1,
                totalPages: 0,
            },
            filters: {
                business_name: { value: '', keys: ['business_name', "sub_category", "quantity"] }
            }
        }
    },
    components: {
        ckeditor: CKEditor.component,
        Datepicker
    },
    props: {
        stageData: Object,
        exportZones: Array
    },
    watch: {
        stageData: {
            immediate: true,
            handler() {

                if(Object.keys(this.stageData).length > 0) {


                    this.stage_data = this.stageData
                    if(this.stage_data.export_zone_livestock_order !== null) {
                        this.export_zone_livestock_order = this.stage_data.export_zone_livestock_order
                        this.dates.starting_date = new Date(this.export_zone_livestock_order.dates.starting_date)
                        this.dates.ending_date = new Date(this.export_zone_livestock_order.dates.ending_date)
                        // this.editorData = this.export_zone_livestock_order.description
                    }

                }

            },
            deep: true
        },
        exportZones: {
            immediate: true,
            handler() {

                if(this.exportZones.length > 0) this.export_zones = this.exportZones

                if(this.exportZones.length > 0) this.export_zones.map( (export_zone) => { if(export_zone.selected) this.selected_export_zone = export_zone } )

            }
        }
    },
    mounted() {

    },
    methods: {
        close() {
            Custombox.modal.close()
        },
        checkSelected() {
            
            if(Object.keys(this.selected_export_zone).length == 0) {

                this.$toasted.show(`Please Select An Export Zone`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
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
        selectIt(row) {

            this.selected_export_zone = row

            this.export_zones = this.export_zones.map((export_zone) => { 

                export_zone.selected = false
                return export_zone

            })

            this.export_zones = this.export_zones.map((export_zone) => {

                if(export_zone.id == row.id) {
                    export_zone.selected = true
                    return export_zone
                } else {
                    export_zone.selected = false
                    return export_zone
                }

            })

        },
        checkDesc() {
            if(this.editorData == '') {
                this.$toasted.show(`Description is Required`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                return false
            } else {
                return true
            }
        },
        sendRequest() {

            if(!this.checkDates()[0]) return false

            if(this.stage_data.export_zone_livestock_order == null) {

                this.loading = true
                
                let data = {
                    export_zone_livestock_order: {
                        dates: this.checkDates()[1],
                        export_zone_bundler_id: this.selected_export_zone.id,
                        livestock_order_stage_id: this.stage_data.id,
                        livestock_order_id: this.stage_data.livestock_order_id,
                        description: this.editorData
                    }
                }

                let self = this
                        
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.post(`${ApiUrl.url}export-zone-livestock-orders`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("export-zone-request-created-success", resp.data.data)
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



            } else {

                let export_zone_livestock_order = this.export_zone_livestock_order
                // delete export_zone_livestock_order.description
                delete export_zone_livestock_order.dates
                delete export_zone_livestock_order.export_zone_bundler_id

                let new_values = {
                    dates: this.checkDates()[1],
                    export_zone_bundler_id: this.selected_export_zone.id,
                    description: this.editorData
                }

                let data = {
                    export_zone_livestock_order: {
                        ...export_zone_livestock_order, ...new_values
                    }
                }

                let self = this
                        
                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                axios.put(`${ApiUrl.url}export-zone-livestock-orders/${export_zone_livestock_order.id}`, data, headers) 
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.$emit("export-zone-request-updated-success", resp.data.data)
                        self.$toasted.show(`Request Updated Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
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

            }
            
        }
    }
}
</script>

<style>

</style>