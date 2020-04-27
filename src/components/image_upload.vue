<template>
    
    <div class="container" style="width: 50%;">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body p-0">
                        <vue-dropzone name="image-upload" :data="data" v-on:vdropzone-error="handleUploadError" id="validationdropzone" :options="options" class="dropzone digits"></vue-dropzone>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'

export default {
    data(){
        return {
            paramName: "paramName",
            imageFor: "",
            options:{
                url:"http://0.0.0.0:4000/api/avatars/1",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                paramName: function(n) {
                    return `${this.paramName}[]`;
                },
                uploadMultiple: false,
                //   acceptedFiles:['image/jpeg','image/png'],
                maxFilesize: 1,
                addRemoveLinks: true,
                dictDefaultMessage:`<i class='icon-cloud-up'></i><h6>Drop Profile Image here or click to upload.</h6>`
            },
            data: {
                id: 1
            }
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    props: {
        definedOptions: Object
    },
    watch: {
        definedOptions: {
            immediate: true,
            handler() {
                this.options.url = this.definedOptions.url
                this.paramName = this.definedOptions.paramName
                this.options.uploadMultiple = this.definedOptions.uploadMultiple
                this.imageFor= this.definedOptions.imageFor
                console.log("XXXXXXXXXXX", definedOptions)
            }
        }
    },
    methods: {
        handleUploadError: function(file, message, xhr) {
            if(xhr.status == 422) {
                console.log(JSON.parse(xhr.response).errors)

                for (const key of Object.keys(JSON.parse(xhr.response).errors)) {

                    if(key == "user_id") {
                        this.$toasted.show(`${JSON.parse(xhr.response).errors.user_id[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
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
        }
    }
}
</script>

<style>

</style>