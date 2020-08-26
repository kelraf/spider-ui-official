<template>
  
    <div class="follow">
        <div v-if="feed_lot_livestock_orders.length > 0" class="row">
            <div class="col-md-6 text-md-right border-right">

                <FeedLotDataReview 
                    @open-make-new-request-excluding="makeNewRequestExclude"
                    v-on:open-edit-event="open_request" 
                    :feedLotLivestockOrders="feed_lot_livestock_orders" 
                />

            </div>
            <div class="col-md-6 text-md-left">

                <div class="row pt-5">
                    <div class="col-md-6 text-center offset-md-3">
                        <h2> No Activities Yet </h2>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="feed_lot_livestock_orders.length == 0" class="row pt-5">
            <div class="col-md-6 text-center offset-md-3 pt-5">
                <h2> No FeedLot Order Available </h2>

                <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <button 
                                @click="open_request(null)" 
                                id="default-outline-primary" 
                                type="button" 
                                class="btn btn-pill btn-outline-primary btn-block"
                            >
                                Make
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Request 
            v-on:feed-lot-request-updated-success="feedLotRequestCreatedSuccess" 
            v-on:feed-lot-request-created-success="feedLotRequestCreatedSuccess" 
            :stageData="editedStage" 
            :feedLots="feed_lots" 
            id="request" 
            style="display: none;" 
        />

    </div>

</template>

<script>

import { ApiUrl } from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"

import FeedLotDataReview from "./feed_lot_data_review"
import Request from "./request"

export default {
    data() {
        return {
            stage: {},
            editedStage: {},
            feed_lot_livestock_orders: [],
            feed_lots: []
        }
    },
    components: {
        FeedLotDataReview,
        Request
    },
    mounted() {

        axios.get(`${ApiUrl.url}livestock-order-stages/${this.$route.params.stage_id}`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })

        .then( (resp) => {

            this.stage = resp.data.data 
            if(this.stage.feed_lot_livestock_orders.length > 0) {
                this.feed_lot_livestock_orders = this.stage.feed_lot_livestock_orders
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
        makeNewRequestExclude(rejected) {

            this.editedStage = {
                ...this.stage,
                feed_lot_livestock_order: null
            }

            axios.get(`${ApiUrl.url}feed-lot-bundlers`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                if(this.stage !== undefined && this.stage.feed_lot_livestock_orders.length > 0) {

                    let list = []

                    for (let rejected_ of rejected) {
                        
                        list.push(rejected_.feed_lot_bundler_id)
                        
                    }

                    for (let feed_lot of resp.data.data) {


                        if(!list.includes(feed_lot.id)) {

                            feed_lot.selected = false
                            this.feed_lots.push(feed_lot)

                        }
                        
                    }

                } else {

                    this.feed_lots = this.feed_lots.map((feed_lot) => { 

                        feed_lot.selected = false
                        return feed_lot
                        
                    })    

                }

                let modal = new Custombox.modal({
                    content: {
                        effect: 'slip',
                        target: '#request'
                    }
                })

                modal.open()

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
        open_request: function(feed_lot_livestock_order) {

            this.editedStage = {
                ...this.stage,
                feed_lot_livestock_order: feed_lot_livestock_order
            }

            axios.get(`${ApiUrl.url}feed-lot-bundlers`, {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            })

            .then( (resp) => {

                this.feed_lots = resp.data.data

                if(this.stage !== undefined && this.stage.feed_lot_livestock_orders.length > 0) {

                    this.feed_lots = this.feed_lots.map((feed_lot) => { 

                        if(feed_lot.id == this.editedStage.feed_lot_livestock_order.feed_lot_bundler.id) {

                            feed_lot.selected = true
                            return feed_lot

                        } else {

                            feed_lot.selected = false
                            return feed_lot

                        } 

                    })

                } else {

                    this.feed_lots = this.feed_lots.map((feed_lot) => { 

                        feed_lot.selected = false
                        return feed_lot
                        
                    })    

                }

                let modal = new Custombox.modal({
                    content: {
                        effect: 'slip',
                        target: '#request'
                    }
                })

                modal.open()
                        
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
        feedLotRequestCreatedSuccess(data) {

            this.feed_lot_livestock_orders = this.feed_lot_livestock_orders.filter((feed_lot_livestock_orders) => {

                if(feed_lot_livestock_orders.id !== data.id) return feed_lot_livestock_orders

            })

            this.feed_lot_livestock_orders.push(data)
        }
    }
}
</script>

<style>

</style>