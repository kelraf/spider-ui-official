<template>
  
  <div style="overflow-y: scroll; max-height: 100vh;" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

        <FeedLotRequest 
            v-for="(feed_lot_request, index) in feed_lot_requests" 
            :feedLotRequest="feed_lot_request" 
            :key="index+=1" 
            :index="index+=1"
            v-on:edit-feed-lot-request="editFeedLotRequest" 
        />

    </div>

    <Reject 
        v-on:feed-lot-request-edit-success="feedLotEditSuccess" 
        :actionData="action_data" 
        id="reject" 
        style="display: none;" 
    />

    <Accept 
        v-on:feed-lot-request-edit-success="feedLotEditSuccess" 
        :actionData="action_data" 
        id="accept" 
        style="display: none;" 
    />

  </div>

</template>

<script>

import FeedLotRequest from "./feed_lot_request"
import Accept from "./confirm/accept"
import Reject from "./confirm/reject"

export default {
    data() {
        return {
            feed_lot_requests: [],
            action_data: {}
        }
    },
    components: {
        FeedLotRequest,
        Reject,
        Accept
    },
    props: {
        feedLotRequests: Array
    },
    watch: {
        feedLotRequests: {
            immediate: true,
            handler() {
                if(this.feedLotRequests !== undefined && this.feedLotRequests.length > 0) this.feed_lot_requests = this.feedLotRequests
            }
        }
    },
    methods: {
        editFeedLotRequest(actionData) {

            this.action_data = actionData
            
            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: `#${actionData.action}`
                }
            })

            modal.open()

        },
        feedLotEditSuccess(data) {

            this.feed_lot_requests = this.feed_lot_requests.map((feed_lot_request) => {

                if(feed_lot_request.id == data.id) {

                    feed_lot_request.status = data.status
                    return feed_lot_request

                } else {

                    return feed_lot_request

                }

            })

        }
    }
}
</script>

<style>

</style>