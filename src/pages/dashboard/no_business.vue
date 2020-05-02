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
					<div class="comingsoon-inner text-center">
						<!-- <img src="../../assets/images/other-images/coming-soon-Logo.png" alt=""> -->
						<h5>WELCOME TO XYZ</h5>
						<h3>Please Create Your Business To Get Started</h3>
						<div class="countdown">
							<div>
								<ul>

									<li>
										<span  @click="go_to_create" class="time digits">
											<i class="icon-briefcase icon-h"></i>
										</span>
										<span class="title">CREATE</span>
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

export default{
	data(){
		return {
			
		}
	},
	components: {

	},
	computed: {

	},
	methods: {
		go_to_create() {
			this.$router.replace("/businesses/to-create")
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