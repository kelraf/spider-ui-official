import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
import layout from './modules/layout'
import menu from './modules/menu'
import spiderverify from "./modules/spider_verify"
import userProfile from "./modules/userProfile"

Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
    modules: {
        layout,
        menu,
        spiderverify,
        userProfile
    },
    strict: false
});

