<template>
    <div>
        <Breadcrumbs main="Orders" title="Orders"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 xl-100">
                    <div class="row">
                        <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body bg-primary">
                            <div class="icons-section text-center"><img src="../../assets/images/bitcoin/1.png" alt="">
                                <h6>Livestocks</h6>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-6 text-center offset-md-3">
                                            <router-link to="/orders/livestocks-orders" id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">
                                                <i class="icon-eye"></i>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body bg-secondary">
                            <div class="icons-section text-center"><img src="../../assets/images/bitcoin/2.png" alt="">
                                <h6>Produce</h6>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-6 text-center offset-md-3">
                                            <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                                <i class="icon-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-sm-4">
                        <div class="card">
                            <div class="card-body bg-primary">
                            <div class="icons-section text-center"><img src="../../assets/images/bitcoin/3.png" alt="">
                                <h6>Products</h6>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-md-6 text-center offset-md-3">
                                            <button id="default-outline-success" type="button" class="btn btn-pill btn-outline-success btn-block">
                                                <i class="icon-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

}
</script>

<style>

</style>