<template>
  
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0">
                    <div class="auth-innerright">
                        <div class="authentication-box">
                            <div class="card to-shake mt-4 p-4">
                                <form class="theme-form">
                                    <h5 class="f-16 mb-3 f-w-600"> Add DLivestock </h5>

                                    <div class="form-group">
                                        <label class="col-form-label">Category</label>
                                        <input v-model="form.category.value" :class="form.category.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Livestock Category">
                                    </div>

                                    <div class="form-group">
                                        <label class="col-form-label">Type</label>
                                        <input v-model="form.type.value" :class="form.type.error ? 'form-error' : ''" class="form-control" type="text" placeholder="Livestock Type">
                                    </div>
                                    
                                    <div class="form-group form-row mb-0">
                                        <div class="col-md-12 btn-c">
                                            <div class="btn-container">
                                                <b-button-group class="btn-group-pill">
                                                    <b-button @click="close" variant="outline-primary">Cancel</b-button>
                                                    <b-button :class=" loading ? 'loading' : '' " @click="create" variant="outline-primary">
                                                        <span v-if="!loading">Create</span>

                                                        <Loader v-if="loading" />
                                                    </b-button>
                                                </b-button-group>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>

</template>

<script>

import $ from "jquery"
import Loader from "../../../components/loader"
import axios from "axios"
import { ApiUrl } from "../../../api/apiurl"
import Auth from "../../../auth/js/spider_auth"

import Multiselect from 'vue-multiselect'
export default {
    data() {
        return {
            loading: false,
            form: {
                category: {
                    error: '',
                    value: ''
                },
                type: {
                    error: "",
                    value: ""
                }
            }
        }
    },
    components: {
        Loader,
        Multiselect
    },
    methods: {
        getImgUrl(path) {
            return require("../../../assets/images/" + path);
        },
        close: function() {
            Custombox.modal.close()
        },
        isAlphanumeric(value) {

            return /^[0-9a-zA-Z]+$/.test(value)

        },
        isNumeric(value) {

            return /^[0-9]+$/.test(value)

        },
        create: function() {

            if(this.form.category.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.category.error = 'field can\'t be empty'
                this.form.type.error = ''

                this.$toasted.show(`Category : ${this.form.category.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else if(this.form.type.value == '') {

                $(".to-shake").addClass("animated").addClass("shake");

                this.form.category.error = ''
                this.form.type.error = 'field can\'t be empty'

                this.$toasted.show(`Type : ${this.form.type.error}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

                setTimeout(function() {
                    $(".to-shake").removeClass("animated").removeClass("shake");
                }, 500)

            } else {

                    this.form.category.error = ''
                    this.form.type.error = ''
    
                    this.loading = true
    
                    let data = {
                        d_livestock : {
                            category : this.form.category.value,
                            type : this.form.type.value,
                        }
                    }                
    
                    let self = this
                        
                    let headers = {
                        headers: {
                            Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                        }
                    }
    
                    axios.post(`${ApiUrl.url}d-livestock`, data, headers) 
                    .then( (resp) => {
                        setTimeout(function() {
    
                            self.loading = false
                            self.$emit("dlivestock-create-success", resp.data.data)
                            self.$toasted.show(`DLivestock Created Successfully`, {theme: 'outline',position: "top-right", icon : 'check', type: 'success', duration: 8000})
                            Custombox.modal.close()
    
                        }, 2000)
                    } )
    
                    .catch( (err) => {
    
                        if(err.response) {
    
                            setTimeout(function() {
    
                                self.loading = false
    
                                if(err.response.status == 422) {
    
                                    for (const key of Object.keys(err.response.data.errors)) {
    
                                        if(key == "category") {
                                            self.form.category.error = err.response.data.errors.category[0]
                                            self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.category[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                        } else if(key == "type") {
                                            self.form.type.error = err.response.data.errors.type[0]
                                            self.$toasted.show(`${key.split('_').join(' ')} : ${err.response.data.errors.type[0]}`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                        } else {
                                            console.log("Oops!! Error Occured")
                                        }
                                    }
    
                                } else if(err.response.status == 401) {
    
                                    Custombox.modal.close()
                                    self.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                                    self.$router.replace("/auth/login")
    
                                } else if(err.response.status == 400) {
    
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 400`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    Custombox.modal.close()
    
                                } else if(err.response.status == 500) {
    
                                    self.$toasted.show(`Oops!! An Error Occured. Please Try Again. : 500`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 8000})
                                    Custombox.modal.close()
    
                                }
    
                            }, 3000)
    
                        }
    
                    } )                

            }

        }
    }

}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">

    .btn-container {
        margin: auto;
        width: 50%;
    }

    .form-error {
        border: 1px solid red !important;
    }

    .fields {
        display: flex !important;
        flex-direction: row !important;
    }

    .fields span {
        flex: 1 !important;
    }

</style>