<template>
    <div>
        <Breadcrumbs main="Livestock Sales" title="Livestock Sales"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">
                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="info">

                      <hr>

                      <div class="follow">
                        <div class="row">
                          <div class="col-md-8 offset-md-2 mt-2 mb-4">
                            <b-button-group class="btn-group-pill">
                              <b-button variant="outline-secondary">All Sales</b-button>
                              <b-button variant="outline-secondary">In Progress</b-button>
                              <b-button variant="outline-secondary">Completed</b-button>
                              <b-button variant="outline-secondary">Cancled</b-button>
                            </b-button-group>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div class="container-fluid">
                          <div v-if="livestock_sales.length > 0" class="row">

                              <div class="col-md-6 p-0">

                                  <Sales :livestockSales="livestock_sales" />

                              </div>

                              <div class="col-md-6 p-0">

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

    </div>
</template>

<script>

import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import axios from "axios"
import Sales from "./sales"

export default {
  data() {
    return {
      livestock_order: {},
      center_order: {},
      stages: [],
      livestock_sales: []
    }
  },
  components: {
      Sales
  },
  mounted() {
    this.get_data()
  },
  methods: {
    get_data() {

      axios.get(`${ApiUrl.url}livestock-sales`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.livestock_sales = resp.data.data

            console.log(this.livestock_sales)

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