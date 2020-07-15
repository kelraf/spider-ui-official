<template>
	<div>

		<Breadcrumbs main="S I Admins" title="Admins"/>

		<!-- Container-fluid starts-->
		<div class="container-fluid">

			<div v-if="!users.length && businessData.sub_category == 'server'" class="row pt-5">
				<div class="col-md-6 text-center offset-md-3 pt-5">
					<h2> No Super Instance Admins Available </h2>

					<div class="container pt-5">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" @click="create_super_instance_admin" type="button" class="btn btn-pill btn-outline-primary btn-block">
									<i class="icon-plus"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="users.length && businessData.sub_category == 'server'" class="row">
				<div class="col-12 p-0">

					<Admins />

				</div>
			</div>

			

		</div>

		<div v-if="businessData.sub_category !== 'server'" class="p-0">
			<div class="error-wrapper display-error">
				<img class="img-40" src="../../assets/images/other-images/sad.png" alt />
				<div class="error-heading pt-5">
				<h1 style="font-size: 100px;" class="headline reduce-size font-danger">403</h1>
				</div>
				<p class="sub-content"> You don't have permission to access this page.
				</p>
				<div>
				<button
					class="btn btn-sm btn-pill btn-outline-danger"
					@click="$router.go(-1)"
				>BACK TO HOME PAGE</button>
				</div>
			</div>
		</div>

		<Register id="create-admin" style="display: none;" />

	</div>
<!-- Container-fluid Ends-->
</template>

<script>

import axios from "axios"
import { mapState } from "vuex"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import Admins from "./admins"
import Register from "./register"

export default {
	data(){
		return{
			users: [],
		}
	},
	components: {
		Admins,
		Register
	},
	computed: {
		...mapState({
			userProfile: state => state.userProfile.userProfile,
			businessData: state => state.businessData.businessData
		})
	},
	watch: {
		userProfile: function() {
			console.log("userProfile from watch", this.userProfile)
		}
	},
	created() {

		this.loadUsers()

		console.log("businessData:", this.businessData)

	},
	methods: {
		create_super_instance_admin() {

			// let modal = new Custombox.modal({
			// 	content: {
			// 			effect: 'slip',
			// 			target: '#create-admin'
			// 		}
			// })

			// modal.open()

		},
		loadUsers: function() {

			axios.get(`${ApiUrl.url}users`, {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			})
			.then( (resp) => {


				this.users = resp.data.data.filter((user) => {
					if(["super-instance-admin"].includes(user.role)) return user
				})

				console.log("Users", this.users)

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

			axios.get(`${ApiUrl.url}livestocks`, {
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

        }
	}
}
</script>
