<template>
  <div>
    <!-- Container-fluid starts-->
    <table class="table table-bordernone">
    <thead>
        <tr>
        <th scope="col">Reference Number</th>
        <th scope="col">Category</th>
        <th scope="col">Type</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price per Animal</th>
        <th scope="col">Total Cost</th>
        <th scope="col"></th>
        <th scope="col"><i class="fa fa-angle-down"></i></th>
        </tr>
    </thead>
    <tbody>
        
        <tr v-for="(livestock_order, index) in livestock_orders" :key="index">
            <td># {{ livestock_order.id }} </td>
            <td>
                {{ livestock_order.dlivestock.category }}
            </td>
            <td>
                {{ livestock_order.dlivestock.type }}
            </td>
            <td>
                {{ livestock_order.quantity }}
            </td>
            <td>
                {{ livestock_order.price }}
            </td>
            <td> {{ livestock_order.total_cost }} </td>
            <td>
                <router-link :to="'/orders/livestock-order/' + livestock_order.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
                    MORE
                </router-link>
            </td>
            <td><feather type="more-vertical"></feather></td>
        </tr>
        
    </tbody>
    </table>
      <!-- Container-fluid Ends-->
  </div>
</template>

<script>
export default {
    data() {
        return {
            livestock_orders: []
        }
    },
    props: {
        livestockOrders: Array
    },
    watch: {
        livestockOrders: {
            immediate: true,
            handler() {

                this.livestockOrders == this.livestockOrders || []
                if (this.livestockOrders.length > 0) this.livestock_orders = this.livestockOrders
                
            }
        }
    }
}
</script>


<style>

</style>