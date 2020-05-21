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
                    <!-- <div class="cardheader"></div> -->
                    <!-- <div class="user-image">
                      <div class="avatar"><img alt="" src="../../../../../../assets/images/user/7.jpg"></div>
                      <div class="icon-wrapper"><i class="icofont icofont-pencil-alt-5"></i></div>
                    </div> -->
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
                          <div class="col-md-6 text-md-right border-right">
                            
                            <!-- Center Orders -->
                            <CenterOrder :centerOrder="center_order" />

                          </div>
                          <div class="col-md-6 text-md-left">
                            
                            <!-- Livestock Sales -->
                            <LivestockSales />

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

import {ApiUrl} from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"
import axios from "axios"

import CenterOrder from "./center_order"
import LivestockSales from "./livestock_sales"

export default {
  data() {
    return {
      livestock_order: {},
      center_order: {}
    }
  },
  components: {
    CenterOrder,
    LivestockSales
  },
  mounted() {

    axios.get(`${ApiUrl.url}livestock-orders/${this.$route.params.id}`, {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      })
      .then( (resp) => {

          this.livestock_order = resp.data.data
          this.center_order = this.livestock_order.center_order
                  
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