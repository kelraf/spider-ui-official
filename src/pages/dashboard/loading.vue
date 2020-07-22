<template>

    <!-- Evaluating -->

    <div v-if="evaluating" class="container-fluid mt-5 pt-5">
        <div class="row">
            <div class="col-12 text-center">

            <div class="loader">
                <div class="line bg-warning"></div>
                <div class="line bg-warning"></div>
                <div class="line bg-warning"></div>
                <div class="line bg-warning"></div>
            </div>

            </div>
        </div>

        <div class="row">
            <div class="col-12 text-center mt-4">
                <p>
                    <b class="font-success"> Loading Your Account Data... </b>
                </p>
            </div>
        </div>

    </div>

    <!-- Evaluating Ends -->
  
</template>

<script>

import accountLoader from "../../mixins/accountLoader"

export default {
    mixins: [accountLoader]
}
</script>

<style>

</style>