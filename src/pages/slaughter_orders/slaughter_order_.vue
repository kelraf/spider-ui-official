<template>
    <div>
        <Breadcrumbs main="Order Details" title="Order Details"/>
        <!-- Container-fluid starts-->
        <div v-if="Object.keys(livestock_order_slaughter_order).length > 0" class="container-fluid">
            <div class="user-profile">
              <div class="row">

                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    
                    <div class="info">
                      <div class="row text-center">

                        <div class="col-md-3">
                          <div class="ttl-info">
                            <h6>Category</h6><span v-text="livestock_order_slaughter_order.livestock_order.d_livestock.category"> </span>
                          </div>
                        </div>

                        <div class="col-md-3">
                          <div class="ttl-info">
                            <h6>Type</h6><span v-text="livestock_order_slaughter_order.livestock_order.d_livestock.type"> </span>
                          </div>
                        </div>

                        <div class="col-md-3">
                          <div class="ttl-info">
                            <h6>Quantity</h6><span v-text="livestock_order_slaughter_order.livestock_order.quantity"> </span>
                          </div>
                        </div>

                        <div class="col-md-3">
                          <div class="ttl-info">
                            <h6>Status</h6>
                            <span>
                              <b-badge style="color: white;" v-if="livestock_order_slaughter_order.status == 1" variant="info">PENDING</b-badge>
                              <b-badge style="color: white;" v-if="livestock_order_slaughter_order.status == 2" variant="warning">ACCEPTED</b-badge>
                              <b-badge style="color: white;" v-if="livestock_order_slaughter_order.status == 3" variant="success">IN PROGRESS</b-badge>
                              <b-badge style="color: white;" v-if="livestock_order_slaughter_order.status == 4" variant="success">COMPLETED</b-badge>
                              <b-badge style="color: white;" v-if="livestock_order_slaughter_order.status == 0" variant="danger">REJECTED</b-badge>
                            </span>
                          </div>
                        </div>

                      </div>
                      <hr v-if="livestock_order_slaughter_order.status == 1">
                      <div v-if="livestock_order_slaughter_order.status == 1" class="follow">
                        <div class="row">
                          <div class="col-md-6 offset-md-3">

                            <div class="row mt-2">
                              <div class="col-md-6">
                                  <button @click="editLivestockOrderSlaughterOrder('reject')" id="default-outline-danger" type="button" class="btn btn-sm btn-pill btn-outline-danger btn-block text-center">
                                      REJECT
                                  </button>
                              </div>
                              <div class="col-md-6">
                                  <button @click="editLivestockOrderSlaughterOrder('accept')" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block text-center">
                                      ACCEPT
                                  </button>
                              </div>
                          </div>

                          </div>
                        </div>
                      </div>

                      <hr>

                      <div v-if="Object.keys(dates).length > 0" class="follow">
                        <div class="row">
                          
                          <div class="col-xl-6 xl-100">
                            <div class="card">
                              <div class="cal-date-widget card-body">
                                <div class="row">
                                  <div class="col-xl-6 col-xs-12 col-md-6 col-sm-6">
                                    <h6 class="text-center">FROM</h6> <sup v-text="dates.starting_date.day"></sup>
                                    <div class="cal-info text-center">
                                      <h2 class="font-secondary" v-text="dates.starting_date.date"></h2>
                                      <div class="d-inline-block mt-2"><span class="b-r-dark pr-3 font-success" v-text="dates.starting_date.month">  </span><span class="pl-3 font-primary" v-text="dates.starting_date.year">  </span></div>
                                    </div>
                                  </div>
                                  <div class="col-xl-6 col-xs-12 col-md-6 col-sm-6">
                                    <h6 class="text-center">FROM</h6> <sub v-text="dates.ending_date.day"></sub>
                                    <div class="cal-info text-center">
                                      <h2 class="font-secondary" v-text="dates.ending_date.date"></h2>
                                      <div class="d-inline-block mt-2"><span class="b-r-dark pr-3 font-success" v-text="dates.ending_date.month">  </span><span class="pl-3 font-primary" v-text="dates.ending_date.year">  </span></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      <hr>
                      
                      <div class="follow">
                          <div class="row">

                            <div class="col-6 text-left border-right">
                              <h5> <b>Order Description</b> </h5>
                              
                              <div v-if="livestock_order_slaughter_order.description.length > 0" class="description" v-html="livestock_order_slaughter_order.description">

                              </div>

                              <div v-else class="container-fluid">
                                <div class="row">
                                  <div class="col-md-8 offset-md-2">
                                    No Description Available
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div class="col-6 text-center border-right">

                              <h5> <b>Final Output</b> </h5>
                              
                              <div v-if="livestock_order_slaughter_order.livestock_order_slaughter_order_outputs.length > 0" style="max-height: 450px; overflow-y: scroll;">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">OutPut Name</th>
                                      <th scope="col">Quantity</th>
                                      <th scope="col">Units</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    
                                    <tr v-for="(livestock_order_slaughter_order_output, index) in livestock_order_slaughter_order.livestock_order_slaughter_order_outputs" :key="index">
                                      <td>
                                        <p class="font-primary"> {{ livestock_order_slaughter_order_output.d_livestock_slaughter_output.output_name }} </p>
                                      </td>
                                      <td>
                                        <p> {{ livestock_order_slaughter_order_output.quantity | displayQuantity }} </p>
                                      </td>
                                      <td>
                                        <p> {{ livestock_order_slaughter_order_output.units | displayUnits }} </p>
                                      </td>
                                      <td>
                                        <button 
                                          v-if="livestock_order_slaughter_order_output.quantity == null && livestock_order_slaughter_order_output.units == null" 
                                          id="default-outline-secondary" 
                                          type="button" 
                                          class="btn btn-xs btn-pill btn-outline-secondary btn-block"
                                        >
                                          COMPLETE
                                        </button>
                                        <button
                                          v-if="livestock_order_slaughter_order_output.quantity !== null && livestock_order_slaughter_order_output.units !== null" 
                                          id="default-outline-secondary" 
                                          type="button" 
                                          class="btn btn-xs btn-pill btn-outline-secondary btn-block"
                                        >
                                            UPDATE
                                        </button>
                                      </td>
                                    </tr>

                                  </tbody>
                                </table>
                              </div>

                              <div v-else class="container-fluid mt-5 pt-5 mb-5 pb-5">
                                <div class="row mt-5 pt-5 mb-5 pb-5">
                                  <div class="col-md-8 offset-md-2">
                                    <h5>
                                      <b>No OutPut Provided</b>
                                    </h5>
                                  </div>
                                </div>
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


        <Reject 
        v-on:livestock-order-slaughter-order-edit-success="livestockOrderSlaughterOrderEditSuccess" 
        :actionData="action_data" 
        id="reject" 
        style="display: none;" 
        />

        <Accept 
            v-on:livestock-order-slaughter-order-edit-success="livestockOrderSlaughterOrderEditSuccess" 
            :actionData="action_data" 
            id="accept" 
            style="display: none;" 
        />

    </div>
