const state = {
    allow: false
}

// getters
const getters = {
   allow: function(state) {
       return state.allow
   }
}

// mutations
const mutations = {

    updateAllow: (state, payload) => {

      state.allow = payload;

    }
   
};

// actions
const actions = {

  updateAllow: (context, payload) => {
    context.commit('updateAllow', payload)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}