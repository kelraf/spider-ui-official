<template>
    <div>
        <Breadcrumbs main="Orders" title="Orders"/>
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
                          <div class="col-md-10 offset-md-1 mt-2 mb-4">
                            <b-button-group class="btn-group-pill">
                              <b-button @click="filterSlaughterOrders(1)" variant="outline-secondary">PENDING</b-button>
                              <b-button @click="filterSlaughterOrders(null)" variant="outline-secondary">ALL REQUESTS</b-button>
                              <b-button @click="filterSlaughterOrders(3)" variant="outline-secondary">IN PROGRESS</b-button>
                              <b-button @click="filterSlaughterOrders(4)" variant="outline-secondary">COMPLETED</b-button>
                              <b-button @click="filterSlaughterOrders(0)" variant="outline-secondary">REJECTED</b-button>
                            </b-button-group>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div class="container-fluid">

                          <div v-if="slaughter_orders.length > 0" class="row">

                              <div class="col-md-6 p-0">

                                  <SlaughterOrders :slaughterOrders="slaughter_orders" />

                              </div>

                              <div class="col-md-6 p-0">

                              </div>

                          </div>

                          <div v-if="slaughter_orders.length <= 0" class="row pt-5 pb-5">
                            <div class="col-md-6 text-center offset-md-3 pt-5 pb-5">
                              <h2> No Requests Available </h2>
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
import { mapState } from "vuex";
import SlaughterOrders from "./slaughter_orders"

export default {
  data() {
    return {
      slaughter_orders: [],
      store: [],
      livestock_order_slaughter_order: [],
      business_data: {}
    }
  },
  components: {
      SlaughterOrders
  },
  computed: {
      ...mapState({
          businessData: state => state.businessData.businessData
      })
  },
  mounted() {
    this.business_data = this.businessData
    this.get_data()
  },
  watch: {
    businessData: function() {
      this.get_data()
    }
  },
  methods: {
    get_data() {

        axios.get(`${ApiUrl.url}slaughter-order-bundlers/business/${this.businessData.id}`, {
              headers: {
                  Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
              }
        })
        .then( (resp) => {

            this.store = [
              ...resp.data.data.livestock_order_slaughter_orders
            ]

            this.slaughter_orders = this.store

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
    filterSlaughterOrders(statusParam) {

      if(statusParam == null) {

        this.slaughter_orders = this.store

      } else {

        this.slaughter_orders = this.store.filter((storeItem) => {

          if(storeItem.status == statusParam) return storeItem

        })

      } 

    }
  },
  filters: {
   
  }
}
</script>

<style scoped>

  .u-pearl-number {
    cursor: pointer !important;
  }

</style>