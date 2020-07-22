<template>
    <div>
        <Breadcrumbs main="Profile" title="View Profile"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="edit-profile">
              <div class="row">

                <div class="col-xl-12">

                  <form class="card">

                    <div class="card-header">
                      <h4 class="card-title mb-0">View Profile</h4>
                      <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>
                    </div>
                    <div class="card-body">

                      <div class="row mt-5 mb-5">
                        <div class="col-12 text-center">

                          <!-- Avatars -->
                          <img @click="profile_image" v-if="avatar_url == ''" title="Click To Update The Image." class="img-90 rounded-circle profile-image" src="../../assets/images/default_avatars/default_avatar.svg" alt="Profile Image Placeholder" />
                          <img @click="profile_image" v-if="avatar_url !== ''" title="Click To Update The Image." class="img-90 rounded-circle profile-image" :src="avatar_url" alt="Profile Image" />
                          <!-- Avatars End -->

                          <!-- Names -->
                          <div class="text-center profile-details mt-3 mb-3">
                            <h4> <span class="font-secondary"> <b>{{ user_profile.first_name | convToUpperCase() }} </b>   </span> <span class="font-success">   <b> {{ user_profile.last_name | convToUpperCase() }} </b> </span> </h4>
                          </div>
                          <!-- Names End -->

                          <!-- Buttons -->
                            <div class="mt-3 mb-3">
                              <b-button-group class="btn-group-pill">
                                <b-button class="btn-sm" @click="editPassword" variant="outline-warning">UPDATE PASSWORD</b-button>
                                <b-button class="btn-sm" @click="profile_image" variant="outline-warning"> UPDATE IMAGE </b-button>
                                <b-button class="btn-sm" @click="edit" variant="outline-warning"> UPDATE PROFILE </b-button>
                              </b-button-group>
                            </div>
                          <!-- Buttons End -->

                        </div>
                      </div>

                      <div class="row">

                        <!-- Names -->
                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">First Name</label>
                            <input v-model="user_profile.first_name" disabled class="form-control" type="text" placeholder="First Name">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Last Name</label>
                            <input v-model="user_profile.last_name" disabled class="form-control" type="text" placeholder="Last Name">
                          </div>
                        </div>
                        <!-- Names End -->

                        <!-- Contact Infor -->
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Email</label>
                            <input v-model="user_profile.email" disabled class="form-control" type="text" placeholder="Your Email">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Phone Number</label>
                            <input v-model="user_profile.phone_number" disabled class="form-control" type="text" placeholder="Phone Number">
                          </div>
                        </div>
                        <!-- Contact Infor End -->

                        <!-- Confidential Infor -->
                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Id Number</label>
                            <input v-model="user_profile.national_id_number" disabled class="form-control" type="text" placeholder="Your Id Number">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label class="form-label">Pin</label>
                            <input v-model="user_profile.pin" disabled class="form-control" type="text" placeholder="Pin Number">
                          </div>
                        </div>
                        <!-- Confidential Infor End -->

                        <div class="group-btn text-center">

                          <div class="location-title">
                            <h5 class="text-center">My Location</h5>
                          </div>

                          <!-- <div class="col-xl-6 col-md-8 col-sm-12"> -->
                           
                              <button id="default-outline-primary" type="button" @click="showMap" class="btn btn-pill btn-outline-primary mt-2 mb-2">View My Location</button>
                              
                          <!-- </div> -->
                        </div>

                        <div class="col-sm-6 col-md-4">
                          <div class="form-group">
                            <label class="form-label">City</label>
                            <input v-model="user_profile.national_id_number" disabled class="form-control" type="text" placeholder="City">
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
                            <input v-model="user_profile.country_name" disabled class="form-control" type="number" placeholder="Country">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Currency name</label>
                            <input v-model="user_profile.currency_name" disabled class="form-control" type="text" placeholder="Currency Name">
                          </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                          <div class="form-group">
                            <label class="form-label">Continent Code</label>
                            <input v-model="user_profile.continent_code" disabled class="form-control" type="number" placeholder="Continent Code">
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    
                  </form>

                </div>

                <!-- Model Starts -->
                <EditProfile :userProfile="user_profile" v-on:close-modal="close_model" style="display: none;" id="model-edit-profile" />
                <ShowMap v-on:close-modal="close_model" style="display: none;" id="model-show-map" />
                <EditPassword  :userProfile="user_profile" v-on:close-modal="close_model" style="display: none;" id="model-edit-password" />
                <ProfileImageEditor v-on:avatar-changed="profile_image_changed" :userProfileProp="user_profile" id="model-profile-image" style="display: none;" />
                <!-- Model Ends -->
                
              </div>
            </div>
          </div>
        <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import EditProfile from "./edit_profile"
import ShowMap from "./show_map"
import EditPassword from "./edit_password"
import ImageUploader from "../../components/image_upload"
import ProfileImageEditor from "./profile_image"

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import { mapState } from "vuex"

export default {
  data() {
    return {
      user_profile : {},
      avatar_url: ""
    }
  },
  created() {
        
    this.loadUserData()

  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile.userProfile
    })
  },
  components: {
    EditProfile,
    ShowMap,
    EditPassword,
    ImageUploader,
    ProfileImageEditor
  },
  methods: {
    loadUserData() {

      let headers = {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      }

      axios.get(`${ApiUrl.url}users/${this.userProfile.id}`, headers)

      .then( (resp) => {

        this.user_profile = resp.data.data

        if(Object.keys(this.user_profile.avatar).length > 0) {

          this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${this.user_profile.avatar.avatar.file_name}`

        } else {

          this.avatar_url = ""

        }

      } )
      .catch( (err) => {

        if(err.response) {

          if (err.response.status == 401) {
            
            this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            this.$router.replace("/auth/login")

          }

        }

      } )

    },
    profile_image_changed(data) {

      if(Object.keys(data).length > 0) {

        this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${data.avatar.file_name}`

      } else {
        this.avatar_url = ""
      }


    },
    profile_image: function() {

      this.options = {
        url: `${ApiUrl.url}avatars/${Auth.isAuthenticatedUser().sub}`,
        paramName: "avatars",
        uploadMultiple: false,
        imageFor: "Profile Image"
      }

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-profile-image'
        }
      })

      modal.open()
    },
    edit: function() {

      let modal = new Custombox.modal({
        content: {
          effect: 'slip',
          target: '#model-edit-profile'
        }
      })

      modal.open()

    },
    close_model: function(data) {

      if(data.just_close) {
        Custombox.modal.close()
      } else {
        Custombox.modal.close()
        this.user_profile = data.data
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
  },
  filters: {
    convToUpperCase(name) {

      if(name !== undefined) return name.toUpperCase()

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

  .profile-image:hover {
    cursor: pointer;
  }
</style>