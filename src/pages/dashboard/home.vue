<template>
  <div>

    <Breadcrumbs main="DashBoard" title="DashBoard"/>

    <NoBusiness v-if="no_business && Object.keys(business_profile).length == 0" />

    <!-- Container-fluid starts-->
    <div v-if="!no_business && Object.keys(business_profile).length > 0" class="container-fluid">

      <div class="row">
        <div class="col-md-12">
          <carousel 
            :perPageCustom="[[1440, 3], [1366, 4],[600, 3],[420, 2],[0,1]]"
            :perPage=4
            :minSwipeDistance=10
            :mouse-drag=true
            :speed=3000
            :paginationEnabled=true
            :autoplay=true
            >
            
            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center">
                    <feather type="briefcase"></feather>
                    <div><span v-text="business_profile.business_name"> {{ business_profile.business_name }} </span></div>
                    <h4 class="font-primary mb-0 counter"> {{ business_profile.business_type | process_business_type }} </h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide v-if="business_profile.business_type == 'group_ranch' || business_profile.business_type == 'association' || business_profile.business_type == 'co-oparative'">
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center">
                    <feather type="users"></feather>
                    <div><span>Business Members</span></div>
                    <h4 class="font-primary mb-0 counter">72</h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center">
                    <i class="fa fa-plane fa-2x"></i>
                    <div><span>Business Plane</span></div>
                    <h4 class="font-primary mb-0 counter">65</h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center">
                    <i class="fa fa-plane fa-2x"></i>
                    <div><span>Business Plane</span></div>
                    <h4 class="font-primary mb-0 counter">65</h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center">
                    <i class="fa fa-plane fa-2x"></i>
                    <div><span>Business Plane</span></div>
                    <h4 class="font-primary mb-0 counter">65</h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center"><feather type="shopping-cart"></feather>
                    <div><span>Total Sale Product</span></div>
                    <h4 class="font-primary mb-0 counter">96</h4>
                  </div>
                </div>
              </div>
            </slide>

            <slide>
              <div class="item">
                <div class="card">
                  <div class="card-body ecommerce-icons text-center"><feather type="trending-down"></feather>
                    <div><span>Company Loss</span></div>
                    <h4 class="font-primary mb-0 counter">89</h4>
                  </div>
                </div>
              </div>
            </slide>

          </carousel>
        </div>
        <!-- <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Total Sale</h5>
            </div>
            <div class="card-body charts-box">
              <div class="flot-chart-container">
                  <Salechart class="flot-chart-placeholder" id="graph123"/>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <div class="row">

        <div class="col-xl-6 xl-100">
          <div class="row">

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body progress-media">
                        <div class="media">
                            <div class="media-body">
                                <h5> Profile Status </h5><span class="mb-0 d-block">Feedback</span>
                            </div><feather type="message-circle" />
                        </div>
                        <div class="progress-bar-showcase">
                            <div class="progress sm-progress-bar">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: 85%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="progress-change">
                          <span>
                            <router-link :to="'/businesses/profile/'+business_profile.id" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mb-2"> Edit </router-link>
                          </span>
                          <span class="pull-right">
                            85%
                          </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
              <div class="card">
                <div class="card-body">

                    <div class="media feather-main">
                    <div class="feather-icon-block"><feather type="navigation"></feather></div>
                    <div class="media-body align-self-center">
                        <h6>Manage Business Assets</h6>
                        <p>8569</p>
                    </div>
                    </div>

                    <div class="media feather-main">

                    <div class="col-xl-6 xl-100">
                        <div class="row pt-4">

                        <div class="col-md-6">
                            <router-link :to="'/businesses/assets/'+business_profile.id" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Manage </router-link>
                        </div>

                        <!-- <div class="col-md-6">
                            <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                        </div> -->

                        </div>
                    </div>
                    
                    </div>

                </div>

              </div>
            </div>

            <!-- <Manage /> -->

          </div>
        </div>

        <div class="col-xl-6 xl-100">
          <div class="row">

            <!-- Can Be Used If Business Type in association group ranch or co-oparative to show group join request -->
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header card-header-border">
                        <div class="row">
                            <div class="col-sm-6">
                                <h5>Join Request</h5>
                            </div>
                            <!-- <div class="col-sm-6">
                                <div class="pull-right right-header"><span>Month</span><span>
                        <button class="btn btn-primary btn-pill">Today</button></span></div>
                            </div> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="new-users">
                            <div class="media"><img class="rounded-circle image-radius m-r-15" :src='"../../assets/images/user/2.png"' alt="">
                                <div class="media-body">
                                    <h6 class="mb-0 f-w-700">Nick Stone</h6>
                                    <p>Visual Designer, Github Inc</p>
                                </div><span class="pull-right">
                      <button class="btn btn-pill btn-outline-light">Follow</button></span>
                            </div>
                            <div class="media"><img class="rounded-circle image-radius m-r-15" :src='"../../assets/images/user/5.jpg"' alt="">
                                <div class="media-body">
                                    <h6 class="mb-0 f-w-700">Milano Esco</h6>
                                    <p>Visual Designer, Github Inc</p>
                                </div><span class="pull-right">
                      <button class="btn btn-pill btn-outline-light">Follow</button></span>
                            </div>
                            <div class="media"><img class="rounded-circle image-radius m-r-15" :src='"../../assets/images/user/3.jpg"' alt="">
                                <div class="media-body">
                                    <h6 class="mb-0 f-w-700">Wiltor Noice</h6>
                                    <p>Visual Designer, Github Inc</p>
                                </div><span class="pull-right">
                      <button class="btn btn-pill btn-outline-light">Follow</button></span>
                            </div>
                            <div class="media"><img class="rounded-circle image-radius m-r-15" :src='"../../assets/images/user/4.jpg"' alt="">
                                <div class="media-body">
                                    <h6 class="mb-0 f-w-700">Anna Strong</h6>
                                    <p>Visual Designer, Github Inc</p>
                                </div><span class="pull-right">
                      <button class="btn btn-pill btn-outline-light">Follow</button></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Orders -->

          <div class="col-md-6">
              <div class="card">
                <div class="card-body">

                    <div class="media feather-main">
                    <div class="feather-icon-block"><feather type="navigation"></feather></div>
                    <div class="media-body align-self-center">
                        <h6>Manage Business Orders</h6>
                        <p>8569</p>
                    </div>
                    </div>

                    <div class="media feather-main">

                    <div class="col-xl-6 xl-100">
                        <div class="row pt-4">

                        <div class="col-md-6">
                            <router-link to="/orders" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Manage </router-link>
                        </div>

                        <!-- <div class="col-md-6">
                            <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                        </div> -->

                        </div>
                    </div>
                    
                    </div>

                </div>

              </div>
            </div>

          <!-- Orders End -->

          </div>

        </div>
      
    </div>
  </div>
          <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import Admission from './chartjs/admissionchart'
