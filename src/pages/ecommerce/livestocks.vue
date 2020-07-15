<template>
  <div>
    <Breadcrumbs v-if="!loading && d_livestocks.length" main="Shop" title="Live Animals" />


    <!-- Loader -->

    <div v-if="loading" class="container-fluid mt-5 pt-5">
      <div class="row mt-5 pt-5">
        <div class="col-12 pt-5 mt-5 text-center">

          <div class="loader">
              <div class="line bg-warning"></div>
              <div class="line bg-warning"></div>
              <div class="line bg-warning"></div>
              <div class="line bg-warning"></div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center mt-4">
          <p>Loading...</p>
        </div>
      </div>

    </div>

    <!-- Loader Ends -->

    <!-- No d_livestocks -->

    <div v-if="!loading && !d_livestocks.length" class="container-fluid mt-5 pt-5">
      <div class="row mt-5 pt-5">
        <div class="col-md-8 pt-5 mt-5 offset-md-2">
          <h2>
            <b class="font-danger">
              No Live Animals Available At The Moment
            </b>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center pt-3">
          <button @click="$router.go(-1)" id="default-outline-success" type="button" class="btn btn-pill btn-sm btn-outline-success">
            BACK
          </button>
        </div>
      </div>

    </div>

    <!-- No d_livestocks Ends -->

    <!-- Container-fluid starts-->
    <div
      :class="filtered ? 'container-fluid product-wrapper sidebaron' : 'container-fluid product-wrapper'"
      v-if="!loading && d_livestocks.length"
    >
      <div class="product-grid">
        <div class="feature-products">
          <div class="row mt-4">
            <div class="col-md-6 products-total">
              <div class="square-product-setting d-inline-block">
                <a class="icon-grid grid-layout-view" @click="gridView()">
                  <feather type="grid"></feather>
                </a>
              </div>
              <div class="square-product-setting d-inline-block">
                <a class="icon-grid m-0 list-layout-view" @click="listView()">
                  <feather type="list"></feather>
                </a>
              </div>
              <span class="d-none-productlist filter-toggle" @click="collapseFilter()">
                <h6 class="mb-0">
                  Filters
                  <span class="ml-2">
                    <feather type="chevron-down" class="middle"></feather>
                  </span>
                </h6>
              </span>
              <div class="grid-options d-inline-block">
                <ul>
                  <li @click="grid2()">
                    <a class="product-2-layout-view">
                      <span class="line-grid line-grid-1 bg-primary"></span>
                      <span class="line-grid line-grid-2 bg-primary"></span>
                    </a>
                  </li>
                  <li @click="grid3()">
                    <a href="#" class="product-3-layout-view">
                      <span class="line-grid line-grid-3 bg-primary"></span>
                      <span class="line-grid line-grid-4 bg-primary"></span>
                      <span class="line-grid line-grid-5 bg-primary"></span>
                    </a>
                  </li>
                  <li @click="grid4()">
                    <a href="#" class="product-4-layout-view">
                      <span class="line-grid line-grid-6 bg-primary"></span>
                      <span class="line-grid line-grid-7 bg-primary"></span>
                      <span class="line-grid line-grid-8 bg-primary"></span>
                      <span class="line-grid line-grid-9 bg-primary"></span>
                    </a>
                  </li>
                  <li @click="grid6()">
                    <a href="#" class="product-6-layout-view">
                      <span class="line-grid line-grid-10 bg-primary"></span>
                      <span class="line-grid line-grid-11 bg-primary"></span>
                      <span class="line-grid line-grid-12 bg-primary"></span>
                      <span class="line-grid line-grid-13 bg-primary"></span>
                      <span class="line-grid line-grid-14 bg-primary"></span>
                      <span class="line-grid line-grid-15 bg-primary"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <div class="col-md-6">
              <div class="pull-right text-right">
                <span class="f-w-600 mr-2">Showing Products 1 - {{filterProduct.length}} Results</span>
                <div class="select2-drpdwn-product select-options d-inline-block">
                  <select
                    class="form-control btn-square"
                    name="select"
                    @change="onChangeSort($event)"
                  >
                    <option>Order Product By</option>
                    <option value="a-z">Alphabetically, A-Z</option>
                    <option value="z-a">Alphabetically, Z-A</option>
                    <option value="low">price, low to high</option>
                    <option value="high">price, high to low</option>
                  </select>
                </div>
              </div>
            </div> -->

          </div>
          <div class="row">
            <div class="col-sm-3">
              <div class="product-sidebar">
                <div class="filter-section">
                  <div class="card">
                    <div class="card-header">
                      <h6 class="mb-0 f-w-600">
                        Filters
                        <span class="pull-right" @click="collapseFilter()">
                          <i class="fa fa-chevron-down toggle-data"></i>
                        </span>
                      </h6>
                    </div>
                    <Slider @allFilters="allfilter" @priceVal="pricefilterArray" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 col-sm-12">
              <form>
                <div class="form-group m-0">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search.."
                  />
                  <i class="fa fa-search"></i>
                </div>
              </form>
              <!-- <div class="col-sm-12">
                <div v-if="filterProduct.length == 0">
                  <div class="search-not-found text-center">
                    <img src="../../assets/images/empty-search.jpg" alt class="second-search" />
                    <p>Sorry, We didn't find any results matching this search</p>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="product-wrapper-grid" :class="listViewEnable?'list-view':''">
          <div class="row">
            <div
              :class="[col2 ? 'col-md-6': col3 ? 'col-lg-4 col-md-6' : col4 ? 'col-xl-3 col-md-6' : 
                          col6 ? 'col-xl-2 col-lg-4 col-md-6' : list ? 'col-xl-12' : 'col-xl-3 col-md-6']"
              v-for="(d_livestock, index) in d_livestocks"
              :key="index"
            >
              <div class="card">
                <div class="product-box">

                     <div class="container-fluid">
                      <div class="row user-cards">
                        <div class="col-md-12 p-0 col-lg-12 col-xl-12">

                          <div class="card custom-card mb-0">

                            <div v-if="d_livestock.d_livestock_images.length > 0" class="card-profile">
                              <img 
                                class="rounded-circle" 
                                :src="getImgUrl(d_livestock.d_livestock_images[0])"
                                alt=""
                              >
                            </div>

                            <div v-else class="card-profile">
                              <!-- <img class="img-90 rounded-circle margin-auto" :src='"../../assets/images/user/16.png"' alt="#"> -->
                              <div class="initial">
                                <h2>
                                  <b> {{ d_livestock.type | getInitial }} </b>
                                </h2>
                              </div>
                            </div>

                            <div class="text-center profile-details">
                              <h4>
                                <router-link :to="'/ecommerce/details/'+d_livestock.id">
                                  {{ d_livestock.type }}
                                </router-link>
                              </h4>
                              <h6>{{ d_livestock.category }}</h6>
                            </div>

                            <div class="card-footer row">
                              <div class="col-6">

                                <button @click="quickViewDLivestockShow(d_livestock)"  id="default-outline-success" type="button" class="btn btn-x btn-pill btn-xs btn-outline-success btn-block">
                                  <i class="icon-shopping-cart icon-s"></i>
                                </button>

                                <!-- <router-link :to="'/ecommerce/cart'">
                                  <li @click="addToCart(d_livestock)">
                                    <button class="btn" type="button">
                                      <i class="icon-shopping-cart"></i>
                                    </button>
                                  </li>
                                </router-link> -->

                              </div>
                              <div class="col-6">

                                <button
                                  id="default-outline-success" 
                                  type="button" 
                                  class="btn btn-x btn-pill btn-xs btn-outline-success btn-block"
                                  @click="quickView(d_livestock)"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <i class="icon-eye icon-s"></i>
                                </button>

                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                     </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QuickView Modal -->
    <!-- <b-modal size="lg" v-model="modalShow" hide-footer hide-header>
      <button class="close" type="button" v-on:click="quickViewClose(modalShow)">
        <span>×</span>
      </button>
      <div class="product-box quickview row">
        <div class="product-img col-md-6">
           <img class="img-fluid" :src="getImgUrl(quickViewDLivestock.d_livestock_images[0])" alt="">
        </div>
        <div class="product-details col-md-6 text-left">
          <h1>{{quickViewDLivestock.name}}</h1>
          <div class="product-price">
            <del>{{quickViewDLivestock.salePrice | currency }}</del>
            {{quickViewDLivestock.price | currency }}
          </div>
          <div class="product-view">
            <h6 class="f-w-600">Product Details</h6>
            <p class="mb-0">
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam eaque ipsa, quae ab illo.
            </p>
          </div>
          <div class="product-size">
            <ul>
              <li>
                <button class="btn btn-outline-light" type="button">M</button>
              </li>
              <li>
                <button class="btn btn-outline-light" type="button">L</button>
              </li>
              <li>
                <button class="btn btn-outline-light" type="button">Xl</button>
              </li>
            </ul>
          </div>
          <div class="product-qnty">
            <h6 class="f-w-600">Quantity</h6>
            <div class="qty-box1">
              <div class="input-group">
                <i class="fa fa-minus btnGtr1" v-on:click="decrement()"></i>
                <input class="touchspin1 text-center" v-model="counter" name="quantity" type="text" />
                <i class="fa fa-plus btnLess1" v-on:click="increment()"></i>
              </div>
            </div>
            <div class="addcart-btn">
              <router-link :to="'/ecommerce/cart'">
                <button
                  class="btn btn-primary-gradien m-r-10"
                  type="button"
                  data-original-title="btn btn-info-gradien"
                  title
                  @click="addToCart(quickViewDLivestock, counter)"
                >Add To Cart</button>
              </router-link>
              <router-link
                :to="'/ecommerce/checkout'"
                class="btn btn-primary cart-btn-transform"
              >Buy Now</router-link>
            </div>
          </div>
        </div>
      </div>
    </b-modal> -->

    <QuickViewDLivestock
      id="quick-view-d-livestock"
      style="display: none;"
      :quickViewDLivestock="quickViewDLivestock"
      @add-to-cart="addToCart"
    />

  </div>
