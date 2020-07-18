
import Body from '../components/body'

// Dashboards
import DashboardIntersection from "../pages/dashboard/dashboard_intersection"
import Member from "../pages/dashboard/member"
import SuperInstance from "../pages/dashboard/super_instance"
import ExploreServer from "../pages/dashboard/server"

// User Profile
import EditProfile from "../pages/users/user_profile"

const Dashboard = [
{
  path: '/dashboard',
  component: Body,
  children: [
    {
      path: '',
      name: 'dashboard_intersection',
      component: DashboardIntersection,
      meta: {
        title: `${system_title}`

      }
    },
    {
      path: 'member',
      name: 'member',
      component: Member,
      meta: {
        title: `Member Dashboard | ${system_title}`

      }
    },
    {
        path: 'super-instance',
        name: 'super_instance',
        component: SuperInstance,
        meta: {
          title: `Super Instance Dashboard | ${system_title}`
  
        }
    },
    {
        path: 'explore-server',
        name: 'explore_server',
        component: ExploreServer,
        meta: {
          title: `Super Instance Dashboard | ${system_title}`
  
        }
    },
    {
        path: 'user',
        name: 'user',
        component: EditProfile,
        meta: {
          title: `User | ${system_title}`
  
        }
    }
  ]
}
]