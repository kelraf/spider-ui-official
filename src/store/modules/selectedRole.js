
const state = {
    role: ""
}

// getters
const getters = {
   
}

// mutations
const mutations = {

    setRole: (state, role) => {

      state.role = role;

    }
   
};

// actions
const actions = {

  setRole: (context, role) => {
    context.commit('setRole', role)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}