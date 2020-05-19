<template>
    <div>
        <Breadcrumbs main="DLivestock" title="View DLivestock"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">

                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="info">
                      
                      <div class="follow">
                        <div class="row">
                          
                            <!-- Container-fluid starts-->
                            <table class="table table-bordernone">
                              <thead>
                                  <tr>
                                  <th scope="col">Reference Number</th>
                                  <th scope="col">Category</th>
                                  <th scope="col">Type</th>
                                  <th scope="col">Total</th>
                                  <th scope="col"><i class="fa fa-angle-down"></i></th>
                                  </tr>
                              </thead>
                              <tbody> 
                                <tr class="pt-3">
                                    <td> #{{ dlivestock.id }} </td>
                                  <td>
                                      {{ dlivestock.category }}
                                  </td>
                                  <td>
                                      {{ dlivestock.type }} 
                                  </td>
                                  <td>
                                      75663
                                  </td>
                                  <td>
                                    <button id="default-outline-primary" @click="edit_dlivestock" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                        <i class="icon-pencil-alt"></i>
                                      </button>
                                  </td>
                                  </tr>
                              </tbody>
                            </table>
                            <!-- Container-fluid Ends-->

                        </div>
                      </div>
                      <hr>
                      <div class="follow">
                        <div class="row">
                          <div class="col-md-5 text-left border-right">

                            <ImageSlider :dlivestockData="dlivestock" />

                          </div>
                          <div class="col-md-7">
                            <span>LiveStock Sales History</span>

                            <!-- <LiveStockSalesChart class="mt-3" :livestockData="livestock" /> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->

                 <UpdateDLivestock v-on:dlivestock-update-success="dlivestock_update" style="display: none;" id="update-dlivestock" :DLivestockData="dlivestock" />

                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"
import UpdateDLivestock from "./update"
import LiveStockUpdateChart from "../../../components/charts/livestock/livestock_update"
import LiveStockSalesChart from "../../../components/charts/livestock/livestock_sales"
import Income from "../../../components/charts/livestock/incomechart"
import ImageSlider from "./images/images"

export default {
  data() {
    return {
      dlivestock : {}
    }
  },
  components: {
    UpdateDLivestock,
    LiveStockUpdateChart,
    LiveStockSalesChart,
    Income,
    ImageSlider
  },
  watch: {
    
  },
  created() {

    this.get_current_dlivestock()
    
  },
  methods: {
    get_current_dlivestock() {

      axios.get(`${ApiUrl.url}d-livestock/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.dlivestock = resp.data.data
                
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
    edit_dlivestock: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#update-dlivestock'
        }
      })

      modal.open()

    },
    dlivestock_update: function(data) {

      this.dlivestock = data
      
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