<template>
  <div>

    <Breadcrumbs main="DashBoard" title="Member"/>

    <!-- Container-fluid starts-->
    <div class="container-fluid">

      <div class="row">

        <div class="col-sm-6 p-1 col-xl-3 col-lg-6">
          <div class="card o-hidden">
            <div style="min-height: 108px;" class="bg-success b-r-4 card-body">
              <div class="media static-top-widget">
                <div class="align-self-center text-center"><feather type="briefcase" class="middle"></feather></div>
                <div class="media-body"><span style="font-size: 8px;" class="m-0"> {{ business_data | process_business_category }} </span>
                  <h4 class="mb-0 counter" style="font-size: 8px;"> {{ business_data | process_business_sub_category }} </h4><feather type="briefcase" class="icon-bg"></feather>
                  <h4 class="mb-0 counter" style="font-size: 8px;"> {{ business_data | process_business_name }} </h4>
                </div>
              </div>
            </div>
          </div>
        </div>   

        <div class="col-sm-6 p-1 col-xl-3 col-lg-6">
          <div class="card o-hidden">
            <div class="bg-secondary b-r-4 card-body">
              <div class="media static-top-widget">
                <div class="align-self-center text-center"><feather type="dollar-sign" class="middle"></feather></div>
                <div class="media-body"><span class="m-0">My Wallet</span>
                  <h4 class="mb-0 counter"> $208 </h4><feather type="dollar-sign" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 p-1 col-xl-3 col-lg-6">
          <div class="card o-hidden">
            <div class="bg-primary b-r-4 card-body">
              <div class="media static-top-widget">
                <div class="align-self-center text-center"><feather type="message-square" class="middle"></feather></div>
                <div class="media-body"><span class="m-0">Messages</span>
                  <h4 class="mb-0 counter">893</h4><feather type="message-square" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 p-1 col-xl-3 col-lg-6">
          <div class="card o-hidden">
            <div class="bg-primary b-r-4 card-body">
              <div class="media static-top-widget">
                <div class="align-self-center text-center"><feather type="users" class="middle"></feather></div>
                <div class="media-body"><span class="m-0">New User</span>
                  <h4 class="mb-0 counter">45631</h4><feather type="users" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="row">

        <div class="col-xl-6 xl-100">
          <div class="row">

            <LiveAnimalsMarketOverView />

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

            <div v-if="business_data.category == 'entity' && business_data.sub_category == 'feedlot'" class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <h6 class="mb-0 font-success"><b> FeedLot Requests </b></h6>
                  </div>
                  <div class="project-widgets text-center">
                    <h1 class="font-primary counter"><b>34</b></h1>
                  </div>
                </div>
                <div class="card-footer project-footer">
                  <router-link to="/dashboard/feed-lot-requests" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary btn-block"> VIEW </router-link>
                </div>
              </div>
            </div>

            <div v-if="business_data.category == 'entity' && business_data.sub_category == 'export-zone'" class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <h6 class="mb-0 font-success"><b> ExportZone Requests </b></h6>
                  </div>
                  <div class="project-widgets text-center">
                    <h1 class="font-primary counter"><b>34</b></h1>
                  </div>
                </div>
                <div class="card-footer project-footer">
                  <router-link to="/dashboard/export-zone-requests" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary btn-block"> VIEW </router-link>
                </div>
              </div>
            </div>

            <div v-if="business_data.sub_category == 'slaughter-house' || business_data.sub_category == 'abattoir'" class="col-xl-3 col-sm-6">
              <div class="card">
                <div class="card-body">
                  <div class="media">
                    <h6 class="mb-0 font-success"><b> Slaughter Requests </b></h6>
                  </div>
                  <div class="project-widgets text-center">
                    <h1 class="font-primary counter"><b>34</b></h1>
                  </div>
                </div>
                <div class="card-footer project-footer">
                  <router-link to="/dashboard/slaughter-orders" id="default-outline-primary" type="button" class="btn btn-sm btn-pill btn-outline-primary btn-block"> VIEW </router-link>
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- <div class="col-xl-6 xl-100">
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
        </div> -->
      
    </div>
  </div>
          <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import Admission from './chartjs/admissionchart'
import Datepicker from 'vuejs-datepicker';
import axios from "axios"
import { mapState } from "vuex"
import { Carousel, Slide } from 'vue-carousel';
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import LiveAnimalsMarketOverView from "../../components/charts/livestock_orders/center_order_market/live_animal_market_chart"

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
        LiveAnimalsMarketOverView
      },
      computed: {
        ...mapState({
            business_data: state => state.businessData.businessData
        })
      },
      filters: {
        process_business_category: function({category}) {

          if(category.length) return category.split("-").join(" ").toUpperCase()

        },
        process_business_sub_category: function({sub_category}) {

          if(sub_category.length) return sub_category.split("-").join(" ").toUpperCase()

        },
        process_business_name: function({business_name}) {

          if(business_name.length) return business_name.split("-").join(" ").toUpperCase()

        }
      },
      mounted () {


      }
    }
    </script>
