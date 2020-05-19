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
// 				dlivestock_id: null
// 			},
// 			{
// 				livestock_order_container_id: null,
// 				price: null,
// 				quantity: null,
// 				dlivestock_id: null
// 			}
// 		]
// 	}
// }

console.log("TTTTTT______>>>>>>>>", cartItems)

const state = {
	livestocks: products.data,
	products: products.data,
	productslist: products.data,
	cart: cartItems,
	order: [],
	tagItems: [],
	filteredProduct: [],
	searchTerm: ''
}

// getters
const getters = {
	getLivestocks: (state) => {
		return state.livestocks
	},
	getCategories: (state) => {

		let categories = []

		state.livestocks.map(function(currentLivestockObject) {

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

				if (item.dlivestock_id === payload.dlivestock_id) {

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
				id: null
			}

			localStorage.setItem("cartItem", JSON.stringify(state.cart));

		}
		
	},

	updateCartQuantity: (state, payload) => {
		// Calculate Product stock Counts
		function calculateStockCounts(product, quantity) {
			let qty = product.quantity + quantity;
			let stock = product.stock;
			if (stock < qty) {
				//   this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
				return false
			}
			return true
		}
		state.cart.find((items, index) => {
			if (items.id === payload.product.id) {

				let qty = state.cart[index].quantity + payload.qty;
				console.log("Match", items.id, qty);
				let stock = calculateStockCounts(state.cart[index], payload.qty);
				if (qty != 0 && stock)
					state.cart[index]['quantity'] = qty;
				else
					localStorage.setItem("cartItem", JSON.stringify(state.cart));
				return true;
			}
		});
	},

	removeProduct: (state, payload) => {
		const index = state.cart.indexOf(payload);
		state.cart.splice(index, 1);
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
	updateCartQuantity: (context, payload) => {
		context.commit('updateCartQuantity', payload)
	},
	removeProduct: (context, payload) => {
		context.commit('removeProduct', payload)
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