import Datepicker from 'vuejs-datepicker';
import axios from "axios"
import { Carousel, Slide } from 'vue-carousel';
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import NoBusiness from "./no_business"

      export default {
        data() {
          return {
            no_business: false,
            business_profile: {}
          }
       },
       components: {
        Datepicker,
        Admission,
        Carousel,
        Slide,
        NoBusiness
      },
      filters: {
        process_business_type: function(value) {

          if(value == "supplier") {
            return "Supplier"
          } else if(value == "transport-air") {
            return "Air Transport"
          } else if(value == "transport-rail") {
            return "Rail Transport"
          } else if(value == "transport-water") {
            return "Water Transport"
          } else if(value == "transport-road") {
            return "Road Transport"
          } else if(value == "farmer") {
            return "Farmer"
          } else if(value == "slaughter_house") {
            return "Slaughter House"
          } else if(value == "abattoir") {
            return "Abattoir"
          } else {
            return 0
          }

        }
      },
      mounted () {

        axios.get(`${ApiUrl.url}businesses/user/${Auth.isAuthenticatedUser().sub}`, {
          headers: {
            Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
        })
        .then( (resp) => {

          if(resp.data.data.length > 0) {

            this.business_profile = resp.data.data[0]

          } else {
            this.no_business = true
          }          

        } )
        .catch( (err) => {

          if(err.response) {

            if(err.response.status == 401) {

              this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
              this.$router.replace("/auth/login")

            } else if(err.response.status == 404) {
              this.no_business = true
            }

          }

        } )

      }
    }
    </script>
