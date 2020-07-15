
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