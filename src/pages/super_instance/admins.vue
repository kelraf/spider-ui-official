<template>
  
  <div style="overflow-y: scroll; max-height: 100vh;" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

        <Admin v-for="(admin, index) in admins" :admin_="admin" :key="index+=1" :index="index+=1" />

    </div>
  </div>

</template>

<script>

import Admin from "./admin"

export default {
    data() {
        return {
            admins: []
        }
    },
    components: {
        Admin
    },
    props: {
        admin: Array
    },
    watch: {
        Admins: {
            immediate: true,
            handler() {
                if(this.admin !== undefined && this.admin.length) this.admins = this.admin
            }
        }
    }
}
</script>

<style>

</style>