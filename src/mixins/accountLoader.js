
import axios from "axios"
import { ApiUrl } from "../api/apiurl"
import Auth from "../auth/js/spider_auth"

import { mapState } from "vuex";

export default {
    data() {
        return {
            user_profile: {},
            businessLoadSuccess: false,
            userLoadSuccess: false
        }
    },
    computed: {
        ...mapState({
            userProfile: state => state.userProfile.userProfile,
            businessData: state => state.businessData.businessData
        })
    },
    mounted() {

        let self = this

        setTimeout(function() {
            self.checkEntryType()
        }, 3000)

    },
    watch: {
        userProfile: function(current, innitial) {
            if(!Object.keys(innitial).length && Object.keys(current).length) {
              this.loadBusinessData()
            }
        },
        businessData: function() {
            if(Object.keys(this.businessData).length && Object.keys(this.userProfile).length) {
                this.businessLoadSuccess = true,
                this.userLoadSuccess = true
            }
        }
    },
    methods: {
        checkEntryType() {

            if(Object.keys(this.userProfile).length && Object.keys(this.businessData).length) {

                this.$store.dispatch("menu/processMenuFor", this.businessData.sub_category)
                this.businessLoadSuccess = true,
                this.userLoadSuccess = true
    
            } else if(Object.keys(this.userProfile).length && Object.keys(this.businessData).length <= 0) {
        
                if(this.userProfile.role == "spider-member" || this.userProfile.role == "spider-client") {
    
                this.$router.push({path: "/account-pending"})
    
                }

            } else {
    
                this.confirmAuth()
    
            }

        },
        confirmAuth() {
      
            if(Auth.isAuthenticatedUser().bool)  {
      
              if(Object.keys(this.userProfile).length && Object.keys(this.businessData).length) return
      
              this.loadUserProfile()
      
            } else {
      
              this.userLoadSuccess = false
              this.businessLoadSuccess = false
      
              this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
              this.$router.replace("/auth/login")
      
            }
      
        },
        loadUserProfile: function() {
            
            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
        
            axios.get(`${ApiUrl.url}users/${Auth.isAuthenticatedUser().sub}`, headers)
            .then( (resp) => {
        
                this.user_profile = resp.data.data
                this.$store.dispatch('userProfile/updateUserProfile', this.user_profile)
                
            } )
            .catch( (err) => {
        
                if(err.response) {
        
                if (err.response.status == 401) {
                    
                    this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                    this.$router.replace("/auth/login")
        
                }
        
                }
        
            } )
    
        },
        loadBusinessData() {
            
            let headers = {
                headers: {
                    Authorization: `Bearer ${Auth.isAuthenticatedUser().token}`
                }
            }
        
            axios.get(`${ApiUrl.url}businesses/user/${Auth.isAuthenticatedUser().sub}`, headers)
            .then( (resp) => {
    
                if(resp.data.data.length <= 0) {
        
                    this.businessLoadSuccess = false
        
                    if(this.userProfile.role == "spider-member" || this.userProfile.role == "spider-client") {
        
                    this.$router.push({path: "/account-pending"})
        
                    }
        
                } else {
        
                    
                    this.business = resp.data.data[0]
                    this.$store.dispatch("menu/processMenuFor", this.business.sub_category)
                    this.$store.dispatch('businessData/updateBusinessData', this.business) 
                    this.$router.push({path: "/dashboard"})
                    
                } 
    
    
            } )
            .catch((err) => {
    
                if(err.response) {
        
                    if (err.response.status == 401) {
                    
                    this.$toasted.show(`Authentication Required. Please Login.`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
                    this.$router.replace("/auth/login")
        
                    }
        
                }
    
            })
    
        }
    }
}