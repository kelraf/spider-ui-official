
// Dashboards
import DashboardIntersection from "../../pages/dashboard/dashboard_intersection"
import Member from "../../pages/dashboard/member"
import SuperInstance from "../../pages/dashboard/super_instance"
import ExploreServer from "../../pages/dashboard/server"
import Client from "../../pages/dashboard/client"

export const dashBoards = [
    {
        path: '',
        name: 'home',
        component: DashboardIntersection,
        meta: {
          title: `Home`,
        }
      },
      {
        path: 'super-instance',
        name: 'super-instance',
        component: SuperInstance,
        meta: {
          title: `Super Instance`,
        }
      },
      {
        path: 'member',
        name: 'member',
        component: Member,
        meta: {
          title: `Member`,
        }
      },
      {
        path: 'client',
        name: 'client',
        component: Client,
        meta: {
          title: `Member`,
        }
      },
      {
        path: 'server',
        name: 'server',
        component: ExploreServer,
        meta: {
          title: `Member`,
        }
      },
]