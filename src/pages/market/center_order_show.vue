<template>
  
    <div class="info-block">

        <h6 class="font-success pt-1 pb-1"> <span class="font-primary">Spider Order</span> :: Animal Required :: -->> {{ center_order.d_livestock.category }} ::-->> {{ center_order.d_livestock.type }} </h6>
        
        <div>
            <p style="max-height: 100px; overflow-y: hidden;">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Cum minima iste expedita voluptas nihil omnis, quod qui veniam velit, 
                vel ipsum unde nemo quasi nostrum officiis tenetur eos repudiandae? 
                A fugit, cumque animi perspiciatis, molestiae quae ipsa odit magni quisquam atque in, 
                amet repudiandae culpa exercitationem nisi modi eos tenetur iure? Harum assumenda quia 
                odio quibusdam, quasi praesentium eum consequatur vel hic laudantium soluta totam, 
                labore dolor facere iure accusantium voluptatum. Quia maxime veniam ratione 
                sed non itaque corporis labore exercitationem vero facere molestias consectetur 
                autem fugit nesciunt, at voluptas doloribus tempore 
                eveniet repudiandae pariatur hic saepe consequuntur ea laborum?
            </p>
        </div>

        <div class="star-ratings mt-3">
            <ul class="search-info">

                <li>
                    <i class="fa fa-arrows-alt"></i>
                </li>

                <li>
                    <b>Ordered : {{ center_order.required_animals }} </b>
                </li>

                <li>
                    <b>Available : {{ center_order.available_animals }} </b>
                </li>

                <li>
                    <b>Remaining : {{ center_order.required_animals - center_order.available_animals }} </b>
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
                        <router-link :to="'/market/center-order-market/' + center_order.id " id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block">
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