import Vue from 'vue'
import Router from "vue-router";
import Body from '../components/body'
import Authentic from "../auth/js/spider_auth"

// Businesses Create
import CreateBusiness from "../pages/business/createbusiness"

/* Auth */
import Auth from '../auth/auth'
import RegisterAsSelect from "../auth/register_as_select"
import login from '../auth/login'
import Register from '../auth/register'
import VerifyCode from '../auth/verify_code'
import NotVerified from "../auth/not_verified"

// Profile
import EditProfile from "../pages/users/user_profile"
import ViewVehicle from "../pages/business/business_assets/profiles/vehicle"
import ViewTrain from "../pages/business/business_assets/profiles/train"
import ViewFlight from "../pages/business/business_assets/profiles/flight"
import ViewVessle from "../pages/business/business_assets/profiles/vessle"
import ViewLivestock from "../pages/business/business_assets/profiles/livestock"
import ViewProduce from "../pages/business/business_assets/profiles/produce"
import ViewProduct from "../pages/business/business_assets/profiles/product/product"

//Business Profile
import EditBusinessProfile from "../pages/business/editprofile"
import MyBusinesses from "../pages/business/my_businesses"

// Assets Tables
import ViewTrains from "../pages/business/business_assets/assets_tables/view_trains"
import ViewFlights from "../pages/business/business_assets/assets_tables/view_planes"
import ViewVessles from "../pages/business/business_assets/assets_tables/view_vessles"
import ViewVehicles from "../pages/business/business_assets/assets_tables/view_vehicles"
import ViewLivestocks from "../pages/business/business_assets/assets_tables/view_livestock"
import ViewProduces from "../pages/business/business_assets/assets_tables/view_produce"
import ViewProducts from "../pages/business/business_assets/assets_tables/view_products"

// Dashboards
import Home from "../pages/dashboard/home"
// import Business from "../pages/dashboard/business"
import Manage from "../pages/business/business_assets/manage_assets"


// component

Vue.use(Router)

let system_title = "Spider - API"

const routes = [
{ path: '', redirect: { name: 'home' }},
{
  path: '/auth',
  component: Auth,
  children: [
  {
    path: 'register-as',
    name: 'register-as',
    component: RegisterAsSelect,
    meta: {
      title: `Register As Select | ${system_title}`,
    }
  },
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
      title: `Register | ${system_title}`,
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
      path: '/',
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
    // {
    //   path: 'overview/:id',
    //   name: 'overview',
    //   component: Business,
    //   meta: {
    //     title: `Business OverView | ${system_title}`,
    //   }
    // },
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
      path: 'all-vehicles/:id',
      name: 'all-vehicles',
      component: ViewVehicles,
      meta: {
        title: `Business All Vehicles | ${system_title}`,
      }
    },
    {
      path: 'all-livestocks/:id',
      name: 'all-livestocks',
      component: ViewLivestocks,
      meta: {
        title: `Business All Livestocks | ${system_title}`,
      }
    },
    {
      path: 'all-produce/:id',
      name: 'all-produce',
      component: ViewProduces,
      meta: {
        title: `Business All Produce | ${system_title}`,
      }
    },
    {
      path: 'all-products/:id',
      name: 'all-products',
      component: ViewProducts,
      meta: {
        title: `Business All Products | ${system_title}`,
      }
    },
    {
      path: 'vehicle-profile/:id',
      name: 'vehicle-profile',
      component: ViewVehicle,
      meta: {
        title: `Business Vehicle Profile | ${system_title}`,
      }
    },
    {
      path: 'train-profile/:id',
      name: 'train-profile',
      component: ViewTrain,
      meta: {
        title: `Business Train Profile | ${system_title}`,
      }
    },
    {
      path: 'flight-profile/:id',
      name: 'flight-profile',
      component: ViewFlight,
      meta: {
        title: `Business Flight Profile | ${system_title}`,
      }
    },
    {
      path: 'vessle-profile/:id',
      name: 'vessle-profile',
      component: ViewVessle,
      meta: {
        title: `Business Vessle Profile | ${system_title}`,
      }
    },
    {
      path: 'livestock-profile/:id',
      name: 'livestock-profile',
      component: ViewLivestock,
      meta: {
        title: `Business Livestock Profile | ${system_title}`,
      }
    },
    {
      path: 'produce-profile/:id',
      name: 'produce-profile',
      component: ViewProduce,
      meta: {
        title: `Business Produce Profile | ${system_title}`,
      }
    },
    {
      path: 'product-profile/:id',
      name: 'product-profile',
      component: ViewProduct,
      meta: {
        title: `Business Product Profile | ${system_title}`,
      }
    },
    {
      path: 'all-tests/:id',
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
