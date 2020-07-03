<template>
  
    <!-- Container-fluid starts-->
        <div v-if="Object.keys(feed_lot_livestock_order).length > 0" class="container-fluid">
            <div class="user-profile">
              <div class="row">
                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">

                            <div v-if="rejected_ && rejected.length > 1" class="row">
                                <div class="col-6 offset-3 pb-3 text-left">

                                    <b-button-group style="width: 100%;" class="btn-group-pill">
                                        <b-button style="font-size: 5px !important;" ref="back" @click="goBack" class="btn-xs pt-1" variant="outline-warning">
                                            <feather type="arrow-left-circle"></feather>
                                        </b-button>
                                        <!-- <b-button class="btn-xs" variant="outline-warning"> {{ position }} </b-button> -->
                                        <b-button style="font-size: 5px !important;" @click="goNext" ref="next" class="btn-xs pt-1" variant="outline-warning">
                                            <feather type="arrow-right-circle"></feather>
                                        </b-button>
                                    </b-button-group>

                                </div>
                            </div>

                            <div v-if="rejected.length > 0 && others.length > 0" class="row">
                                <div class="col-12 pb-3 text-left">

                                    <b-button-group class="btn-group-pill">
                                        <b-button @click="showRejected" class="btn-sm" :variant="feed_lot_livestock_order.status <= 0 ? 'danger' : 'outline-danger'">REJECTED</b-button>
                                        <b-button @click="showOthers" class="btn-sm" :variant="feed_lot_livestock_order.status > 0 ? 'warning' : 'outline-warning'">OTHERS</b-button>
                                        <b-button :disabled="feed_lot_livestock_order.status <= 0 ? true : false" class="btn-sm" @click="openEditEvent" variant="outline-warning">UPDATE</b-button>
                                    </b-button-group>

                                </div>
                            </div>

                            <div v-if="others.length == 1 && rejected.length <= 0" class="row">
                                <div class="col-8 offset-2 pb-3 text-left">

                                    <button @click="openEditEvent" id="default-outline-warning" type="button" class="btn btn-sm btn-pill btn-outline-warning btn-block">
                                        <span>UPDATE</span>
                                    </button>

                                </div>
                            </div>

                            <div v-if="rejected.length >= 1 && others.length <= 0" class="row">
                                <div class="col-8 offset-2 pb-3 text-left">

                                    <button @click="makeNewRequestExclude" id="default-outline-warning" type="button" class="btn btn-sm btn-pill btn-outline-warning btn-block">
                                        <span v-if="!loading">MAKE NEW REQUEST</span>
                                        <img style="width: 20px;" v-if="loading" src="../../../../../../../../assets/images/loader.gif" alt="">
                                    </button>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 text-md-left text-sm-center text-center">
                                    <h5>Request Details</h5>
                                </div>
                            </div>

                            <div class="row mt-3">

                                <div class="col-md-4">
                                    <div class="ttl-info text-left">
                                        <h6>Status</h6>
                                        <span> 
                                            <b-badge style="color: white !important;" v-if="feed_lot_livestock_order.status == 1" variant="info">PENDING</b-badge>
                                            <b-badge style="color: white !important;" v-if="feed_lot_livestock_order.status == 2" variant="warning">ACCEPTED</b-badge>
                                            <b-badge style="color: white !important;" v-if="feed_lot_livestock_order.status == 3" variant="success">IN PROGRESS</b-badge>
                                            <b-badge style="color: white !important;" v-if="feed_lot_livestock_order.status == 4" variant="success">COMPLETED</b-badge>
                                            <b-badge style="color: white !important;" v-if="feed_lot_livestock_order.status == 0" variant="danger">REJECTED</b-badge>
                                        </span>
                                    </div>
                                </div>

                                <div class="col-md-8">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="ttl-info text-left">
                                                <h6>Starting Date</h6><span> {{ feed_lot_livestock_order.dates.starting_date }} </span>
                                            </div>
                                        </div>

                                        <div class="col-md-12 pt-2">
                                            <div class="ttl-info text-left">
                                                <h6>Ending Date</h6><span> {{ feed_lot_livestock_order.dates.ending_date }} </span>
                                            </div>
                                        </div>

                                    </div>                                    
                                </div>
                                
                                
                            </div>

                            <hr />

                            <div class="row">
                                <div class="col-12 text-md-left text-sm-center text-center">
                                    <h5>Livestock Order Details</h5>
                                </div>
                            </div>

                            <div class="row mt-3">

                                <div class="col-md-4">
                                <div class="ttl-info text-left">
                                    <h6>Category</h6><span> {{ livestock_order | get_livestock_category }} </span>
                                </div>
                                </div>

                                <div class="col-md-4">
                                <div class="ttl-info text-left">
                                    <h6>Type</h6><span> {{ livestock_order | get_livestock_type }} </span>
                                </div>
                                </div>

                                <div class="col-md-4">
                                <div class="ttl-info text-left">
                                    <h6>Quantity</h6><span> {{ livestock_order | get_livestock_quantity }} </span>
                                </div>
                                </div>
                                
                            </div>

                        </div>
                      </div>

                      <hr />

                    <div class="row">
                        <div class="col-12 text-md-left text-sm-center text-center">
                            <h5>FeedLot Details</h5>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">
                        <div class="row">

                            <div class="col-md-4">
                            <div class="ttl-info text-left">
                                <h6> FeedLot Name </h6><span> {{ feed_lot_livestock_order.feed_lot_bundler.business.business_name }} </span>
                            </div>
                            </div>

                            <div class="col-md-4">
                            <div class="ttl-info text-left">
                                <h6> Email </h6><span> {{ feed_lot_livestock_order.feed_lot_bundler.business.user.email | email_check }} </span>
                            </div>
                            </div>

                            <div class="col-md-4">
                            <div class="ttl-info text-left">
                                <h6> Phone </h6><span> {{ feed_lot_livestock_order.feed_lot_bundler.business.user.phone_number }} </span>
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

