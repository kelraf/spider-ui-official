
const state = {
    locationData: {}
}

// getters
const getters = {
   getLocationData: function(state) {
    return state.locationData
   }
}

// mutations
const mutations = {

    updateLocationData: (state, location_data) => {

      state.locationData = location_data;

    }
   
};

// actions
const actions = {

  updateLocationData: (context, location_data) => {
    context.commit('updateLocationData', location_data)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}