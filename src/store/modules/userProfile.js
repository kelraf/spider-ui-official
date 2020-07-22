
const state = {
    userProfile: {}
}

// getters
const getters = {
   
}

// mutations
const mutations = {

    updateUserProfile: (state, user_profile) => {

      state.userProfile = user_profile;
      console.log("state.userProfile", state.userProfile)

    }
   
};

// actions
const actions = {

  updateUserProfile: (context, user_profile) => {
    context.commit('updateUserProfile', user_profile)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}