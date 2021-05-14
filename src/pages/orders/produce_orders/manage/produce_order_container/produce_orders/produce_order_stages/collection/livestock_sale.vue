<template>
  
    <b-card no-body>
        <b-card-header header-tag="div" class="bg-secondary">
          <h5 class="mb-0">
            <b-button v-b-toggle="'primary_'+int_id" variant="secondary" >QUANTITY : {{ livestock_sale.quantity }} STATUS : {{ livestock_sale.status | displayStatus }} </b-button>
          </h5>
        </b-card-header>
        <b-collapse :id="'primary_'+int_id" accordion="my-accordion-secondary" role="tabpanel">
          <b-card-body class="p-0">
            <div class="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
              <div class="media-accordion">

                    <div class="container-fluid text-center">
                        <div class="row">

                            <div class="col-md-12 pt-2">
                                <h6> <b>SALE REQUEST DETAILS</b> </h6>
                            </div>

                            <!-- <feather type="more-vertical"></feather> -->

                            <!-- <div class="more-container">

                                <feather type="more-vertical"></feather>

                                <div class="btn-container">

                                    <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                        Make Payment
                                    </button>

                                    <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                    Make Payment
                                </button>

                                </div>

                            </div> -->

                        </div>
                    </div>

                    <div class="media">
                        
                        <div class="container-fluid pt-2">

                            <div class="row mb-2">

                                <div class="col-md-4">
                                    <div class="row">
                                        <b class="font-success">
                                            Quantity
                                        </b>
                                    </div>
                                    <div class="row">
                                        {{ livestock_sale.quantity }}
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="row">
                                        <b class="font-success">
                                            Price Per Animal
                                        </b>
                                    </div>
                                    <div class="row">
                                        {{ livestock_sale.price_per_animal }}
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="row">
                                        <b class="font-success">
                                            Total Price
                                        </b>
                                    </div>
                                    <div class="row">
                                        {{ livestock_sale.total_price }}
                                    </div>
                                </div>

                            </div>

                            <div class="row mt-2 mb-2">

                                <div class="col-md-4">
                                    <div class="row">
                                        <b class="font-success">
                                            Status
                                        </b>
                                    </div>
                                    <div class="row">
                                        <b-badge v-if="livestock_sale.status == 1" style="color: white;" variant="info">PENDING</b-badge>
                                        <b-badge v-if="livestock_sale.status == 2" style="color: white;" variant="warning">ACCEPTED</b-badge>
                                        <b-badge v-if="livestock_sale.status == 3" style="color: white;" variant="success">COMPLETED</b-badge>
                                        <b-badge v-if="livestock_sale.status == 0" style="color: white;" variant="danger">CANCLED</b-badge>
                                    </div>
                                </div>

                                <div class="col-md-4 pt-3">
                                    <!-- <button id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block text-center">
                                        Accept
                                    </button> -->
                                </div>

                                <!-- <div class="col-md-4">
                                    <piety :type="'pie'" :options="piety_options" :data="pieData"></piety>
                                </div> -->

                            </div>

                            <div v-if="livestock_sale.status == 1" class="row">
                                <div class="col-md-6">
                                    <button @click="openConfirmModal('cancle')" id="default-outline-danger" type="button" class="btn btn-sm btn-pill btn-outline-danger btn-block text-center">
                                        Cancle
                                    </button>
                                </div>
                                <div class="col-md-6">
                                    <button @click="openConfirmModal('accept')" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary btn-block text-center">
                                        Accept
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>BUSINESS DETAILS</b> </h6>
                            </div>
                        </div>
                    </div>

                    <div class="media">
                        <div>
                            <p>Business Name</p>
                            <p>Sub Category</p>
                            <p>County</p>
                        </div>
                        <div class="media-body text-right">
                            <p class="font-primary"> {{ livestock_sale.business.business_name.toUpperCase() }} </p>
                            <p class="font-secondary"> {{ livestock_sale.business.sub_category.toUpperCase().split("-").join(" ") }} </p>
                            <p>County</p>
                        </div>
                    </div>

                    <div class="container-fluid">
                        <div class="row">
                            
                            <div class="col-6 offset-3 pb-3">
                                <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                    View Location
                                </button>
                            </div>

                        </div>
                    </div>

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>CONTACT DETAILS</b> </h6>
                            </div>
                        </div>
                    </div>

                    <div class="media">
                        <div>
                            <p>Phone Number</p>
                            <p>Email</p>
                        </div>
                        <div class="media-body text-right">
                            <p class="font-primary"> {{ livestock_sale.business.user.phone_number }} </p>
                            <p class="font-secondary"> {{ livestock_sale.business.user | getMail }} </p>
                        </div>
                    </div>

                    <div class="container-fluid text-center">
                        <div class="row">
                            <div class="col-md-12 pt-2">
                                <h6> <b>PAYMENT DETAILS</b> </h6>
                            </div>
                        </div>
                    </div>

                    <div v-if="!payment_made" class="container-fluid">
                        <div class="row">

                            <div class="col-md-12 text-center pt-3 pb-3">
                               <h5>
                                   <b class="font-secondary">
                                        No PayMent Made
                                    </b>
                               </h5>
                            </div>
                            
                            <div class="col-6 offset-3 pb-3">
                                <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                    Make Payment
                                </button>
                            </div>

                        </div>
                    </div>

                    <div v-if="payment_made" class="media">
                        <div>
                            <p>Amount</p>
                            <p>Date</p>
                        </div>
                        <div class="media-body text-right">
                            <p class="font-primary"> {{ livestock_sale.business.user.phone_number }} </p>
                            <p class="font-secondary"> {{ livestock_sale.business.user | getMail }} </p>
                        </div>
                    </div>

                    <div v-if="payment_made" class="container-fluid">
                        <div class="row">
                            
                            <div class="col-6 offset-3 pb-3">
                                <button id="default-outline-secondary" type="button" class="btn btn-pill btn-outline-secondary btn-block text-center">
                                    More One Payment
                                </button>
                            </div>

                        </div>
                    </div>

              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>

