<template>
	<div>
		<Breadcrumbs main="Dashboard" title="Client"/>
		<!-- Container-fluid starts-->
		<div class="container-fluid">
			<div class="row">

				<div class="col-sm-12">
					<b-tabs nav-class="border-tab tabs-project">
						<b-tab title="Home" active>
							<template slot="title">
								<feather type="home"></feather>Home
							</template>
							<div class="row">
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-success"> <b>Live Animal Orders</b> </h6>
											</div>
											<div class="project-widgets text-center">
												<h1 class="font-primary counter"><b>45</b></h1>
											</div>
										</div>
										<div class="card-footer project-footer">
											<h6 style="font-size: 15px;" class="mb-0">In Progress: <span class="counter">14</span></h6>
										</div>
									</div>
								</div>
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-secondary"> <b>Produce Orders</b> </h6>
											</div>
											<div class="project-widgets text-center">
												<h1 class="font-primary counter"> <b>45</b> </h1>
											</div>
										</div>
										<div class="card-footer project-footer">
											<h6 style="font-size: 15px;" class="mb-0">In Progress: <span class="counter">14</span></h6>
										</div>
									</div>
								</div>
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-success"><b>Payed Orders</b></h6>
											</div>
											<div class="project-widgets text-center">
												<h1 class="font-primary counter"><b>34</b></h1>
											</div>
										</div>
										<div class="card-footer project-footer">
											<h6 style="font-size: 15px;" class="mb-0"> <span class="font-success">Completed Payment</span> : <span class="counter">10</span> </h6>
										</div>
									</div>
								</div>
								<div class="col-xl-3 col-sm-6">
									<div class="card">
										<div class="card-body">
											<div class="media">
												<h6 class="mb-0 font-secondary"><b>Total Payment Made</b></h6>
											</div>
											<div class="project-widgets text-center">
												<h2 class="font-primary counter"><b>$ 450 </b></h2>
											</div>
										</div>
										<div class="card-footer project-footer">
											<h6 style="font-size: 15px;" class="mb-0"> <span class="font-success">Completed Payment</span> : <span class="counter">10</span> </h6>
										</div>
									</div>
								</div>
								<div class="col-xl-6">
									<div class="card">
										<div class="card-header project-header">
											<div class="row">
												<div class="col-sm-12">
													<h5 class="font-secondary">Live Animal Orders Summary</h5>
												</div>
											</div>
										</div>
										<div class="card-body chart-vertical-center project-charts">
											<TaskChart :width="530" :height="265" />
										</div>
									</div>
								</div>

								<div class="col-xl-6">
									<div class="card">
										<div class="card-header project-header">
											<div class="row">
												<div class="col-sm-12">
													<h5 class="font-success">Produce Orders Summary</h5>
												</div>
											</div>
										</div>
										<div class="card-body chart-vertical-center project-charts">
											<TaskChart :width="530" :height="265" />
										</div>
									</div>
								</div>

							</div>
						</b-tab>
						<b-tab title="Profile">
							<template slot="title">
								<feather type="shopping-cart"></feather>My Orders
							</template>
							<div class="row">
								<div class="col-sm-12">
									<div class="card">
										<div class="card-header">
											<h5>Current Progress</h5>
										</div>
										<div class="card-body">
											<div class="table-responsive current-progress">
												<table class="table table-bordernone">
													<tbody>
													<tr>
														<td>
															<div class="d-inline-block align-middle"><img class="img-radius img-50 align-top m-r-15 rounded-circle" src="../../assets/images/user/1.jpg" alt="">
																<div class="d-inline-block">
																	<h6>Jane Kaesha</h6>
																	<p>Agent</p>
																</div>
															</div>
														</td>
														<td>
															
															<div style="font-size: 10px;" class="d-inline-block align-middle">
																<!-- <span class="mt-2 mb-2">  -->
																	<span class="mt-4 mb-4">Payment Status</span> <span><b-badge variant="info">PENDING</b-badge></span> 
																	<span class="mt-4 mb-4">Total Amount</span> <span> $ 345 </span> 
																<!-- </span> -->
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary"> QUICK VIEW </button> </span>
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary ml-4">MORE</button> </span>
															</div>

														</td>
														<td>
															<div class="progress sm-progress-bar">
																<div class="progress-bar bg-primary" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="d-inline-block align-middle"><img class="img-radius img-50 align-top m-r-15 rounded-circle" src="../../assets/images/user/4.jpg" alt="">
																<div class="d-inline-block">
																	<h6>Kim Ludavy</h6>
																	<p>Agent</p>
																</div>
															</div>
														</td>
														<td>
															
															<div style="font-size: 10px;" class="d-inline-block align-middle">
																<!-- <span class="mt-2 mb-2">  -->
																	<span class="mt-4 mb-4">Payment Status</span> <span><b-badge variant="info">PENDING</b-badge></span> 
																	<span class="mt-4 mb-4">Total Amount</span> <span> $ 345 </span> 
																<!-- </span> -->
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary"> QUICK VIEW </button> </span>
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary ml-4">MORE</button> </span>
															</div>

														</td>
														<td>
															<div class="progress sm-progress-bar">
																<div class="progress-bar bg-primary" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div class="d-inline-block align-middle"><img class="img-radius img-50 align-top m-r-15 rounded-circle" src="../../assets/images/user/7.jpg" alt="">
																<div class="d-inline-block">
																	<h6>Steven Leto</h6>
																	<p>Agent</p>
																</div>
															</div>
														</td>
														<td>

															<div style="font-size: 10px;" class="d-inline-block align-middle">
																<!-- <span class="mt-2 mb-2">  -->
																	<span class="mt-4 mb-4">Payment Status</span> <span><b-badge variant="info">PENDING</b-badge></span> 
																	<span class="mt-4 mb-4">Total Amount</span> <span> $ 345 </span> 
																<!-- </span> -->
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary"> QUICK VIEW </button> </span>
																<span class="mt-4 mb-4"> <button class="btn btn-xs btn-pill btn-outline-primary ml-4">MORE</button> </span>
															</div>

														</td>
														<td>
															<div class="progress sm-progress-bar">
																<div class="progress-bar bg-primary" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</td>
													</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div class="col-xl-6 xl-100">
									<div class="card">
										<div class="card-header">
											<h5>Budget Distribution</h5>
										</div>
										<div class="card-body chart-block">
											<BudgetDistribution class="chart-overflow budget-chart" />
										</div>
									</div>
								</div>

							</div>
						</b-tab>
						<b-tab title="Contact">
							<template slot="title">
								<feather type="dollar-sign"></feather> My Wallet
							</template>

							<div class="row">
								<div class="col-sm-12">
									<div class="card">
										<div class="card-header">
											<h5>Wallet Transactions</h5>
										</div>
										<div class="card-body">
											<div class="table-responsive sellers team-members">
												<table class="table table-bordernone">
													<thead>
													<tr>
														<th scope="col">Amount</th>
														<th scope="col">Channel</th>
														<th scope="col">Bank Name</th>
														<th scope="col">Phone</th>
													</tr>
													</thead>
													<tbody>
													<tr>
														<td>
															<p>$ 560</p>
														</td>
														<td>
															<p>Paypal</p>
														</td>
														<td>
															<p>Susan Bank</p>
														</td>
														<td>
															<p>+91 264 570 4611</p>
														</td>
													</tr>
													<tr>
														<td>
															<p>$ 340</p>
														</td>
														<td>
															<p>Mpesa</p>
														</td>
														<td>
															<p>Unknown</p>
														</td>
														<td>
															<p>+01 967 487 1873</p>
														</td>
													</tr>
													<tr>
														<td>
															<p>$ 709</p>
														</td>
														<td>
															<p>Checki</p>
														</td>
														<td>
															<p>Checki</p>
														</td>
														<td>
															<p>+48 724 585 0012</p>
														</td>
													</tr>
													<tr>
														<td>
															<p>$ 6000</p>
														</td>
														<td>
															<p>Equity Bank</p>
														</td>
														<td>
															<p>Equity Bank</p>
														</td>
														<td>
															<p>+91 264 570 4611</p>
														</td>
													</tr>
													<tr>
														<td>
															<p>Social Worker</p>
														</td>
														<td>
															<p>Donec</p>
														</td>
														<td>
															<p>annsny@gmail.com</p>
														</td>
														<td>
															<p>+61 480 087 1175</p>
														</td>
													</tr>
													<tr>
														<td>
															<p>Systems Engineer</p>
														</td>
														<td>
															<p>Etiam</p>
														</td>
														<td>
															<p>alana82@gmail.com</p>
														</td>
														<td>
															<p>+75 483 761 4680</p>
														</td>
													</tr>
													</tbody>
												</table>
											</div>

										</div>
									</div>
								</div>
							</div>
						</b-tab>
					</b-tabs>
				</div>

			</div>
		</div>
		<!-- Container-fluid Ends-->
	</div>
