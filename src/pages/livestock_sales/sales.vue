<template>
  
  <div style="overflow-y: scroll; max-height: 100vh;" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

        <Sale v-for="(livestock_sale, index) in livestock_sales" :livestockSale="livestock_sale" :key="index+=1" :index="index+=1" />

    </div>
  </div>

</template>

<script>

import Sale from "./sale"

export default {
    data() {
        return {
            livestock_sales: []
        }
    },
    components: {
        Sale
    },
    props: {
        livestockSales: Array
    },
    watch: {
        livestockSales: {
            immediate: true,
            handler() {
                if(this.livestockSales !== undefined && this.livestockSales.length > 0) this.livestock_sales = this.livestockSales
            }
        }
    }
}
</script>

<style>

</style>