</template>

<script>

// import Piety from "vue-peity"
import Accept from "./confirm/accept"
import Cancle from "./confirm/cancle"
import axios from "axios"
import { ApiUrl } from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            livestock_sale: {},
            livestock_data_action: {},
            payment_made: false,
            piety_options: {
                fill: ["red", "#eeeeee"],
                width: 50,
                height: 50,
                innerRadius: 10,
                radius: 40
            },
            piety_data: [1, 2, 3, 2, 4, 6],
        }
    },
    components: {
        // Piety,
        Cancle,
        Accept
    },
    created() {

        this.int_id = this.$attrs.index
        this.generated_id = `primary_${this.$attrs.index}`

    },
    props: {
        livestockSale: Object
    },
    watch: {
        livestockSale: {
            immediate: true,
            handler() {

                this.livestock_sale = this.livestockSale

            },
            deep: true
        }
    },
    computed: {
        // pieData() {PROCESSING
        //     return this.piety_data.toString()
        // }
    },
    methods: {
        close() {
            Custombox.modal.close()
        },
        openConfirmModal(action) {

            this.livestock_data_action = this.livestockSale

            this.$emit("edit-livestock-sale", {
                action: action,
                ...this.livestock_sale
            })

        },
        accept() {

            this.livestock_data_action = this.livestockSale

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#accept'
                }
            })

            modal.open()

        },
        goSetIt() {

            let self = this
            this.loading = true

            let data = {
                livestock_sale: {
                    business_id: this.livestock_sale.business_id,
                    center_order_id: this.livestock_sale.center_order_id,
                    status: 2
                }
            }

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }

            console.log(self)

        },
        saleEditSuccess(data) {

            this.$emit("sale-edit-success", data)

        }
    },
    filters: {
        getMail(user) {

            return user.email == null ? "No Email Available" : user.email

        },
        displayStatus(statusValue) {

            if(statusValue == 1) return "PENDING"
            if(statusValue == 2) return "ACCEPTED"
            if(statusValue == 3) return "PROCESSING"
            if(statusValue == 0) return "CANCLED"
            else return 0

        }
    }
}
</script>

<style>

    .more-container {
        padding-top: 5px;
        position: absolute;
        right: 5px;
    }

    .more-container:hover {
        cursor: pointer;
    }

    .btn-container- {
        background: red;
        height: 200px;
        width: 200px;
    }

</style>