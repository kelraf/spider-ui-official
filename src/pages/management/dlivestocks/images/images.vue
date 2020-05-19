<template>
  
    <div class="col-xl-12 col-md-12 col-sm-12">
        <div class="product-slider owl-carousel owl-theme" id="sync1">
        </div>
        
        <div v-if="d_livestock_images.length == 0" class="row">
            <div class="col-md-12 text-center pt-5 pb-5">

                <h4> No Images For The Livestock </h4>
                
            </div>
        </div>

        <swiper v-if="d_livestock_images.length > 0" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(d_livestock_image, index) in d_livestock_images"  :key="index">
                <img
                    :src="getImgUrl(d_livestock_image)"
                    :id="d_livestock_image.id"
                    class="img-fluid bg-img"
                    alt="index"
                    />
                </swiper-slide>
        </swiper>
        <div v-if="d_livestock_images.length > 0" class="row pt-2">
            <div class="col-12 slider-nav-images">
                <swiper :options="swiperOption1">
                    <swiper-slide class="img-container" v-for="(d_livestock_image, index) in d_livestock_images"  :key="index">
                            
                        <button @click="delete_one_img(d_livestock_image.id)" class="img-btn">
                            <i v-if="!loading_delete" class="icon-trash"></i>
                            <img style="width: 15px; height: 15px;" v-else src="../../../../assets/images/loader.gif" alt="">
                        </button>

                        <img
                            :src="getImgUrl(d_livestock_image)"
                            :id="d_livestock_image.id"
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
           <img style="width: 18px; height: 18px;" v-else src="../../../../assets/images/loader.gif" alt="">
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
import { ApiUrl } from "../../../../api/apiurl"
import Auth from "../../../../auth/js/spider_auth"

export default {
    data() {
        return {
            loading: false,
            loading_delete: false,
            modal_payload: {},
            d_livestock: {},
            d_livestock_images: [],
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
        dlivestockData: Object
    },
    watch: {
        dlivestockData: {
            immediate: true,
            handler() {
                
                if(Object.keys(this.dlivestockData).length > 0) {

                    this.d_livestock = this.dlivestockData
                    
                    if (this.d_livestock.d_livestock_images.length > 0) {
    
                        this.d_livestock_images = this.d_livestock.d_livestock_images
    
                    }
                    
                }


            }
        }
    },
    methods: {
        getImgUrl(d_livestock_image) {

            return `${ApiUrl.url}uploads/d_livestocks/` + d_livestock_image.image.file_name

        },
        slideTo(id) {

            this.swiper.slideTo(id, 1000, false)

        },
        one_img_upload_success(data) {
            this.d_livestock_images.push(data)
        },
        delete_one_img(id) {

            this.loading_delete = true
            let self = this

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
            
            axios.delete(`${ApiUrl.url}d-livestock-images/${id}`, headers)
            .then( (resp) => {

                if(resp.status == 204) {

                    setTimeout(function() {

                        self.loading_delete = false
                        self.d_livestock_images = self.d_livestock_images.filter( d_livestock_image => d_livestock_image.id !== id )

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

            this.modal_payload = this.d_livestock

            if(Object.keys(this.modal_payload).length > 0) {
                
                let modal = new Custombox.modal({
                    content: {
                            effect: 'slip',
                            target: '#image-upload'
                        }
                    })

                modal.open()

            } else {
                this.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
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