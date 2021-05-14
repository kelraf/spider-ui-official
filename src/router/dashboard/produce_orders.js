
// Produce Orders
import ProduceOrderContainers from "../../pages/orders/produce_orders/manage/produce_order_containers"
import ProduceOrderContainer from "../../pages/orders/produce_orders/manage/produce_order_container/produce_order_container"
import ProduceOrder from "../../pages/orders/produce_orders/manage/produce_order_container/produce_orders/produce_order"

// Produce Order Stages
import Collection from "../../pages/orders/produce_orders/manage/produce_order_container/produce_orders/produce_order_stages/collection/collection"
import CCPPOrder from "../../pages/orders/produce_orders/manage/produce_order_container/produce_orders/produce_order_stages/c_c_p_p_order/c_c_p_p_order"

export const produceOrders = [
    {
        path: 'produce-orders',
        name: 'produce-order-containers',
        component: ProduceOrderContainers,
        meta: {
          title: `Produce Orders Containers`,
  
        }
      },
      {
        path: 'produce-orders/:id',
        name: 'produce-order-container',
        component: ProduceOrderContainer,
        meta: {
          title: `Produce Orders Container`,
  
        }
      },
      {
        path: 'produce-order/:id',
        name: 'produce-order',
        component: ProduceOrder,
        meta: {
          title: `Produce Order`,
  
        },
        children: [
            {
                path: 'stages-collection/:stage_id',
                name: 'stages-collection',
                component: Collection,
                meta: {
                  title: `Stage`,
          
                }
            },
            {
              path: 'stages-c-c-p-p-order/:stage_id',
              name: 'stages-c-c-p-p-order',
              component: CCPPOrder,
              meta: {
                title: `Stage`,
        
              }
            }
        ]
      }
]