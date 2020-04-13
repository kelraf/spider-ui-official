import Vue from 'vue'
import Router from "vue-router";
import Body from '../components/body'
import Authentic from "../auth/js/spider_auth"

// Businesses Create
import CreateBusiness from "../pages/business/createbusiness"

/* Auth */
import Auth from '../auth/auth'
import login from '../auth/login'
import Register from '../auth/register'
import VerifyCode from '../auth/verify_code'
import NotVerified from "../auth/not_verified"

//User Profile
import EditProfile from "../pages/users/user_profile"

//Business Profile
import EditBusinessProfile from "../pages/business/editprofile"
import MyBusinesses from "../pages/business/my_businesses"

// Assets Tables
import ViewTrains from "../pages/business/business_assets/assets_tables/view_trains"
import ViewFlights from "../pages/business/business_assets/assets_tables/view_planes"
import ViewVessles from "../pages/business/business_assets/assets_tables/view_vessles"

// Dashboards
import Home from "../pages/dashboard/home"
import Business from "../pages/dashboard/business"
import Manage from "../pages/business/business_assets/manage_assets"


// component

Vue.use(Router)

let system_title = "Spider - Concurrent API"

const routes = [
{ path: '', redirect: { name: 'home' }},
{
  path: '/auth',
  component: Auth,
  children: [
  {
    path: 'login',
    name: 'Login',
    component: login,
    meta: {
      title: ` login | ${system_title}`,
    }
  },
  {
    path: 'register',
    name: 'register',
    component: Register,
    meta: {
      title: `Register | ${system_title}I`,
    }
  },
  {
    path: 'verify/:id',
    name: 'verify',
    component: VerifyCode,
    meta: {
      title: `Verify Code | ${system_title}I`,
    }
  },
  {
    path: 'not-verified',
    name: 'not-verified',
    component: NotVerified,
    meta: {
      title: `Not Verified | ${system_title}I`,
    }
  }
  ]
},
{
  path: '/dashboard',
  component: Body,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'home',
      component: Home,
      meta: {
        title: `Home | ${system_title}`,
      }
    }
  ]
}, 
{
  path: "/users",
  component: Body,
  name: "user",
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'profile/:id',
      name: 'profile',
      component: EditProfile,
      meta: {
        title: `User Profile | ${system_title}`,
      }
    }
  ]
}, 
{
  path: "/businesses",
  component: Body,
  name: "businesses",
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'to-create',
      name: 'to-create',
      component: CreateBusiness,
      meta: {
        title: `Create Business | ${system_title}`,

      }
    },
    {
      path: 'my-businesses/:id',
      name: 'my-businesses',
      component: MyBusinesses,
      meta: {
        title: `My Businesses | ${system_title}`,

      }
    },
    {
      path: 'profile/:id',
      name: 'profile',
      component: EditBusinessProfile,
      meta: {
        title: `Business Profile | ${system_title}`,
      }
    },
    {
      path: 'overview/:id',
      name: 'overview',
      component: Business,
      meta: {
        title: `Business OverView | ${system_title}`,
      }
    },
    {
      path: 'assets/:id',
      name: 'assets',
      component: Manage,
      meta: {
        title: `Business Assets | ${system_title}`,
      }
    },
    {
      path: 'all-trains/:id',
      name: 'all-trains',
      component: ViewTrains,
      meta: {
        title: `Business All Trains | ${system_title}`,
      }
    },
    {
      path: 'all-flights/:id',
      name: 'all-flights',
      component: ViewFlights,
      meta: {
        title: `Business All Flights | ${system_title}`,
      }
    },
    {
      path: 'all-vessles/:id',
      name: 'all-vessles',
      component: ViewVessles,
      meta: {
        title: `Business All Vessles | ${system_title}`,
      }
    },
    {
      path: 'all-tests',
      name: 'all-tests',
      component: ViewVessles,
      meta: {
        title: `Business All Tests | ${system_title}`,
      }
    }
  ]
}
];



const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(route => route.meta.requiresAuth)) {

    if(!Authentic.isAuthenticatedUser().bool) {

      return next("/auth/login")

    } else {

      return next()

    }

  } else {

    return next()

  }

});

export default router
