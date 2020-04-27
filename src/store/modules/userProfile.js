
const state = {
    userProfile: {
      id: 454
    }
}

// getters
const getters = {
   
}

// mutations
const mutations = {

    updateUserProfile: (state, user_profile) => {

      state.userProfile = user_profile;

    }
   
};

// actions
const actions = {

  updateUserProfile: (context, user_profile) => {
    context.commit('updateUserProfile',user_profile)
  }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}