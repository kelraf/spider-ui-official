<template>

    <div class="container-fluid">

        <div class="row">
            <div class="col-12 text-center pt-4 font-secondary">
                <h4><b>GET STARTED</b></h4>
            </div>
        </div>

        <div class="row pt-5 pb-3 mt-3 mb-1">
            <div class="col-12 text-center text-danger">
                <i class="fa fa-cubes fa-4x"></i>
            </div>
        </div>

        <slot>
            <NoProcessingStage @processing-stage-created-successfully="processingStageCreatedSuccessfully" :currentProcessingStage="current_processing_stage" />
        </slot>

    </div>

</template>

<script>

import NoProcessingStage from "./no_processing_stage"

export default {
    data() {
        return {
            current_processing_stage: {}
        }
    },
    components: {
        NoProcessingStage
    },
    props: {
        currentProcessingStage: Object
    },
    watch: {
        currentProcessingStage: {
            immediate: true,
            handler() {
                if(this.currentProcessingStage !== undefined) {
                    this.current_processing_stage = this.currentProcessingStage
                }
            }
        }
    },
    methods: {
        processingStageCreatedSuccessfully(data) {

            this.$emit("processing-stage-created-successfully", data)

        }
    }
}
</script>

<style>

</style>