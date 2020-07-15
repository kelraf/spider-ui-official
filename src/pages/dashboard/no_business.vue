<template>
	<div>
		<!-- page-wrapper Start-->
		<div class="page-wrapper">
			<!-- Page Body Start-->
			<div class="container-fluid p-0 m-0">
				<div class="comingsoon comingsoon-bgimg">

					 <!-- Evaluating -->

					<div v-if="evaluating" class="container-fluid mt-5 pt-5">
						<div class="row">
							<div class="col-12 text-center">

							<div class="loader">
								<div class="line bg-warning"></div>
								<div class="line bg-warning"></div>
								<div class="line bg-warning"></div>
								<div class="line bg-warning"></div>
							</div>

							</div>
						</div>

						<div class="row">
							<div class="col-12 text-center mt-4">
								<p>
									<b class="font-success">{{ message }}</b>
								</p>
							</div>
						</div>

					</div>

					<!-- Evaluating Ends -->

					<div v-if="!evaluating" class="comingsoon-inner text-center">
						<h5 class="animated fadeIn">
							<b>WELCOME TO SPIDER</b>
						</h5>
						<h3 class="animated zoomIn">Please Create Your Business To Get Started</h3>
						<div class="countdown">
							<div>
								<ul class="animated bounceIn">

									<li>
										<span  @click="go_to_create" class="time digits">
											<i class="icon-briefcase icon-h"></i>
										</span>
										<!-- <span class="title">CREATE</span> -->
									</li>
									
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script>

import { mapState } from "vuex";

import axios from "axios"
import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"

export default{
	data(){
		return {
			evaluating: true,
			message: "Please Wait. Evaluating Your Account Type..."
		}
	},
	components: {

	},
	computed: {
		...mapState({
			userProfile: state => state.userProfile.userProfile,
			businessData: state => state.businessData.businessData
		})
	},
	mounted() {

		let self = this

		setTimeout(() => {

			self.evaluatingIt()
			self.settingUp()

		}, 3000)

	},
	methods: {
		go_to_create() {
			this.$router.replace("/account-pending/create")
		},
		evaluatingIt() {

			if(this.userProfile.role == "spider-member") {
				this.evaluating = false
			}

		},
		settingUp() {

			if(!Object.keys(this.userProfile).length && this.userProfile.role !== "spider-client") return

			let data = {
				business : {
					business_name : "spider-client",
					registration_number : 9999,
					business_type: "spider-client",
					category: "spider-client",
					sub_category: "spider-client",
					user_id: this.userProfile.id
				}
			}                

			let self = this
				
			let headers = {
				headers: {
					Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
				}
			}

			this.message = "Almost There. Setting Up Your Account..."

			axios.post(`${ApiUrl.url}businesses`, data, headers) 
			.then( (resp) => {
				setTimeout(function() {

					self.message = "Account SetUp Completed Successfully."
					self.$toasted.show(`${self.message}`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})

					setTimeout(function() {

						self.$router.go(0)

					}, 1000)

				}, 4000)
			} )

			.catch( (err) => {

				console.log(err)

				if(err.response) {

					setTimeout(function() {

						if(err.response.status == 422) {

							for (const key of Object.keys(err.response.data.errors)) {

								if(key == "business_name") {
									self.form.business_name.error = err.response.data.errors.business_name[0]
									self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.business_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								} else if(key == "registration_number") {
									self.form.registration_number.error = err.response.data.errors.registration_number[0]
									self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.registration_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								} else if(key == "sub_category") {
									self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 003-003`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								} else if(key == "business_type") {
									self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 001-001`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								} else if(key == "category") {
									self.form.business_category.error = err.response.data.errors.category[0]
									self.$toasted.show(`${key} : ${err.response.data.errors.category[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								} else if(key == "user_id") {
									self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 002-002`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
								}  else {
									console.log("Oops!! Error Occured")
								}
							}

						} else if(err.response.status == 401) {

							Custombox.modal.close()
							self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
							self.$router.replace("/auth/login")

						} else if(err.response.status == 500) {

							console.log("500 Error")

						}

					}, 4000)

				}

			} )

		}
	}
}
</script>

<style scoped>

	.time {
		cursor: pointer;
	}

	.icon-h {
		transition-duration: 1s;
	}

	#icon-h {
		transition-duration: 1s;
	}

	.time:hover .icon-h {
		transform: scale(.5);
	}

	.time:hover #icon-h {
		transform: scale(.5);
	}


</style>