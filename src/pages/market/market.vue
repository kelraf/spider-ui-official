<template>
	<div>
		<Breadcrumbs title="Market Place"/>
		<!-- Container-fluid starts-->
		<div class="container-fluid search-page">
			<div class="row">
				<div class="col-sm-12">

					<b-card no-body>
						<b-card-header>
							<form class="search-form">
								<div class="form-group m-0">
									<!-- <label class="sr-only">Email</label> -->
									<input class="form-control" type="search" placeholder="Search..">
								</div>
							</form>
						</b-card-header>
						<b-card-body>
							<b-tabs style="min-height: 350px;" nav-class="border-tab  tabs-project" active-nav-item-class="active">

								<MarketLiveAnimals />
								
								<Produce />
							
								<Services />

							</b-tabs>
						</b-card-body>
					</b-card>

				</div>
			</div>
		</div>
<!-- Container-fluid Ends-->
</div>
</template>
<script>



import MarketLiveAnimals from "./market_live_animals"
import Produce from "./produce"
import Services from "./services"

export default {
	data(){
		return{
			
		}
	},
	components: {
		MarketLiveAnimals,
		Produce,
		Services
	},
	mounted(){
		
	},
	methods:{
		
	}
}
</script>
