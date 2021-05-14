<template>

    <div class="col-xl-6 col-sm-12 col-md-6">
        <div class="card">
            <div class="card-body">
                <div class="media">
                    <h6 class="mb-0 font-success"> <b> Live Animal Market </b> </h6>
                </div>
                <div class="project-widgets text-center">
                    <h1 class="font-primary counter"><b> {{ center_order_number.fake }} <span v-if="center_order_number.real > 100" class="font-danger">+</span></b></h1>

                    <!-- <highcharts :options="options"></highcharts> -->

                </div>
            </div>
            <div class="card-footer project-footer text-center">
                <router-link to="/dashboard/market" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary"> VISIT MARKET </router-link>
            </div>
        </div>
    </div>
  
</template>

<script>

import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            center_orders: [],
            options: {}
        }
    },
    components: {

    },
    mounted() {

        this.options = {
            title: {
                text: 'Live Animal Market OverView'
            },
            yAxis: {
                title: {
                    text: "No of Animals"
                }
            },
            xAxis: {
                title: {
                    text: "Sellers"
                },
                categories: ['Sheep', 'Goat', 'Cow', 'Pig']
            },
            labels: {
                items: [{
                    html: 'Livestock Prices',
                    style: {
                        left: '50px',
                        top: '18px'
                    }
                }]
            },
            series: [
                {
                    type: 'column',
                    name: 'Quantity',
                    data: [3, 2, 1, 3]
                }, 
                {
                    type: 'line',
                    name: 'Average',
                    data: [3, 0, 3, 6.33],
                    marker: {
                        lineWidth: 1,
                        fillColor: 'black'
                    }
                }, 
                {
                    type: 'pie',
                    name: 'Up Coming',
                    // data: [{
                    //     name: 'Jane',
                    //     y: 13,
                    // }, {
                    //     name: 'John',
                    //     y: 23
                    // }, {
                    //     name: 'Joe',
                    //     y: 19
                    // }],
                    data: [5, 3, 6, 8],
                    center: [70, 10],
                    size: 150,
                    showInLegend: false,
                    dataLabels: {
                        enabled: true
                    }
                }]
        }

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
    computed: {
        live_animal_market_view: function() {
            if(this.center_orders.length >= 2) {

                // Process Required Data

                let offline = []
                let online = []

                for (const center_order of this.center_orders) {

                    if(center_order.status == "offline") offline.push(center_order)
                    if(center_order.status == "online") online.push(center_order)
                    
                }

                let string = []
                let accum = []

                if(online.length) {

                    for (const online_ of online) {

                        if(string.includes(online_.type)) {

                        }
                    
                    }

                }

                return {
                    success: true,
                    data: {
                        data: [...offline, ...online]
                    }
                }
            } else {
                return {
                    success: false,
                    data: {}
                }
            }
        },
        center_order_number: function() {
            
            
                let offline = []
                let online = []

                for (const center_order of this.center_orders) {

                    if(center_order.status == "offline") offline.push(center_order)
                    if(center_order.status == "online") online.push(center_order)
                    
                }

                let number = 0

                if(online.length) {

                    for (const online_ of online) {

                        number += parseInt(online_.required_animals)
                    
                    }

                    if(number <= 0) return {fake: 0, real: number}

                    if(number <= 100) return {fake: number, real: number}

                    if(number > 100) return {fake: 100, real: number}

                } else {
                    return 0
                }

        }
    },
    watch: {
        live_animal_market_view: function() {
            console.log("live_animal_market_view", this.live_animal_market_view)
        }
    },
    filters: {
        
    }
}
</script>

<style>

</style>