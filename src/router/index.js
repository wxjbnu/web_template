import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'


import Main from '@/views/main'
import Login from '@/views/login'
import Goods from '@/views/goods'
import GoodsDetail from '@/views/goodsDetail'
import ShopCart from '@/views/shopCart'
import Order from '@/views/order'

import Pay from '@/views/pay'
import PayCallback from '@/views/pay_callback'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },{ // Main
      path:   '/',
      name:   'main',
      component:  Main,
      children: [
        { // 商品列表
          path:   '/goods',
          name:   'goods',
          component:  Goods
        },{ // 商品详情
          path:   '/goodsDetail',
          name:   'goodsDetail',
          component:  GoodsDetail
        },{ // 购物车
          path:   '/shopCart',
          name:   'shopCart',
          component:  ShopCart
        },{ // 下单
          path:   '/order',
          name:   'order',
          component:  Order
        },{ // 支付
          path:   '/pay',
          name:   'pay',
          component:  Pay
        },{ // 支付回调
          path:   '/pay_callback',
          name:   'pay_callback',
          component:  PayCallback
        }
        
      ]
    }
  ]
})
