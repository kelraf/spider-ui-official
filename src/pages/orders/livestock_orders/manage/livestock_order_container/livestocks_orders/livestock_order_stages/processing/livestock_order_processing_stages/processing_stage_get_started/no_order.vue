<template>
  
    <div class="container-fluid">
        <div class="row pt-3 pb-3">
            <div class="col-12 text-center font-success">
                <b>MAKE ORDER TO CONTINUE</b>
            </div>
        </div>

        <div class="row">
            <div class="col-12 text-center pt-1 pb-5">
                <button @click="makeOrder" id="default-outline-secondary" type="button" class="btn btn-sm btn-pill btn-outline-secondary text-center">
                    <b>MAKE ORDER</b>
                </button>
            </div>
        </div>

        <LivestockOrderSlaughterOrderCreate 
            :livestockOrderProcessingStageData="current_processing_stage"
            @livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess"
            id="livestock-order-slaughter-order" 
            style="display: none;"
        />

    </div>

</template>

<script>

import LivestockOrderSlaughterOrderCreate from "../slaughter/create"

export default {
    data() {
        return {
            current_processing_stage: {}
        }
    },
    components: {
        LivestockOrderSlaughterOrderCreate
    },
    props: {
        currentProcessingStage: Object
    },
    watch: {
        currentProcessingStage: {
            immediate: true,
            handler() {
                if(this.currentProcessingStage == undefined || !Object.keys(this.currentProcessingStage).length) return
                this.current_processing_stage = this.currentProcessingStage
            },
            deep: true
        }
    },
    methods: {
        makeOrder() {
            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: '#livestock-order-slaughter-order'
                }
            })

            modal.open()
        },
        livestockOrderSlaughterOrderCreatedSuccess(data) {
            
            this.$emit("livestock-order-slaughter-order-created-success", data)
            
        }
    }
}
</script>

<style>

</style>