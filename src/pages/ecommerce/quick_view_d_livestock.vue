<template>
  
    <div class="container-fluid">
        <div v-on:click.self="close" class="row">
            <div class="col-md-8 offset-md-2">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 border-right bg-white img-container">
                            <div class="img-container">
                                <img 
                                    v-if="showImg && Object.keys(quick_view_d_livestock).length > 0 && quick_view_d_livestock.d_livestock_images.length > 0" 
                                    class="img-fluid" 
                                    :src="getImgUrl(quick_view_d_livestock.d_livestock_images[0])" 
                                    alt=""
                                >

                                <div 
                                    v-if="!showImg && Object.keys(quick_view_d_livestock).length > 0 && quick_view_d_livestock.d_livestock_images.length > 0" 
                                    class="innitial-with-btn"
                                >
                                    <b class="font-white text-center mt-5">
                                        <h1>
                                            {{ quick_view_d_livestock.type | getInitial }}
                                        </h1>
                                    </b>

                                    <div class="container pt-3">
                                        <div class="row">
                                            <div class="col-6 offset-3">
                                                <button @click="showImage" id="default-outline-primary" type="button" class="btn btn-pill btn-outline-success btn-block">
                                                    Show Image
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div 
                                    v-if="!showImg && Object.keys(quick_view_d_livestock).length > 0 && quick_view_d_livestock.d_livestock_images.length <= 0" 
                                    class="innitial-with-btn"
                                >

                                    <b class="font-white text-center mt-5">
                                        <h1>
                                            {{ quick_view_d_livestock.type | getInitial }}
                                        </h1>
                                    </b>

                                </div>

                            </div>
                        </div>

                        <div class="col-md-6 pt-3 bg-white">

                            <div class="container-fluid">
                                <div class="row">
                                    <h6>
                                        <b class="font-secondary">
                                            {{ quick_view_d_livestock.category }} :.::.: {{ quick_view_d_livestock.type }}
                                        </b>
                                    </h6>
                                </div>
                            </div>

                            <div class="container-fluid mt-4">
                                <div class="row">
                                    <div class="col-6 font-success">
                                        <div>
                                            MIN PRICE <b class="font-danger pl-1"><i class="icon-arrow-down"></i></b>
                                        </div> 
                                        <div class="font-secondary">
                                            Kshs 56772
                                        </div>
                                    </div>
                                    <div class="col-6 font-success">
                                        <div>
                                            MAX PRICE <b class="font-danger pl-1"><i class="icon-arrow-up"></i></b>
                                        </div> 
                                        <div class="font-secondary">
                                            Kshs 56772
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="container-fluid mt-4 mb-4">

                                <div class="row">
                                    <div class="col-12 text-center font-primary">
                                        <b>
                                            Name Your Price
                                        </b>
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-12">

                                        <b-input-group>

                                            <b-input-group-prepend>
                                                <b-button :disabled="blockPriceBtn ? true : false" class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="decreasePrice" variant="primary"><i class="fa fa-minus"></i></b-button>
                                            </b-input-group-prepend>

                                            <b-form-input class="touchspin text-center" @keyup="checkUpdatePrice" type="text" v-model="price_per_animal"></b-form-input>

                                            <b-input-group-append>
                                                <b-button :disabled="blockPriceBtn ? true : false" class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="increasePrice" variant="primary"><i class="fa fa-plus"></i></b-button>
                                            </b-input-group-append>

                                        </b-input-group>

                                    </div>
                                </div>
                            </div>

                            <div class="container-fluid">

                                <div class="row mb-4 mt-4">

                                    <div class="col-md-6">

                                        <div class="row">
                                            <div class="col-12 text-center font-primary">
                                                <b>
                                                    Quantity
                                                </b>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-12">

                                                <b-input-group>

                                                    <b-input-group-prepend>
                                                        <b-button :disabled="blockQuantityBtn ? true : false" class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="decrease" variant="primary"><i class="fa fa-minus"></i></b-button>
                                                    </b-input-group-prepend>

                                                    <b-form-input class="touchspin text-center" @keyup="checkUpdate" type="text" v-model="quantity"></b-form-input>

                                                    <b-input-group-append>
                                                        <b-button :disabled="blockQuantityBtn ? true : false" class="btn-square bootstrap-touchspin-down btn-xs" type="button" @click="increase" variant="primary"><i class="fa fa-plus"></i></b-button>
                                                    </b-input-group-append>

                                                </b-input-group>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-md-6">

                                        <div class="row">
                                            <div class="col-12 text-center font-primary">
                                                <b>Total Cost</b>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-12 text-center pt-1">
                                                {{ total_price }}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="container-fluid">
                                <div class="row mt-5 mb-5">
                                    <div class="col-12">
                                        <b-button-group style="width: 100%;" class="btn-group-pill">
                                            <b-button @click="addToCart" variant="outline-secondary">Add To Cart</b-button>
                                            <b-button variant="outline-secondary">Buy Now</b-button>
                                        </b-button-group>
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

import { ApiUrl } from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import axios from "axios"

export default {
    data() {
        return {
            quick_view_d_livestock: {},
            quantity: 1,
            price_per_animal: 8999,
            blockQuantityBtn: false,
            blockPriceBtn: false,
            showImg: false
        }
    },
    computed: {
        total_price: function() {
            return (this.quantity * this.price_per_animal)
        }
    },
    props: {
        quickViewDLivestock: Object
    },
    watch: {
        quickViewDLivestock: {
            immediate: true,
            handler() {
                if(this.quickViewDLivestock) this.quick_view_d_livestock = this.quickViewDLivestock

                this.quantity = 1,
                this.price_per_animal = 0,
                this.blockQuantityBtn = false,
                this.blockPriceBtn = false,
                this.showImg = false

            },
            deep: true
        }
    },
    methods: {
        close() {
            Custombox.modal.close()
        },
        decrease() {
            if(this.quantity > 1) this.quantity-=1
        },
        increase() {
            this.quantity+=1
        },
        checkUpdate() {

            this.blockQuantityBtn = true

            if(this.quantity == "" || this.quantity < 1) {
                this.$toasted.show(`Oops!! Invalid Quantity.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            }

        },
        decreasePrice() {
            if(this.price_per_animal > 1) this.price_per_animal-=1
        },
        increasePrice() {
            this.price_per_animal+=1
        },
        checkUpdatePrice() {

            this.blockPriceBtn = true

            if(this.price_per_animal == "" || this.price_per_animal < 1) {
                this.$toasted.show(`Oops!! Invalid Price.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
            }
        },
        getImgUrl(d_livestock_image) {

            return `${ApiUrl.url}uploads/d_livestocks/` + d_livestock_image.image.file_name

        },
        showImage() {
            this.showImg = true
        },
        addToCart() {

            this.$emit("add-to-cart", {
                d_livestock_id: this.quick_view_d_livestock.id,
                quantity: this.quantity,
                price_per_animal: this.price_per_animal,
                total_price: this.total_price,
                type: this.quick_view_d_livestock.type,
                category: this.quick_view_d_livestock.category
            })

            this.close()

        }
    },
    filters: {
        getInitial(type) {

            return type.split("")[0].toUpperCase()

        }
    }
}
</script>

<style>

    .img-container {
        /* height: 400px; */
    }

    .innitial-with-btn {
        width: 100% !important;
        /* background: gray; */
        padding-top: 20%;

    }

    .innitial-with-btn h1 {
        font-size: 100px;
    }


</style>