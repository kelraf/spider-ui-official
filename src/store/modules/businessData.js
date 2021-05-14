
const state = {
    businessData: {}
}

// getters
const getters = {
   getBusinessData: function(state) {
    return state.businessData
   }
}

// mutations
const mutations = {

    updateBusinessData: (state, business_data) => {

      state.businessData = business_data;
      console.log("state.businessData", state.businessData)

    }
   
};

// actions
const actions = {

  updateBusinessData: (context, business_data) => {
    context.commit('updateBusinessData', business_data)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}