<template>
    <div>
        <Breadcrumbs main="Center Order" title="Center Order"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">
                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Reference Number</h6><span># {{ center_order.id }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Required Animals</h6><span> {{ center_order.required_animals }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Total Price</h6><span> {{ center_order.total_price }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Available Animals</h6><span> {{ center_order.available_animals }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Price Per Animal</h6><span> {{ center_order.price_per_animal }} </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Total Price Available</h6><span> {{ center_order.total_price_available }} </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                  <i class="icon-pencil-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr>

                      <form-wizard color="#4466f2" :start-index="0" title="Center Order Wizard" subtitle="Go Through The Wizard To Complete The Order Info" back-button-text="Go back!" next-button-text="Go next!" finish-button-text="We're there">
                        <!-- <tab-content title="Preview market Statistics">
                          <div class="setup-content" id="step-1">
                            <div class="col-xs-12">
                              <div class="col-md-12">
                                <LivestockMarketStats />
                              </div>
                            </div>
                          </div>
                        </tab-content> -->
                        <tab-content title="Select Who To Send To Or Leave It">
                          <div class="setup-content" id="step-2">
                            <div class="col-xs-12">
                              <div class="col-md-12">
                                <div v-if="d_livestock_data.length > 0" class="row">

                                    <div class="col-md-12">
                                      <div class="card">
                                        <div class="card-header text-left">
                                          <h5 class="card-title">Available Livestocks</h5>
                                        </div>
                                        <div class="card-body">
                                          <div class="table-responsive datatable-vue m-0 vue-smart">
                                            <v-table
                                                :data="d_livestock_data" class="table"
                                                :currentPage.sync="selectrow.currentPage"
                                                :pageSize="10"
                                                @totalPagesChanged="selectrow.totalPages = $event"
                                                selectionMode="multiple"
                                                selectedClass="table-primary"
                                                @selectionChanged="selectedRows = $event"
                                            >

                                              <thead slot="head">
                                              <v-th sortKey="business_name">Business Name</v-th>
                                              <v-th sortKey="sub_category">Sub Category</v-th>
                                              <v-th sortKey="quantity">Quantity</v-th>
                                              <v-th sortKey="price">Price Per Animal</v-th>
                                              <v-th sortKey="quantity">Stats</v-th>
                                              <v-th sortKey="salary">Action</v-th>
                                              </thead>
                                              <tbody slot="body" slot-scope="{displayData}">
                                              <v-tr
                                                  v-for="row in displayData"
                                                  :key="row.id"
                                                  :row="row"
                                              >
                                                <td>{{ row.business.business_name }}</td>
                                                <td>{{ row.business.sub_category }}</td>
                                                <td>{{ row.quantity }}</td>
                                                <td>{{ row.price }}</td>
                                                <td>{{ row.quantity }}</td>
                                                <td> <button>Wait</button> </td>
                                              </v-tr>
                                              </tbody>
                                            </v-table>

                                            <smart-pagination
                                                :currentPage.sync="selectrow.currentPage"
                                                :totalPages="selectrow.totalPages"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>

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
                        <tab-content title="Preview And Send">
                          <div class="setup-content" id="step-4">
                              <div class="container-fluid">
                                <div class="row">

                                  <div class="col-md-6">
                                  <div class="card">
                                    <div class="card-body">

                                        <div class="media feather-main">
                                        <div class="media-body align-self-center">
                                            <h6>Valid Until</h6>
                                        </div>
                                        </div>

                                        <div class="media feather-main">

                                        <div class="col-xl-6 xl-100">
                                            <div class="row pt-4">

                                            <div class="col-md-12">
                                                <datepicker v-model="valid_until" input-class="datepicker-here form-control digits" placeholder="Day/Month/Year" :format="format" ></datepicker>
                                            </div>

                                            </div>
                                        </div>
                                        
                                        </div>

                                    </div>

                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="card">
                                    <div class="card-body">

                                        <div class="media feather-main">
                                        <div class="media-body align-self-center">
                                            <h6>Go Live</h6>
                                        </div>
                                        </div>

                                        <div class="media feather-main">

                                        <div class="col-xl-6 xl-100">
                                            <div class="row pt-4">

                                            <div class="col-md-6">
                                              <div class="media">
                                                <label class="col-form-label m-r-10">Send SMS</label>
                                                <div class="media-body text-right icon-state switch-outline">
                                                  <label class="switch">
                                                    <input v-model="send_sms" type="checkbox"><span class="switch-state bg-warning"></span>
                                                  </label>
                                                </div>
                                              </div>
                                            </div>

                                            <div class="col-md-6">

                                              <button @click="goLive" id="default-outline-warning" type="button" class="btn btn-pill btn-outline-warning btn-block">
                                                  <span v-if="!loading">Go Live</span>
                                                  <img style="width: 20px;" v-if="loading" src="../../../../../../assets/images/loader.gif" alt="">
                                              </button>

                                            </div>

                                            </div>
                                        </div>
                                        
                                        </div>

                                    </div>

                                  </div>
                                </div>

                                </div>  
                              </div>                                  
                          </div>
                        </tab-content>
                      </form-wizard>
                      
                      <!-- <div class="follow">
                        <div class="row">
                          <div class="col-md-4 text-md-right border-right">
                            
                            <CenterOrderDescription />

                          </div>
                        </div>
                      </div> -->
                      

                      <!-- <div v-if="message !== '' && livestocks.length <= 0" class="row pt-5">
                        <div class="col-md-6 text-center offset-md-3 pt-5">
                          <div class="container pt-5">
                            <div class="row">
                              <div class="col-6 offset-3">
                                <button id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">Done</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> -->

                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->
                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>

