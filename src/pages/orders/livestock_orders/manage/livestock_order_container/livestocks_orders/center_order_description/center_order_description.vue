<template>
  <div class="container-fluid">

    <div v-if="!description" class="row pt-5">
        <div class="col-md-12 text-center pt-5">
            <h2> No Description Available </h2>

            <div class="container pt-5">
                <div class="row">
                    <div class="col-12">
                        <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block">
                            <i class="icon-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="row">
        <div class="col-12 text-left pt-3">
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Quia fuga perferendis, sed quaerat consectetur numquam exercitationem voluptatum, 
            temporibus ratione iusto aspernatur debitis autem minima! 
            Similique asperiores odit veniam fugit labore.
        </p>
        
        <button id="default-outline-primary" type="button" class="btn btn-pill btn-outline-primary btn-block mt-4">
            <i class="icon-pencil-alt"></i>
        </button>

        </div>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            description: false,
            center_order: {

            }
        }
    }

}
</script>

<style>

</style>