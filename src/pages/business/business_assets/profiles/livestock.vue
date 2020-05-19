<template>
    <div>
        <Breadcrumbs main="Livestock" title="View Livestock"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">

                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <!-- <div class="cardheader"></div> -->
                    <!-- <div class="user-image">
                      <div class="avatar"><img alt="" src="../../../../assets/images/user/7.jpg"></div>
                      <div class="icon-wrapper"><i class="icofont icofont-pencil-alt-5"></i></div>
                    </div> -->
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Reference</h6><span> {{ livestock.reference }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Type</h6><span> {{ livestock.type }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-1">
                          <div class="row">

                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6> Breed </h6><span> {{ livestock.breed }} </span>
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6> Price Per Animal </h6><span> {{ livestock.price }} </span>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6> Quantity </h6><span> {{ livestock.quantity }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <button id="default-outline-primary" @click="edit_livestock" type="button" class="btn btn-pill btn-outline-primary mt-3 btn-block">
                                  <i class="icon-pencil-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="follow">
                        <div class="row">
                          <div class="col-6 pt-2 text-md-right border-right">
                            <span>Roles</span>
                          </div>
                          <div class="col-6  border-right">
                            <!-- <button id="default-outline-primary" @click="livestock_roles" type="button" class="btn btn-pill btn-outline-primary float-left ml-3">
                              <i class="icon-pencil-alt"></i>
                            </button> -->
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="follow">
                        <div class="row">
                          <div class="col-md-6 text-left border-right">
                            <span>LiveStock Update History</span>

                            <LiveStockUpdateChart class="mt-3" :livestockData="livestock" />
                            
                          </div>
                          <div class="col-md-6">
                            <span>LiveStock Sales History</span>

                            <LiveStockSalesChart class="mt-3" :livestockData="livestock" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->

                 <UpdateLivestock v-on:action-success="livestock_update" style="display: none;" id="update-livestock" :livestockData="livestock" />

                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>

import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import UpdateLivestock from "../assets_forms/livestock/update"
import { DLivestockProcessor } from "../../../../helpers/livestock"
import LiveStockUpdateChart from "../../../../components/charts/livestock/livestock_update"
import LiveStockSalesChart from "../../../../components/charts/livestock/livestock_sales"
import Income from "../../../../components/charts/livestock/incomechart"

export default {
  data() {
    return {
      livestock : {}
    }
  },
  components: {
    UpdateLivestock,
    LiveStockUpdateChart,
    LiveStockSalesChart,
    Income
  },
  watch: {
    
  },
  created() {

    this.get_current_livestock()
    
  },
  methods: {
    get_current_livestock() {

      axios.get(`${ApiUrl.url}livestocks/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.livestock = resp.data.data

        let one = resp.data.data

        axios.get(`${ApiUrl.url}d-livestock`, {
					headers: {
						Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
					}
        })
        
				.then( (resp) => {

          let processed = DLivestockProcessor.process_business_livestock(resp.data.data, [one])

          this.livestock = processed.length > 0 ? processed[0] : {}

				} )
				.catch( (err) => {

					if(err.response) {

						if(err.response.status == 401) {

						this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
						this.$router.replace("/auth/login")

						}

					}

				} )
        
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
    edit_livestock: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#update-livestock'
        }
      })

      modal.open()

    },
    livestock_update: function(livestock) {

      axios.get(`${ApiUrl.url}d-livestock`, {
					headers: {
						Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
					}
				})
				.then( (resp) => {

          let processed = DLivestockProcessor.process_business_livestock(resp.data.data, [livestock])

          this.livestock = processed.length > 0 ? processed[0] : {}

				} )
				.catch( (err) => {

					if(err.response) {

						if(err.response.status == 401) {

						this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
						this.$router.replace("/auth/login")

						}

					}

				} )

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