import {ApiUrl} from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"
import axios from "axios"

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Datepicker from 'vuejs-datepicker';

import LivestockMarketStats from "../../../../../../components/charts/livestock_orders/center_orders/center_order_preview_market_chart"
import CenterOrderDescription from "./center_order_description/center_order_description"

export default {
  data() {
    return {
      loading: false,
      center_order: {},
      d_livestock_data: [],
      editor: ClassicEditor,
      send_sms: false,
      valid_until: '',
      editorData: '',
      format: "dd/MM/yyyy",
      basic:{
				currentPage: 1,
				totalPages: 0,
			},

			filter:{
				currentPage: 1,
				totalPages: 0,
			},

			agefilter:{
				currentPage: 1,
				totalPages: 0,
			},

			selectrow:{
				currentPage: 1,
				totalPages: 0,
			},
			selectedRows: [],
			filters: {
				business_name: { value: '', keys: ['business_name', "sub_category", "quantity"] }
			},

			agefilters:{
				age: { value: { min: 19, max: 22 }, custom: this.ageFilter }
			}
    }
  },
  components: {
    LivestockMarketStats,
    CenterOrderDescription,
    ckeditor: CKEditor.component,
    Datepicker
  },
  methods: {
    checkDesc() {
      if(this.editorData == '') {
        this.$toasted.show(`Description is Required`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
        return false
      } else {
        return true
      }
    },
    goLive() {

      this.loading = true
      
      if(this.selectedRows.length > 0) this.selectedRows = this.selectedRows.map((selectedRow) => { return {business_id: selectedRow.business_id} })
      this.center_order.who_can_see = this.selectedRows
      this.center_order.status = "online"
      this.center_order.description = this.editorData == "" ? null : this.editorData
      this.center_order.send_sms = this.send_sms
      this.center_order.valid_until = this.valid_until == "" ? null : this.valid_until

      let headers = {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      }

      let self = this

      axios.put(`${ApiUrl.url}center-orders/${this.center_order.id}`, {center_order: this.center_order}, headers) 
      .then( (resp) => {
          setTimeout(function() {

              self.loading = false
              self.$router.go(-1)

              console.log(resp)

          }, 2000)
      } )

      .catch( (err) => {

        if(err.response) {

            setTimeout(function() {

                self.loading = false

                if(err.response.status == 422) {

                    for (const key of Object.keys(err.response.data.errors)) {

                        if(key == "quantity") {
                            self.form.quantity.error = err.response.data.errors.quantity[0]
                            self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.quantity[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                        } else if(key == "price") {
                            self.form.price.error = err.response.data.errors.price[0]
                            self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.price[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                        } else if(key == "d_livestock_id") {
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

                } else if(err.response.status == 404) {

                    this.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

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
  },
  mounted() {

    axios.get(`${ApiUrl.url}center-orders/${this.$route.params.id}`, {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      })
      .then( (resp) => {

        this.center_order = resp.data.data

        if(this.center_order.description !== null) this.editorData = this.center_order.description

        axios.get(`${ApiUrl.url}livestocks/dlivestocks/${this.center_order.d_livestock_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.d_livestock_data = resp.data.data

            if(this.center_order.who_can_see.length > 0) {

              for (const who_can of this.center_order.who_can_see) {

                for (const d_livestock_with_id of this.d_livestock_data) {

                  if(who_can.business_id == d_livestock_with_id.business_id) this.selectedRows.push(d_livestock_with_id)
                  
                }
                
              }

            }

            console.log("Here ---->>",this.selectedRows)
                    
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

  },
  filters: {
    get_category: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.category

    },
    get_type: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.type

    }
  }
}
</script>