<template>
  
    <div class="col-xl-4 col-md-4 col-sm-4">
        <div class="product-slider owl-carousel owl-theme" id="sync1">
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(product,index) in product.images"  :key="index">
                <img
                    :src="getImgUrl(product)"
                    :id="index"
                    class="img-fluid bg-img"
                    alt="index"
                    />
                </swiper-slide>
        </swiper>
        <div class="row pt-2">
            <div class="col-12 slider-nav-images">
                <swiper :options="swiperOption1">
                    <swiper-slide v-for="(product,index) in product.images" :key="index">
                        <img
                            :src="getImgUrl(product)"
                            :id="index"
                            class="img-fluid bg-img"
                            alt="index"
                            v-on:click="slideTo(index)"
                        />
                    </swiper-slide>
            </swiper>
            </div>
        </div>

        <button id="default-outline-primary" @click="open_image_upload_modal" type="button" class="btn mb-5 mt-3 btn-pill btn-outline-primary btn-block">
           Upload Image
        </button>

    <ImageUpload id="image-upload" style="display: none;" />

    </div>

</template>

<script>

import { HeartRating } from "vue-rate-it";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ImageUpload from "./image_upload"

export default {
    data() {
        return {
            product: {},
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
            }
        }
    },
    methods: {
        getImgUrl(path) {

            return require("../../../../../assets/images/" + path);

        },
        slideTo(id) {

            this.swiper.slideTo(id, 1000, false)

        },
        open_image_upload_modal: function() {

            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#image-upload'
                }
            })

            modal.open()

        }
    }

}
</script>

<style>

</style>