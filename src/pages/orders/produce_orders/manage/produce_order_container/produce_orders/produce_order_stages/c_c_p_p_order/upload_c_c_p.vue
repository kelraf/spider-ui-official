<template>

    <div class="container-fluid">
        <div @click.self="close" class="row">
            <div class="col-md-6 offset-md-3">

                <div class="card-body bg-white">
                    <form-wizard color="#4466f2" :start-index="0" title="Upload Document" subtitle="Allowed Files .pdf Only." back-button-text="Back" next-button-text="Next">

                    <tab-content :before-change="beforeChange" title="Document Purpose">
                        <div class="setup-content" id="step-1">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                            <div class="form-group">
                                <label class="control-label">Document Purpose</label>
                                <input  v-model="purpose.value" :class="purpose.error ? 'form-error' : ''" class="form-control to-shake" type="text" placeholder="Document Purpose">
                            </div>
                            </div>
                        </div>
                        </div>
                    </tab-content>

                    <tab-content title="Document Upload">
                        <div class="setup-content" id="step-2">
                        <div class="col-xs-12">
                            <div class="col-md-12">
                            <div class="form-group">
                                <vue-dropzone @click="check_purpose_value(e)" v-if="Object.keys(options).length > 0" name="file" v-on:vdropzone-success="handleSuccess" v-on:vdropzone-error="handleUploadError" id="validationdropzone" :options="options" class="dropzone digits"></vue-dropzone>
                            </div>
                            </div>
                        </div>
                        </div>
                    </tab-content>

                    </form-wizard>
                </div>
                
            </div>
        </div>
    </div>
    
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'
import {ApiUrl} from "../../../../../../../../api/apiurl"
import Auth from "../../../../../../../../auth/js/spider_auth"
import axios from "axios"
import $ from "jquery"

export default {
    data(){
        return {
            avatar: {},
            loading: false,
            purpose: {
                error: '',
                value: ''
            },
            options: {
                url:`${ApiUrl.url}c-c-p-p-orders`,
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                },
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                params: {
                    
                },
                paramName: function(n) {
                    return `file[]`;
                },
                uploadMultiple: false,
                maxFilesize: 1,
                addRemoveLinks: true,
                dictDefaultMessage:`<i class='icon-cloud-up'></i><h6>Drop Profile Image here or click to upload.</h6>`
            }
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    mounted() {
    },
    computed: {
        
    },
    props: {
       stageData: Object
    },
    watch: {
        stageData: {
            immediate: true,
            handler() {

                if(Object.keys(this.stageData).length > 0) this.options.params.produce_order_stage_id = this.stageData.id

            }
        },
        "purpose.value": function(new_val) {
            this.options.params.purpose = new_val 
        }
    },
    methods: {
        beforeChange() {

            if(this.purpose.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.purpose.error = 'field can\'t be empty'

                this.$toasted.show(`Document Purpose : ${this.purpose.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

                return false
            } else {
                return true
            }

        },
        close: function() {
            Custombox.modal.close()
        },
        handleSuccess(file, response) {

            this.$emit("file-upload-success", response.data)
            Custombox.modal.close()

        },
        handleUploadError: function(file, message, xhr) {

            if(xhr.status == 422) {

                for (const key of Object.keys(JSON.parse(xhr.response).errors)) {

                    if(key == "purpose") {
                        this.$toasted.show(`Purpose: ${JSON.parse(xhr.response).errors.purpose[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
                    } else if(key == "file") {
                        this.$toasted.show(`File: ${JSON.parse(xhr.response).errors.file[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
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
    .form-error {
        border: 1px solid red !important;
    }
    
</style>