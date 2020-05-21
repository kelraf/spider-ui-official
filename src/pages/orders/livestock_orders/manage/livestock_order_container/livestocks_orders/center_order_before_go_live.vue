<template>
    <div>
        <Breadcrumbs main="Center Order" title="Center Order"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">
                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <!-- <div class="cardheader"></div> -->
                    <!-- <div class="user-image">
                      <div class="avatar"><img alt="" src="../../../../../../assets/images/user/7.jpg"></div>
                      <div class="icon-wrapper"><i class="icofont icofont-pencil-alt-5"></i></div>
                    </div> -->
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Reference Number</h6><span># {{ center_order.id }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Required Animals</h6><span> {{ center_order.required_animals }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Total Price</h6><span> {{ center_order.total_price }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Available Animals</h6><span> {{ center_order.available_animals }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Price Per Animal</h6><span> {{ center_order.price_per_animal }} </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <h6>Total Price Available</h6><span> {{ center_order.total_price_available }} </span>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="ttl-info text-left">
                                <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
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
                          <div class="col-md-6 text-md-right border-right">
                            
                            <!-- Center Orders -->

                          </div>
                          <div class="col-md-6 text-md-left">
                            
                            <!-- Livestock Sales -->

                          </div>
                        </div>
                      </div>

                      <div class="row">

                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-header text-left">
                              <h5 class="card-title">Available Livestocks</h5>
                            </div>
                            <div class="card-body">
                              <div class="table-responsive datatable-vue m-0 vue-smart">
                                <v-table
                                    :data="users.data" class="table"
                                    :currentPage.sync="selectrow.currentPage"
                                    :pageSize="10"
                                    @totalPagesChanged="selectrow.totalPages = $event"
                                    selectionMode="multiple"
                                    selectedClass="table-primary"
                                    @selectionChanged="selectedRows = $event"
                                >

                                  <thead slot="head">
                                  <v-th sortKey="name">Name</v-th>
                                  <v-th sortKey="position">Position</v-th>
                                  <v-th sortKey="office">Office</v-th>
                                  <v-th sortKey="age">Age</v-th>
                                  <v-th sortKey="startdate">Start date</v-th>
                                  <v-th sortKey="salary">Salary</v-th>
                                  </thead>
                                  <tbody slot="body" slot-scope="{displayData}">
                                  <v-tr
                                      v-for="row in displayData"
                                      :key="row.id"
                                      :row="row"
                                  >
                                    <td>{{ row.name }}</td>
                                    <td>{{ row.position }}</td>
                                    <td>{{ row.office }}</td>
                                    <td>{{ row.age }}</td>
                                    <td>{{ row.startdate }}</td>
                                    <td>{{ row.salary }}</td>
                                  </v-tr>
                                  </tbody>
                                </v-table>

                                <smart-pagination
                                    :currentPage.sync="selectrow.currentPage"
                                    :totalPages="selectrow.totalPages"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->
                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>

import {ApiUrl} from "../../../../../../api/apiurl"
import Auth from "../../../../../../auth/js/spider_auth"
import axios from "axios"

import users from './users'

export default {
  data() {
    return {
      center_order: {},
      users,
			basic:{
				currentPage: 1,
				totalPages: 0,
			},

			filter:{
				currentPage: 1,
				totalPages: 0,
			},

			agefilter:{
				currentPage: 1,
				totalPages: 0,
			},

			selectrow:{
				currentPage: 1,
				totalPages: 0,
			},

			selectedRows: [],

			filters: {
				name: { value: '', keys: ['name'] },
				position: { value: '', keys: ['position'] },
				office: { value: '', keys: ['office'] },
				age: { value: '', keys: ['age'] },
				startdate: { value: '', keys: ['startdate'] },
				salary: { value: '', keys: ['salary'] },
			},

			agefilters:{
				age: { value: { min: 19, max: 22 }, custom: this.ageFilter }
			}
    }
  },
  components: {
    
  },
  mounted() {

    axios.get(`${ApiUrl.url}center-orders/${this.$route.params.id}`, {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      })
      .then( (resp) => {

        this.center_order = resp.data.data

        console.log(this.center_order)
                  
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
  filters: {
    get_category: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.category

    },
    get_type: function(livestock_order) {

      if(livestock_order.d_livestock !== undefined) return livestock_order.d_livestock.type

    }
  }
}
</script>