</template>
<script>

import { mapGetters } from "vuex";
import Slider from "./filterbar";
import QuickViewDLivestock from "./quick_view_d_livestock"

import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import axios from "axios"

export default {
  name: "Livestock",
  components: {
    Slider,
    QuickViewDLivestock
  },
  data() {
    return {
      modalShow: false,
      quickViewDLivestock: {},
      counter: 1,
      priceArray: [],
      allfilters: [],
      items: [],
      filtered: false,
      col2: false,
      col3: false,
      col4: true,
      col6: false,
      listViewEnable: false,
      list: false,
      d_livestocks: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      filterProduct: "products/filterProducts",
      livestocks: "livestocks/getDLivestocks",
      cart_data: "livestocks/getCartData"
    }),
  },
  mounted() {
    this.loadData()
  },
  methods: {

    //For getting image path
    getImgUrl(d_livestock_image) {

        return `${ApiUrl.url}uploads/d_livestocks/` + d_livestock_image.image.file_name

    },

    // For Order By  
    onChangeSort(event) {
      this.$store.dispatch('products/sortProducts', event.target.value)
    },

    //Filter by Category, Brand, Color
    allfilter(selectedVal) {
      this.allfilters = selectedVal;
      this.$store.dispatch("products/setTags", selectedVal);
    },

    collapseFilter() {
      this.filtered = !this.filtered;
    },

    //Price Filter
    pricefilterArray(item) {
      this.$store.dispatch("products/priceFilter", item);
    },
    
    //Add to cart
    addToCart: function(payLoad) {

      let livestock_order = {
        d_livestock_id: payLoad.d_livestock_id,
        category: payLoad.category,
        type: payLoad.type,
        livestock_order_container_id: null,
        quantity: payLoad.quantity,
        price_per_animal: payLoad.price_per_animal,
        total_price: payLoad.total_price
      };

      this.$store.dispatch("livestocks/addToCart", livestock_order);

      this.$toasted.show(`Added To Cart.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

    },

    //Quick View
    quickViewDLivestockShow: function(d_livestock) {

      this.quickViewDLivestock = d_livestock

      let modal = new Custombox.modal({
          content: {
              effect: 'slip',
              target: '#quick-view-d-livestock'
          }
      })

      modal.open()

    },
    quickViewClose: function() {
      this.modalShow = false;
    },

    //Quantity increment Decrement
    increment() {
      if (this.counter < this.quickViewDLivestock.stock) this.counter++;
    },

    decrement() {
      if (this.counter > 1) this.counter--;
    },

    //Grid changes
    grid2() {
      this.col2 = true;
      this.col3 = false;
      this.col4 = false;
      this.col6 = false;
      this.listViewEnable = false;
    },
    grid3() {
      this.col2 = false;
      this.col3 = true;
      this.col4 = false;
      this.col6 = false;
      this.listViewEnable = false;
    },
    grid4() {
      this.col2 = false;
      this.col3 = false;
      this.col4 = true;
      this.col6 = false;
      this.listViewEnable = false;
    },
    grid6() {
      this.col2 = false;
      this.col3 = false;
      this.col4 = false;
      this.col6 = true;
      this.listViewEnable = false;
    },
    listView() {
      this.listViewEnable = true;
      this.list = true;
      this.col2 = false;
      this.col3 = false;
      this.col4 = false;
      this.col6 = false;
    },
    gridView() {
      this.listViewEnable = false;
      this.col4 = true;
    },
    loadData() {

      let self = this

      axios.get(`${ApiUrl.url}d-livestock`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
      })
      .then( (resp) => {
        setTimeout(() => {

            self.loading = false
            self.d_livestocks = resp.data.data

        }, 2000)
      } )

      .catch( (err) => {

          setTimeout(() => {

            self.loading = false

            if(err.response) {

              if(err.response.status == 404) {

                  self.$toasted.show(`Oops!! Something Went Wrong. Please Try Again. : 404`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})

              } else if(err.response.status == 401) {

                  self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                  self.$router.replace("/auth/login")

              }

          }

          })

      } )

    }
  },
  filters: {
    getInitial(type) {

      return type.split("")[0].toUpperCase()

    }
  }
};
</script>

<style scoped>
  .btn-x {
    height: 30px;
    padding-top: 7px;
  }
  .icon-s {
    font-size: 14px !important;
  }
  .initial {
    margin: auto;
    height: 100px;
    width: 100px;
    background: gray;
    border-radius: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .initial h2 {
    padding-top: 30%;
    font-weight: 800;
    color: white;
  }
</style>
