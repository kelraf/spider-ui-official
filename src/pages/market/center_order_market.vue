<template>
    <div>
        <Breadcrumbs main="Center Order" title="Center Order"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">

            <div v-if="center_order.status == 'complete'" class="row pt-5">
              <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> Oops!! Order Have Already Been Taken </h2>

                <div class="container pt-5">
                  <div class="row">
                    <div class="col-6 offset-3">
                      <button id="default-outline-primary" @click="$router.go(-1)" type="button" class="btn btn-pill btn-outline-primary btn-block">
                        BACK
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div v-if="center_order.status == 'offline'" class="row pt-5">
              <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> Oops!! Order is not Available </h2>

                <div class="container pt-5">
                  <div class="row">
                    <div class="col-6 offset-3">
                      <button id="default-outline-primary" @click="$router.go(-1)" type="button" class="btn btn-pill btn-outline-primary btn-block">
                        BACK
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div v-if="center_order.status == 'online'" class="user-profile">
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
                                <h6>Ref No</h6><span># {{ center_order.id }} </span>
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
                                <!-- <h6>Total Price</h6><span> {{ center_order.total_price }} </span> -->
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
                                <!-- <h6>Price Per Animal</h6><span> {{ center_order.price_per_animal }} </span> -->
                              </div>
                            </div>

                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <!-- <h6>Total Price Available</h6><span> {{ center_order.total_price_available }} </span> -->
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
                      <hr>
                      
                      <div class="follow">
                        <div class="row">

                          <div style="max-height: 500px;" class="col-md-6 text-md-left border-right">

                            <div class="row">
                              <div class="col-12 font-secondary">
                                <h3>
                                  <b>Description</b>
                                </h3>
                              </div>
                            </div>

                            <div class="row">

                              <div v-html="center_order.description" ref="centerOrderDescription" :class="window_event.make_it_scrollable ? 'scrollable' : ''" class="col-12">

                              </div>

                              <!-- <div v-if="center_order.description.length <= 0" class="row pt-5">
                                  <div class="col-md-6 text-center offset-md-3 pt-5">
                                    <div class="container pt-5">
                                      <div class="row">
                                        <div class="col-6 offset-3">
                                          
                                          <b>NO DESCRIPTION</b>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> -->
                            </div>
                          </div>

                          <div class="col-md-6 font-17 text-md-right">
                            
                             <!-- Container-fluid starts-->
                              <div class="container-fluid order-details-fit-it">
                                  <div class="user-profile">

                                  <div v-if="animal_available" class="row">
                                      <!-- user profile first-style start-->
                                      <div class="col-sm-12 p-0">
                                      <div class="card hovercard text-center">
                                          <div class="info">
                                          <div class="row">

                                              <div v-if="sale_made" class="row pt-5">
                                                <div class="col-md-12 font-success text-center pt-5">
                                                  <h2> 
                                                    <b>
                                                      It Seems Like You Have Already Made A Sale Request For This Order.
                                                    </b>
                                                  </h2>

                                                  <div class="container pt-5">
                                                    <div class="row">
                                                      <div class="col-6 offset-3">
                                                        <button id="default-outline-primary" @click="$router.go(-1)" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                                          BACK
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </div>
                                              </div>

                                              <div v-if="!sale_made" class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">

                                                  <div class="row">
                                                      <div class="col-12 pb-3 text-left">
                                                          <b>MY STORE</b>
                                                      </div>
                                                  </div>

                                                  <div class="row">
                                                      <div class="col-8 offset-2 pb-3 text-left">
                                                          <button @click="openSellNow" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                                                              SELL NOW
                                                          </button>
                                                      </div>
                                                  </div>

                                                  <div class="row mt-3">

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6>Category</h6><span> {{ center_order.d_livestock.category }} </span>
                                                          </div>
                                                      </div>

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6>Type</h6><span> {{ center_order.d_livestock.type }} </span>
                                                          </div>
                                                      </div>

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6>Quantity</h6><span> {{ animal_to_sell.quantity }} </span>
                                                          </div>
                                                      </div>
                                                      
                                                  </div>

                                                  <div class="row mt-3">

                                                      <div class="col-md-6">
                                                          <div class="font-success text-left">
                                                              <h6>Price Per Animal</h6><span> Kshs {{ animal_to_sell.price }} </span>
                                                          </div>
                                                      </div>

                                                  </div>

                                                  <div class="row text-left pt-5">
                                                    <div class="col-12">
                                                      <b>YOU CAN SELL</b>
                                                    </div>
                                                  </div>

                                                  <div class="row mt-3">

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6> Total Animals </h6><span> {{ possible_sell.to_sell }} </span>
                                                          </div>
                                                      </div>

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6> Total Cost </h6><span> {{ possible_sell.total_price }} </span>
                                                          </div>
                                                      </div>

                                                      <div class="col-md-4">
                                                          <div class="font-success text-left">
                                                              <h6>You New Quantity</h6><span> {{ possible_sell.new_quantity }} </span>
                                                          </div>
                                                      </div>
                                                      
                                                  </div>

                                              </div>

                                          </div>

                                          <hr />
                                          
                                          </div>
                                      </div>
                                      </div>
                                      <!-- user profile first-style end-->
                                      
                                  </div>

                                  <div v-if="!animal_available" class="row animated bounceIn pt-5 pb-5 mb-5">
                                    <div class="col-md-12 text-center pt-5">
                                      <div class="container pt-5">

                                        <div class="row">
                                          <div class="col-12 font-secondary">
                                            <h3>
                                              <b>You Don't Have This Type of Animal</b>
                                            </h3>
                                          </div>
                                        </div>

                                        <div class="row">
                                          <div class="col-6 offset-3">
                                            <button id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">Add</button>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </div>

                                  </div>
                              </div>
                              <!-- Container-fluid Ends-->

                          </div>

                        </div>
                      </div>
                      

                      <!-- <div v-if="!animal_available" class="row animated bounceIn pt-5">
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

        <SellNow v-on:sale-made-success="saleRequestMadeSuccess" :centerOrder="center_order" :animalToSell="animal_to_sell" style="display: none;" id="sell-now" />

    </div>
