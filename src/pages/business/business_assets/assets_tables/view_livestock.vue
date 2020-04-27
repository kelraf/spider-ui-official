<template>
	<div>

		<Breadcrumbs main="Livestocks" title="Business Livestocks"/>

		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="message !== '' && livestocks.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_livestock" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="livestocks.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.reference.value" placeholder="Reference"/>
								</div>
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.type.value" placeholder="Type" />
								</div>
								<div class="col-sm-2">
									<input class="form-control" v-model="filters.breed.value" placeholder="Breed" />
								</div>
								<div class="col-sm-2">
									<input class="form-control" v-model="filters.quantity.value" placeholder="Quantity" />
								</div>
								
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_livestock" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
								:data="livestocks" class="table"
								:currentPage.sync="filter.currentPage"
								:pageSize="10"
								@totalPagesChanged="filter.totalPages = $event"
								:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="reference">Reference</v-th>
								<v-th sortKey="type">Type</v-th>
								<v-th sortKey="breed"> Breed </v-th>
								<v-th sortKey="quantity">Quantity</v-th>
								<v-th sortKey="quantity"></v-th>
								<v-th sortKey="quantity"></v-th>
								<v-th sortKey="quantity"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.reference }}</td>
									<td>{{ row.type }}</td>
									<td>{{ row.breed }}</td>
									<td>{{ row.quantity }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/businesses/livestock-profile/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
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


			<CreateLivestock v-on:action-success="action_success" id="create-livestock" style="display: none;" :businessProfile="businessProfile" />

        	<UpdateLivestock v-on:action-success="action_success" id="update-livestock" style="display: none;" :livestockData="livestock_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import UpdateLivestock from "../assets_forms/livestock/update"
import CreateLivestock from "../assets_forms/livestock/create"
import { DLivestockProcessor } from "../../../../helpers/livestock"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			livestock_data: {},
			livestocks: [],
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
				reference: { value: '', keys: ['reference', 'type', 'breed', 'quantity'] },
				type: { value: '', keys: ['type'] },
				breed: { value: '', keys: ['breed'] },
				quantity: { value: '', keys: ['quantity'] }
			}
		}
	},
	components: {
		CreateLivestock,
		UpdateLivestock
	},
	created() {

		this.get_all_business_livestock()
		this.get_business_profile()

	},
	methods: {
		get_business_profile: function() {

			axios.get(`${ApiUrl.url}businesses/${this.$route.params.id}`, {
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
		get_all_business_livestock: function() {

			axios.get(`${ApiUrl.url}livestocks/business/${this.$route.params.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				let business_livestocks = resp.data.data
				
				if(business_livestocks.length <= 0) {

					this.message = resp.data.message

				} else {

					axios.get(`${ApiUrl.url}d-livestock`, {
						headers: {
							Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
						}
					})
					.then( (resp) => {
	
						this.livestocks = DLivestockProcessor.process_business_livestock(resp.data.data, business_livestocks)
	
					} )
					.catch( (err) => {
	
						if(err.response) {
	
							if(err.response.status == 401) {
	
							this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
							this.$router.replace("/auth/login")
	
							}
	
						}
	
					} )

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
		create_livestock: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-livestock'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_vehicle: function(row) {

			this.livestock_data = row

			if(Object.keys(this.livestock_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-livestock'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_livestock()
		}
	}
}
</script>
