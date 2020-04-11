<template>
	<div>
		<div class="page-wrapper">
			<div class="container-fluid">
				<!-- Unlock page start-->
				<div class="authentication-main">
					<div class="row">
						<div class="col-md-12 p-0">
							<div class="auth-innerright">
								<div class="authentication-box">
									<div class="text-center"><img src="../assets/images/endless-logo.png" alt=""></div>
									<div class="card mt-4 p-4 mb-0">
										<form class="theme-form">
											<div class="form-group">
												<label class="col-form-label"> We Sent An Sms with a Code For Verification</label>
												<input maxlength="4" @focus="focused = true" @blur="focused = false" v-model="code" class="form-control" type="tel" placeholder="Enter The Code">
											</div>
											<div class="form-group form-row mb-2">
												<div class="col-md-12">
													<div class="btn-container">
														<b-button-group class="btn-group-pill">
															<b-button variant="outline-primary">Resend Code</b-button>
															<b-button @click="verify" variant="outline-primary">
																<span v-if="!focused && !typing">Verify Code</span>
																<span v-if="focused && !typing">Waiting Code</span>
																<span v-if="typing">Typing...</span>
															</b-button>
														</b-button-group>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Unlock page end -->
			</div>
		</div>
	</div>
</template>
<script>

import { mapState } from "vuex"
// import $ from "jquery"
import axios from "axios"
import { ApiUrl } from "../api/apiurl"

export default {
	data() {
		return {
			code: "",
			focused: false,
			typing: false,
		}
	},
	watch: {
		code: function(val) {

			this.typing = true
			console.log("Typing : ", this.typing)
			let self = this
			
			setTimeout(function() {

				self.typing = false
				console.log("Typing : ", self.typing)

			}, 2000)

			if(val.length == 4) {
				console.log("Ready To Fire")
			}

		},
		focused: function(val) {
			console.log("Focused : ", val)
		}
	},
	methods: {

		verify: function() {
			if(this.code.length < 4) {
				console.log("Not Ready Yet")
			} else {

				let data = {
					user : {
						code: parseInt(this.code)
					}
				}

				let self = this

				axios.post(`${ApiUrl.url}/auth/verify/code/${this.$route.params.id}`, data)

				.then( (resp) => {

					self.$toasted.show(`${resp.data.message}`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 8000})
					self.$router.replace("/auth/login")

				} )

				.catch( (err) => {

					if(err.response.status == 404) {

						self.$toasted.show(`${err.response.data.errors.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 20000})
						self.$toasted.show("New Code Sent Please Reply With It.", {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 20000})

					} else if(err.response.status == 400) {

						self.$toasted.show(`${err.response.data.errors.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})

					} else {

						console.log("Error")
						
					}

				} )

				console.log(data)

			}
		}

	},
    computed: {
        ...mapState({
            phone_number: state => state.spiderverify.phone_number
        })
    }

}
</script>

<style scoped>
	.btn-container {
        margin: auto;
        width: 70%;
    }
</style>