<template>
  <div class="order">

    <div style="font-size: 20px; color: #333;text-align: center;padding: 10px 0;">
      支付
    </div>

    <div>
      <div class="order-item">
        订单号:{{$store.state.order.tradeNo}}
      </div>
    </div>

    <!-- 商品信息 -->
    <!-- <div>
      <div class="order-item"
        v-for="(o, i) in [$store.state.order]"
        :key="i"
        v-show="o.checked && o.ownNum > 0">
        <div class="order-info">
          <img style="width: 30px; height: 30px;" :src="o.imgUrl" alt="">
          <span style="padding-left: 10px;">{{o.name}} × {{o.ownNum}}</span>
        </div>
        <div>
          单价:{{o.payPrice}}元
        </div>
      </div>
    </div> -->


    <!-- 当H5端需要选择支付方式时候 -->
    <div v-if="$store.state.userAgent === 'H5'">
      <div class="order-item" style="margin-top: 20px;border-top: 1px solid #eee;border-bottom: 0 none;">
        <div class="order-info">
          <span style="padding-left: 10px;">选择支付方式</span>
        </div>
      </div>
      <!-- {{$store.state.order}} -->
<!-- <span style="font-size: 12px; line-height: 12px;">{{$store.state.order}}</span> -->
      <div class="order-item"
        v-for="(o, i) in payList"
        :key="i"
         @click="selectPay(i)">
        <div class="order-info">
          <div class="order-select">
            <img class="" v-show="payType != i"
                :src="icon.disSelectPic" />
            <img class="" v-show="payType == i"
                :src="icon.selectPic" />
          </div>
          <span style="padding-left: 10px;">
            <img style="width: 30px; height:30px;" :src="o.icon" alt="" >
            <!-- <img style="width: 30px; height:30px;" :src="icon.alipay" alt="" > -->
          </span>
          <span style="padding-left: 10px;">{{o.name}}</span>
        </div>
      </div>

      <!-- <div class="order-item" style="">
        <div class="order-info">
          <span style="padding-left: 10px;">
            <img style="width: 30px; height:30px;" :src="icon.alipay" alt="" >
          </span>
          <span style="padding-left: 10px;">支付宝支付</span>
        </div>
      </div> -->
    </div>

    <div class="order-footer">
      <!-- <span style="">总价：999</span> -->
      <div class="order-footer-btn" style="background: red;"
        @click="confirmOrder">
        总价：￥{{totalFee}}<span style="padding-left: 10px;">去支付</span>
      </div>
    </div>
    
  </div>
</template>

<script>
import disSelectPic from "../assets/images/复选框-未选中.png"
import selectPic from "../assets/images/复选框-选中.png"
import wepay from './../assets/wx.jpg'
import alipay from './../assets/alipay.jpg'

export default {
  name: 'order',
  data () {
    return {
      icon: {
        disSelectPic,
        selectPic,
      },
      channel: 2 , // 1:微信公众号 2:微信支付 3:支付宝支付 4:扫码支付
      payType: 0, // 支付判断类型
      payList: [
        {name: '微信支付', icon: wepay },
        {name: '支付宝支付', icon: alipay },
      ],
      totalFee: 0, //支付总价
      
    }
  },
  methods: {
    confirmOrder() {
      this.pay()
    },
    pay() {
      const params = {
        orderId: this.$store.state.order.id,
        channel: this.channel
      }
      this.$store.dispatch("pay", { params: params }).then(data => {
        if (data.status === 200) {
          this.$store.commit('SET_ORDER', {data: data.data})
          this.payEnd(data.data)
        }
      })
    },
    payEnd(data) {
      // 支付完成
      window.location.href = data.redirectUrl
      return
      switch (this.channel) {
        case 1:
          // window.location.href = data.redirectUrl
          break;
        case 2, 3:
          window.location.href = data.redirectUrl
          break;
        case 4:
          // window.location.href = data.redirectUrl
          break;
      
        default:
          break;
      }

    },
    selectPay(i) {
      this.payType = i
      if (i === 0) {
        this.channel = 2
      }
      if (i === 1) {
        this.channel = 3
      }
    }
  },
  mounted() {
    // 乘以100为了计算中不遇到浮点数,目前价格最多2位小数
    for (const i in this.$store.state.shopCart) {
      let obj = this.$store.state.shopCart[i]
      if (obj.checked && obj.ownNum > 0) {
        this.totalFee += obj.payPrice * 100 * obj.ownNum
      }
    }
    this.totalFee = this.totalFee / 100
    
    if (this.$store.state.userAgent === 'PC') {
      this.channel = 4
    }
    if (this.$store.state.userAgent === 'weChat') {
      // 跳转链接
      this.channel = 1
    }
    if (this.$store.state.userAgent === 'alipay') {
      // 直接渲染页面
      this.channel = 3
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.order-item {
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  &:first-child{
    border-top: 1px solid #eee;
  }
}
.order-info{
  display: flex;
  align-items: center;
}
.order-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  // padding: 0 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #ccc;
  background-color: white;
  box-sizing: border-box;
  font-size: 16px;
}
.order-footer-btn{
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.order-select{ 
  width: 16px;
  img{
    width: 100%;
  }
}
</style>
