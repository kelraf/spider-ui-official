<template>
  <div class="checkout">
    <Breadcrumbs main="Ecommerce" :title="cart_data.livestock_container.livestock_orders.length ? 'Checkout' : 'Forbiden'" />
    <!-- Container-fluid starts-->
    <div v-if="cart_data.livestock_container.livestock_orders.length" class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>Billing Details</h5>
        </div>
        <div class="card-body">
          <form>
          <div class="row">
            <div class="col-lg-6 col-sm-12">
              <div class="form-row">
                <div class="form-group col-sm-6">
                  <label for="inputEmail4">First Name</label>
                  <input
                    type="text"
                    v-model="user.firstName"
                    id="firstName"
                    name="firstName"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && errors.has('firstName') }"
                  />
                  <div
                    v-if="submitted && errors.has('firstName')"
                    class="invalid-feedback"
                  >{{ errors.first('firstName') }}</div>
                </div>
                <div class="form-group col-sm-6">
                  <label for="inputPassword4">Last Name</label>
                  <input
                    type="text"
                    v-model="user.lastName"
                    id="lastName"
                    name="lastName"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && errors.has('lastName') }"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-sm-6">
                  <label for="inputEmail4">Phone</label>
                  <input
                    type="text"
                    v-model="user.phone"
                    id="phone"
                    name="phone"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && errors.has('phone') }"
                  />
                </div>
                <div class="form-group col-sm-6">
                  <label for="inputPassword4">Email Address</label>
                  <input
                    type="email"
                    v-model="user.email"
                    id="email"
                    name="email"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && errors.has('email') }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="inputState">Country</label>
                <select class="form-control" id="inputState">
                  <option>Choose...</option>
                  <option selected>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
              <div class="form-group">
                <label for="inputAddress2">Address</label>
                <input
                  type="text"
                  v-model="user.address"
                  id="address"
                  name="address"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('address') }"
                />
              </div>
              <div class="form-group">
                <label for="inputCity">Town/City</label>
                <input
                  type="text"
                  v-model="user.city"
                  id="city"
                  name="city"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('city') }"
                />
              </div>
              <div class="form-group">
                <label for="inputAddress2">State/Country</label>
                <input
                  type="text"
                  v-model="user.state"
                  id="state"
                  name="state"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('state') }"
                />
              </div>
              <div class="form-group">
                <label for="inputAddress2">Postal Code</label>
                <input
                  type="text"
                  v-model="user.pincode"
                  id="pincode"
                  name="pincode"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && errors.has('pincode') }"
                />
              </div>
            </div>


            <div 
              v-if="cart_data.livestock_container || cart_data.produce_container || cart_data.products_container"
              class="col-lg-6 col-sm-12"
            >
              <div class="checkout-details">
                <div class="order-box">
                  <div class="title-box">
                    <div class="checkbox-title">
                      <h4>Product</h4>
                      <span>Total</span>
                    </div>
                  </div>
                  <ul class="qty" v-if="cart_data.livestock_container.livestock_orders.length">
                    <li>
                      Live Animals :..::..: {{ cart_data.livestock_container.livestock_orders | getQuantity }}
                      <span>{{ cart_data.livestock_container.livestock_orders | getTotalPrice }}</span>
                    </li>
                  </ul>
                  <!-- <ul class="qty" v-if="!cart.length">
                    <li v-if="!cart.length">There are no products in cart</li>
                  </ul> -->
                  <ul class="sub-total">
                    <li>
                      Subtotal
                      <!-- <span class="count">{{getAmount}}</span> -->
                    </li>
                  </ul>
                  <ul class="sub-total">
                    <li>
                      Total
                      <span class="count">{{ total_amount }}</span>
                    </li>
                  </ul>
                  <div 
                    class="animate-chk" 
                    v-if="cart_data.livestock_container || cart_data.produce_container || cart_data.products_container"
                  >
                    <!-- <div class="row">
                      <div class="col">
                        <label class="d-block" for="edo-ani">
                          <input
                            class="radio_animated"
                            id="edo-ani"
                            v-model="payment"
                            :value="false"
                            type="radio"
                            name="rdo-ani"
                            checked
                            data-original-title
                            title
                          />Stripe
                        </label>
                        <label class="d-block" for="edo-ani1">
                          <input
                            class="radio_animated"
                            id="edo-ani1"
                            v-model="payment"
                            type="radio"
                            :value="true"
                            name="rdo-ani"
                            data-original-title
                            title
                          />PayPal
                        </label>
                        <label class="d-block" for="edo-ani2">
                          <img class="img-paypal" src="../../assets/images/checkout/paypal.png" alt />
                        </label>
                      </div>
                    </div> -->
                  </div>
                  <!-- <PayPal
                      :amount=getamt()
                      currency="USD"
                      :client="paypal"
                      :env="environment"
                      :style="button_style"
                      v-if="payment"
                      v-on:payment-authorized="onPaymentComplete"
                      v-on:payment-cancelled="onCancelled()">
                  </PayPal> -->
                  <div 
                    class="text-center m-t-10" 
                    v-if="cart_data.livestock_container || cart_data.produce_container || cart_data.products_container"
                  >
                    <button
                      class="btn btn-pill btn-sm btn-outline-secondary"
                      @click="confirmPlaceOrder"
                      type="button"
                    > 
                      <span v-if="!loading">PLACE ORDER</span>

                      <img style="width: 20px;" v-if="loading" src="../../assets/images/loader.gif" alt="">

                    </button>

                  </div>                   
                </div>
              </div>
            </div>


          </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->


    <div v-if="!cart_data.livestock_container.livestock_orders.length" class="p-0">
      <div class="error-wrapper display-error">
        <img class="img-40" src="../../assets/images/other-images/sad.png" alt />
        <div class="error-heading pt-5">
          <h1 style="font-size: 100px;" class="headline reduce-size font-danger">403</h1>
        </div>
        <p class="sub-content"> You don't have permission to access this page.
        </p>
        <div>
          <button
            class="btn btn-sm btn-pill btn-outline-danger"
            @click="$router.go(-1)"
          >BACK TO HOME PAGE</button>
        </div>
      </div>
    </div>

  <ConfirmPlaceOrder @place-it="placeOrder" id="confirm-place-order" style="display: none;" />

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import PayPal from 'vue-paypal-checkout'
import ConfirmPlaceOrder from "./confirm_place_order"
import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default {
  name: "Checkout",
  data() {
    return {
      loading: false,
      user: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      },
      submitted: false,
      payment: false,
      complete: false,
      paypal: {
        sandbox: 'YOUR SANDBOX ID'
      },
      environment : "sandbox",
      button_style : {
        label: 'checkout',
        size:  'large',    // small | medium | large | responsive
        shape: 'pill',         // pill | rect
        color: 'blue'         // gold | blue | silver | black
      },
      amtchar:''
    };
  },
  components: {
    PayPal,
    ConfirmPlaceOrder
  },
  computed: {
    ...mapState({
      // cart: state => state.products.cart,
      businessData: state => state.businessData.businessData,
      getAmount() {
        return (this.totalAmount = this.$store.getters[
          "products/getTotalAmount"
        ]);
      }
    }),
    ...mapGetters({
      cart_data: "livestocks/getAllCartData",
      total_amount: "livestocks/getTotalAmount",
      processLivestockOrderContainerData: "livestocks/processLivestockOrderContainerData"
    })
  },
  methods: {
    confirmPlaceOrder() {

      let data = this.processLivestockOrderContainerData

      if(data.bool) {

        if(this.businessData) {

          let modal = new Custombox.modal({
              content: {
                  effect: 'slip',
                  target: '#confirm-place-order'
              }
          })

          modal.open()

        } else {

          this.$toasted.show(`Oops!! Something Went Wrong. Refresh This Page.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

        }

      } else {
        this.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
      }

    },
    placeOrder() {

      let self = this

      let data = this.processLivestockOrderContainerData

      if(data.bool) {

        setTimeout(function() {

            self.loading = true

            self.$store.dispatch("viewOrdeCreatedSuccess/updateAllow", true);

            data.data.livestock_order_container.user_id = Auth.isAuthenticatedUser().sub
            data.data.livestock_order_container.business_from_id = self.businessData.id
            data.data.livestock_order_container.business_id = self.businessData.id

            self.loading = true

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            axios.post(`${ApiUrl.url}livestock-order-containers`, data.data, headers) 
            .then( (resp) => {

                setTimeout(function() {

                    self.loading = false
                    self.$toasted.show(`Order Sent Successfully.`, {theme: 'outline', position: "top-right", icon : 'check', type: 'success', duration: 8000})
                    self.$store.dispatch("livestocks/checkoutSuccess", []);

                    console.log(resp.data)

                    self.$router.push("/shop/success")
                    

                }, 2000)

            } )

            .catch( (err) => {

                if(err.response) {

                    setTimeout(function() {

                      console.log(err.response)

                        self.loading = false

                        if(err.response.status == 422) {

                            // for (const key of Object.keys(err.response.data.errors)) {

                            //     if(key == "dates") {
                            //         self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     } else if(key == "status") {
                            //         self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     } else if(key == "feed_lot_bundler_id") {
                            //         self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     } else if(key == "livestock_order_stage_id") {
                            //         self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     } else if(key == "livestock_order_id") {
                            //         self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     } else {
                            //         self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : Unknown`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                            //     }
                            // }

                            self.$toasted.show(`Oops!! Something Went Wrong. : 422.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                        } else if(err.response.status == 401) {

                            Custombox.modal.close()
                            self.$toasted.show(`Authentication Required. Please Login: 401`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                            self.$router.replace("/auth/login")

                        } else if(err.response.status == 400) {

                            Custombox.modal.close()
                            self.$toasted.show(`Oops!! Something Went Wrong. Please Try Again : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                            
                        } else if(err.response.status == 500) {

                            self.$toasted.show(`Oops!! Something Went Wrong. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

                        }

                    }, 2000)

                }

            } )

        }, 600)

      } else {
        this.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
      }

    },    
    payWithStripe() {
        var handler = (window).StripeCheckout.configure({
        key: 'PUBLISHBLE_KEY', // 'PUBLISHBLE_KEY' publishble key
        locale: 'auto',
        token: (token) => {
          this.$store.dispatch("products/createOrder", {
            product: this.cart,
            userDetail: this.user,
            token: token.id,
            amt: this.totalAmount
          });
          this.$router.push('/ecommerce/success')
        },
      });
      handler.open({
        name: 'Endless ',
        description: 'Your Choice Theme',
        amount: this.totalAmount * 100
      })
    },
    getamt(){
      return this.totalAmount.toString()
    },
    removeProduct: function(product) {
      this.$store.dispatch("products/removeProduct", product);
    },
    onPaymentComplete: function (data) {
      console.log('data', data)
       this.$store.dispatch("products/createOrder", {
          product: this.cart,
          userDetail: this.user,
          token: data.orderID,
          amt: this.totalAmount
        });
    },
    onCancelled(){
      console.log("You cancelled a window");
    }
  },
  filters: {
    getQuantity(livestock_orders) {

      let total = 0

      livestock_orders.map((livestock_order) => {
        
        let quantity = parseInt(livestock_order.quantity)

        total += quantity

      })

        return total

    },
    getTotalPrice(livestock_orders) {

      let total = 0

      livestock_orders.map((livestock_order) => {

        total += parseInt(livestock_order.total_price)

      })

        return total

    }
  }
};
</script>
