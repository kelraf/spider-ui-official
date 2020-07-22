<template>
	<div>


		<Breadcrumbs main="AutoMotives" title="Business AutoMotives"/>


		<!-- Container-fluid starts-->
		<div class="container-fluid">
			
			<div v-if="message !== '' && vehicles.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_vehicle" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div v-if="vehicles.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-4">
									<input class="form-control" v-model="filters.registration_number.value" placeholder="Registration Number"/>
								</div>
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.type.value" placeholder="Type" />
								</div>
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.status.value" placeholder="Status" />
								</div>
								
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_vehicle" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
							:data="vehicles" class="table"
							:currentPage.sync="filter.currentPage"
							:pageSize="10"
							@totalPagesChanged="filter.totalPages = $event"
							:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="registration_number">Registration Number</v-th>
								<v-th sortKey="type">Type</v-th>
								<v-th sortKey="status">Status</v-th>
								<v-th sortKey="unique_number"></v-th>
								<v-th sortKey="unique_number"></v-th>
								<v-th sortKey="unique_number"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.registration_number }}</td>
									<td>{{ row.type }}</td>
									<td>{{ row.status }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/vehicles/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<td>
										<button id="default-outline-primary" @click="edit_vehicle(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
											<i class="icon-pencil-alt"></i>
										</button>
									</td>
									<td>
										<button id="default-outline-danger" type="button" class="btn btn-pill btn-outline-danger btn-block">
											<i class="icon-trash"></i>
										</button>
									</td>
								</tr>
							</tbody>
						</v-table>
						</div>

						<smart-pagination
						:currentPage.sync="filter.currentPage"
						:totalPages="filter.totalPages"
						/>
					</div>
						</div>
				</div>
			</div>
				
			</div>


			<CreateVehicle v-on:vehicle-create-success="action_success" id="create-vehicle" style="display: none;" :businessProfile="businessProfile" />

        	<UpdateVehicle v-on:vehicle-updated-success="action_success" id="update-vehicle" style="display: none;" :vehicleData="vehicle_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import UpdateVehicle from "../assets_forms/vehicle/update"
import CreateVehicle from "../assets_forms/vehicle/create"
import { mapState } from "vuex"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			vehicle_data: {},
			vehicles: [],
			message: '',
			basic: {
				currentPage: 1,
				totalPages: 0,
			},

			filter: {
				currentPage: 1,
				totalPages: 0,
			},

			filters: {
				registration_number: { value: '', keys: ['registration_number'] },
				type: { value: '', keys: ['type'] },
				status: { value: '', keys: ['status'] }
			}
		}
	},
	components: {
		CreateVehicle,
		UpdateVehicle
	},
	computed: {
		...mapState({
			businessData: state => state.businessData.businessData
		})
	},
	created() {

		this.businessProfile = this.businessData
		this.get_all_business_vehicles()

	},
	methods: {
		get_all_business_vehicles: function() {

			axios.get(`${ApiUrl.url}vehicles/business/${this.businessData.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.vehicles = resp.data.data
				if(this.vehicles.length <= 0) {
					this.message = resp.data.message
				}

			} )
			.catch( (err) => {

				if(err.response) {

					if(err.response.status == 401) {

						this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
						this.$router.replace("/auth/login")

					}

				}

			} )

		},
		create_vehicle: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-vehicle'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_vehicle: function(row) {

			this.vehicle_data = row

			if(Object.keys(this.vehicle_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-vehicle'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_vehicles()
		}
	}
}
</script>
