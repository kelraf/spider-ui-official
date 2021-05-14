<template>
  <div>
    <Breadcrumbs main="Orders" title="Order Details"/>
      <!-- Container-fluid starts-->
      <div class="container-fluid">

        <div v-if="livestock_order_containers.length <= 0" class="row pt-5">
            <div class="col-md-6 text-center offset-md-3 mt-5 pt-5">
                <h2> No Orders At The Moment </h2>
            </div>
        </div>

        <div v-if="livestock_order_containers.length > 0" class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="order-history table-responsive mb-0">
                  <table v-if="livestock_order_containers.length > 0" class="table table-bordernone">
                    <thead>
                      <tr>
                        <th scope="col">Reference Number</th>
                        <th scope="col">Channel</th>
                        <th scope="col">From</th>
                        <th scope="col">Status</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col"></th>
                        <th scope="col"><i class="fa fa-angle-down"></i></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="new_livestock_order_containers.length > 0" class="title-orders">
                        <td>New Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="(new_livestock_order_container, index) in new_livestock_order_containers" :key="index">
                        <td># {{ new_livestock_order_container.id }} </td>
                        <td>
                            Channel
                        </td>
                        <td>
                            <button id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                                FROM
                            </button>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle"></span>pending</div>
                            </div>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle"></span> {{ new_livestock_order_container.payment_status }} </div>
                            </div>
                        </td>
                        <td> {{ new_livestock_order_container.total_cost }} </td>
                        <td>
                            <router-link :to="'/dashboard/livestock-order-container/' + new_livestock_order_container.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                                MORE
                            </router-link>
                        </td>
                        <td><feather type="more-vertical"></feather></td>
                      </tr>
                      
                      <tr v-if="processing_livestock_order_containers.length > 0" class="title-orders">
                        <td>Processing</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="(processing_livestock_order_container, index) in processing_livestock_order_containers" :key="index">
                        <td># {{ processing_livestock_order_container.id }} </td>
                        <td>
                          Channel
                        </td>
                        <td>
                            <button id="default-outline-success" type="button" class="btn btn-sm btn-pill btn-outline-success btn-block">
                                FROM
                            </button>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle shipped-order"></span>processing</div>
                            </div>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle shipped-order"></span>{{ processing_livestock_order_container.payment_status }}</div>
                            </div>
                        </td>
                        <td>{{ processing_livestock_order_container.total_cost }}</td>
                        <td>
                            <router-link :to="'/dashboard/livestock-order-container/' + processing_livestock_order_container.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                                MORE
                            </router-link>
                        </td>
                        <td><feather type="more-vertical"></feather></td>
                      </tr>
                      
                      <tr v-if="cancelled_livestock_order_containers.length > 0" class="title-orders">
                        <td>Cancelled Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="(cancelled_livestock_order_container, index) in cancelled_livestock_order_containers" :key="index">
                        <td># {{ cancelled_livestock_order_container.id }} </td>
                        <td>
                          Channel
                        </td>
                        <td>
                            <button id="default-outline-success" type="button" class="btn btn-sm btn-pill btn-outline-success btn-block">
                                FROM
                            </button>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle cancel-order"></span>cancelled</div>
                            </div>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle cancel-order"></span>{{ cancelled_livestock_order_container.payment_status }}</div>
                            </div>
                        </td>
                        <td>{{ cancelled_livestock_order_container.total_cost }}</td>
                        <td>
                            <router-link :to="'/dashboard/livestock-order-container/' + cancelled_livestock_order_container.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                                MORE
                            </router-link>
                        </td>
                        <td>
                            <feather type="more-vertical"></feather>
                        </td>
                      </tr>

                      <tr v-if="completed_livestock_order_containers.length > 0" class="title-orders">
                        <td>Completed Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="(completed_livestock_order_container, index) in completed_livestock_order_containers" :key="index">
                        <td># {{ completed_livestock_order_container.id }} </td>
                        <td>
                          Channel
                        </td>
                        <td>
                            <button id="default-outline-success" type="button" class="btn btn-sm btn-pill btn-outline-success btn-block">
                                FROM
                            </button>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle cancel-order"></span>completed</div>
                            </div>
                        </td>
                        <td>
                            <div class="product-name">
                                <div class="order-process"><span class="order-process-circle cancel-order"></span>{{ completed_livestock_order_container.payment_status }}</div>
                            </div>
                        </td>
                        <td>{{ completed_livestock_order_container.total_cost }}</td>
                        <td>
                            <router-link :to="'/dashboard/livestock-order-container/' + completed_livestock_order_container.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                                MORE
                            </router-link>
                        </td>
                        <td>
                            <feather type="more-vertical"></feather>
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Container-fluid Ends-->
  </div>
</template>

<script>

import {ApiUrl} from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            livestock_order_containers: [],
            new_livestock_order_containers: [],
            cancelled_livestock_order_containers: [],
            processing_livestock_order_containers: [],
            completed_livestock_order_containers: []
        }
    },
    created() {

        axios.get(`${ApiUrl.url}livestock-order-containers`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.livestock_order_containers = resp.data.data

            if(this.livestock_order_containers.length > 0) {

                for (const livestock_order_container of this.livestock_order_containers) {

                    if(livestock_order_container.livestock_orders.length > 0) {

                        let total_cost = 0

                        for (const livestock_order of livestock_order_container.livestock_orders) {
                            total_cost += livestock_order.total_cost
                        }

                        livestock_order_container.total_cost = total_cost

                    }

                    if (livestock_order_container.status == 1) {

                        this.new_livestock_order_containers.push(livestock_order_container)
                        
                    } else if(livestock_order_container.status == 2) {

                        this.processing_livestock_order_containers.push(livestock_order_container)

                    } else if(livestock_order_container.status == 3) {

                        this.completed_livestock_order_containers.push(livestock_order_container)

                    } else if(livestock_order_container.status == 0) {

                        this.cancelled_livestock_order_containers.push(livestock_order_container)

                    } else {
                        this.$toasted.show(`Oops!! Something is wrong. Alert Tech Team.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                    }
                    
                }

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

    }
}
</script>

<style>

</style>