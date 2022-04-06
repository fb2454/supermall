import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
  // addCart({ state, commit }, payload) {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前数组中是否有该商品
      const Oldproduct = context.state.cartList.find((item) => item.iid === payload.iid)

      if (Oldproduct) {
        context.commit(ADD_COUNTER, Oldproduct)
        resolve('商品数量加1')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('加入购物车成功')
      }
    })
  }
}
