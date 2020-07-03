import products from '../../data/products'

let cartItems = JSON.parse(localStorage.getItem("cartItem")) || {};

// cartItems = {
// 	livestock_container: {
// 		user_id: null,
// 		business_id: null,
// 		livestock_orders: [
// 			{
// 				livestock_order_container_id: null,
// 				price: null,
// 				quantity: null,
// 				d_livestock_id: null
// 			},
// 			{
// 				livestock_order_container_id: null,
// 				price: null,
// 				quantity: null,
// 				d_livestock_id: null
// 			}
// 		]
// 	}
// }

// {
//     "livestock_order_container": {
//         "channel": "channel",
//         "status": 1,
//         "business_from_id": 2,
//         "user_id": 1,
//         "business_id": 2,
//         "livestock_orders": [
//             {
//                 "price": 5684,
//                 "quantity": 456,
//                 "d_livestock_id": 1,
//                 "livestock_order_stages": [
//                     {
//                         "stage_name": "collection",
//                         "status": 1
//                     },
//                     {
//                         "stage_name": "ccp",
//                         "status": 1
//                     }
//                 ]
//             },
//             {
//                 "price": 5684,
//                 "quantity": 456,
//                 "d_livestock_id": 2,
//                 "livestock_order_stages": [
//                     {
//                         "stage_name": "collection",
//                         "status": 1
//                     },
//                     {
//                         "stage_name": "ccp",
//                         "status": 1
//                     }
//                 ]
//             }
//         ]
//     } 
// }


const state = {
	d_livestocks: products.data,
	products: products.data,
	productslist: products.data,
	cart: cartItems,
	order: [],
	tagItems: [],
	filteredProduct: [],
	searchTerm: ''
}

console.log("Cart Item", cartItems)

// getters
const getters = {
	getDLivestocks: (state) => {
		return state.d_livestocks
	},
	getCategories: (state) => {

		let categories = []

		state.d_livestocks.map(function(currentLivestockObject) {

			if (!categories.includes(currentLivestockObject.category)) categories.push(currentLivestockObject.category)

		})

		return categories
		

	},
	getOrder: (state) => {
		return state.order
	},
	getCartData: (state) => {
		return state.cart
	},
	getAllCartData: function(state) {

		let cart = {}

		if("livestock_container" in state.cart){
			cart.livestock_container = state.cart.livestock_container
		} else {
			cart.livestock_container = {}
		}

		if("produce_container" in state.cart) {
			cart.produce_container = state.cart.produce_container
		} else {
			cart.produce_container = {}
		}

		if("products_container" in state.cart) {
			cart.products_container = state.cart.products_container
		} else {
			cart.products_container = {}
		}

		return cart

	}
}

// mutations
const mutations = {

	addToCart: (state, payload) => {

		if("livestock_container" in state.cart) {

			let hasItems = state.cart.livestock_container.livestock_orders.find( item => {

				if (item.d_livestock_id === payload.d_livestock_id) {

					item.quantity = item.quantity ? item.quantity : 1
					return true

				}

				return false

			})

			if (!hasItems) {

				state.cart.livestock_container.livestock_orders.push(payload)

			}

			localStorage.setItem("cartItem", JSON.stringify(state.cart));

		} else {

			let livestock_orders = []

			livestock_orders.push(payload)

			state.cart.livestock_container = {
				livestock_orders,
				user_id: null,
				business_id: null,
				business_from_id: null,
				id: null
			}

			localStorage.setItem("cartItem", JSON.stringify(state.cart));

		}
		
	},

	updateLivestockOrderQuantity: (state, payload) => {

		// state.cart.livestock_container.livestock_orders = state.cart.livestock_container.livestock_orders.filter((livestock_order) => {

		// 	if (livestock_order.d_livestock_id !== payload.d_livestock_id) {
		// 		return livestock_order
		// 	}

		// });

		let currentObjectPosition = state.cart.livestock_container.livestock_orders.findIndex(object => object.d_livestock_id == payload.livestock_order.d_livestock_id)

		state.cart.livestock_container.livestock_orders[currentObjectPosition].quantity = payload.quantity
		state.cart.livestock_container.livestock_orders[currentObjectPosition].total_price = payload.quantity * payload.livestock_order.price_per_animal

		localStorage.setItem("cartItem", JSON.stringify(state.cart));

	},

	removeLivestockOrderQuantity: (state, payload) => {

		state.cart.livestock_container.livestock_orders = state.cart.livestock_container.livestock_orders.filter((livestock_order) => {

			if (livestock_order.d_livestock_id !== payload.d_livestock_id) {
				return livestock_order
			}

		});

		localStorage.setItem("cartItem", JSON.stringify(state.cart));

	},
	sortProducts: (state, payload) => {
		if (payload === 'a-z') {
			state.filteredProduct.sort(function (a, b) {
				if (a.type < b.type) {
					return -1
				} else if (a.type > b.type) {
					return 1
				}
				return 0
			})
		} else if (payload === 'z-a') {
			state.filteredProduct.sort(function (a, b) {
				if (a.type > b.type) {
					return -1
				} else if (a.type < b.type) {
					return 1
				}
				return 0
			})
		} else if (payload === 'low') {
			state.filteredProduct.sort(function (a, b) {
				if (a.price < b.price) {
					return -1
				} else if (a.price > b.price) {
					return 1
				}
				return 0
			})
		} else if (payload === 'high') {
			state.filteredProduct.sort(function (a, b) {
				if (a.price > b.price) {
					return -1
				} else if (a.price < b.price) {
					return 1
				}
				return 0
			})
		}
	},

	createOrder: (state, payload) => {
		state.order = payload
	}
}

// actions
const actions = {
	addToCart: (context, payload) => {
		context.commit('addToCart', payload)
	},
	updateLivestockOrderQuantity: (context, payload) => {
		context.commit('updateLivestockOrderQuantity', payload)
	},
	removeLivestockOrderQuantity: (context, payload) => {
		context.commit('removeLivestockOrderQuantity', payload)
	},
	sortProducts: (context, payload) => {
		context.commit('sortProducts', payload)
	},
	createOrder: (context, payload) => {
		context.commit('createOrder', payload)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}