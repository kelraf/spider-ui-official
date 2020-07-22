<template>
	<div>


		<Breadcrumbs main="Flights" title="Business Flights"/>


		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="message !== '' && flights.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_plane" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div v-if="flights.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<!-- <div class="card-header">
							 <div class="col-4 offset-8">
								<button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div> -->
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-4">
									<input class="form-control" v-model="filters.unique_number.value" placeholder="Unique Number"/>
								</div>
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.type.value" placeholder="Type" />
								</div>
								<div class="col-sm-1">
									<!-- <input class="form-control" v-model="filters.age.value" placeholder="Age" /> -->
								</div>
								<div class="col-sm-2">
									<!-- <input class="form-control" v-model="filters.startdate.value" placeholder="Start Date" /> -->
								</div>
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_plane" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">
							
							<v-table
								:data="flights" class="table"
								:currentPage.sync="filter.currentPage"
								:pageSize="10"
								@totalPagesChanged="filter.totalPages = $event"
								:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="name">Unique Number</v-th>
								<v-th sortKey="position">Type</v-th>
								<!-- <v-th sortKey="office">Office</v-th>
								<v-th sortKey="age">Age</v-th>
								<v-th sortKey="startdate">Start date</v-th> -->
								<v-th sortKey="startdate"></v-th>
								<v-th sortKey="startdate"></v-th>
								<v-th sortKey="startdate"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.unique_number }}</td>
									<td>{{ row.type }}</td>
									<!-- <td>{{ row.office }}</td>
									<td>{{ row.age }}</td>
									<td>{{ row.startdate }}</td> -->
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/flights/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<td>
										<button id="default-outline-primary" @click="edit_plane(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
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


			<CreatePlane v-on:plane-create-success="action_success" id="create-plane" style="display: none;" :businessProfile="businessProfile" />

        	<UpdatePlane v-on:plane-updated-success="action_success" id="update-plane" style="display: none;" :planeData="plane_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import CreatePlane from "../assets_forms/plane/create"
import UpdatePlane from "../assets_forms/plane/update"
import { mapState } from "vuex"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			plane_data: {},
			flights: [],
			message: '',
			basic:{
				currentPage: 1,
				totalPages: 0,
			},

			filter:{
				currentPage: 1,
				totalPages: 0,
			},

			filters: {
				unique_number: { value: '', keys: ['unique_number'] },
				type: { value: '', keys: ['type'] }
			}
		}
	},
	components: {
		CreatePlane,
		UpdatePlane
	},
	computed: {
		...mapState({
			businessData: state => state.businessData.businessData
		})
	},
	created() {

		this.businessProfile = this.businessData
		this.get_all_business_flights()	

	},
	methods: {
		get_all_business_flights: function() {

			axios.get(`${ApiUrl.url}flights/business/${this.businessData.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.flights = resp.data.data

				if(this.flights.length <= 0) {
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
		create_plane: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-plane'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_plane: function(row) {

			this.plane_data = row

			if(Object.keys(this.plane_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-plane'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_flights()
		}
	}
}
</script>
