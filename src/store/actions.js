import {
  ADD_COUNTER,
  ADD_TO_CART
}
from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 为payload 添加新的商品
      // 1.查找之前数组是否有该商品
      const oldProdut = context.state.cartList.find(item => item.iid === payload.iid)
        // 2.判断oldProduct
      if (oldProdut) {
        context.commit(ADD_COUNTER, oldProdut)
        resolve("当前商品数量+1")
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve("添加商品成功！")
      }
    })
  }
}