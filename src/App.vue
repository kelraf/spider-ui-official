<template>
  <div id="app">
 <!-- Loader starts-->
    <div class="loader-wrapper"  :class="{'loderhide' : businessLoadSuccess !== null || userProfileLoadSuccess !== null && processingComplete}">
      <div class="loader bg-white">
        <div class="whirly-loader"> </div>
      </div>
    </div>
  <!-- Loader ends-->

    <!--<Main/>-->
    <router-view
      v-if="businessLoadSuccess !== null || userProfileLoadSuccess !== null && processingComplete"
      ></router-view>
  </div>
</template>

<script>

import { mapState } from "vuex";

import axios from "axios"
import { ApiUrl } from "./api/apiurl"
import Auth from "./auth/js/spider_auth"

export default {
  name: 'app',
  data(){
    return{
      show: true,
      businessLoadSuccess: null,
      userProfileLoadSuccess: null,
      processingComplete: false
    }
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile.userProfile,
      businessData: state => state.businessData.businessData
    })
  },
  watch: {
    userProfile: function(current, innitial) {

      if(!Object.keys(innitial).length && Object.keys(current).length) {

        this.loadBusinessData()

      }

    }    
  },
  mounted() {

    console.log("HHHHHHHHHH", Auth.isAuthenticatedUser().bool)

      if(Auth.isAuthenticatedUser().bool)  {

        if(Object.keys(this.userProfile).length) return

        this.loadUserProfile()

      } else {

        this.userProfileLoadSuccess = false
        this.processingComplete = false
        this.businessLoadSuccess = true

        this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
        this.$router.replace("/auth/login")

      }
    },
    methods:{   
      timeOut(){
          // this.basketAddSuccess = true;
            var self = this;
            setTimeout(function(){
                self.show = false;
            }, 1000);
      },
      loadBusinessData() {

          let headers = {
              headers: {
                  Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
              }
          }

          axios.get(`${ApiUrl.url}businesses/user/${Auth.isAuthenticatedUser().sub}`, headers)
            .then( (resp) => {

              if(resp.data.data.length <= 0) {


                this.businessLoadSuccess = false

                if(this.userProfile.role == "spider-member" || this.userProfile.role == "spider-client") {

                  this.$router.push({path: "/account-pending"})

                }

              } else {

                this.businessLoadSuccess = true
                this.processingComplete = true
                this.business = resp.data.data[0]
                this.$store.dispatch("menu/processMenuFor", this.business.sub_category);
                this.$store.dispatch('businessData/updateBusinessData', this.business) 
                this.$router.push({path: "/dashboard"})

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
      loadUserProfile: function() {

          let headers = {
              headers: {
                  Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
              }
          }

          axios.get(`${ApiUrl.url}users/${Auth.isAuthenticatedUser().sub}`, headers)
          .then( (resp) => {

              this.userProfileLoadSuccess = true
              this.user_profile = resp.data.data
              this.$store.dispatch('userProfile/updateUserProfile', this.user_profile)

          } )
          .catch( (err) => {

            if(err.response) {

              if (err.response.status == 401) {
                
                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")

              }

            }

          } )

        }
    }
  }
</script>

<style lang="scss" scoped>
.loader-wrapper.loderhide {
  display: none;
}
</style>
