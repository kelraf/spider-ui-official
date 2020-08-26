<template>
  <div>
    <Breadcrumbs main="Dashboard" title="Super Instance"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">

        <div class="col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="media bitcoin-graph"><img src="../../assets/images/bitcoin/graph-icon-1.png" alt="">
                <div class="top-bitcoin">
                  <h5>Live Animal</h5><span>Orders</span>
                </div>
                <div class="media-body text-center">

                  <div class="container-fluid" style="font-size: 10px;">

                    <div class="row text-left">
                      <div class="col-6 ">
                        <span >NEW</span> 
                        <span class="text-center">
                          <b-badge variant="success">3</b-badge>
                        </span>
                      </div>
                      <div class="col-6">
                        <span>IN PROGRESS</span> 
                        <span>
                          <b-badge style="color: white !important; animation-duration: .5s;" variant="success">3</b-badge>
                        </span>
                      </div>
                    </div>

                    <div class="row text-left mt-2">
                      <div class="col-6 ">
                        <span >COMPLETED</span> 
                        <span class="text-center">
                          <b-badge variant="success">3</b-badge>
                        </span>
                      </div>
                      <div class="col-6">
                        <span>CANCLED</span> 
                        <span>
                          <b-badge style="color: white !important; animation-duration: .5s;" variant="success">3</b-badge>
                        </span>
                      </div>
                    </div>

                  </div>
                  
                  <router-link to="/dashboard/livestocks-orders" disabled class="btn btn-sm btn-pill btn-outline-primary mt-2 mb-2">VIEW</router-link>

                </div>
              </div>
            </div>
            <div class="dashboard-chart-container">
              <chartist
                class="bitcoinchart-1"
                ratio="ct-major-second"
                type="Line"
                :data="chart1.data"
                :options="chart1.options"
                >
              </chartist>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <div class="media bitcoin-graph"><img src="../../assets/images/bitcoin/graph-icon-2.png" alt="">
              <div class="top-bitcoin">
                <h5>Produce</h5><span>Orders</span>
              </div>
              <div class="media-body text-center">

                <div class="container-fluid" style="font-size: 10px;">

                  <div class="row text-left">
                    <div class="col-6 ">
                      <span >NEW</span> 
                      <span class="text-center">
                        <b-badge variant="success">0</b-badge>
                      </span>
                    </div>
                    <div class="col-6">
                      <span>IN PROGRESS</span> 
                      <span>
                        <b-badge style="color: white !important; animation-duration: .5s;" variant="success">0</b-badge>
                      </span>
                    </div>
                  </div>

                  <div class="row text-left mt-2">
                    <div class="col-6 ">
                      <span >COMPLETED</span> 
                      <span class="text-center">
                        <b-badge variant="success">3</b-badge>
                      </span>
                    </div>
                    <div class="col-6">
                      <span>CANCLED</span> 
                      <span>
                        <b-badge style="color: white !important; animation-duration: .5s;" variant="success">0</b-badge>
                      </span>
                    </div>
                  </div>

                </div>
              
                <router-link to="/dashboard/produce-orders" disabled class="btn btn-sm btn-pill btn-outline-primary mt-2 mb-2">VIEW</router-link>

            </div>
            </div>
          </div>
          <div class="dashboard-chart-container">
            <chartist
            class="bitcoinchart-2"
            ratio="ct-major-second"
            type="Line"
            :data="chart2.data"
            :options="chart2.options"
            >
          </chartist>
        </div>
      </div>
    </div>

    <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <div class="media bitcoin-graph"><img src="../../assets/images/bitcoin/graph-icon-2.png" alt="">
              <div class="top-bitcoin">
                <h5>Product</h5><span>Orders</span>
              </div>
              <div class="media-body text-center">

                <div class="container-fluid" style="font-size: 10px;">

                  <div class="row text-left">
                    <div class="col-6 ">
                      <span >NEW</span> 
                      <span class="text-center">
                        <b-badge variant="success">0</b-badge>
                      </span>
                    </div>
                    <div class="col-6">
                      <span>IN PROGRESS</span> 
                      <span>
                        <b-badge style="color: white !important; animation-duration: .5s;" variant="success">0</b-badge>
                      </span>
                    </div>
                  </div>

                  <div class="row text-left mt-2">
                    <div class="col-6 ">
                      <span >COMPLETED</span> 
                      <span class="text-center">
                        <b-badge variant="success">3</b-badge>
                      </span>
                    </div>
                    <div class="col-6">
                      <span>CANCLED</span> 
                      <span>
                        <b-badge style="color: white !important; animation-duration: .5s;" variant="success">0</b-badge>
                      </span>
                    </div>
                  </div>

                </div>
              
                <button disabled class="btn btn-sm btn-pill btn-outline-primary mt-2 mb-2">VIEW</button>

            </div>
            </div>
          </div>
          <div class="dashboard-chart-container">
            <chartist
            class="bitcoinchart-2"
            ratio="ct-major-second"
            type="Line"
            :data="chart2.data"
            :options="chart2.options"
            >
          </chartist>
        </div>
      </div>
    </div>

    <!-- <div class="col-xl-4 xl-50">
      <DLivestocks />
    </div> -->

    <CenterOrderOverview />
    

