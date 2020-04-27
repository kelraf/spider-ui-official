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


// Import Theme scss
import './assets/scss/app.scss'


Vue.use(Toasted,{
  iconPack: 'fontawesome'
});

Vue.use(HighchartsVue)
Vue.use(VueFormWizard)
Vue.use(SmartTable)
Vue.use(VueJWT)
Vue.use(VueFeather)
Vue.use(BootstrapVue)
Vue.component('Breadcrumbs', Breadcrumbs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')