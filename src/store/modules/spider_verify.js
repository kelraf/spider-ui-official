const state = {
	phone_number : '071766188334'
}

// getters
const getters = {
	phone_number: state => {

		return state.phone_number

	}
}

const actions = {
	// "UPDATE_STATE": "UPDATE_STATE"
}

// mutations
const mutations = {
	change(state, phone_number) {
		state.phone_number = phone_number
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}