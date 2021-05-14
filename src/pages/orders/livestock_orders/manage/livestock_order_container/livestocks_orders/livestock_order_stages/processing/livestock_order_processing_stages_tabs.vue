<template>
  
    <div class="container-fluid">
        <div class="row">

            <div class="col-12 p-0">
                <div class="card">
                    <div class="card-body p-0">
                        <div class="u-steps row">
                            <div 
                                @click="currentProcessingStage('slaughter')" 
                                class="u-step col-4 bg-secondary"
                                :class="Object.keys(current_processing_stage).length && current_processing_stage.stage_name == 'slaughter' ? 'u-step-current' : ''"
                                >
                            <span class="u-step-icon text-white icon-shopping-cart-full font-10" aria-hidden="true"></span>
                                <div class="u-step-desc"><span class="u-step-title text-white font-10">S </span></div>
                            </div>
                            <div 
                                @click="currentProcessingStage('value_addition')" 
                                class="u-step col-4 bg-dark"
                                :class="Object.keys(current_processing_stage).length && current_processing_stage.stage_name == 'value_addition' ? 'u-step-current' : ''"
                                >
                            <span class="u-step-icon icon-notepad font-10" aria-hidden="true"></span>
                                <div class="u-step-desc"><span class="u-step-title text-white font-10">V / A</span></div>
                            </div>
                            <div 
                                @click="currentProcessingStage('branding_and_packaging')" 
                                class="u-step col-4 bg-secondary"
                                :class="Object.keys(current_processing_stage).length && current_processing_stage.stage_name == 'branding_and_packaging' ? 'u-step-current' : ''"
                                >
                                <span class="u-step-icon icon-time text-white font-10" aria-hidden="true"></span>
                                <div class="u-step-desc"><span class="u-step-title text-white font-10"> B / P</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            stage_data: {},
            processing_stages: [],
            current_processing_stage: {},
            stage_names: null
        }
    },
    mounted() {

    },
    computed: {
        
    },
    props: {
        stage: Object
    },
    watch: {
        stage: {
            immediate: true,
            handler() {
                if(Object.keys(this.stage).length && this.stage !== undefined) {

                    this.stage_data = this.stage

                    if(this.stage.livestock_order_processing_stages.length) {
                        this.processing_stages = this.stage.livestock_order_processing_stages
                    }

                    let self = this

                    this.stage_names = (() => {

                        if(self.processing_stages.length) {

                            let list = self.processing_stages.map(processing_stage => {
                                return processing_stage.stage_name
                            })

                            return list

                        } else {
                            return []
                        }
                        
                    })()

                }
            },
            deep: true
        },
        stage_names: function() {

            if(this.stage_names.length) this.currentProcessingStage(this.stage_names[0])

            else this.currentProcessingStage("slaughter")

        }
    },
    methods: {
        currentProcessingStage: function(processing_stage_name) {

            let self = this

            if(this.stage_names.includes(processing_stage_name)) {

                let stage_list_index = this.processing_stages.findIndex(processing_stage => processing_stage.stage_name == processing_stage_name)

                this.current_processing_stage = {
                    exists: true,
                    ...this.processing_stages[stage_list_index],
                    stages_available: this.stage_names,
                    livestock_order_stage: (function() {

                        const {id, stage_name, livestock_order_id, status} = self.stage
                        return {id, stage_name, livestock_order_id, status}

                    })()
                }

                this.$emit("current-processing-stage", this.current_processing_stage)

            } else {

                this.current_processing_stage = {
                    exists: false,
                    stage_name: processing_stage_name,
                    stages_available: this.stage_names,
                    livestock_order_stage: (function() {

                        const {id, stage_name, livestock_order_id, status} = self.stage
                        return {id, stage_name, livestock_order_id, status}

                    })()
                }

                this.$emit("current-processing-stage", this.current_processing_stage)

            }

        }
    }
}
</script>

<style>
    .font-10 {
        font-size: 15px;
    }
    .u-step {
        transition: .5s;
    }
    .u-step:hover {
        cursor: pointer;
    }

    .u-step-current {
        transform: scale(1.1);
        z-index: 1;
        position: relative;
        top: 10px;
    }
</style>