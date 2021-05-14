<template>
    <div>
        <Breadcrumbs main="Vehicle" title="View Vehicle"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="user-profile">
              <div class="row">

                <!-- user profile first-style start-->
                <div class="col-sm-12">
                  <div class="card hovercard text-center">
                    <div class="cardheader"></div>
                    <div class="user-image">
                      <div class="avatar"><img alt="" src="../../../../assets/images/user/7.jpg"></div>
                      <div class="icon-wrapper"><i class="icofont icofont-pencil-alt-5"></i></div>
                    </div>
                    <div class="info">
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Registration Number</h6><span> {{ vehicle.registration_number }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6>Type</h6><span> {{ vehicle.type }} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                          <div class="user-designation">
                            <div class="title"><a target="_blank" href="">Mark jecno</a></div>
                            <div class="desc mt-2">Current Driver</div>
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <h6> Status </h6><span> {{ vehicle.status }} </span>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="ttl-info text-left">
                                <button id="default-outline-primary" @click="edit_vehicle" type="button" class="btn btn-pill btn-outline-primary mt-3 btn-block">
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
                            <button id="default-outline-primary" @click="vehicle_roles" type="button" class="btn btn-pill btn-outline-primary float-left ml-3">
                              <i class="icon-pencil-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div v-if="processed_roles.length == 0" class="follow">
                        <div class="row">
                          <div class="col-6 offset-3 center-md-right">
                            <div class="follow-num counter">This Vehicle Have No Role</div>
                            <p class="lead">
                              Please Add Role
                            </p>

                            <button id="default-outline-primary" @click="vehicle_roles" type="button" class="btn btn-pill btn-outline-primary">
                              <i class="fa fa-plus"></i>
                            </button>

                          </div>
                        </div>
                      </div>
                      <div v-if="processed_roles.length > 0" class="follow">
                        <div class="row">
                          <div v-for="processed_role in processed_roles" :key="processed_role.id" class="col-md-4 text-center border-right">
                            <span> {{ processed_role.role }} </span>

                            <div class="follow">
                              <div class="row">

                                <div class="col-6 text-center border-right">
                                  <span>Capacity</span>
                                  <p> {{ processed_role.capacity }} </p>
                                </div>

                                <div class="col-6 text-center border-right">
                                  <span>Units</span>
                                  <p> {{ processed_role.capacity_units }} </p>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <!-- user profile first-style end-->

                 <UpdateVehicle v-on:vehicle-updated-success="vehicle_update" style="display: none;" id="update-vehicle" :vehicleData="vehicle" />

                 <VRolesBox v-on:action-success="action_success" style="display: none;" id="v-roles" :vehicleData="vehicle_data" />
                
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
import UpdateVehicle from "../assets_forms/vehicle/update"
import VRolesBox from "../assets_forms/vehicle/vroles/vroles_box"

export default {
  data() {
    return {
      vehicle : {},
      droles: [],
      processed_roles: [],
      vehicle_data: {}
    }
  },
  components: {
    UpdateVehicle,
    VRolesBox
  },
  watch: {
    droles: function(droles) {
      this.process_roles()
    }
  },
  created() {

    this.get_current_vehicle()
    this.process_roles()
    this.get_droles()
    
  },
  methods: {
    action_success(data) {

      if(data.action == "post") {

        this.vehicle.vroles.push(data.response)
        this.process_roles()
        
      } else if(data.action == "delete") {

        this.vehicle.vroles = this.vehicle.vroles.filter( (vrole) => vrole.id !== data.response.id )

        this.process_roles()

      } else if(data.action == "put") {

        this.vehicle.vroles = this.vehicle.vroles.filter( (vrole) => vrole.id !== data.response.id )
        this.vehicle.vroles.push(data.response)
        this.process_roles()

      }


    },
    process_roles() {

      this.processed_roles = []

      for (const drole of this.droles) {

        for (const vrole of this.vehicle.vroles) {

          if(drole.id == vrole.drole_id) {

            let processed_role = {
              role: drole.role,
              capacity_units: drole.capacity_units,
              capacity: vrole.capacity,
              id: vrole.id
            }

            this.processed_roles.push(processed_role)
          }
          
        }

      }

    },
    get_current_vehicle() {

      axios.get(`${ApiUrl.url}vehicles/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
        }
      })
      .then( (resp) => {

        this.vehicle = resp.data.data
        
      } )

      .catch( (err) => {

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
    edit_vehicle: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#update-vehicle'
        }
      })

      modal.open()

    },
    vehicle_update: function(vehicle) {

      this.vehicle = vehicle

    },
    get_droles: function() {

          axios.get(`${ApiUrl.url}d-roles`, {
            headers: {
                Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
            }
        })
        .then( (resp) => {

            this.droles = resp.data.data

        } )
        .catch( (err) => {

            if(err.response) {

            if(err.response.status == 401) {

                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon: 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

            }

            }

        } )

    },
    vehicle_roles: function() {

        this.vehicle_data = this.vehicle

        let modal = new Custombox.modal({
            content: {
                effect: 'slip',
                target: '#v-roles'
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

  .cardheader {
    height: 150px !important;
  }
</style>