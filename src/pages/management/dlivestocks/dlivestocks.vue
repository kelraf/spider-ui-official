<template>
	<div>


		<Breadcrumbs main="DLivestocks" title="Business DLivestocks"/>


		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="message !== '' && dlivestocks.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_dlivestock" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div v-if="dlivestocks.length > 0" class="row">

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
									<input class="form-control" v-model="filters.category.value" placeholder="Category"/>
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
									<button id="default-outline-primary" @click="create_dlivestock" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
							:data="dlivestocks" class="table"
							:currentPage.sync="filter.currentPage"
							:pageSize="10"
							@totalPagesChanged="filter.totalPages = $event"
							:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="name">Category</v-th>
								<v-th sortKey="position">Type</v-th>
								<v-th sortKey="startdate"></v-th>
								<v-th sortKey="startdate"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.category }}</td>
									<td>{{ row.type }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/d-livestocks/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<td>
										<button id="default-outline-primary" @click="edit_dlivestock(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
											<i class="icon-pencil-alt"></i>
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


			<CreateDLivestock v-on:dlivestock-create-success="action_success" id="create-dlivestock" style="display: none;" :businessProfile="businessProfile" />

        	<UpdateDLivestock v-on:dlivestock-update-success="action_success" id="update-dlivestock" style="display: none;" :DLivestockData="dlivestock_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"
import CreateDLivestock from "./create"
import UpdateDLivestock from "./update"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			dlivestock_data: {},
			dlivestocks: [],
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
				category: { value: '', keys: ['category'] },
				type: { value: '', keys: ['type'] }
			}
		}
	},
	components: {
		CreateDLivestock,
		UpdateDLivestock
	},
	created() {

		this.get_all_dlivestocks()	
		this.get_business_profile()	

	},
	methods: {
		get_business_profile: function() {

			axios.get(`${ApiUrl.url}/businesses/${Auth.isAuthenticatedUser().sub}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.businessProfile = resp.data.data

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
		get_all_dlivestocks: function() {

			axios.get(`${ApiUrl.url}d-livestock`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.dlivestocks = resp.data.data

				if(this.dlivestocks.length <= 0) {
					this.message = "Oops!! No Defined Livestocks is Available"
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
		create_dlivestock: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-dlivestock'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_dlivestock: function(row) {

			this.dlivestock_data = row

			if(Object.keys(this.dlivestock_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-dlivestock'
					}
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_dlivestocks()
		}
	}
}
</script>
