<template>
    <div>
        <Breadcrumbs main="Produce Orders" title="Orders"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">
                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="cardheader"></div>
                    <div class="user-image">
                      <div class="avatar">
                        <img v-if="avatar_url == ''" class="rounded-circle profile-image" src="../../../../../assets/images/default_avatars/default_avatar.svg" alt="Profile Image Placeholder" />
                        <img v-if="avatar_url !== ''" class="rounded-circle profile-image" :src="avatar_url" alt="Profile Image" />
                      </div>
                      <div class="icon-wrapper">
                        <i class="icofont icofont-open-eye"></i>
                      </div>
                    </div>
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Ref No</h6><span># {{ produce_order_container.id }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Payment Status</h6><span> {{ produce_order_container.payment_status }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                          <div class="user-designation">
                            <div class="title"><a href="javascript:void(0)"> {{ produce_order_container.user | process_user_names }} </a></div>
                            <div class="desc mt-2">made this order</div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Status</h6><span> {{ produce_order_container.status | process_status }} </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Channel</h6><span>Channel</span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Total Cost</h6><span> {{ produce_order_container.total_cost }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Orders :produceOrders="produce_order_container.produce_orders" class="mt-5" />
                      
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

import {ApiUrl} from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"
import axios from "axios"

import Orders from "./produce_orders/orders"

export default {
  data() {
    return {
      avatar_url: "",
      produce_order_container: {}
    }
  },
  components: {
    Orders
  },
  mounted() {

      axios.get(`${ApiUrl.url}produce-order-containers/${this.$route.params.id}`, {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      })
      .then( (resp) => {

          this.produce_order_container = resp.data.data
          this.process_avatar_url()

          if(this.produce_order_container.produce_orders.length > 0) {

              let total_cost = 0

              for (const produce_order of this.produce_order_container.produce_orders) {
                  total_cost += produce_order.total_cost
              }

              this.produce_order_container.total_cost = total_cost

          }
                  
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
    process_avatar_url: function() {

      this.avatar = this.produce_order_container.user.avatar

      if(this.avatar !== null) this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${this.avatar.avatar.file_name}`

    }
  },
  filters: {
    process_status: function(val) {

      if(val == 1) return "pending"

      if(val == 2) return "processing"

      if(val == 3) return "completed"

      if(val == 0) return "cancelled"

      else return 0

    },
    process_user_names(user) {

      if(user == null || user == undefined) return ""
      else return `${user.first_name} ${user.last_name}`

    }
  }
}
</script>