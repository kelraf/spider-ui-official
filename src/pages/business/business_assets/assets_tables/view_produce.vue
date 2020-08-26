<template>
	<div>

		<Breadcrumbs main="Produce" title="Business Produce"/>

		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="message !== '' && produce.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_produce" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="produce.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-3">
									<input class="form-control" v-model="filters.reference.value" placeholder="Search..."/>
								</div>
								<div class="col-sm-3">
									<!-- <input class="form-control" v-model="filters.category.value" placeholder="Category" /> -->
								</div>
								<div class="col-sm-2">
									<!-- <input class="form-control" v-model="filters.breed.value" placeholder="Breed" /> -->
								</div>
								<div class="col-sm-2">
									<!-- <input class="form-control" v-model="filters.quantity.value" placeholder="Quantity" /> -->
								</div>
								
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_produce" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
								:data="produce" class="table"
								:currentPage.sync="filter.currentPage"
								:pageSize="10"
								@totalPagesChanged="filter.totalPages = $event"
								:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="reference">Ref Animal</v-th>
								<v-th sortKey="type">Produce Name</v-th>
								<v-th sortKey="quantity">Quantity</v-th>
								<v-th sortKey="units">Units</v-th>
								<v-th sortKey="quantity"></v-th>
								<v-th sortKey="quantity"></v-th>
								<v-th sortKey="quantity"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.referenced_animal }}</td>
									<td>{{ row.produce_name }}</td>
									<td>{{ row.quantity }}</td>
									<td>{{ row.units }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/produces/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<td>
										<button id="default-outline-primary" @click="edit_produce(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
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


			<CreateProduce v-on:action-success="action_success" id="create-produce" style="display: none;" :businessProfile="businessProfile" />

        	<UpdateProduce v-on:action-success="action_success" id="update-produce" style="display: none;" :produceData="produce_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import UpdateProduce from "../assets_forms/produce/update"
import CreateProduce from "../assets_forms/produce/create"
import { DProduceProcessor } from "../../../../helpers/produce"
import { mapState } from "vuex"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			produce_data: {},
			produce: [],
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
				reference: { value: '', keys: ['reference', 'category', 'units', 'quantity', 'units'] }
			}
		}
	},
	components: {
		CreateProduce,
		UpdateProduce
	},
	computed: {
		...mapState({
			businessData: state => state.businessData.businessData
		})
	},
	created() {

		this.businessProfile = this.businessData
		this.get_all_business_produce()

	},
	methods: {
		get_all_business_produce: function() {

			axios.get(`${ApiUrl.url}produces/business/${this.businessData.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				let business_produce = resp.data.data

				if(business_produce.length <= 0) {
					this.message = resp.data.message
				} else {

					axios.get(`${ApiUrl.url}d-produces`, {
						headers: {
							Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
						}
					})
					.then( (resp) => {

						this.produce = DProduceProcessor.process_business_produce(resp.data.data, business_produce)

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
		create_produce: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-produce'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_produce: function(row) {

			this.produce_data = row

			if(Object.keys(this.produce_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-produce'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_produce()
		}
	}
}
</script>