</template>

<script>

import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            feed_lot_livestock_order: {},
            feed_lot_livestock_orders: [],
            livestock_order: {},
            rejected_: false,
            loading: false,
            currentObjectPosition: 0
        }
    },
    computed: {
        position: function() {
            return this.currentObjectPosition+=1
        }
    },
    mounted() {

    },
    props: {
        feedLotLivestockOrders: Array
    },
    watch: {
        feedLotLivestockOrders: {
            immediate: true,
            handler() {

                this.feed_lot_livestock_orders = this.feedLotLivestockOrders
                if(this.feedLotLivestockOrders.length > 0) {

                    this.rejected = this.feed_lot_livestock_orders.filter((feed_lot_livestock_order) => {

                        if(feed_lot_livestock_order.status == 0) return feed_lot_livestock_order

                    })

                    this.others = this.feed_lot_livestock_orders.filter((feed_lot_livestock_order) => {

                        if(feed_lot_livestock_order.status > 0) return feed_lot_livestock_order

                    })

                    if(this.rejected.length > 0 && this.others.length <= 0) {

                        if(this.rejected.length > 1) {

                            this.rejected_ = true
                            let val = this.rejected.length
                            val = val-=1
                            this.feed_lot_livestock_order = this.rejected[val]

                        } else {

                            this.feed_lot_livestock_order = this.rejected[0]

                        }


                    } else {

                        this.feed_lot_livestock_order = this.others[0]

                    }

                    this.getLivestockOrder()

                }

            }
        }
    },
    filters: {
        email_check(mail) {

            if(mail == null) return "No Email"
            else return mail

        },
        get_livestock_category(livestock_order) {
            if(Object.keys(livestock_order).length > 0) return livestock_order.d_livestock.category
        },
        get_livestock_type(livestock_order) {
            if(Object.keys(livestock_order).length > 0) return livestock_order.d_livestock.type
        },
        get_livestock_quantity(livestock_order) {
            if(Object.keys(livestock_order).length > 0) return livestock_order.quantity
        }
    },
    methods: {
        goNext() {

            let maxPos = this.rejected.length
            maxPos-=1

            let currentObjectIndex = this.rejected.findIndex(one => one.id == this.feed_lot_livestock_order.id)

            currentObjectIndex++

            if(currentObjectIndex <= maxPos) {

                this.feed_lot_livestock_order = this.rejected[currentObjectIndex]

            }

        },
        goBack() {

            let maxPos = this.rejected.length
            maxPos -= 1
            let currentObjectIndex = this.rejected.findIndex(one => one.id == this.feed_lot_livestock_order.id)

            if(currentObjectIndex <= maxPos) {

                currentObjectIndex -= 1
                
                if(currentObjectIndex < 0) return

                this.feed_lot_livestock_order = this.rejected[currentObjectIndex]

            }

        },
        showRejected() {

            this.rejected_ = true
            this.feed_lot_livestock_order = this.rejected[0]

        },
        showOthers() {

            this.rejected_ = false
            this.feed_lot_livestock_order = this.others[0]

        },
        makeNewRequestExclude() {
            this.$emit("open-make-new-request-excluding", this.rejected)
        },
        openEditEvent() {
            this.$emit("open-edit-event", this.feed_lot_livestock_order)
        },
        getLivestockOrder: function() {

            axios.get(`${ApiUrl.url}livestock-orders/${this.feed_lot_livestock_order.livestock_order_id}`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                this.livestock_order = resp.data.data  
                        
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
}
</script>

<style>

</style>