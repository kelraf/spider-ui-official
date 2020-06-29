<template>
  
  <div style="overflow-y: scroll; max-height: 100vh;" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

        <SlaughterOrder 
            v-for="(slaughter_order, index) in slaughter_orders" 
            :slaughterOrder="slaughter_order" 
            :key="index+=1" 
            :index="index+=1"
            v-on:edit-slaughter-order-request="editSlaughterOrder" 
        />

    </div>

    <Reject 
        v-on:slaughter-order-edit-success="slaughterOrderEditSuccess" 
        :actionData="action_data" 
        id="reject" 
        style="display: none;" 
    />

    <Accept 
        v-on:slaughter-order-edit-success="slaughterOrderEditSuccess" 
        :actionData="action_data" 
        id="accept" 
        style="display: none;" 
    />

  </div>

</template>

<script>

import SlaughterOrder from "./slaughter_order"
import Accept from "./confirm/accept"
import Reject from "./confirm/reject"

export default {
    data() {
        return {
            slaughter_orders: [],
            action_data: {}
        }
    },
    components: {
        SlaughterOrder,
        Reject,
        Accept
    },
    props: {
        slaughterOrders: Array
    },
    watch: {
        slaughterOrders: {
            immediate: true,
            handler() {
                console.log("Slaughter Orders", this.slaughterOrders)
                if(this.slaughterOrders !== undefined && this.slaughterOrders.length > 0) this.slaughter_orders = this.slaughterOrders
            }
        }
    },
    methods: {
        editSlaughterOrder(actionData) {

            this.action_data = actionData
            
            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: `#${actionData.action}`
                }
            })

            modal.open()

        },
        slaughterOrderEditSuccess(data) {

            this.slaughter_orders = this.slaughter_orders.map((slaughter_order) => {

                if(slaughter_order.id == data.id) {

                    slaughter_order.status = data.status
                    return slaughter_order

                } else {

                    return slaughter_order

                }

            })

        }
    }
}
</script>

<style>

</style>