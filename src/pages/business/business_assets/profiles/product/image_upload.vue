<template>
    
    <div class="container" style="width: 50%;">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body p-0">
                        <vue-dropzone name="image-upload" v-on:vdropzone-success="handleSuccess" v-on:vdropzone-error="handleUploadError" id="validationdropzone" :options="options" class="dropzone digits">                                
                        </vue-dropzone>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'
import { ApiUrl } from "../../../../../api/apiurl"
import Auth from "../../../../../auth/js/spider_auth"

export default {
    data(){
        return {
            product_images_container_id: "",
            product_id: "",
            options:{
                url:`${ApiUrl.url}products-images`,
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                },
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                params: {},
                paramName: function(n) {
                    return `product_image[]`;
                },
                uploadMultiple: false,
                //acceptedFiles:['image/jpeg','image/png'],
                maxFilesize: 1,
                addRemoveLinks: true,
                dictDefaultMessage:`<i class='icon-cloud-up'></i><h6>Drop Profile Image here or click to upload.</h6>`
            }
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    props: {
        modalPayload: Object
    },
    watch: {
        modalPayload: {
            immediate: true,
            handler() {
                this.options.params.product_images_container_id = this.modalPayload.id
                this.options.params.product_id= this.modalPayload.product_id
            },
            deep: true
        }
    },
    methods: {
        handleUploadError: function(file, message, xhr) {

            if(xhr.status == 422) {

                for (const key of Object.keys(JSON.parse(xhr.response).errors)) {

                    if(key == "image_limit") {
                        this.$toasted.show(`${JSON.parse(xhr.response).errors.image_limit[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
                    } 
                }

            } else if(xhr.status == 400) {
                Custombox.modal.close()
                this.$toasted.show(`Oops!! An Error Occured, Please Try Again. :400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
            } else if(xhr.status == 404) {
                Custombox.modal.close()
                this.$toasted.show(`Oops!! An Error Occured, Please Try Again. :404`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
            } else if(xhr.status == 401) {
                this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                this.$router.replace("/auth/login")
            } else if(xhr.status == 500) {
                Custombox.modal.close()
                this.$toasted.show(`Oops!! An Error Occured, Please Try Again. :500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
            }
        },
        handleSuccess(file, response) {

            this.$emit("upload-success", response.data)
            console.log("XXXXXX-------ZZZZZZZ", response.data)
            

        }
    }
}
</script>

<style>

</style>