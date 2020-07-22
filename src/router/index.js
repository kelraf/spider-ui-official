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
import ViewDLivestock from "../pages/management/dlivestocks/dlivestock"

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
import ViewDLivestocks from "../pages/management/dlivestocks/dlivestocks"

// Orders
import Orders from "../pages/orders/orders"
import LivestocksOrdersContainers from "../pages/orders/livestock_orders/manage/livestocks_orders_containers"
import LivestockOrderContainer from "../pages/orders/livestock_orders/manage/livestock_order_container/livestock_order_container"
import LivestockOrder from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order"
import CenterOrderBeforeGoLive from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/center_order_before_go_live"
import Livestocks from "../pages/ecommerce/livestocks"
import Cart from "../pages/ecommerce/cart"
import CheckOut from "../pages/ecommerce/checkout"
import OrderSuccess from "../pages/ecommerce/success"


// Livestock Order Stages

import Collection from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order_stages/collection/collection"
import CCPLOrder from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order_stages/c_c_p_l_order/c_c_p_l_order"
import ExportZoneSpider from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order_stages/export_zone_spider/export_zone"
import Processing from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order_stages/processing/processing"
import FeedLot from "../pages/orders/livestock_orders/manage/livestock_order_container/livestocks_orders/livestock_order_stages/feed_lot_spider/feed_lot"


// Livestock Sales
import LivestockSales from "../pages/livestock_sales/livestock_sales"

// Export Zone Requests
import ExportZoneRequests from "../pages/export_zone_request_details/export_zone_container"

// FeedLot Requests
import FeedLotRequests from "../pages/feed_lot_request_details/feed_lot_container"

// Slaughter Orders
import SlaughterOrders from "../pages/slaughter_orders/slaughter_order_bundler"
import SlaughterOrder from "../pages/slaughter_orders/slaughter_order_"

// Market
import MarketIndex from "../pages/market/market"
import CenterOrderMarket from "../pages/market/center_order_market"


// Dashboards
import DashboardIntersection from "../pages/dashboard/dashboard_intersection"
import Member from "../pages/dashboard/member"
import SuperInstance from "../pages/dashboard/super_instance"
import ExploreServer from "../pages/dashboard/server"
import Client from "../pages/dashboard/client"

import Manage from "../pages/business/business_assets/manage_assets"
import SuperInstanceAdmins from "../pages/super_instance/super_instance_admins"
import CreateBusinessPending from "../pages/dashboard/no_business"

// GoogleMaps

