<template>

    <div class="card user-card">
        <div class="card-body">

            <div class="online-user">
                <h5 class="font-primary f-18 mb-0 text-left"> {{ produce_center_order.status | process_produce_center_order_status }} </h5>
            </div>

            <div class="user-card-image">
                <img class="img-fluid rounded-circle image-radius" :src='"../../../../../../../../assets/images/dashboard/designer.jpg"' alt="">
            </div>
            
            <div class="card-footer mt-5 row p-0">
                
                <table class="table table-bordered table-sm">
                    <tbody>
                    <tr class="pt-2">
                        <td>Required Quantity :</td>
                        <td class="text-left"> {{ produce_center_order.required_quantity }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Available Quantity :</td>
                        <td class="text-left"> {{ produce_center_order.available_quantity }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Total Cost :</td>
                        <td class="text-left"> {{ produce_center_order.total_cost }} </td>
                    </tr>
                    </tbody>
                </table>

                <div class="container-fluid mt-4">
                    <div class="row">
                        <div class="col-md-8 offset-md-1">
                            <!-- v-if="center_order.status == 'offline'" -->
                            <router-link :to="'/dashboard/center-order/' + produce_center_order.id" id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">
                                MORE
                            </router-link>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
  
</template>

<script>
export default {
    data() {
        return {
            produce_center_order: {}
        }
    },
    props: {
        produceCenterOrder: Object
    },
    watch: {
        produceCenterOrder: {
            immediate: true,
            handler() {
                  
                if(Object.keys(this.produceCenterOrder).length > 0) this.produce_center_order = this.produceCenterOrder

            }
        }
    },
    filters: {
        process_produce_center_order_status(status) {

            if(status == "in-progress") return "In Progress".toUpperCase()

            if(status == "offline") return status.toUpperCase()

            if(status == "online") return status.toUpperCase()

            if(status == "complete") return status.toUpperCase()

            else return 'error'

        }
    }
}
</script>

<style>

</style>