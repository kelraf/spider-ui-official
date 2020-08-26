<template>
  
    <div>

        <Slaughter
            v-if="current_processing_stage.stage_name == 'slaughter'"
            :currentProcessingStage="current_processing_stage"
            class="animated fadeIn"
            @current-order="currentOrder"
            @livestock-order-slaughter-order-created-success="livestockOrderSlaughterOrderCreatedSuccess"
            @processing-stage-created-successfully="processingStageCreatedSuccessfully"
        />

        <ValueAddition
            @current-value-addition-order="currentValueAdditionOrder"
            class="animated fadeIn"
            v-if="current_processing_stage.stage_name == 'value_addition'"
            :currentProcessingStage="current_processing_stage"
        />

        <BrandingAndPackaging
            class="animated fadeIn"
            v-if="current_processing_stage.stage_name == 'branding_and_packaging'"
            :currentProcessingStage="current_processing_stage"
        />

    </div>

</template>

<script>

import Slaughter from "./slaughter/slaughter"
import ValueAddition from "./value_addition/value_addition"
import BrandingAndPackaging from "./branding_and_packaging/branding_and_packaging"

export default {
    data() {
        return {
            current_processing_stage: {}
        }
    },
    components: {
        Slaughter,
        ValueAddition,
        BrandingAndPackaging
    },
    mounted() {

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

                    this.$emit("switch-it", this.current_processing_stage.stage_name)

                }
            },
            deep: true
        }
    },
    methods: {
        currentOrder(data) {
            this.$emit("current-order", data)
        },
        currentValueAdditionOrder(data) {
            this.$emit("current-value-addition-order", data)
        },
        livestockOrderSlaughterOrderCreatedSuccess(data) {
            this.$emit("livestock-order-slaughter-order-created-success", data)
        },
        processingStageCreatedSuccessfully(data) {

            this.$emit("processing-stage-created-successfully", data)

        }
        
    }
}
</script>

<style>

</style>