import GoogleMaps from "../pages/google_maps/google_map"


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
    },
    {
      path: 'create',
      name: 'create',
      component: CreateBusinessPending,
      meta: {
        title: `Create Business | ${system_title}`,

      }
    }
  ]
},
{
  path: '/account-pending',
  component: Auth,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'account-pending',
      component: CreateBusinessPending,
      meta: {
        title: `Create Business | ${system_title}`,

      }
    },
    {
      path: 'create',
      name: 'create',
      component: CreateBusiness,
      meta: {
        title: `Create Business | ${system_title}`,

      }
    },
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
      component: DashboardIntersection,
      meta: {
        title: `Home | ${system_title}`,
      }
    },
    {
      path: 'super-instance',
      name: 'super-instance',
      component: SuperInstance,
      meta: {
        title: `Super Instance | ${system_title}`,
      }
    },
    {
      path: 'member',
      name: 'member',
      component: Member,
      meta: {
        title: `Member | ${system_title}`,
      }
    },
    {
      path: 'client',
      name: 'client',
      component: Client,
      meta: {
        title: `Member | ${system_title}`,
      }
    },
    {
      path: 'server',
      name: 'server',
      component: ExploreServer,
      meta: {
        title: `Member | ${system_title}`,
      }
    },
    {
      path: 'user-profile',
      name: 'user-profile',
      component: EditProfile,
      meta: {
        title: `User Profile | ${system_title}`,
      }
    },
    {
      path: 'business',
      name: 'business',
      component: EditBusinessProfile,
      meta: {
        title: `Business Profile | ${system_title}`,
      }
    },
    {
      path: 'assets',
      name: 'assets',
      component: Manage,
      meta: {
        title: `Business Assets | ${system_title}`,
      }
    },
    {
      path: 'trains',
      name: 'trains',
      component: ViewTrains,
      meta: {
        title: `Business All Trains | ${system_title}`,
      }
    },
    {
      path: 'flights',
      name: 'flights',
      component: ViewFlights,
      meta: {
        title: `Business All Flights | ${system_title}`,
      }
    },
    {
      path: 'vessles',
      name: 'vessles',
      component: ViewVessles,
      meta: {
        title: `Business All Vessles | ${system_title}`,
      }
    },
    {
      path: 'vehicles',
      name: 'vehicles',
      component: ViewVehicles,
      meta: {
        title: `Business All Vehicles | ${system_title}`,
      }
    },
    {
      path: 'livestocks',
      name: 'livestocks',
      component: ViewLivestocks,
      meta: {
        title: `Business All Livestocks | ${system_title}`,
      }
    },
    {
      path: 'produces',
      name: 'produces',
      component: ViewProduces,
      meta: {
        title: `Business All Produce | ${system_title}`,
      }
    },
    {
      path: 'products',
      name: 'products',
      component: ViewProducts,
      meta: {
        title: `Business All Products | ${system_title}`,
      }
    },
    {
      path: 'd-livestocks',
      name: 'd-livestocks',
      component: ViewDLivestocks,
      meta: {
        title: `Business All Defined Livestocks | ${system_title}`,
      }
    },
    {
      path: 'vehicles/:id',
      name: 'vehicle',
      component: ViewVehicle,
      meta: {
        title: `Business Vehicle | ${system_title}`,
      }
    },
    {
      path: 'trains/:id',
      name: 'train',
      component: ViewTrain,
      meta: {
        title: `Business Train Profile | ${system_title}`,
      }
    },
    {
      path: 'flights/:id',
      name: 'flight',
      component: ViewFlight,
      meta: {
        title: `Business Flight Profile | ${system_title}`,
      }
    },
    {
      path: 'vessles/:id',
      name: 'vessle',
      component: ViewVessle,
      meta: {
        title: `Business Vessle Profile | ${system_title}`,
      }
    },
    {
      path: 'livestocks/:id',
      name: 'livestock',
      component: ViewLivestock,
      meta: {
        title: `Business Livestock Profile | ${system_title}`,
      }
    },
    {
      path: 'produces/:id',
      name: 'produce',
      component: ViewProduce,
      meta: {
        title: `Business Produce Profile | ${system_title}`,
      }
    },
    {
      path: 'products/:id',
      name: 'product',
      component: ViewProduct,
      meta: {
        title: `Business Product Profile | ${system_title}`,
      }
    },
    {
      path: 'd-livestocks/:id',
      name: 'd-livestock',
      component: ViewDLivestock,
      meta: {
        title: `DLivestock Profile | ${system_title}`,
      }
    },
    {
      path: 'super-instance-admins',
      name: 'super-instance-admins',
      component: SuperInstanceAdmins,
      meta: {
        title: `Super Instance Admins | ${system_title}`,
      }
    },
    {
      path: 'livestocks-orders',
      name: 'livestocks-orders',
      component: LivestocksOrdersContainers,
      meta: {
        title: `Manage Livestocks | ${system_title}`,

      }
    },
    {
      path: 'livestock-order-container/:id',
      name: 'livestock-order-container',
      component: LivestockOrderContainer,
      meta: {
        title: `Manage Livestocks | ${system_title}`,

      }
    },
    {
      path: 'livestock-order/:id',
      name: 'livestock-order',
      component: LivestockOrder,
      meta: {
        title: `Livestock Order | ${system_title}`,

      },
      children: [
        {
          path: 'stages-collection/:stage_id',
          name: 'stages-collection',
          component: Collection,
          meta: {
            title: `Stage | ${system_title}`,
    
          }
        },
        {
          path: 'stages-c-c-p-l-order/:stage_id',
          name: 'stages-c-c-p-l-order',
          component: CCPLOrder,
          meta: {
            title: `Stage | ${system_title}`,
    
          }
        },
        {
          path: 'stages-export-zone-spider/:stage_id',
          name: 'stages-export-zone-spider',
          component: ExportZoneSpider,
          meta: {
            title: `Stage | ${system_title}`,
    
          }
        },
        {
          path: 'stages-processing/:stage_id',
          name: 'stages-processing',
          component: Processing,
          meta: {
            title: `Stage | ${system_title}`,
    
          }
        },
        {
          path: 'stages-feedlot/:stage_id',
          name: 'stages-feedlot',
          component: FeedLot,
          meta: {
            title: `Stage | ${system_title}`,
    
          }
        }
      ]
    },
    {
      path: 'center-order/:id',
      name: 'center-order',
      component: CenterOrderBeforeGoLive,
      meta: {
        title: `Center Order | ${system_title}`,

      }
    },
    {
      path: 'market',
      name: 'market',
      component: MarketIndex,
      meta: {
        title: `Market | ${system_title}`,

      }
    },
    {
      path: 'center-order-market/:id',
      name: 'center-order-market',
      component: CenterOrderMarket,
      meta: {
        title: `Market Index | ${system_title}`,

      }
    },
    {
      path: 'livestock-sales',
      name: 'livestock-sales',
      component: LivestockSales,
      meta: {
        title: `Livestock Sales | ${system_title}`,
      }
    },
    {
      path: 'export-zone-requests',
      name: 'export-zone-requests',
      component: ExportZoneRequests,
      meta: {
        title: `Export Zone Requests | ${system_title}`,

      }
    },
    {
      path: 'feed-lot-requests',
      name: 'feed-lot-requests',
      component: FeedLotRequests,
      meta: {
        title: `FeedLot Requests | ${system_title}`,

      }
    },
    {
      path: 'slaughter-orders',
      name: 'slaughter-orders',
      component: SlaughterOrders,
      meta: {
        title: `Slaughter Orders | ${system_title}`,

      }
    },
    {
      path: 'slaughter-orders/:id',
      name: 'slaughter-order',
      component: SlaughterOrder,
      meta: {
        title: `Slaughter Order | ${system_title}`,

      }
    },
    {
      path: 'shop-livestocks',
      name: 'livestocks',
      component: Livestocks,
      meta: {
        title: ` Livestocks | ${system_title}`,

      }
    },
    {
      path: 'cart',
      name: 'cart',
      component: Cart,
      meta: {
        title: ` Cart | ${system_title}`,

      }
    },
    {
      path: 'checkout',
      name: 'checkout',
      component: CheckOut,
      meta: {
        title: ` CheckOut | ${system_title}`,
      }
    },
    {
      path: 'checkout-success',
      name: 'checkout-success',
      component: OrderSuccess,
      meta: {
        title: ` CheckOut Success | ${system_title}`,
      }
    }
  ]
},
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
