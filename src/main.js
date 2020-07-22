import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Breadcrumbs from './components/bread_crumbs'
import { store } from './store';
import VueFeather from 'vue-feather';
import Toasted from 'vue-toasted';
import VueJWT from 'vuejs-jwt'
import SmartTable from 'vuejs-smart-table'
import VueFormWizard from 'vue-form-wizard';
import HighchartsVue from 'highcharts-vue'
import VueGlide from 'vue-glide-js'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeoLocation from "vue-browser-geolocation"


// Import Theme scss
import './assets/scss/app.scss'

import i18n from './i18n'


Vue.use(Toasted,{
  iconPack: 'fontawesome'
});

// AIzaSyA3GNu4uUATI-5IeNMZu4qyjzglFlrgCw0

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBbYE7PNotNqHFbvzeMzunjSyUm4VnM188',
    libraries: 'places',
  },
})
Vue.use(VueGeoLocation)
Vue.use(VueGlide)
Vue.use(HighchartsVue)
Vue.use(VueFormWizard)
Vue.use(SmartTable)
Vue.use(VueJWT)
Vue.use(VueFeather)
Vue.use(BootstrapVue)
Vue.use(require('vue-chartist'))
Vue.component('Breadcrumbs', Breadcrumbs)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')