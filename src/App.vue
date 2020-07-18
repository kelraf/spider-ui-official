<template>
  <div id="app">
 <!-- Loader starts-->
    <!-- <div class="loader-wrapper"  :class="{'loderhide' : businessLoadSuccess !== null || userProfileLoadSuccess !== null && processingComplete}">
      <div class="loader bg-white">
        <div class="whirly-loader"> </div>
      </div>
    </div> -->
  <!-- Loader ends-->

    <!--<Main/>-->
    <router-view></router-view>
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

        // this.loadBusinessData()

      }

    }    
  },
  mounted() {

    },
    methods:{ 
      getCurrentLocation() {

        // "https://json.geoiplookup.io/api"

        axios.get("http://geoplugin.net/json.gp")

        .then((resp) => {
          console.log(resp)
        })
        
        .catch((err) => {
          console.log("Error Here", err)
        })

      },  
      timeOut(){
          // this.basketAddSuccess = true;
            var self = this;
            setTimeout(function(){
                self.show = false;
            }, 1000);
      }
    }
  }
</script>

<style lang="scss" scoped>
.loader-wrapper.loderhide {
  display: none;
}
</style>
