<template>
    <div>
        <Breadcrumbs main="Profile" title="View Profile"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="edit-profile">
              <div class="row">

                  <div class="col-md-6 col-lg-6 col-xl-4">
                    <div class="card custom-card">

                      <div class="card-header"><img class="img-fluid" src="../../assets/images/user-card/1.jpg" alt=""></div>

                      <div class="card-profile"><img class="rounded-circle" src="../../assets/images/avtar/3.jpg" alt=""></div>

                      <div class="text-center profile-details">
                        <h4>Mark Jecno</h4>
                        <h6>Manager</h6>
                      </div>

                      <div class="card-footer row">
                        <div class="col-4 col-sm-4">
                          <h6>Follower</h6>
                          <h3 class="counter">9564</h3>
                        </div>
                        <div class="col-4 col-sm-4">
                          <h6>Following</h6>
                          <h3><span class="counter">49</span>K</h3>
                        </div>
                        <div class="col-4 col-sm-4">
                          <h6>Total Post</h6>
                          <h3><span class="counter">96</span>M</h3>
                        </div>
                      </div>

                    </div>
                  </div>

                <div class="col-xl-8">

                  <form class="card">

                    <div class="card-header">
                      <h4 class="card-title mb-0">View Profile</h4>
                      <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>
                    </div>
                    <div class="card-body">
                      <div class="row">

                        <!-- Names -->
                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Business Name</label>
                            <input disabled v-model="business_profile.business_name" class="form-control" type="text" placeholder="Business Name">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Business Type</label>
                            <input disabled v-model="business_profile.business_type" class="form-control" type="text" placeholder="Business Type">
                          </div>
                        </div>
                        <!-- Names End -->

                        <!-- Contact Infor -->
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Business Category</label>
                            <input disabled  v-model="business_profile.category" class="form-control" type="text" placeholder="Business Category">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Business Email</label>
                            <input disabled class="form-control" type="text" placeholder="Business Email">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Business Phone Number</label>
                            <input disabled class="form-control" type="text" placeholder="Business Phone Number">
                          </div>
                        </div>

                        <!-- Contact Infor End -->

                        <!-- Confidential Infor -->
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Registration Number</label>
                            <input v-model="business_profile.registration_number" disabled class="form-control" type="text" placeholder="Registration Number">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Pin</label>
                            <input v-model="business_profile.business_pin" disabled class="form-control" type="text" placeholder="Pin Number">
                          </div>
                        </div>
                        <!-- Confidential Infor End -->

                        <div class="group-btn">

                          <div class="location-title">
                            <h5 class="pl-3">Business Location</h5>
                          </div>
                           
                          <button id="default-outline-primary" type="button" @click="showMap" class="btn btn-pill btn-outline-primary mt-2 mb-2 ml-3">View Business Location On Google Maps</button>
                              
                        </div>

                        <div class="col-sm-6 col-md-4">
                          <div class="form-group">
                            <label class="form-label">City</label>
                            <input disabled class="form-control" type="text" placeholder="City">
                          </div>
                        </div>
                        <div class="col-sm-6 col-md-3">
                          <div class="form-group">
                            <label class="form-label">Postal Code</label>
                            <input disabled class="form-control" type="number" placeholder="ZIP Code">
                          </div>
                        </div>
                        <div class="col-md-5">
                          <div class="form-group">
                            <label class="form-label">Country</label>
                            <select disabled class="form-control btn-square">
                              <option value="0">--Select--</option>
                              <option value="1">Germany</option>
                              <option value="2">Canada</option>
                              <option value="3">Usa</option>
                              <option value="4">Aus</option>
                            </select>
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Currency name</label>
                            <input disabled class="form-control" type="text" placeholder="Currency Name">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Continent Name</label>
                            <input disabled class="form-control" type="number" placeholder="Continent Name">
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div class="card-footer text-right">

                      <button id="default-outline-primary" type="button" @click="edit" class="btn btn-pill btn-outline-primary mt-2 mb-2">Update Profile</button>

                    </div>
                  </form>

                </div>

                <!-- Model Starts -->

                <EditProfile :businessProfile="business_profile" v-on:close-modal="close_model" style="display: none;" id="model-edit-profile" />
                <ShowMap v-on:close-modal="close_model" style="display: none;" id="model-show-map" />

                <!-- Model Ends -->

                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title mb-0">My Businesses</h4>
                      <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>
                    </div>
                    <div class="table-responsive mb-0">
                      <table class="table card-table table-vcenter text-nowrap">
                        <thead>
                          <tr>
                            <th>Project Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><a class="text-inherit" href="#">Untrammelled prevents</a></td>
                            <td>14 June 2018</td>
                            <td><span class="status-icon bg-warning"></span> Pending</td>
                            <td>$70,435</td>
                            <td class="text-right"><a class="icon" href="javascript:void(0)"></a><a class="btn btn-primary btn-sm" href="javascript:void(0)"><i class="fa fa-pencil"></i> Edit</a><a class="icon" href="javascript:void(0)"></a><a class="btn btn-transparent btn-sm" href="javascript:void(0)"><i class="fa fa-link"></i> Update</a><a class="icon" href="javascript:void(0)"></a><a class="btn btn-danger btn-sm" href="javascript:void(0)"><i class="fa fa-trash"></i> Delete</a></td>
                          </tr>
                          <tr>
                            <td><a class="text-inherit" href="#">Untrammelled prevents</a></td>
                            <td>25 June 2018</td>
                            <td><span class="status-icon bg-success"></span> Completed</td>
                            <td>$15,987</td>
                            <td class="text-right"><a class="icon" href="javascript:void(0)"></a><a class="btn btn-primary btn-sm" href="javascript:void(0)"><i class="fa fa-pencil"></i> Edit</a><a class="icon" href="javascript:void(0)"></a><a class="btn btn-transparent btn-sm" href="javascript:void(0)"><i class="fa fa-link"></i> Update</a><a class="icon" href="javascript:void(0)"></a><a class="btn btn-danger btn-sm" href="javascript:void(0)"><i class="fa fa-trash"></i> Delete</a></td>
                          </tr>
                        </tbody>
                      </table>
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

import EditProfile from "./edit_profile"
import ShowMap from "./show_map"

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default {
  data() {
    return {
      business_profile: {}
    }
  },
  components: {
    EditProfile,
    ShowMap
  },
  created() {

    axios.get(`${ApiUrl.url}businesses/${this.$route.params.id}`, {
      headers: {
        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
      }
    })
    .then( (resp) => {

      this.business_profile = resp.data.data
      
    } )

    .catch( (err) => {
      console.log(err.response)
      if(err.response) {

        if(err.response.status == 404) {
          console.log("Error 404")
        } else if(err.response.status == 401) {

          this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
          this.$router.replace("/auth/login")

        }

      }
    } )

  },
  methods: {
    edit: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-edit-profile'
        }
      })

      modal.open()

    },
    close_model: function(value) {

      if(value.just_close) {
        Custombox.modal.close()
      } else {
        Custombox.modal.close()
        this.business_profile = value.data
      }

    },
    showMap: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-show-map'
        }
      })

      modal.open()

    },
    editPassword: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-edit-password'
        }
      })

      modal.open()

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

  .pass-update {
  }
</style>