<template>
  <div>
    <Breadcrumbs main="Checkout" :title="allow ? 'Success' : 'Forbiden'" />
    <!-- Container-fluid starts-->
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-body">

              <div v-if="allow" class="invoice">
                <div>
                  <div>
                    <div class="row">
                      <div class="col-sm-12 pt-5 mt-5">
                        <div class="success-text">
                          <i class="fa fa-check-circle" aria-hidden="true"></i>
                          <h2 class="font-success">Thank you</h2>
                          <h5 class="font-success">
                            <b>Your Order has been received Successfully</b>
                          </h5>
                          <p>We Will Get Back To You as Soon As Possible</p>
                        </div>
                      </div>
                    </div>

                    <div class="row pb-5 mb-5">
                      <div class="col-md-12 text-center">
                        <router-link :to="'/shop/checkout'" class="btn btn-sm btn-pill btn-outline-success"> WHAT NEXT </router-link>
                      </div>
                    </div>

                  </div>
                  <!-- End InvoiceTop-->
                  
                </div>
                <!-- End Invoice-->
              </div>


              <div v-if="!allow" class="p-0">
                <div class="error-wrapper display-error">
                  <img class="img-40" src="../../assets/images/other-images/sad.png" alt />
                  <div class="error-heading pt-5">
                    <h1 style="font-size: 100px;" class="headline reduce-size font-danger">403</h1>
                  </div>
                  <p class="sub-content"> You don't have permission to access this page.
                  </p>
                  <div>
                    <!-- <router-link
                      class="btn btn-sm btn-pill btn-outline-danger"
                      :to="{ path: '/dashboard' }"
                    >BACK TO HOME PAGE</router-link> -->

                    <button
                      class="btn btn-sm btn-pill btn-outline-danger"
                      @click="$router.go(-1)"
                    >BACK TO HOME PAGE</button>

                  </div>
                </div>
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

import { mapGetters } from "vuex"

export default {
  computed: {
   ...mapGetters({
     allow: "viewOrdeCreatedSuccess/allow"
   })
  },
  methods: {
    
  }
};
</script>