</template>

<script>

import {ApiUrl} from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import SellNow from "./sell_now"
import axios from "axios"
import { mapState } from "vuex";

export default {
  data() {
    return {
      window_event: {
        center_order_description: null,
        make_it_scrollable: false
      },
      d_livestock_data: {},
      center_order: {},
      animal_available: false,
      animal_to_sell: {},
      sale_made: false
    }
  },
  components: {
    SellNow
  },
  computed: {
    ...mapState({
      businessData: state => state.businessData.businessData
    }),
    possible_sell: function() {

        let capacity = this.center_order.required_animals - this.center_order.available_animals

        if(this.animal_to_sell.quantity >= capacity) {

          return {
            to_sell: capacity, 
            total_price: capacity * this.animal_to_sell.price, 
            new_quantity: this.animal_to_sell.quantity - capacity
          }

        } else if(this.animal_to_sell.quantity < capacity) {

          return {
            to_sell: this.animal_to_sell.quantity, 
            total_price: this.animal_to_sell.quantity * this.animal_to_sell.price, 
            new_quantity: 0
          }

        }

    }
  },
  watch: {
    businessData: function() {

      this.getLivestocksUsingBusinessId()
      this.saleMade()

    }
  },
  methods: {
    saleRequestMadeSuccess(data) {

      if(Object.keys(this.center_order).length <= 0) return 

      this.getCenterOrder()
      this.saleMade()

    },
    saleMade() {
      if(Object.keys(this.businessData).length > 0 && Object.keys(this.center_order).length > 0) {

          if(this.center_order.livestock_sales.length > 0) {
            
            this.center_order.livestock_sales.map((livestock_sale) => {

              if(livestock_sale.business_id == this.businessData.id) this.sale_made = true

            })

          }

      }
    },
    openSellNow() {

      let modal = new Custombox.modal({
          content: {
              effect: 'slip',
              target: '#sell-now'
          }
      })

      modal.open()

    },
    windowResizeHandler() {

      if(this.$refs.centerOrderDescription == undefined) return false
      
      this.window_event.center_order_description = this.$refs.centerOrderDescription.clientHeight

      if(this.window_event.center_order_description > 400) this.window_event.make_it_scrollable = true

      window.addEventListener("resize", () => {
        
        if(this.window_event.center_order_description > 400) this.window_event.make_it_scrollable = true

      })

    },
    getLivestocksUsingBusinessId() {

      if(Object.keys(this.businessData).length > 0) {

        let headers = {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        }

        axios.get(`${ApiUrl.url}livestocks/business/${this.businessData.id}`, headers)
        .then( (resp) => {

          if(resp.data.data.length <= 0) {
              this.$toasted.show(`You Don't Have This Type Of Animal.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
              this.$toasted.show(`Please Add Then Try Again.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
          } else {

              this.livestocks = resp.data.data

              this.livestocks.map((livestock) => {

                  if(livestock.d_livestock_id == this.center_order.d_livestock_id) this.animal_to_sell = livestock

              })

              if(Object.keys(this.animal_to_sell).length <= 0) {

                this.$toasted.show(`You Done Have This Type Of Animal.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
                this.$toasted.show(`Please Add Then Try Again.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})

              } else {

                this.animal_available = true
                this.saleMade()
                delete this.animal_to_sell.business

              }


          }

        } )
        .catch( (err) => {

          if(err.response) {

            if (err.response.status == 401) {
              
              this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
              this.$router.replace("/auth/login")

            }

          }

        } )

      }      
    },
    getCenterOrder() {

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
            this.saleMade()
                    
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
  onDestroyed() {
    window.removeEventListener("resize")
  },
  mounted() {

    this.windowResizeHandler()
    this.getLivestocksUsingBusinessId()
    this.getCenterOrder()
    
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

<style scoped>

  .scrollable {
    overflow-y: scroll;
    max-height: 400px;
  }

</style>