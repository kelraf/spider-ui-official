<template>
  <div>
      <p v-if="product.description !== ''"> {{ product.description }} </p>

      <div v-if="product.description == ''" class="row">
        <div class="col-md-6 text-center offset-md-3 pt-5">

            <h4> No Description For The Product </h4>

            <div class="container">
                <div class="row">
                    <div class="col-6 offset-3">
                        <button id="default-outline-primary" type="button" class="btn mb-5 btn-pill btn-outline-primary btn-block">
                            <i class="icon-plus"></i>
                        </button>
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
            product: {}
        }
    },
    props: {
        productData: Object
    }, 
    watch: {
        productData: {
            immediate: true,
            handler() {
                this.product = this.productData
            }
        }
    }
}
</script>

<style>

</style>