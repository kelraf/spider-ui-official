import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
import layout from './modules/layout'
import menu from './modules/menu'
import spiderverify from "./modules/spider_verify"
import userProfile from "./modules/userProfile"
import selectedRole from "./modules/selectedRole"
import products from './modules/products'
import livestocks from './modules/livestocks'
import businessData from "./modules/businessData"

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
    modules: {
        layout,
        menu,
        products,
        livestocks,
        spiderverify,
        userProfile,
        selectedRole,
        businessData
    },
    strict: false
});

