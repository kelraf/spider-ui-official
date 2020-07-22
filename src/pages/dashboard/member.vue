<template>
  <div>

    <Breadcrumbs main="DashBoard" title="DashBoard"/>

    <!-- Container-fluid starts-->
    <div class="container-fluid">

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
        
      </div>

      <div class="row">

        <div class="col-xl-6 xl-100">
          <div class="row">
            <div class="col-xl-6 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <h6 class="mb-0 font-success"> <b>Live Animal Market</b> </h6>
                  </div>
                  <div class="project-widgets text-center">
                    <h1 class="font-primary counter"><b>45 <span class="font-danger">+</span></b></h1>
                  </div>
                </div>
                <div class="card-footer project-footer text-center">
                  <router-link to="/dashboard/market" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary"> VISIT MARKET </router-link>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <h6 class="mb-0 font-secondary"> <b>Produce Market</b> </h6>
                  </div>
                  <div class="project-widgets text-center">
                    <h1 class="font-primary counter"> <b>45 +</b> </h1>
                  </div>
                </div>
                <div class="card-footer project-footer text-center">
                  <router-link to="/dashboard/market" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary"> VISIT MARKET </router-link>
                </div>
              </div>
            </div>
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-success"><b>Live Animal Sales</b></h6>
											</div>
											<div class="project-widgets text-center">
												<h1 class="font-primary counter"><b>34</b></h1>
											</div>
										</div>
										<div class="card-footer project-footer">
											<router-link to="/dashboard/livestock-sales" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary btn-block"> VIEW </router-link>
										</div>
									</div>
								</div>
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-secondary"><b>Total Payment Made</b></h6>
											</div>
											<div class="project-widgets text-center">
												<h2 class="font-primary counter"><b>$ 450 </b></h2>
											</div>
										</div>
										<div class="card-footer project-footer">
											<h6 style="font-size: 15px;" class="mb-0"> <span class="font-success">Completed Payment</span> : <span class="counter">10</span> </h6>
										</div>
									</div>
								</div>

							</div>

        </div>

        <div class="col-xl-6 xl-100">
          <div class="row">

            <div class="col-md-6">
              <div class="card">
                <div class="card-body">

                    <div class="media feather-main">
                    <div class="feather-icon-block"><feather type="navigation"></feather></div>
                    <div class="media-body align-self-center">
                        <h6>Manage Business Assets</h6>
                    </div>
                    </div>

                    <div class="media feather-main">

                    <div class="col-xl-6 xl-100">
                        <div class="row pt-4">
                          <div class="col-md-6">
                              <router-link to="/dashboard/assets" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Manage </router-link>
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


      }
    }
    </script>
