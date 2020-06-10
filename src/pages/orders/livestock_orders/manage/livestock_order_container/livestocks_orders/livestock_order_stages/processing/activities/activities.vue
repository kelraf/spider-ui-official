<template>
  
    <div class="col-12 p-0 xl-100">
        <div class="card">
            <div class="default-according style-1 bitcoin-accordion" id="accordionoc">
            
                <Activity v-for="(activity, index) in activities" :key="index+=1" :index="index" :activity="activity" />

            </div>
        </div>

    </div>

</template>

<script>

import Activity from "./activity"

export default {
    data() {
        return {
            activities: [1, 2, 3]
        }
    },
   components: {
       Activity
   },
   methods: {
       
   }
}
</script>

<style>

</style>