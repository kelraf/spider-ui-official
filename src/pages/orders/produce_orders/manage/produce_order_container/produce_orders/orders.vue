<template>
  <div>
    <!-- Container-fluid starts-->
    <table class="table table-bordernone">
    <thead>
        <tr>
        <th scope="col">Ref No</th>
        <th scope="col">Ref Animal</th>
        <th scope="col">Produce Name</th>
        <th scope="col">Quantity</th>
        <th scope="col">Units</th>
        <th scope="col">Price per Unit</th>
        <th scope="col">Total Cost</th>
        <th scope="col"></th>
        <th scope="col"><i class="fa fa-angle-down"></i></th>
        </tr>
    </thead>
    <tbody>
        
        <tr v-for="(produce_order, index) in produce_orders" :key="index">
            <td># {{ produce_order.id }} </td>
            <td>
                {{ produce_order.d_produce.referenced_animal }}
            </td>
            <td>
                {{ produce_order.d_produce.produce_name }}
            </td>
            <td>
                {{ produce_order.quantity }}
            </td>
            <td>
                {{ produce_order.d_produce.units }}
            </td>
            <td>
                {{ produce_order.price_per_unit }}
            </td>
            <td> {{ produce_order.total_cost }} </td>
            <td>
                <router-link :to="'/dashboard/produce-order/' + produce_order.id" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success btn-block">
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
            produce_orders: []
        }
    },
    props: {
        produceOrders: Array
    },
    watch: {
        produceOrders: {
            immediate: true,
            handler() {

                this.produceOrders == this.produceOrders

                if(this.produceOrders !== null || this.produceOrders !== undefined && this.produceOrders.length > 0) this.produce_orders = this.produceOrders
                
            }
        }
    }
}
</script>


<style>

</style>