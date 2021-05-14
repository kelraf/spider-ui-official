<template>
  
    <div class="info-block">

        <h6 style="font-size: 15px;" class="font-success pt-1 pb-1"> <span class="font-primary">SPIDER ORDER</span> :: ANIMAL REQUIRED :: {{ center_order.d_livestock.category.toUpperCase() }} :: {{ center_order.d_livestock.type.toUpperCase() }} </h6>
        
        <div>
            <p v-if="center_order.description !== null && center_order.description.length" v-html="center_order.description" style="max-height: 100px; overflow-y: hidden;">
                
            </p>

            <h6 v-else class="font-danger text-center pt-5 pb-5">
                No Description
            </h6>
        </div>

        <div class="star-ratings mt-3">
            <ul class="search-info">

                <li>
                    <i class="icon-crown"></i>
                </li>

                <li>
                    <b>ORDERED : {{ center_order.required_animals }} </b>
                </li>

                <li>
                    <b>AVAILABLE : {{ center_order.available_animals }} </b>
                </li>

                <li>
                    <b>REMAINING : {{ center_order.required_animals - center_order.available_animals }} </b>
                </li>
                
                <!-- <li>
                    <router-link :to="'/market/center-order-market/' + center_order.id " id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                        more
                    </router-link >
                </li> -->
            </ul>

            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3 pt-2">
                        <router-link :to="'/dashboard/center-order-market/' + center_order.id " id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
                            more
                        </router-link >
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
                if(this.centerOrder !== undefined || Object.keys(this.centerOrder).length <= 0) this.center_order = this.centerOrder
            }
        }
    }
}
</script>

<style>

</style>