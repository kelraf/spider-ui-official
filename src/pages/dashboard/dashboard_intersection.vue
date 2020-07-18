<template>
  
</template>

<script>

import { mapState } from "vuex"

export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapState({
            business_data: state => state.businessData.businessData
        })
    },
    watch: {
        business_data: function() {
            this.goToDashboard()
        }
    },
    mounted() {
        console.log("In Mounted")
        this.goToDashboard()
    },
    methods: {
        goToDashboard() {

            console.log("Got Here 1")

            if(this.business_data) {

                console.log("Got Here 2")

                let home = [
                    "producer-chain-groups",
                    "processer-chain-groups",
                    "supply-chain-groups",
                    "storage-chain-groups",
                    "entity"
                ]

                let super_instance = [
                    "spider-super-instance"
                ]

                let client = [
                    "client"
                ]

                let server = [
                    "server"
                ]

                if(home.includes(this.business_data.category)) {
                    
                    this.$router.replace({path: `/dashboard/member`})

                } else if(super_instance.includes(this.business_data.category)) {

                    this.$router.replace({path: `/dashboard/super-instance`})

                } else if(client.includes(this.business_data.category)) {
                    
                    this.$router.replace({path: `/dashboard/clients`})

                } else if(server.includes(this.business_data.category)) {
                    
                    console.log("Got Here 3")
                    this.$router.replace({path: `/dashboard/server`})

                } else {

                    console.log("Going To NoWhere")

                }
            }
        }
    }
}
</script>

<style>

</style>