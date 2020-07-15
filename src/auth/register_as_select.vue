<template>
	<div>
		<!-- Loader starts-->
		<!-- <div class="loader-wrapper">
			<div class="loader bg-white">
				<div class="whirly-loader"> </div>
			</div>
		</div> -->
		<!-- Loader ends-->
		<!-- page-wrapper Start-->
		<div class="page-wrapper">
			<!-- Page Body Start-->
			<div class="container-fluid p-0 m-0">
				<div class="comingsoon comingsoon-bgimg">
					<div class="comingsoon-inner text-center"><img src="../assets/images/other-images/coming-soon-Logo.png" alt="">
						<h5>REGISTER AS</h5>
						<div class="countdown">
							<div>
								<ul>

									<li>
										<span  @click="selected('spider-client')" class="time digits">
											<i class="icon-shopping-cart icon-h"></i>
										</span>
										<span class="title">BUYER</span>
									</li>

									<li>
										<span @click="selected('spider-member')" class="time digits">
											<i id="icon-h" class="fa fa-users"></i>
										</span>
										<span class="title">MEMBER</span>
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
export default{
	data(){
		return {
			
		}
	},
	components: {

	},
	computed: {
		 ...mapState({
			role: state => state.selectedRole.role
		})
	},
	methods: {
		selected(value) {
			this.$store.dispatch("selectedRole/setRole", value);
			this.$router.replace("/auth/register")
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