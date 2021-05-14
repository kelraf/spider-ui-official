<template>
  

    <div class="col-12 p-0">
        
        <div v-if="Object.keys(current_value_addition_order).length && current_value_addition_order.order_exists" class="card">
            <div class="card-header b-l-primary">
                <h5>Value Addition Order Details</h5>
            </div>
            <div class="card-body tab-content p-0 market-tabcontent">

            <b-tabs pills bottom nav-wrapper-class="card-footer b-t-primary market-tabs p-0">

                <b-tab title="Order Details" active>

                    <!-- Container-fluid starts -->
                    <div class="container-fluid">
                        <div class="user-profile">
                        <div class="row">
                            <!-- user profile first-style start-->
                            <div class="col-sm-12 p-0">
                            <div class="card hovercard text-center">
                                <div class="info">
                                <div class="row">
                                    <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">

                                        <div class="row">
                                            <div class="col-8 offset-2 pb-3 text-left">
                                                <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block">
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>

                                        <div class="row mt-3">

                                            <div class="col-md-4">
                                                <div class="font-success text-left">
                                                    <h6>Status</h6><span> Pending </span>
                                                </div>
                                            </div>

                                            <div class="col-md-8">
                                                <div class="row">

                                                    <div class="col-md-12">
                                                        <div class="font-success text-left">
                                                            <h6>Starting Date</h6><span> XXXXXXXX </span>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-12 pt-2">
                                                        <div class="font-success text-left">
                                                            <h6>Ending Date</h6><span> XXXXXXXXXX </span>
                                                        </div>
                                                    </div>

                                                </div>                                    
                                            </div>
                                            
                                            
                                        </div>

                                    </div>
                                </div>

                                <hr />

                                <div class="row mt-3">
                                    <div class="col-sm-12 col-lg-12 order-sm-1 order-xl-0">
                                        <div class="row">

                                            <div class="col-md-12">
                                                <div class="font-secondary text-left">
                                                    <h6>Order Description</h6>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <div class="row">

                                            <div class="col-12">
                                                <div class="ttl-info text-left">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                                    Quo cupiditate labore nostrum eveniet perferendis excepturi maiores 
                                                    deserunt praesentium in ad cum autem omnis ducimus porro ullam vero eaque, 
                                                    ipsam iure est corporis repudiandae. Sint, reiciendis repellat sapiente fugit 
                                                    libero tempora quas corporis adipisci earum quisquam laborum, minima eaque? 
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>

                                
                                </div>
                            </div>
                            </div>
                            <!-- user profile first-style end-->
                            
                        </div>
                        </div>
                    </div>
                    <!-- Container-fluid Ends-->

                </b-tab>

                <b-tab title="OutPut" active>

                    <div class="market-table table-responsive tab-pane">
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">OutPut Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>
                                <p class="font-primary">BTC - 12458</p>
                            </td>
                            <td>
                                <p>0.002548548</p>
                            </td>
                            <td>
                                <p>+16.23%</p>
                                <div class="text-center"><feather class="font-primary" type="arrow-up"></feather></div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <p class="font-primary">BTC - 02157</p>
                            </td>
                            <td>
                                <p>0.025486854</p>
                            </td>
                            <td>
                                <p>-05.15%</p>
                                <div class="text-center"><feather class="font-secondary" type="arrow-down"></feather></div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <p class="font-primary">BTC - 12458</p>
                            </td>
                            <td>
                                <p>0.002548548</p>
                            </td>
                            <td>
                                <p>+16.23%</p>
                                <div class="text-center"><feather class="font-primary" type="arrow-up"></feather></div>
                            </td>
                            </tr>
                            <tr>
                            <td>
                                <p class="font-primary">BTC - 12458</p>
                            </td>
                            <td>
                                <p>0.002548548</p>
                            </td>
                            <td>
                                <p>-18.23%</p>
                                <div class="text-center"><feather class="font-secondary" type="arrow-down"></feather></div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    
                </b-tab>

            </b-tabs>

            </div>

        </div>

        <div v-if="Object.keys(current_value_addition_order).length && !current_value_addition_order.order_exists" class="row">
            <div class="col-md-8 text-center offset-md-2 pt-5 mt-5">

                <div class="container">

                    <div class="row pt-3 font-danger">
                        <div class="col-12 text-center">
                            <i class="fa fa-ellipsis-h fa-4x"></i>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 pt-3">
                            <p class="font-success">
                                <b>MORE DETAILS ABOUT THIS PROCESSING STAGE APPEARS HERE</b>
                            </p>
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
            current_value_addition_order: {}
        }
    },
    props: {
        currentValueAdditionOrder: Object
    },
    watch: {
        currentValueAdditionOrder: {
            immediate: true,
            handler() {

                if(this.currentValueAdditionOrder !== undefined && Object.keys(this.currentValueAdditionOrder).length) this.current_value_addition_order = this.currentValueAdditionOrder
                console.log("XXXXXXX", this.current_value_addition_order)
                
            },
            deep: true
        }
    }
}
</script>

<style>

</style>