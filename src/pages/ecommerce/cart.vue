<template>
  <div>
    <Breadcrumbs main="Ecommerce" title="Cart"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h5>Cart</h5>
            </div>
            <div class="card-body cart">

              <div 
                class="col-sm-6 offset-md-3 empty-cart-cls text-center pt-5 mt-5 pb-5 mb-5"  
                v-if="Object.keys(cart_data.livestock_container).length <= 0 && Object.keys(cart_data.products_container).length <= 0 && Object.keys(cart_data.produce_container).length <= 0"
              >

                  <!-- <img :src='getImgUrl("ecommerce/icon-empty-cart.png")' class="img-fluid mb-4"> -->
                  <h3 class="font-danger"><strong>Your Cart is Empty</strong></h3>
                  <h4 class="font-success">
                    <b>Add something to make me happy :)</b>
                  </h4>
                  <router-link to="/shop/livestocks" class="btn btn-sm btn-pill btn-outline-success m-t-15">SHOP NOW</router-link>

              </div>


              <div class="order-history table-responsive wishlist" v-if="Object.keys(cart_data.livestock_container).length > 0">
                <table class="table table-bordernone">
                  <thead>
                    <tr>
                      <th>Animal</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    
                    <tr v-for="(item, index) in cart_data.livestock_container.livestock_orders" :key="index">
                      <td>
                        <!-- <img class="img-fluid img-60" :src='getImgUrl(item.images[0])' alt=""> -->
                      </td>
                      <td>{{item.category}}</td>
                      <td>
                        <div class="product-name">
                          <router-link :to="'/ecommerce/details/'+item.id">{{item.type}}</router-link>
                        </div>
                      </td>
                      <td class="cart">
                         <div class="qty-box1">
                            <div class="input-group addToCart">
                              <i class="fa fa-minus btnGtr1 inc-dec bg-success"  v-on:click="decrementLivestockOrderQuantity(item)"></i>
                              <input class="touchspin1 text-center val-displ" v-model="item.quantity" name="item.quantity" type="text" >
                              <i class="fa fa-plus btnLess1 inc-dec bg-success"  v-on:click="incrementLivestockOrderQuantity(item)"></i>
                            </div>
                          </div>
                      </td>
                      <td>{{item.price_per_animal}}</td>
                      <td>{{item.total_price}}</td>
                      <td>
                        <button id="default-outline-primary" type="button" class="btn btn-pill btn-sm btn-outline-primary btn-block">
                            MORE
                        </button>
                      </td>
                      <td>
                        <a href="javascript:void(0)" @click='removeLivestockOrderQuantity(item)'><feather type="x-circle"></feather></a>
                      </td>
                    </tr>
                    <tr>

                      <td class="total-amount" colspan="5"> 
                        <h6 class="m-0"> <span class="f-w-600">Total Price:</span></h6>
                      </td>

                      <td><span> {{ total_cost }} </span></td>
                    </tr>
                    <tr>
                      <td colspan="6">
                        <router-link :to="'/shop/livestocks'" class="btn btn-pill btn-outline-success btn-block">continue shopping</router-link>
                      </td>
                      <td  colspan="6">
                        <router-link :to="'/shop/checkout'" class="btn btn-pill btn-outline-success btn-block"> check out</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name:'Cart',
  data(){
    return{
      counter: 1
    }
  },
  computed: {
    ...mapGetters({
      getAmount: "products/getTotalAmount",
      livestocks: "livestocks/getLivestocks",
      cart_data: "livestocks/getAllCartData"
    }),
    total_cost: function() {

      if(!this.cart_data) return 

      if(!this.cart_data.livestock_container) return

      if(!this.cart_data.livestock_container.livestock_orders) return

       let total_cost = 0 
       
        this.cart_data.livestock_container.livestock_orders.map((livestock_order) => {

          total_cost += livestock_order.total_price

        })

        return total_cost

    }
  },
  mounted() {
    console.log("All Cart Data", this.cart_data)
  },
  methods: {
    getImgUrl(path) {
      return require('../../assets/images/'+path)
    },
    removeLivestockOrderQuantity: function(livestock_order) {

      this.$store.dispatch('livestocks/removeLivestockOrderQuantity', livestock_order)

    },
    incrementLivestockOrderQuantity(livestock_order) {   
      
      // console.log("livestock_order", livestock_order)

      let {quantity} = livestock_order

      quantity = parseInt(quantity)

      quantity+=1
      
      this.$store.dispatch('livestocks/updateLivestockOrderQuantity', {livestock_order, quantity})

    },
    decrementLivestockOrderQuantity(livestock_order) {

      // console.log("livestock_order", livestock_order)

      let {quantity} = livestock_order

      quantity = parseInt(quantity)
      quantity-=1
      
      this.$store.dispatch('livestocks/updateLivestockOrderQuantity', {livestock_order, quantity})

    }
  }
}
</script>

<style scoped>

  .inc-dec:hover {
    cursor: pointer;
    border-radius: 50%;
  }

  .inc-dec {
    width: 28px;
    height: 28px;
    font-size: 8px !important;
    border-radius: 50%;
  }

  .val-displ {
    border-radius: 20px;
  }

</style>