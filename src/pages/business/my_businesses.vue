<template>
  <div>

    <Breadcrumbs main="My Businesses" title="My Businesses"/>
    <!-- Container-fluid starts-->

     <div v-if="my_businesses.length == 0" class="container-fluid">
      <div class="row">

        <div class="col-sm-12 col-xl-12 xl-100 col-lg-12">
          <div class="card social-widget-card">
            <div class="card-body">
              <div class="redial-social-widget radial-bar-70" data-label="50%"><i class="fa fa-facebook font-primary"></i></div>
              <h5 class="b-b-light">You Don't Have Any Business</h5>
              <div class="row">
                <div class="col text-center b-r-light"><span style="opacity: 0">Like</span>
                  <router-link id="default-outline-primary" to="/businesses/to-create" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Back Home </router-link>
                </div>
                <div class="col text-center"><span style="opacity: 0">Like</span>
                  <router-link id="default-outline-primary" to="/businesses/to-create" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Create Business </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
     </div>

    <div v-if="my_businesses.length > 0" class="container-fluid">
      <div class="row">

        <div v-for="business in my_businesses" :key="business.id" :class="my_businesses.length > 1 ? 'col-sm-6 col-xl-3 xl-50 col-lg-6' : 'col-sm-12 col-xl-12 xl-100 col-lg-12'">
          <div class="card social-widget-card">
            <div class="card-body">
              <div class="redial-social-widget radial-bar-70" data-label="50%"><i class="fa fa-facebook font-primary"></i></div>
              <h5 class="b-b-light" v-text="business.business_name"></h5>
              <div class="row">
                <div class="col text-center b-r-light"><span> Business Profile </span>
                  <div class="progress-showcase pt-4">
                    <div class="progress" style="height: 8px;">
                      <div class="progress-bar bg-primary" role="progressbar" style="width: 40%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div class="col text-center"><span style="opacity: 0">Like</span>
                  <router-link id="default-outline-primary" :to="'/businesses/overview/'+business.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> View </router-link>
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

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default {
  name:'my-businesses',
  data()
  {
    return{
      my_businesses: []
    }
  },
  components: {
    
  },
  mounted(){
    console.log("Mounted")
  },
  created() {

    axios.get(`${ApiUrl.url}businesses/user/${Auth.isAuthenticatedUser().sub}`, {
      headers: {
        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
      }
    })
    .then( (resp) => {

      this.my_businesses = resp.data.data

    } )
    .catch( (err) => {

      if(err.response) {

        if(err.response.status == 404) {

          this.my_businesses = []

        } else if(err.response.status == 401) {

          this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
          this.$router.replace("/auth/login")

        }

      }

    } )

  },
  methods:{
    
  }
}
</script>
