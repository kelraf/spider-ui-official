<template>
    <div>
        <Breadcrumbs main="Produce Order" title="Produce Order"/>
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
                                <h6>Ref Animal</h6><span> {{ produce_order | get_referenced_animal }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Produce Name</h6><span> {{ produce_order | get_produce_name }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Quantity</h6><span> {{ produce_order.quantity }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Units</h6><span> {{ produce_order | get_units }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Price per Unit</h6><span> {{ produce_order.price_per_unit }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Total Cost</h6><span> {{ produce_order.total_cost }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr v-if="stages.length && stages[0].produce_center_order !== null">

                      <div v-if="stages.length && stages[0].produce_center_order !== null" class="follow">
                        <div class="row">
                          <div class="col-md-8 offset-md-2 mt-2 mb-4">
                            <b-button-group class="btn-group-pill">
                              <b-button variant="outline-secondary">Swap Stages</b-button>
                              <b-button variant="outline-secondary">Delete Stage</b-button>
                              <b-button @click="addStage" variant="outline-secondary">Add Stage</b-button>
                            </b-button-group>
                          </div>
                        </div>
                      </div>

                      <div v-if="stages.length && stages[0].produce_center_order !== null" class="u-pearls-xs row mb-5">
                        <div
                          v-for="(stage, index) in stages" 
                          :key="index" 
                          class="u-pearl done"
                          :class="[stages.length == 1 ? 'col-6 offset-3' : stages.length == 2 ? 'col-4' : stages.length == 3 ? 'col-4' : stages.length == 4 ? 'col-3' : 'col-2'  ]"
                          @click="goToStage(stage)"
                          >
                          <span class="u-pearl-number"> {{ index += 1 }} </span><span class="u-pearl-title"> {{ stage.stage_name | rm_dash_from_stage_names }} </span>
                        </div>
                      </div>

                      <hr />

                      <div v-if="!stages.length || stages.length && stages[0].produce_center_order == null" class="row pt-5">
                        <div class="col-md-6 text-center offset-md-3 pt-5">
                            
                            <h2 v-if="!stages.length" class="font-success"> <b>Order Received Ready To Launch</b> </h2>

                            <h2 v-if="stages.length && stages[0].produce_center_order == null" class="font-success"> <b>Almost There </b> </h2>

                            <div class="container pt-5">
                                <div class="row">
                                    <div class="col-6 offset-3">

                                        <button v-if="!stages.length" id="default-outline-primary" @click="launchFirstProduceStage" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                            <span v-if="!loading">START NOW</span>
                                            <img style="width: 20px;" v-if="loading" src="../../../../../../assets/images/loader.gif" alt="">
                                        </button>
                                        
                                        <button v-if="stages.length && stages[0].produce_center_order == null" id="default-outline-success" @click="launchProduceCenterOrder" type="button" class="btn btn-pill btn-outline-success btn-block">
                                            <span v-if="!loading">COMPLETE</span>
                                            <img style="width: 20px;" v-if="loading" src="../../../../../../assets/images/loader.gif" alt="">
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                      <router-view></router-view>
                      
                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->
                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->

        <AddStage id="add-stage" v-on:add-stage-success="handleAddStageSuccess" :produceOrder="produce_order" style="display: none;" />

    </div>
</template>

<script>

import {ApiUrl} from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"
import AddStage from "./produce_order_stages/add_stage"
import axios from "axios"

export default {
  data() {
    return {
      produce_order: {},
      produce_center_order: {},
      stages: [],
      loading: false
    }
  },
  components: {
    AddStage
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {

      axios.get(`${ApiUrl.url}produce-orders/${this.$route.params.id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
      })
      .then( (resp) => {

          this.produce_order = resp.data.data
          this.process_data()
                  
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
    goToStage(stage) {
      
      if(stage.stage_name == "collection") this.$router.replace({path: `/dashboard/produce-order/${this.produce_order.id}/stages-collection/${stage.id}`})

      if(stage.stage_name == "ccp") this.$router.replace({path: `/dashboard/produce-order/${this.produce_order.id}/stages-c-c-p-p-order/${stage.id}`})

      if(stage.stage_name == "processing") this.$router.replace({path: `/dashboard/produce-order/${this.produce_order.id}/stages-processing/${stage.id}`})

    },
    process_data() {

      if(this.produce_order.produce_order_stages.length > 0) {

        this.stages = this.produce_order.produce_order_stages

        if(!this.stages.length) return

        this.indexStage()

      }

    },
    indexStage() {

      let stage = this.stages[0]

      if(stage.stage_name == "collection") this.$router.replace({path: `/dashboard/produce-order/${this.produce_order.id}/stages-collection/${stage.id}`})
    },
    addStage() {
      let modal = new Custombox.modal({
          content: {
              effect: 'slip',
              target: '#add-stage'
          }
      })

      modal.open()
    },
    handleAddStageSuccess(data){
      this.get_data()
    },
    launchFirstProduceStage: function() {
                   
        this.loading = true

        let data = {
            produce_order_stage : {
                stage_name: "collection",
                produce_order_id: this.produce_order.id,
                stage_number: 1
            }
        }  
        
        let self = this
            
        let headers = {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        }

        axios.post(`${ApiUrl.url}produce-order-stages`, data, headers) 
        .then( (resp) => {
            setTimeout(function() {

                self.stages.push(resp.data.data)
                self.loading = false
                self.$toasted.show(`Stage Added Successfully`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})

            }, 2000)
        } )

        .catch( (err) => {

            if(err.response) {

                setTimeout(function() {

                    self.loading = false

                    if(err.response.status == 422) {

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

                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 422`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                    } else if(err.response.status == 401) {

                        self.$toasted.show(`Authentication Required. Please Login. : 401`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                        self.$router.replace("/auth/login")

                    } else if(err.response.status == 400) {

                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                    } else if(err.response.status == 500) {

                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                    }

                }, 2000)

            }

        } )     

    },
    launchProduceCenterOrder() {

        this.loading = true

        let data = {
            produce_center_order : {
                required_quantity: this.produce_order.quantity,
                produce_order_id: this.produce_order.id,
                produce_order_stage_id: this.stages[0].id,
                d_produce_id: this.produce_order.d_produce_id
            }
        }  
        
        let self = this
            
        let headers = {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        }

        axios.post(`${ApiUrl.url}produce-center-orders`, data, headers) 
        .then( (resp) => {
            setTimeout(function() {

                self.stages[0].produce_center_order = resp.data.data
                self.loading = false
                self.indexStage()
                self.$toasted.show(`Successfully Launched Order`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})

            }, 2000)
        } )

        .catch( (err) => {

            if(err.response) {

                setTimeout(function() {

                    self.loading = false

                    if(err.response.status == 422) {

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

                        self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 422`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                    } else if(err.response.status == 401) {

                        self.$toasted.show(`Authentication Required. Please Login. : 401`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
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
  },
  filters: {
    get_referenced_animal: function(produce_order) {

      if(produce_order.d_produce !== undefined) return produce_order.d_produce.referenced_animal

    },
    get_produce_name: function(produce_order) {

      if(produce_order.d_produce !== undefined) return produce_order.d_produce.produce_name

    },
    get_units: function(produce_order) {

      if(produce_order.d_produce !== undefined) return produce_order.d_produce.units

    },
    rm_dash_from_stage_names: function(value) {

      return value.split("-").join(" ")

    }
  }
}
</script>

<style scoped>

  .u-pearl-number {
    cursor: pointer !important;
  }

</style>