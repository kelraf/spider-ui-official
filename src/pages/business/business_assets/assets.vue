<template>

    <div>

        <Breadcrumbs main="Manage Assets" title="Manage"/>
  
        <div class="col-md-5" style="background: white; border-radius: 10px;">

            <div v-if="business_profile.business_type !== 'transport-road'" class="card mb-2">
                <div class="card-body pt-0 pb-0">

                    <div class="media feather-main">

                        <div class="col-xl-6 xl-100">
                            <div class="row pt-4">

                                <div class="col-md-4">
                                    <div class="feather-icon-block">
                                        <feather type="navigation"></feather>
                                    </div>
                                </div>

                                <div class="col-md-4 pt-2">
                                    <h6>Vehicles</h6>
                                </div>

                                <div class="col-md-4">
                                    <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                                </div>

                            </div>
                        </div>
                    
                    </div>

                </div>

            </div>

            <div v-if="business_profile.business_type == 'supplier'" class="card mb-0">
                <div class="card-body pt-0 pb-0">

                    <div class="media feather-main">

                        <div class="col-xl-6 xl-100">
                            <div class="row pt-4">

                                <div class="col-md-4">
                                    <div class="feather-icon-block">
                                        <feather type="navigation"></feather>
                                    </div>
                                </div>

                                <div class="col-md-4 pt-2">
                                    <h6>Livestock</h6>
                                </div>

                                <div class="col-md-4">
                                    <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                                </div>

                            </div>
                        </div>
                    
                    </div>

                </div>

            </div>

            <div v-if="business_profile.business_type == 'supplier'" class="card mb-0">
                <div class="card-body pt-0 pb-0">

                    <div class="media feather-main">

                        <div class="col-xl-6 xl-100">
                            <div class="row pt-4">

                                <div class="col-md-4">
                                    <div class="feather-icon-block">
                                        <feather type="navigation"></feather>
                                    </div>
                                </div>

                                <div class="col-md-4 pt-2">
                                    <h6>Produce</h6>
                                </div>

                                <div class="col-md-4">
                                    <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                                </div>

                            </div>
                        </div>
                    
                    </div>

                </div>

            </div>

            <div v-if="business_profile.business_type == 'supplier'" class="card mb-4">
                <div class="card-body pt-0 pb-0">

                    <div class="media feather-main">

                        <div class="col-xl-6 xl-100">
                            <div class="row pt-4">

                                <div class="col-md-4">
                                    <div class="feather-icon-block">
                                        <feather type="navigation"></feather>
                                    </div>
                                </div>

                                <div class="col-md-4 pt-2">
                                    <h6>Products</h6>
                                </div>

                                <div class="col-md-4">
                                    <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary mt-2 mb-2 btn-block"> Add </button>
                                </div>

                            </div>
                        </div>
                    
                    </div>

                </div>

            </div>

        </div>
    
    </div>

</template>

<script>
export default {
    data() {
        return {
            business_profile: {}
        }
    },
    props: {
        businessProfile: Object
    },
    mounted() {
        // console.log("From Assets :", this.businessProfile)
    },
    watch: {
        businessProfile: {
            immediate: true,
            handler() {
                this.business_profile = this.businessProfile
            }
        }
    }

}
</script>

<style scoped>
    h6 {
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
    }
</style>>