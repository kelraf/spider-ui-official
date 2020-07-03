<template>
    <div>
        <Breadcrumbs main="Livestock Order" title="Livestock Order"/>
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
                                <h6>Reference Number</h6><span># {{ livestock_order.id }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Category</h6><span> {{ livestock_order | get_category }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Type</h6><span> {{ livestock_order | get_type }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Quantity</h6><span> {{ livestock_order.quantity }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Price per Animal</h6><span> {{ livestock_order.price }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Total Cost</h6><span> {{ livestock_order.total_cost }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr>

                      <div class="follow">
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

                      <div v-if="stages.length > 0" class="u-pearls-sm row mb-5">
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

                      <router-view></router-view>
                      
                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->
                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->

        <AddStage id="add-stage" v-on:add-stage-success="handleAddStageSuccess" :livestockOrder="livestock_order" style="display: none;" />

    </div>
</template>

<script>

import {ApiUrl} from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"
import AddStage from "./livestock_order_stages/add_stage"
import axios from "axios"

export default {
  data() {
    return {
      livestock_order: {},
      center_order: {},
      stages: []
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

      axios.get(`${ApiUrl.url}livestock-orders/${this.$route.params.id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.livestock_order = resp.data.data
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
      
      if(stage.stage_name == "collection") this.$router.push({path: `/orders/livestock-order/${this.livestock_order.id}/stages-collection/${stage.id}`})

      if(stage.stage_name == "ccp") this.$router.push({path: `/orders/livestock-order/${this.livestock_order.id}/stages-c-c-p-l-order/${stage.id}`})

      if(stage.stage_name == "export-zone") this.$router.push({path: `/orders/livestock-order/${this.livestock_order.id}/stages-export-zone-spider/${stage.id}`})

      if(stage.stage_name == "processing") this.$router.push({path: `/orders/livestock-order/${this.livestock_order.id}/stages-processing/${stage.id}`})

      if(stage.stage_name == "feedlot") this.$router.push({path: `/orders/livestock-order/${this.livestock_order.id}/stages-feedlot/${stage.id}`})

    },
    process_data() {

      this.center_order = this.livestock_order.center_order

      if(this.livestock_order.livestock_order_stages.length > 0) {

        this.stages = this.livestock_order.livestock_order_stages

        this.goToStage(this.stages[0])

      }

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
    }
  },
  filters: {
    get_category: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.category

    },
    get_type: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.type

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