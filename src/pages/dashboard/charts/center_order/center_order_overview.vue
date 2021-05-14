<template>
  <div v-if="center_orders.length" class="col-xl-4 xl-100">
      <div class="card">
        <div class="card-header b-l-primary">
          <h6 class="font-secondary"> <b>LIVE ANIMAL CENTER ORDERS</b> </h6>
        </div>
        <div class="card-body chart-block">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6 pt-5">
                  <b-list-group tag="ul">

                    <b-list-group-item tag="li" class="d-flex justify-content-between align-items-center"><b class="font-danger">OFFLINE</b><b-badge variant="danger" class="counter digits"> {{ offline.length }} </b-badge> </b-list-group-item>

                    <b-list-group-item tag="li" class="d-flex justify-content-between align-items-center"> <b class="font-warning">ONLINE</b> <b-badge variant="warning" class="counter digits"> {{ online.length }} </b-badge> </b-list-group-item>

                    <b-list-group-item tag="li" class="d-flex justify-content-between align-items-center"> <b class="font-success">COMPLETED</b>  <b-badge variant="success" class="counter digits"> {{ complete.length }} </b-badge> </b-list-group-item>

                  </b-list-group>
              </div>
              <div class="invest-pie col-md-6">
                <CenterOrderChart v-if="chart_data.length >= 2" :chartData="chart_data" />
                <div v-else class="container-fluid">
                    <div class="row">
                        <div class="col-12 text-center pt-5">
                            <h6 class="font-danger">
                                <b> No Data To Visualize At The Moment </b>
                            </h6>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import axios from "axios"
import CenterOrderChart from "./center_order_chart"

export default {
    data() {
        return {
            center_orders: [],
            offline: [],
            online: [],
            complete: [],
            chart_data: []
        }
    },
    components: {
        CenterOrderChart
    },
    created() {
        axios.get(`${ApiUrl.url}center-orders`, {
            headers: {
            Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.center_orders = resp.data.data
            
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

        })
    },
    watch: {
        center_orders: function(current, innitial) {

            if(current !== undefined && current.length) {

                for (const center_order of this.center_orders) {

                    if(center_order.status == "offline") this.offline.push(center_order)

                    if(center_order.status == "online") this.online.push(center_order)

                    if(center_order.status == "complete") this.complete.push(center_order)
                    
                }
                
                let offline = this.offline.length
                let online = this.online.length
                let complete = this.complete.length
                this.chart_data = [
                    offline, online, complete
                ]

            }
        }
    }
}
</script>

<style>

</style>