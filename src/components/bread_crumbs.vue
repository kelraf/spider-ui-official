<template>
  <div class="container-fluid">
    <div class="page-header">
      <div class="row">
        <div class="col-9">
          <!-- <div class="back-button"> -->
            <a href="javascript:void(0);" @click="goBack" id="default-outline-success" type="button" class="back-button">
                <i class="icofont icofont-arrow-left"></i>
            </a>
          <!-- </div> -->
          <div class="page-header-left ml-5">
            <h3>{{title}}</h3>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link :to="{ path: '/dashboard' }"><feather type="home"></feather></router-link></li>
              <li class="breadcrumb-item" v-if="main">{{ main }}</li>
              <li class="breadcrumb-item active" v-if="title">{{ title }}</li>
            </ol>
          </div>
        </div>
        <div class="col-3">
          <Bookmark />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bookmark from  './bookmark'
export default {
  props: {
    title: {
      default: 'home'
    },
    main: {
      default: ''
    }
  },
  components:{
    Bookmark
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

  .back-button {
    background: transparent;
    width: 35px !important;
    height: 35px !important;
    border-radius: 50%;
    text-align: center;
    position: fixed;
    z-index: 5;
    padding-top: 6px;
    font-size: 15px !important;
    top: 110px !important;
    border: 1px solid green;
    color: green;
    transition-duration: .5s;
  }

  .back-button:hover {
    background: green;
    color: white;
  }

</style>
