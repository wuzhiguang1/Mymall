import {
  ADD_COUNTER,
  ADD_TO_CART
}
from './mutation-types.js'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}