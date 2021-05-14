<template>
  <div>

    <!-- Loader -->

      <div v-if="!businessLoadSuccess || !userLoadSuccess" class="container-fluid mt-5 pt-5">
        <div class="row mt-5 pt-5">
          <div class="col-12 mt-5 pt-5 text-center">

          <div class="loader">
            <div class="line bg-warning"></div>
            <div class="line bg-warning"></div>
            <div class="line bg-warning"></div>
            <div class="line bg-warning"></div>
          </div>

          </div>
        </div>

        <div class="row">
          <div class="col-12 text-center mt-4">
            <p>
              <b class="font-success"> Please Wait... </b>
            </p>
          </div>
        </div>

      </div>

    <!-- End Loader -->

    <div 
      class="page-wrapper" 
      :class="layout.settings.sidebar.type"
      v-if="businessLoadSuccess && userLoadSuccess"
    >
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
import accountLoader from "../mixins/accountLoader"

export default {
  mixins: [accountLoader],
  name: 'mainpage',
  data(){
    return{
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      resized: false
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
    })
  },
  created(){

    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch('layout/set')

  },
  
  watch: {
    '$router' (){

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
    },
    businessLoadSuccess: function(current, innitial) {
      // console.log(`BusinessLoadSuccess ========= current ${current} =========== innitial ${innitial}`)
    },
    userLoadSuccess: function(current, innitial) {
      // console.log(`UserLoadSuccess ========= current ${current} =========== innitial ${innitial}`)
    }
  },
  methods:{
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

<style scoped>

</style>
