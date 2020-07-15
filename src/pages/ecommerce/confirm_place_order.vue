<template>
  
    <div @click.self="close" class="container-fluid">

        <div @click.self="close" class="row p-3 pt-5">
            <div style="height: 50vh;" class="col-md-4 col-xl-4 bg-white offset-md-4 offset-xl-4 pt-5 modal-col">

                <div class="container">

                    <div class="row">
                        <div class="col-12 font-success text-center pt-3">
                            <i class="fa fa-question-circle fa-4x"></i>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 text-center font-success pt-4">
                            <h5>
                                <b class="font-success"> Place Order ? </b>
                            </h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-8 offset-md-2 mt-4">
                            <b-button-group style="width: 100%;" class="btn-group-pill">
                                <b-button @click="close" variant="outline-primary">No</b-button>
                                <b-button :class=" loading ? 'loading' : '' " @click="go" variant="outline-primary">
                                    <span v-if="!loading">Yes</span>
                                </b-button>
                            </b-button-group>
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
            loading: false,
        }
    },
    methods: {
        close() {

            Custombox.modal.close()

        },
        go() {

            this.$emit("place-it")

            this.close()

        }
    }
}
</script>

<style>

    .modal-col {
        border-radius: 10px;
    }

</style>