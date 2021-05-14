<template>
  
    <div class="col-12 p-0 xl-100">

        <div v-if="livestock_order_processing_stages.length > 0" class="card">
            <div class="default-according style-1 bitcoin-accordion" id="accordionoc">
            
                <Activity 
                    v-on:current-processing-stage="currentProcessingStage" 
                    :openMakeSlaughterOrderModalFromSlaughterView="open_make_slaughter_order_modal_from_slaughter_view"
                    v-for="(livestock_order_processing_stage, index) in livestock_order_processing_stages" 
                    :key="index+=1" 
                    :index="index" 
                    :livestockOrderProcessingStage="livestock_order_processing_stage" 
                />

            </div>
        </div>

        <div v-if="livestock_order_processing_stages.length == 0" class="row pb-5 pt-5">
            <div class="col-md-12 text-center pb-5 pt-5">
                <h2> No Activity Available </h2>

                <!-- <div class="container pt-5">
                    <div class="row">
                        <div class="col-6 offset-3">
                            <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                                Create
                            </button>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

    </div>

</template>

<script>

import Activity from "./activity"

export default {
    data() {
        return {
            livestock_order_processing_stages: [],
            open_make_slaughter_order_modal_from_slaughter_view: false
        }
    },
   components: {
       Activity
   },
   props: {
       livestockOrderProcessingStages: Array,
       openMakeSlaughterOrderModalFromSlaughterView: Boolean
   },
   watch: {
       livestockOrderProcessingStages: {
           immediate: true,
           handler() {
               if(this.livestockOrderProcessingStages.length > 0) this.livestock_order_processing_stages = this.livestockOrderProcessingStages
           }
       },
       openMakeSlaughterOrderModalFromSlaughterView: {
           immediate: true,
           handler() {
               this.open_make_slaughter_order_modal_from_slaughter_view = this.openMakeSlaughterOrderModalFromSlaughterView
               setTimeout(() => {
                   this.open_make_slaughter_order_modal_from_slaughter_view = false
               }, 200)
           }
       }
   },
   methods: {
       currentProcessingStage(data) {
           this.$emit("current-processing-stage", data)
       }
   }
}
</script>

<style>

</style>