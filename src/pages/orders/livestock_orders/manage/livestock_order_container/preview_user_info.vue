<template>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="card p-0 m-0 custom-card">

                    <div class="card-profile pt-3">

                        <img v-if="avatar_url == ''" title="Click To Update The Image." class="rounded-circle profile-image" src="../../assets/images/default_avatars/default_avatar.svg" alt="Profile Image Placeholder" />
                        <img v-if="avatar_url !== ''" title="Click To Update The Image." class="rounded-circle profile-image" :src="avatar_url" alt="Profile Image" />

                         <div class="profile-edit">

                            <feather v-if="avatar_exists" class="edit-image" @click="upload_update" type="edit"></feather>

                            <feather v-if="!avatar_exists" class="edit-image" @click="upload_it" type="plus"></feather>

                        </div>
                    </div>

                    <div class="text-center profile-details">
                        <h4> {{ userProfile.first_name }} {{ userProfile.last_name }} </h4>
                        <h6>Manager</h6>
                    </div>

                    <div v-if="upload" class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body p-0">
                                        <vue-dropzone name="image-upload" v-on:vdropzone-success="handleSuccess" v-on:vdropzone-error="handleUploadError" id="validationdropzone" :options="options" class="dropzone digits"></vue-dropzone>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div v-if="avatar_exists" class="card-footer row">
                        <div class="col-md-12 btn-c">
                            <div class="btn-container">
                                <b-button-group class="btn-group-pill">
                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                    <b-button :class=" loading ? 'loading' : '' " @click="delete_it" variant="outline-danger">
                                        <span v-if="!loading">Delete</span>

                                        <Loader v-if="loading" />
                                    </b-button>
                                </b-button-group>
                            </div>
                        </div>
                    </div>

                    <div v-if="!avatar_exists" class="container pb-3">
						<div class="row">
							<div class="col-6 offset-3">
								<button id="default-outline-primary" type="button" @click="close" class="btn btn-pill btn-outline-primary btn-block">
									Cancel
								</button>
							</div>
						</div>
					</div>

                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

import vue2Dropzone from 'vue2-dropzone'
import {ApiUrl} from "../../api/apiurl"
import Auth from "../../auth/js/spider_auth"
import { mapState } from "vuex";
import axios from "axios"

export default {
    data(){
        return {
            avatar_exists: false,
            avatar: {},
            avatar_url: "",
            loading: false,
            upload: false
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    computed: {
        ...mapState({
        userProfile: state => state.userProfile.userProfile
    })
    },
    props: {
        userProfileProp: Object
    },
    watch: {
        userProfileProp: {
            immediate: true,
            handler() {
                if(Object.keys(this.userProfileProp).length > 0) {

                    if(Object.keys(this.userProfileProp.avatar).length > 0) {

                        this.avatar_exists = true
                        this.avatar = this.userProfileProp.avatar
                        this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${this.avatar.avatar.file_name}`

                    } else {
                        this.avatar_exists = false
                        this.avatar_url = ""
                    }

                }
            },
            deep: true
        }
    },
    methods: {
        close: function() {
            Custombox.modal.close()
        },
        delete_it: function() {

            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
            
            axios.delete(`${ApiUrl.url}avatars/${this.avatar.id}`, headers)
            .then( (resp) => {

                if(resp.status == 204) {

                    this.avatar_url = ""

                    this.avatar_exists = false
                    this.userProfileProp.avatar = {}
                    this.$store.dispatch('userProfile/updateUserProfile', this.userProfileProp)
                    this.$emit("avatar-changed", {})

                } else {
                    this.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                }

            } )
            .catch( (err) => {

            if(err.response) {

                if (err.response.status == 401) {
                
                    this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                    this.$router.replace("/auth/login")

                } else if(err.response.status == 404) {
                    this.$toasted.show("Oops!! Something Went Wrong.", {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})
                }

            }

            } )

        },
        upload_it() {

            this.options = {
                url:`${ApiUrl.url}avatars`,
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                },
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                // resizeWidth: 150,
                // resizeHeight: 150,
                params: {
                    user_id: parseInt(Auth.isAuthenticatedUser().sub)
                },
                paramName: function(n) {
                    return `avatar[]`;
                },
                uploadMultiple: false,
                //   acceptedFiles:['image/jpeg','image/png'],
                maxFilesize: 1,
                addRemoveLinks: true,
                dictDefaultMessage:`<i class='icon-cloud-up'></i><h6>Drop Profile Image here or click to upload.</h6>`
            }

            this.upload = !this.upload

        },
        upload_update() {

            this.options = {
                url:`${ApiUrl.url}avatars/${this.avatar.id}`,
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                },
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                method: "PUT",
                paramName: function(n) {
                    return `avatar[]`;
                },
                uploadMultiple: false,
                //   acceptedFiles:['image/jpeg','image/png'],
                maxFilesize: 1,
                addRemoveLinks: true,
                dictDefaultMessage:`<i class='icon-cloud-up'></i><h6>Drop Profile Image here or click to upload.</h6>`
            }

            this.upload = !this.upload

        },
        handleSuccess(file, response) {

            this.upload = false
            this.avatar_exists = true
            this.userProfileProp.avatar = response.data
            
            if(Object.keys(response.data.avatar).length > 0) {
                this.avatar_url = `${ApiUrl.url}uploads/user/avatars/${response.data.avatar.file_name}`
            } else {
                 this.avatar_url = ""
            }

            this.$store.dispatch('userProfile/updateUserProfile', this.userProfileProp)
            this.$emit("avatar-changed", response.data)
            

        },
        handleUploadError: function(file, message, xhr) {

            console.log(xhr)

            if(xhr.status == 422) {

                for (const key of Object.keys(JSON.parse(xhr.response).errors)) {

                    if(key == "user_id") {
                        this.$toasted.show(`${JSON.parse(xhr.response).errors.user_id[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
                    } else if(key == "avatar") {
                        this.$toasted.show(`${JSON.parse(xhr.response).errors.avatar[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 3000})
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

    .edit-image:hover {
        cursor: pointer;
    }
    
</style>