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

    </div>

</template>

<script>

export default {
    data() {
        return {
            current_processing_stage: {}
        }
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
            this.$emit("make-order")
        },
        livestockOrderSlaughterOrderCreatedSuccess(data) {
            
            this.$emit("livestock-order-slaughter-order-created-success", data)
            
        }
    }
}
</script>

<style>

</style>