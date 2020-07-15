<template>
	<div>
		<Breadcrumbs main="Dashboard" title="Server"/>
		<!-- Container-fluid starts-->
		<div class="container-fluid">
			<div class="row">
				<div class="col-xl-3 xl-50 col-sm-6">
					<div class="card server-card-bg">
						<div class="card-body server-widgets">
							<div class="media"><feather type="codepen"></feather>
								<div class="top-server">
									<h6 class="mb-0">Storage</h6>
								</div>
							</div>
							<div class="bottom-server">
								<h5 class="mb-0">85GB / <span>100Gb</span></h5>
							</div>
							<b-progress :value="85" striped animated :max="100" variant="primary" ></b-progress>
						</div>
					</div>
				</div>
				<div class="col-xl-3 xl-50 col-sm-6">
					<div class="card server-card-bg">
						<div class="card-body server-widgets">
							<div class="media"><feather type="clock"></feather>
								<div class="top-server">
									<h6 class="mb-0">Latency</h6>
								</div>
							</div>
							<div class="bottom-server">
								<h5 class="mb-0">40 ms</h5>
							</div>
							<b-progress :value="85" striped animated :max="100" variant="primary" ></b-progress>
						</div>
					</div>
				</div>
				<div class="col-xl-3 xl-50 col-sm-6">
					<div class="card server-card-bg">
						<div class="card-body server-widgets">
							<div class="media"><feather type="server"></feather>
								<div class="top-server">
									<h6 class="mb-0">Bandwidth</h6>
								</div>
							</div>
							<div class="bottom-server">
								<h5 class="mb-0">75GB / <span>100Gb</span></h5>
							</div>
							<b-progress :value="75" striped animated :max="100" variant="primary" ></b-progress>
						</div>
					</div>
				</div>

				<div class="col-xl-3 xl-50 col-sm-6">
					<div class="card server-card-bg">
						<div class="card-body server-widgets">
							<div class="media"><feather type="anchor"></feather>
								<div class="top-server">
									<h6 class="mb-0">Cluster Load</h6>
								</div>
							</div>
							<div class="bottom-server">
								<h5 class="mb-0">70% <span><feather type="trending-down" class="middle"></feather></span></h5>
							</div>
							<div class="last-server">
								<h6 class="mb-0 f-14">Lower than average</h6>
							</div>
						</div>
					</div>
				</div>

				<div class="col-sm-12">
					<div class="card">
						<div class="card-header">
							<h5>Live CPU Usage</h5>
						</div>
						<div class="card-body chart-block">
							<div class="server-chart-container">
								<LiveCpuUsage class="flot-chart-placeholder"/>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="card">
						<div class="card-header">
							<h5>Memory Usage</h5>
						</div>
						<div class="card-body server-canvas">
							<MemoryChart/>
						</div>
					</div>
				</div>
			
		</div>
	</div>
	<!-- Container-fluid Ends-->
</div>
</template>
<script>

import MemoryChart from './charts/memory_usage'
import LiveCpuUsage from './charts/live_cpu_usage'

export default {
	data() {
		return {
			chart: {
				chartData_1: {
					labels: ['01', '02', '03', '04', '05', '06', '07', '08'],
					series: [
						[0, 2, 1.2, 4, 2, 3, 1.2, 1.5, 0]
					]
				},
			},
			filter: null,

			currentPage: 1,
			perPage: 10,
			pageOptions: [5, 10, 15],

		}
	},
	mounted(){

	},
	components: {
		MemoryChart,
		LiveCpuUsage
	},
}
</script>
