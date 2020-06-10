<template>
  <div class="logout-container">
    <div class="icon-box">
      <i class="icon-power-off icon-l"></i>
    </div>

    <div class="text-box">
      <h3 class="text-center pt-5">Are You Sure To Logout ?</h3>
    </div>

    <div class="btn-box">

      <div class="btn-container mt-5">
          <b-button-group class="btn-group-pill">
              <b-button @click="close" variant="outline-primary">Forget</b-button>
              <b-button :class=" loading ? 'loading' : '' " @click="logout" variant="outline-primary">
                  <span v-if="!loading">Continue</span>

                  <img style="width: 20px;" v-if="loading" src="../../../../../../assets/images/loader.gif" alt="">
              </b-button>
          </b-button-group>
      </div>

    </div>

  </div>
</template>

<script>
import Auth from "../../../../../../auth/js/spider_auth"
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    close: function() {
      Custombox.modal.close()
    },
    logout: function() {

      this.loading = true

      let self = this

      setTimeout(function() {

        if(Auth.logOut()) {

          self.loading = false
          self.$toasted.show(`Successfully Logged Out`, {theme: 'outline',position: "top-right", icon : 'info', type: 'info', duration: 4000})
          Custombox.modal.close()
          self.$router.replace("/auth/login")

        } else {

          self.loading = false
          self.$toasted.show(`Oops!! Something Went Wrong.`, {theme: 'outline',position: "top-right", icon : 'times', type: 'error', duration: 4000})

        }

      }, 2000)

    }
  }

}
</script>

<style>

    .logout-container {
        background: white;
        height: 430px;
        width: 430px;
        border-radius: 10px;
    }

    .text-box h3 {
      font-weight: 600;
    }

    .icon-box {
      /* background: gray; */
      width: 100px;
      margin: auto;
      padding-top: 100px;
    }

    .icon-l {
      font-size: 100px;
      margin: auto;
      color: red;
    }

    .btn-container {
        margin: auto;
        width: 50%;
    }

</style>