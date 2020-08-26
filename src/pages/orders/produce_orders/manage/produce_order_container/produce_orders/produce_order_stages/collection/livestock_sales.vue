<template>
  
  <div ref="livestock_sales_list" :class="window_event.make_it_scrollable ? 'scrollable' : ''" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

      <LivestockSale 
        v-for="(livestock_sale, index) in livestock_sales" 
        :key="index+=1"
        :index="index+=1" 
        :livestockSale="livestock_sale"
        v-on:edit-livestock-sale="editLivestockSale" 
      />

    </div>

    <Cancle 
        v-on:sale-edit-success="saleEditSuccess" 
        :livestockSale="livestock_data_action" 
        id="cancle" 
        style="display: none;" 
    />

    <Accept 
        v-on:sale-edit-success="saleEditSuccess" 
        :livestockSale="livestock_data_action" 
        id="accept" 
        style="display: none;" 
    />

  </div>

</template>

<script>

import LivestockSale from "./livestock_sale"
import Accept from "./confirm/accept"
import Cancle from "./confirm/cancle"

export default {
    data() {
        return {
            window_event: {
                livestock_sales_list: null,
                make_it_scrollable: true
            },
            center_order: {},
            livestock_sales: [],
            livestock_data_action: {}
        }
    },
    components: {
        LivestockSale,
        Cancle,
        Accept
    },
    mounted() {
        // this.windowResizeHandler()
    },
    updated() {
        // this.windowResizeHandler()
    },
    props: {
        centerOrder: Object
    },
    watch: {
        centerOrder: {
            immediate: true,
            handler() {
                this.center_order = this.centerOrder
                this.livestock_sales = this.centerOrder.livestock_sales
            },
            deep: true
        }
    },
    methods: {
        editLivestockSale(actionData) {

            this.livestock_data_action = actionData

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: `#${actionData.action}`
                }
            })

            modal.open()

        },
        saleEditSuccess(data) {
            this.$emit("sale-edit-success", data)
        },
        windowResizeHandler() {

            // if(this.$refs.livestock_sales_list == undefined) return false
            
            // this.window_event.livestock_sales_list = this.$refs.livestock_sales_list.clientHeight

            // if(this.window_event.livestock_sales_list > 500) this.window_event.make_it_scrollable = true

            // window.addEventListener("resize", () => {
                
            //     if(this.window_event.livestock_sales_list > 500) this.window_event.make_it_scrollable = true

            // })

        }
    },
    // onDestroyed() {
    //     window.removeEventListener("resize")
    // }
}
</script>

<style>
    .scrollable {
        overflow-y: scroll;
        max-height: 500px;
    }
</style>