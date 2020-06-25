<template>
  
    <b-tab active>
        <template slot="title">
            <i class="icon-target mr-2"></i>Live Animals
        </template>									
        <div class="search-links tab-pane fade show active" id="all-links" role="tabpanel" aria-labelledby="all-link">

            <div v-if="center_orders.length <= 0 && !loading" class="row pt-5">
                <div class="col-md-6 offset-md-3 font-success text-center pt-5">
                    <h2> 
                    <b>
                        It Seems Like The Are No Orders Available.
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

            <div v-if="loading" class="col-md-6 offset-md-3 pt-5">
                <div class="loader-box">
                    <div class="loader">
                        <div class="line bg-warning"></div>
                        <div class="line bg-warning"></div>
                        <div class="line bg-warning"></div>
                        <div class="line bg-warning"></div>
                    </div>
                </div>
            </div>

            <div v-if="center_orders.length > 0 && !loading" class="row">
                <div class="col-xl-6">

                    <CenterOrderShow v-for="(center_order, index) in center_orders" :key="index" :centerOrder="center_order" />
                    
                    <div class="info-block">
                        <b-pagination-nav
                            :number-of-pages="3"
                            base-url="#"
                            prev-text="Previous"
                            next-text="Next"
                            class="pagination-primary"
                        >
                        </b-pagination-nav>
                    </div>
                </div>
            
            </div>
        </div>
    </b-tab>

</template>

<script>

import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import axios from "axios"
import { mapState } from "vuex";
import CenterOrderShow from "./center_order_show"

export default {
    data() {
        return {
            center_orders: [],
            loading: true
        }
    },
    components: {
        CenterOrderShow
    },
    computed: {
        ...mapState({
            businessData: state => state.businessData.businessData
        })
    },
    mounted() {
        this.getCenterOrders()
    },
    methods: {
        getCenterOrders() {

            let self = this

            axios.get(`${ApiUrl.url}center-orders`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                setTimeout(() => {

                    self.center_orders = resp.data.data.filter((center_order) => {

                        if(center_order.status == "online") {

                            if(center_order.who_can_see.length <= 0) {
                                center_order.me = false
                                return center_order
                            } else {

                                for (const can_see of center_order.who_can_see) {
                                    
                                    if(can_see.business_id == this.businessData.id) {

                                        center_order.me = true
                                        return center_order

                                    }

                                }

                            }

                        }

                    })
                    self.loading = false

                }, 3000)
                        
            } )

            .catch( (err) => {

                setTimeout(() => {

                    self.loading = false

                    if(err.response) {

                        if(err.response.status == 404) {

                            self.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

                        } else if(err.response.status == 401) {

                            self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                            self.$router.replace("/auth/login")

                        }

                    }

                }, 3000)

            } )

        }
    }
}
</script>

<style>

    .loader {
        margin: auto;
    }

</style>