</template>

<script>
import TaskChart from './project_charts/task_distribution'
import BudgetDistribution from "./chartjs/budgetdistribution";
var primary = localStorage.getItem('primary_color') || '#4466f2';
var secondary = localStorage.getItem('secondary_color') || '#1ea6ec';
export default {
	data(){
		return{
			spent1 : {
				data: {
					series:[
						[5,6,7,2,9,9,5,3,5,3],
						[3,5,3,5,6,7,2,9,9,5],
						[9,9,5,3,5,3,5,6,7,2]
					]
				},
				options: {
					height:50,
					width:500,
					low: 0,
					offset: 0,
					fullwidth: true,
					seriesBarDistance: 15,
					chartPadding: {
						top:0,
						left:0,
						right:0,
						bottom:0
					},
					axisX: {
						offset: 0,
						low: 0,
						showGrid: false,
						showLabel: false,
					},
					axisY: {
						low: 0,
						offset: 0,
						showGrid: false,
						showLabel: false,
					},
				}
			},
			spent2 : {
				data: {
					series:[						
						[5,5,9,9,5,3,6,7,5,3],
						[7,2,6,5,2,3,5,9,9,5],
						[3,3,5,3,5,9,9,6,7,2]
					]
				},
				options: {
					height:50,
					width:500,
					low: 0,
					offset: 0,
					fullwidth: true,
					seriesBarDistance: 15,
					chartPadding: {
						top:0,
						left:0,
						right:0,
						bottom:0
					},
					axisX: {
						low: 0,
						offset: 0,
						showGrid: false,
						showLabel: false,
					},
					axisY: {
						low: 0,
						offset: 0,
						showGrid: false,
						showLabel: false,
					},
				}
			},
			spent3 : {
				data: {
					series:[
						[9,5,3,9,9,2,6,7,5,9],
						[7,2,5,6,3,5,5,9,3,5],
						[3,5,3,5,5,3,9,2,7,6]
					]
				},
				options: {
					height:50,
					width:500,
					low: 0,
					offset: 0,
					fullwidth: true,
					seriesBarDistance: 15,
					chartPadding: {
						top:0,
						left:0,
						right:0,
						bottom:0
					},
					axisX: {
						low: 0,
						offset: 0,
						showGrid: false,
						showLabel: false,
					},
					axisY: {
						low: 0,
						offset: 0,
						showGrid: false,
						showLabel: false,
					},
				}
			},
			chart1 : {
				data: {
					labels: ['01', '02', '03', '04', '05', '06'],
					series: [
					[1, 5, 2, 5, 4, 3]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient5',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart2 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					series: [
					[5, 2, 3, 1, 3, 2]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient6',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart3 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					series: [
					[1, 2, 5, 1, 4, 3]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient7',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart4 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					series: [
					[1, 2, 4, 3, 2, 3]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient8',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart5 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					series: [
					[0, 5, 2, 3, 1, 3]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient9',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart6 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					series: [
					[1, 2, 3, 1, 2, 3]
					]
				},
				options: {
					low: 0,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: 0,
						bottom: 0
					},
					showPoint: false,
					height:85,
					axisX: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					},
					axisY: {
						low: 0,
						offset: 0,
						showLabel: false,
						showGrid: false
					}
				},
				eventHandlers : [{
					event: 'created',
					fn(data) {
						var defs = data.svg.elem('defs');
						defs.elem('linearGradient', {
							id: 'gradient10',
							x1: 0,
							y1: 0,
							x2: 1,
							y2: 1
						}).elem('stop', {
							offset: 0,
							'stop-color': primary
						}).parent().elem('stop', {
							offset: 1,
							'stop-color': secondary
						});
					}
				}]
			},
			chart7 : {
				data: {
					labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					series: [
					[3,3,0,2,0,3,0],
					[2,0,1.5,0,3.5,3,2]
					]
				},
				options: {
					stackBars: true,
					fullWidth: !0,
					showArea: !0,
					chartPadding: {
						right: 0,
						left: -16,
						bottom: -12
					},
					axisX: {
						showGrid: false,
					},
					axisY: {
						labelInterpolationFnc: function(value) {
							return value % 2 === 0 ? value : null;
						}
					},
					height:450,
				},
			}
		}
	},
	components: {
		TaskChart,
		BudgetDistribution
	},
}
</script>