</div>
</div>
<!-- Container-fluid Ends-->
</div>
</template>
10
<script>
import CenterOrderOverview from './charts/center_order/center_order_overview'
import DLivestocks from "../business/business_assets/dlivestocks"
export default {
 data(){
  return{
    barchart : {
      data: {
        labels: ['100', '200', '300', '400', '500', '600', '700', '800'],
        series: [
        [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
        [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8]
        ]
      },
      options: {
        seriesBarDistance: 12,
        chartPadding: {
          left: -10,
          right: 0,
          bottom: -15,
        },
        axisX: {
          showGrid: false,
        },
      },
    },

    chart1: {
      data:{
        labels: ['01', '02', '03', '04', '05', '06'],
        series: [
          [8, 3, 7.5, 4, 7, 4]
        ]
      },
      options: {
        lineSmooth: false,
        fullWidth: true,
        showArea: !0,
        showPoint: false,
        chartPadding: {
          right: 0,
          left: 0,
          bottom: 0,
          top:0
        },
        axisY: {
          low: 0,
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        }
      },
    },

    chart2: {
      data:{
        labels: ['01', '02', '03', '04', '05', '06'],
        series: [
        [8, 10, 6, 2, 10, 12]
        ]
      },
      options: {
        lineSmooth: false,
        fullWidth: true,
        showArea: !0,
        showPoint: false,
        chartPadding: {
          right: 0,
          left: 0,
          bottom: 0,
          top:0
        },
        axisY: {
          low: 0,
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        }
      },
    },

    chart3: {
      data:{
        labels: ['01', '02', '03', '04', '05', '06'],
        series: [
        [8, 3, 7.5, 4, 7, 4]
        ]
      },
      options: {
        lineSmooth: true,
        fullWidth: true,
        showArea: !0,
        showPoint: false,
        chartPadding: {
          right: 0,
          left: 0,
          bottom: 0,
          top:0
        },
        axisY: {
          low: 0,
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        }
      },
    },

    chart10 : {
      data: {
        labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
        series: [
        [1, 2.5, 1.5, 3, 1.3, 2, 4, 4.5],
        [ 0, 1, 0.5, 1, 0.3, 1.6, 1.4, 2]
        ]
      },
      options: {
        fullWidth: true,
        chartPadding: {
          right: 5,
          bottom: 0,
          left: 0
        },
        axisY: {
          onlyInteger: true,
          offset: 20
        },
        lineSmooth: false,
      },
    },
  }
},
components: {
  CenterOrderOverview,
  DLivestocks
}
}
</script>
