<template>
    <div>
        <Breadcrumbs main="Product" title="View Product"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">

          <div class="card">
            <div class="row product-page-main">

              <productImagesSlider :productData="product" />

              <div class="col-xl-8 col-md-8 col-sm-8">
                <div class="product-page-details">
                  <h5>{{product.name}}</h5>
                  <div class="d-flex">
                    <heart-rating
                      v-model="heartrating.rating"
                      :show-rating="true"
                      :item-size="10"
                      :spacing="3"
                      :max-rating="5"
                    ></heart-rating>
                    <span>(250 review)</span>
                  </div>
                </div>
                <hr />
                <ProductDescription :productData="product" />
                <div class="product-price digits">
                  <!-- <del>{{product.price | currency}}</del> -->
                  Price: Ksh 27000
                </div>
                <hr />
                <div>
                  <table class="product-page-width">
                    <tbody>
                      <tr class="pt-2">
                        <td>Product Name :</td>
                        <td>{{ product.name }}</td>
                      </tr>
                      <tr class="pt-2">
                        <td>Product Type:</td>
                        <td>{{ product.type }}</td>
                      </tr>
                      <tr class="pt-2">
                        <td>Product Category :</td>
                        <td>{{ product.category }}</td>
                      </tr>
                      <tr class="pt-2">
                        <td>Product Quantity :</td>
                        <td>{{ product.quantity }}</td>
                      </tr>
                      <tr class="pt-2">
                        <td>Units :</td>
                        <td>{{ product.units }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <hr />
                <div class="m-t-15">

                  <button style="width: 150px;" id="default-outline-primary" @click="edit_product" type="button" class="btn mb-5 btn-pill btn-outline-primary">
                    <i class="icon-pencil-alt"></i>
                  </button>

                  <button style="width: 150px;" id="default-outline-danger" type="button" class="btn float-right mb-5 ml-2 btn-pill btn-outline-danger">
                    <i class="icon-trash"></i>
                  </button>

                </div>
              </div>
            </div>
          </div>

          <ProductUpdate v-on:product-update-success="product_update" style="display: none;" id="product-update" :productData="product" />
            
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"
// import UpdateProduct from "../assets_forms/product/update"
import Income from "../../../../../components/charts/livestock/incomechart"
import productImagesSlider from "./product_images"
import ProductDescription from "./description"
import ProductUpdate from "../../assets_forms/products/update"

import { HeartRating } from "vue-rate-it";
import router from "@/router";

export default {
  data() {
    return {
      product: {},
      heartrating: {
        rating: 3
      },
      quickViewProduct: [],
      counter: 1,
      modalShow: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 1,
        freeMode: true
      },
      swiperOption1: {
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true,
        centeredSlides: false
      },
      activeTab:'fabric'
    };
  },
  components: {
    // UpdateProduct,
    Income,
    HeartRating,
    productImagesSlider,
    ProductDescription,
    ProductUpdate
  },
  watch: {
    
  },
  created() {

    this.get_current_product()
    
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    getImgUrl(path) {
      return require("../../../../../assets/images/" + path);
    },
    slideTo(id) {
      this.swiper.slideTo(id, 1000, false)
    },
    get_current_product() {

      axios.get(`${ApiUrl.url}products/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.product = resp.data.data
        this.product.images = ["ecommerce/03.jpg","ecommerce/03.jpg","ecommerce/04.jpg","ecommerce/05.jpg"]
        // this.product.description = "This is a description of the product"
        this.product.description = ""
        
        
      } )

      .catch( (err) => {

        if(err.response) {

          if(err.response.status == 404) {

            this.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

          } else if(err.response.status == 401) {

            this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            this.$router.replace("/auth/login")

          }

        }

      } )


    },
    edit_product: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#product-update'
        }
      })

      modal.open()

    },
    product_update: function(product) {

      this.product = product
      this.product.images = ["ecommerce/03.jpg","ecommerce/03.jpg","ecommerce/04.jpg","ecommerce/05.jpg"]
      // this.product.description = "This is a description of the product"
      this.product.description = ""

    }
  }
}
</script>

<style>
  .group-btn {
    display: block;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .group-btn div {
    margin: auto;
  }

  #model-edit-profile {
    width: 60%;
    height: auto;
  }

  .cardheader {
    height: 150px !important;
  }
</style>