<template>
	<div>


		<Breadcrumbs main="Products" title="Business AutoMotives"/>


		<!-- Container-fluid starts-->
		<div class="container-fluid">
			
			<div v-if="message !== '' && products.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_product" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div v-if="products.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-4">
									<input class="form-control" v-model="filters.name.value" placeholder="Search ..."/>
								</div>
								<div class="col-sm-3">
									<!-- <input class="form-control" v-model="filters.type.value" placeholder="Type" /> -->
								</div>
								<div class="col-sm-3">
									<!-- <input class="form-control" v-model="filters.cate.value" placeholder="Status" /> -->
								</div>
								
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_product" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
								:data="products" class="table"
								:currentPage.sync="filter.currentPage"
								:pageSize="10"
								@totalPagesChanged="filter.totalPages = $event"
								:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="name">Name</v-th>
								<v-th sortKey="type">Type</v-th>
								<v-th sortKey="category">Category</v-th>
								<v-th sortKey="quantity">Quantity</v-th>
								<v-th sortKey="units">Units</v-th>
								<v-th sortKey="unique_number"></v-th>
								<v-th sortKey="unique_number"></v-th>
								<!-- <v-th sortKey="unique_number"></v-th> -->
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.name }}</td>
									<td>{{ row.type }}</td>
									<td>{{ row.category }}</td>
									<td>{{ row.quantity }}</td>
									<td>{{ row.units }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/products/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<!-- <td>
										<button id="default-outline-primary" @click="edit_product(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
											<i class="icon-pencil-alt"></i>
										</button>
									</td> -->
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


			<CreateProduct v-on:product-create-success="action_success" id="create-product" style="display: none;" :businessProfile="businessProfile" />

        	<!-- <UpdateVehicle v-on:vehicle-updated-success="action_success" id="update-product" style="display: none;" :vehicleData="product_data" /> -->


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
import CreateProduct from "../assets_forms/products/create"
import { mapState } from "vuex"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			product_data: {},
			products: [],
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
				name: { value: '', keys: ['name', "type", "category", "units"] },
				// type: { value: '', keys: ['type'] },
				// status: { value: '', keys: ['status'] }
			}
		}
	},
	components: {
		CreateProduct,
		UpdateVehicle
	},
	computed: {
		...mapState({
			businessData: state => state.businessData.businessData
		})
	},
	created() {

		this.businessProfile = this.businessData
		this.get_all_business_products()

	},
	methods: {
		get_all_business_products: function() {

			axios.get(`${ApiUrl.url}products/business/${this.businessData.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.products = resp.data.data
				if(this.products.length <= 0) {
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
		create_product: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-product'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_product: function(row) {

			this.product_data = row

			if(Object.keys(this.product_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-product'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_products()
		}
	}
}
</script>
