<template>

    <div class="card user-card">
        <div class="card-body">

            <div class="online-user">
                <h5 class="font-primary f-18 mb-0 text-left"> {{ center_order.status | process_center_order_status }} </h5>
            </div>

            <div class="user-card-image">
                <img class="img-fluid rounded-circle image-radius" :src='"../../../../../../assets/images/dashboard/designer.jpg"' alt="">
            </div>
            
            <div class="card-footer mt-5 row p-0">
                
                <table class="table table-bordered table-sm">
                    <tbody>
                    <tr class="pt-2">
                        <td>Ordered Animals :</td>
                        <td class="text-left"> {{ center_order.required_animals }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Available Animals :</td>
                        <td class="text-left"> {{ center_order.available_animals }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Price Per Animal :</td>
                        <td class="text-left"> {{ center_order.price_per_animal }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Total Price Available :</td>
                        <td class="text-left"> {{ center_order.total_price_available }} </td>
                    </tr>
                    <tr class="pt-2">
                        <td>Total Price :</td>
                        <td class="text-left"> {{ center_order.total_price }} </td>
                    </tr>
                    </tbody>
                </table>

                <div class="container-fluid mt-4">
                    <div class="row">
                        <div class="col-md-8 offset-md-1">
                            <router-link v-if="center_order.status == 'offline'" :to="'/orders/center-order/' + center_order.id" id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">
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
            center_order: {}
        }
    },
    props: {
        centerOrder: Object
    },
    watch: {
        centerOrder: {
            immediate: true,
            handler() {
                  
                if(Object.keys(this.centerOrder).length > 0) this.center_order = this.centerOrder

            }
        }
    },
    filters: {
        process_center_order_status(status) {

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