</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import Accept from "./confirm/accept"
import Reject from "./confirm/reject"

export default {
  data() {
    return {
      dates: {},
      action_data: {},
      livestock_order_slaughter_order: {}
    }
  },
  components: {
    Accept,
    Reject
  },
  watch: {
   livestock_order_slaughter_order: function() {
     this.processDates()
   }
  },
  mounted() {

    this.loadData()
    
  },
  methods: {
    loadData() {

      axios.get(`${ApiUrl.url}/livestock-order-slaughter-orders/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.livestock_order_slaughter_order = resp.data.data
        this.processDates() 
        
      } )

      .catch( (err) => {

        if(err.response) {

          if(err.response.status == 404) {

            console.log("Error 404")

          } else if(err.response.status == 401) {

            this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            this.$router.replace("/auth/login")

          }

        }

      } )
    },
    processDates() {

      if(Object.keys(this.livestock_order_slaughter_order).length <= 0) return

      let starting_date = this.livestock_order_slaughter_order.dates.starting_date.split(" ")
      let ending_date = this.livestock_order_slaughter_order.dates.ending_date.split(" ")

      this.dates = {
        starting_date: {
          day: starting_date[0],
          date: starting_date[2],
          month: starting_date[1],
          year: starting_date[3]
        },
        ending_date: {
          day: ending_date[0],
          date: ending_date[2],
          month: ending_date[1],
          year: ending_date[3]
        }
      }

    },
    editLivestockOrderSlaughterOrder(action) {

        this.action_data = {
          action: action,
          ...this.livestock_order_slaughter_order
        }
        
        let modal = new Custombox.modal({
            content: {
                effect: 'slip',
                target: `#${action}`
            }
        })

        modal.open()

    },
    livestockOrderSlaughterOrderEditSuccess(data) {

      this.livestock_order_slaughter_order = data

    }
  },
  filters: {
    displayQuantity(quantity) {
      if(quantity == null) return "pending"
      else return quantity
    },
    displayUnits(units) {
      if(units == null) return "pending"
      else return units
    }
  }
}
</script>

<style>
  .group-btn {
    display: block;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .group-btn div {
    margin: auto;
  }

  #model-edit-profile {
    width: 60%;
    height: auto;
  }

  .cardheader {
    height: 150px !important;
  }
</style>