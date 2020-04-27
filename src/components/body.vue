<template>
  <div>
    <div class="page-wrapper" :class="layout.settings.sidebar.type">
      <Header @clicked="sidebar_toggle" @mobileclicked="mobiletoggle_toggle" />
      <div class="page-body-wrapper" :class="layout.settings.sidebar.body_type">
        <div class="page-sidebar" :class="[{ open : sidebar_toggle_var }, layout.settings.sidebar_backround]" :sidebar-layout="layout.settings.sidebar_setting">
          <Sidebar />
        </div>
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
        <Footer/>
      </div>
      <Customizer/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import Customizer from './customizer'

import axios from "axios"
import { ApiUrl } from "../api/apiurl"
import Auth from "../auth/js/spider_auth"

export default {
  name: 'mainpage',
  data(){
    return{
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      resized:false,
      avatar_url: "",
      user_profile: {}
    }
  },
  // props:['sidebar_toggle_var'],
  components:{
    Header,
    Sidebar,
    Footer,
    Customizer
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data,
      layout: state => state.layout.layout,
      userProfile: state => state.userProfile.userProfile
    })
  },
  created(){
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch('layout/set')
    this.loadUserProfile()
  },
  watch:{
    '$route' (){
      this.menuItems.filter(items => {
        if (items.path === this.$route.path)
          this.$store.dispatch('menu/setActiveRoute', items)
        if (!items.children) return false
        items.children.filter(subItems => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch('menu/setActiveRoute', subItems)
          if (!subItems.children) return false
          subItems.children.filter(subSubItems => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch('menu/setActiveRoute', subSubItems)
          })
        })
      })
    },
    sidebar_toggle_var: function (){
      this.resized = (this.width <= 991) ? !this.sidebar_toggle_var : this.sidebar_toggle_var      
    }
  },
  methods:{
    loadUserProfile: function() {

      let headers = {
          headers: {
              Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
          }
      }

      axios.get(`${ApiUrl.url}users/${Auth.isAuthenticatedUser().sub}`, headers)
      .then( (resp) => {

        this.user_profile = resp.data.data
        this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${this.user_profile.avatar.avatar.file_name}`

        delete this.user_profile.pin
        delete this.user_profile.national_id_number
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

    },
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value
    },
    handleResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
