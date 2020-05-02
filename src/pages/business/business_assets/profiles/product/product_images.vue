<template>
  
    <div class="col-xl-4 col-md-4 col-sm-4">
        <div class="product-slider owl-carousel owl-theme" id="sync1">
        </div>
        
        <div v-if="product_images.length == 0" class="row">
            <div class="col-md-12 text-center pt-5 pb-5">

                <h4> No Images For The Product </h4>
                
            </div>
        </div>

        <swiper v-if="product_images.length > 0" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(product_image, index) in product_images"  :key="index">
                <img
                    :src="getImgUrl(product_image)"
                    :id="product_image.id"
                    class="img-fluid bg-img"
                    alt="index"
                    />
                </swiper-slide>
        </swiper>
        <div v-if="product_images.length > 0" class="row pt-2">
            <div class="col-12 slider-nav-images">
                <swiper :options="swiperOption1">
                    <swiper-slide class="img-container" v-for="(product_image, index) in product_images"  :key="index">
                            
                        <button @click="delete_one_img(product_image.id)" class="img-btn">
                            <i v-if="!loading_delete" class="icon-trash"></i>
                            <img style="width: 15px; height: 15px;" v-else src="../../../../../assets/images/loader.gif" alt="">
                        </button>

                        <img
                            :src="getImgUrl(product_image)"
                            :id="product_image.id"
                            class="img-fluid bg-img"
                            alt="index"
                            v-on:click="slideTo(index)"
                        />
                    </swiper-slide>
            </swiper>
            </div>
        </div>

        <button id="default-outline-primary" @click="open_image_upload_modal" type="button" class="btn mb-5 mt-3 btn-pill btn-outline-primary btn-block">
           <span v-if="!loading"><i class="icon-plus"></i></span>
           <img style="width: 18px; height: 18px;" v-else src="../../../../../assets/images/loader.gif" alt="">
        </button>

        <ImageUpload v-on:upload-success="one_img_upload_success" :modalPayload="modal_payload" id="image-upload" style="display: none;" />

    </div>

</template>

<script>

import { HeartRating } from "vue-rate-it";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ImageUpload from "./image_upload"

import axios from "axios"
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            loading_delete: false,
            modal_payload: {},
            product: {},
            product_images: [],
            counter: 1,
            modalShow: false,
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 1,
                freeMode: true
            },
            swiperOption1: {
                slidesPerView: 3,
                spaceBetween: 10,
                freeMode: true,
                centeredSlides: false
            },
            activeTab:'fabric'
        };
    },
    components: {
        swiper,
        swiperSlide,
        ImageUpload
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    props: {
        productData: Object
    },
    watch: {
        productData: {
            immediate: true,
            handler() {

                this.product = this.productData
                
                if(this.product.product_container_images == null) {

                } else {
                    if(Object.keys(this.product.product_container_images).length > 0 && this.product.product_container_images.products_images.length > 0) {

                        this.product_images = this.product.product_container_images.products_images

                    } else {

                        this.product_images = []

                    }
                }

            }
        }
    },
    methods: {
        getImgUrl(product_image) {

            return `${ApiUrl.url}uploads/product/` + product_image.image.file_name

        },
        slideTo(id) {

            this.swiper.slideTo(id, 1000, false)

        },
        one_img_upload_success(data) {
            console.log("Upload Success ------ >>>>>>>>", data)
            this.product_images.push(data)
        },
        delete_one_img(id) {

            this.loading_delete = true
            let self = this

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
            
            axios.delete(`${ApiUrl.url}products-images/${id}`, headers)
            .then( (resp) => {

                if(resp.status == 204) {

                    setTimeout(function() {

                        self.loading_delete = false
                        self.product_images = self.product_images.filter( product_image => product_image.id !== id )

                    }, 2000)

                }

            } )
            .catch( (err) => {

                setTimeout(function() {

                    self.loading_delete = false

                    if(err.response) {

                        if (err.response.status == 401) {
                        
                            self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                            self.$router.replace("/auth/login")

                        } else if(err.response.status == 404) {
                            self.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                        }

                    }

                }, 200)

            } )

        },
        open_image_upload_modal: function() {

            if(this.product.product_container_images == null) {

                this.loading = true
                let self = this

                let headers = {
                    headers: {
                        Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                    }
                }

                let data = {
                    product_images_container: {
                        product_id: this.product.id,
                        business_id: this.product.business_id
                    }
                }

                axios.post(`${ApiUrl.url}products-images-containers`, data, headers)
                .then( (resp) => {
                    setTimeout(function() {

                        self.loading = false
                        self.modal_payload = resp.data.data
                        self.product.product_container_images = self.modal_payload

                        if(Object.keys(self.modal_payload).length > 0) {
                            
                            let modal = new Custombox.modal({
                                content: {
                                    effect: 'slip',
                                    target: '#image-upload'
                                    }
                                })

                            modal.open()

                        } else {
                            console.log("Here 2")
                        }


                    }, 2000)
                } )
                
                .catch( (err) => {

                    if(err.response) {

                        setTimeout(function() {

                            self.loading = false

                            if(err.response.status == 422) {

                                for (const key of Object.keys(err.response.data.errors)) {

                                    if(key == "business_name") {
                                        self.form.business_name.error = err.response.data.errors.business_name[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.business_name[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    } else if(key == "registration_number") {
                                        self.form.registration_number.error = err.response.data.errors.registration_number[0]
                                        self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.registration_number[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
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

                        }, 3000)

                    }

                } )
                
                

            } else {
                
                this.modal_payload = this.product.product_container_images

                if(Object.keys(this.modal_payload).length > 0) {
                    
                    let modal = new Custombox.modal({
                        content: {
                                effect: 'slip',
                                target: '#image-upload'
                            }
                        })

                    modal.open()

                } else {
                    console.log("Here 2")
                }

            }

        }
    }

}
</script>

<style>

    .img-container:hover {
        cursor: pointer;
    }

    .img-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        border: 0;
        outline: none;
        transition-duration: 1s;
        top: 5px;
        left: 5px;
        background: white;
        color: red;
        opacity: 0;
    }

    .img-container:hover .img-btn {
        cursor: pointer;
        border-radius: 50%;
        opacity: 1;
    }
    

</style>