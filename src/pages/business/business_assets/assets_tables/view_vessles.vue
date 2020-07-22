<template>
	<div>


		<Breadcrumbs main="Vessles" title="Business Vessles"/>


		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="message !== '' && vessles.length <= 0" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> {{ message }} </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_vessle" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div v-if="vessles.length > 0" class="row">

				<div class="col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="datatable-vue m-0">

							<div class="row filter-smart">
								<div class="col-sm-4">
									<input class="form-control" v-model="filters.unique_number.value" placeholder="Unique Number"/>
								</div>
								<div class="col-sm-2">
									<input class="form-control" v-model="filters.status.value" placeholder="Status" />
								</div>
								<div class="col-sm-2">
									<!-- <input class="form-control" v-model="filters.age.value" placeholder="Age" /> -->
								</div>
								<div class="col-sm-2">
									<!-- <input class="form-control" v-model="filters.startdate.value" placeholder="Start Date" /> -->
								</div>
								<div class="col-sm-2">
									<button id="default-outline-primary" @click="create_vessle" type="button" class="btn btn-pill btn-outline-primary btn-block">
										<i class="icon-plus"></i>
									</button>
								</div>
							</div>
							<div class="table-responsive vue-smart">

							<v-table
							:data="vessles" class="table"
							:currentPage.sync="filter.currentPage"
							:pageSize="10"
							@totalPagesChanged="filter.totalPages = $event"
							:filters="filters"
							>

							<thead slot="head">
								<v-th sortKey="unique_number">Unique Number</v-th>
								<v-th sortKey="status"> Status </v-th>
								<v-th sortKey="unique_number"></v-th>
								<v-th sortKey="unique_number"></v-th>
								<v-th sortKey="unique_number"></v-th>
							</thead>
							<tbody slot="body" slot-scope="{displayData}">
								<tr v-for="row in displayData" :key="row.id">
									<td>{{ row.unique_number }}</td>
									<td>{{ row.status }}</td>
									<td>
										<router-link id="default-outline-primary" :to="'/dashboard/vessles/'+row.id" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block">
											<i class="icon-eye"></i>
										</router-link>
									</td>
									<td>
										<button id="default-outline-primary" @click="edit_vessle(row)" type="button" class="btn btn-pill btn-outline-primary btn-block">
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


			<CreateVessle v-on:vessle-create-success="action_success" id="create-vessle" style="display: none;" :businessProfile="businessProfile" />

        	<UpdateVessle v-on:vessle-updated-success="action_success" id="update-vessle" style="display: none;" :vessleData="vessle_data" />


		</div>
	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import users from '../../../../data/users' 
import axios from "axios"
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"
import UpdateVessle from "../assets_forms/vessle/update"
import CreateVessle from "../assets_forms/vessle/create"
import { mapState } from "vuex"

export default {
	data(){
		return{
			users,
			businessProfile: {},
			vessle_data: {},
			vessles: [],
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
				unique_number: { value: '', keys: ['unique_number'] },
				status: { value: '', keys: ['status'] }
			}
		}
	},
	components: {
		CreateVessle,
		UpdateVessle
	},
	computed: {
		...mapState({
			businessData: state => state.businessData.businessData
		})
	},
	created() {

		this.businessProfile = this.businessData
		this.get_all_business_vessles()

	},
	methods: {
		get_all_business_vessles: function() {

			axios.get(`${ApiUrl.url}vessles/business/${this.businessData.id}`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {

				this.vessles = resp.data.data

				if(this.vessles.length <= 0) {
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
		create_vessle: function() {
			
			if(Object.keys(this.businessProfile).length > 0) {

				let modal = new Custombox.modal({
				content: {
						effect: 'slip',
						target: '#create-vessle'
					}
				})

				modal.open()

			} else {

				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
				
			}

        },
        edit_vessle: function(row) {

			this.vessle_data = row

			if(Object.keys(this.vessle_data).length > 0) {

				let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#update-vessle'
                    }
                })

				modal.open()
				
			} else {
				this.$toasted.show(`Oops!! An Error Occurred, Please Try Again.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
			}

		},
		action_success: function(data) {
			this.get_all_business_vessles()
		}
	}
}
</script>
