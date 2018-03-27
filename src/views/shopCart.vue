<template>
  <div class="block"
       style="height:100%;overflow:auto;background-color:rgb(245,245,245);font-size: 14px;">

    <div class="cart-header">
      <div class="cart-header-wrap">
        购物车
        <div class="cart-header-recycle" @click="recycleGoods">
          <img style="width: 100%;" :src="icon.recyclePic" alt="">
        </div>
        <div class="cart-header-home" @click="goHome">
          <img style="width: 100%;" :src="icon.homePic" alt="">
        </div>
      </div>
    </div>

    <!-- 购物车列表 -->
    <div class="cart-wrap">
      <!-- {{$store.state.shopCart}} -->
      <div class="cart-list">
        <div class="cart-item"
          v-for="(o, i) in $store.state.shopCart"
          :key="i">
          <div class="cart-footer-select">
            <img class="check-all"
              v-show="!o.checked"
              :src="icon.disSelectPic"
              @click="checkGood(i, true)"/>
            <img class="check-all"
              v-show="o.checked"
              :src="icon.selectPic"
              @click="checkGood(i, false)"/>
          </div>
          <div class="cart-item-pic">
            <img style="width: 100%;" :src="o.imgUrl" alt="">
          </div>

          <div class="cart-item-cont">
            <p>{{o.name}}</p>
            <span class="price-cls">￥{{o.payPrice}}</span>
          </div>

          <div class="" style="position: absolute; right: 10px; bottom: 10px;">
            <div class="num-wrap">
              <span class="minus"
                :class="{disabled: o.ownNum < 1}"
                @click="countMinus(i, o.ownNum)"></span>
              <div class="input_wrap">
                <input
                  @change="changeNum(o.id, o)"
                  v-model="o.ownNum" class="num" type="tel" value="1" max="200" >
              </div>
              <span class="plus"
                @click="countPlus(i, o.ownNum)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-footer">
      <div class="cart-footer-left" style="">
        <div class="cart-footer-select" @click="selectAll">
          <img class="check-all" v-show="!allSelected"
              :src="icon.disSelectPic" />
          <img class="check-all" v-show="allSelected"
              :src="icon.selectPic" />
          <span>全选</span>
        </div>
        <span style="padding-left: 15px;color: red;">总计:￥{{totalFee}}</span>
      </div>
      <div class="cart-footer-right" style="background: red; width: 120px;"
        :style="{background: totalFee > 0 ? 'red' : '#eee'}"
        @click="confirmOrder">
        结算
      </div>
    </div>

  </div>
</template>
<script>
import disSelectPic from "../assets/images/复选框-未选中.png"
import selectPic from "../assets/images/复选框-选中.png"
import homePic from "../assets/images/mainpageActive.png"
import recyclePic from "../assets/images/回收站.png"

import { Toast } from "mint-ui"
// import * as types from "../store/mutation-types";
// import Vue from "vue";
import { MessageBox } from "mint-ui"


export default {
  name: "shopCart",
  data() {
    return {
      icon: {
        disSelectPic,
        selectPic,
        recyclePic,
        homePic,
      },
      allSelected: true,
      totalFee: 0,
    }
  },
  computed: {},
  beforeMount() {
    // this.getCartGoods();
    // this.deliveryFee = this.$store.state.storeInfo.expressMoney;
    // this.isXfsh = this.$store.state.isXfsh
  },
  methods: {
    goHome() {
      // 回到选择商品页面
      this.$router.push({path: 'goods'})
    },
    createOrder() {
      const params = []
      this.$store.state.shopCart.map((e) => {
        if (e.checked && e.ownNum > 0) {
          params.push({
            itemId: e.id,
            num: e.ownNum
          })
        }
      })
      
      this.$store.dispatch("createOrder", { params: {items: JSON.stringify(params)} }).then(data => {
        if (data.status === 200) {
          // this.$message('下单成功')
          this.$store.commit('SET_ORDER', {data: data.data})
          this.$router.push({path: 'order'})
          // this.pay()
        }
      })
    },
    confirmOrder() {
      if (this.totalFee > 0) {
        this.createOrder()
        
        return
      }
      // this.$message('')
      
      return
      var noSelect = true;
      for (let index in this.$store.state.shopCart) {
        let item = this.$store.state.shopCart[index];
        if (item.checked === true) {
          noSelect = false;
        }
        item.ownNum = parseFloat(item.ownNum);
        if (!Number.isInteger(item.ownNum)) {
          Toast({
            message: "商品数量只能为整数",
            iconClass: "icon icon-error"
          });
          return;
        }
        if (!(item.ownNum > 0 && item.ownNum < 1000)) {
          Toast({
            message: "商品数量范围要在1-999之间",
            iconClass: "icon icon-error"
          });
          return;
        }
      }

      if (noSelect) {
        this.$toast({ duration: 3000, message: "请选择要结算的商品" });
        return;
      }
      this.$router.push({ name: "confirmOrder" });
    },
    checkGood(index, check) {
      // this.cartGoodsList[index].checked = check;
      // this.$store.state.shopCart
      const data = {checked: check, index}
      this.$store.commit('CHECK_CART', {data})
    //   Vue.set(this.cartGoodsList, index, this.cartGoodsList[index]);
      this.computeTotal()
    },
    recycleGoods() {
      // 删除所选商品

      const cartIndex = []
      for (let index in this.$store.state.shopCart) {
        if (!this.$store.state.shopCart[index].checked) {
          cartIndex.push(index)
        //   let data = {cid: this.$store.state.shopCart[index].cid, id: this.$store.state.shopCart[index].id}
        //   this.$store.commit('DEL_CART', {data})
        }
      }

      this.$store.commit('DEL_CART', {data: cartIndex})
      this.computeTotal()
    },

    selectAll() {
      this.allSelected = !this.allSelected
      
      this.$store.commit('CHECK_ALL_CART', {data: this.allSelected})
      // for (let index in this.$store.state.shopCart) {
        // this.cartGoodsList[index].checked = this.allSelected;
        // Vue.set(this.cartGoodsList, index, this.cartGoodsList[index]);
      // }
      this.computeTotal()
    },
    computeTotal() {
      var total = 0
      this.showDelete = false
      this.goodsNum = 0
      let countArr = []
      // return
      //this.$route.meta.showBottom = true;
      for (let index in this.$store.state.shopCart) {
        if (this.$store.state.shopCart[index].checked === true) {
          this.showDelete = true
          //this.$route.meta.showBottom = false;
          total +=
            this.$store.state.shopCart[index].payPrice * 100 * this.$store.state.shopCart[index].ownNum
          this.goodsNum += parseInt(this.$store.state.shopCart[index].ownNum)
          countArr.push("")
        }
      }
      if(countArr.length === 0){
        this.allSelected = false
      }
      if(countArr.length === this.$store.state.shopCart.length){
        this.allSelected = true
      }
      this.totalFee = total / 100
    },
   
    countMinus(index, num) {
      const data = {index, num: num - 1}
      if (num > 0) {
        this.$store.commit('EDIT_CART', {data})
      }

      this.computeTotal()
    },
    countPlus(index, num) {
      const data = {index, num: num + 1}
      if (num < 999) {
        this.$store.commit('EDIT_CART', {data})
      }
      this.computeTotal()
    },
    changeNum(goodsId, item) {
      //  if (item.ownNum)
      item.ownNum = parseFloat(item.ownNum)
      if (!Number.isInteger(item.ownNum)) {
        Toast({
          message: "商品数量只能为整数",
          iconClass: "icon icon-error"
        })
        item.ownNum = 0
        return
      }
      if (!(item.ownNum > 0 && item.ownNum < 1000)) {
        Toast({
          message: "商品数量范围要在1-999之间",
          iconClass: "icon icon-error"
        })
        item.ownNum = 0
        return
      }
      this.computeTotal()
    }
  },
  created() {},
  mounted() {
    this.$store.state.shopCart.map((e) => {
      if (e.checked) {
        this.totalFee += e.payPrice * 100 * e.ownNum
      } else {
        this.allSelected = false
      }
      
    })
    this.totalFee = this.totalFee / 100
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/less/variable.less";
@import "../assets/less/function_px.less";
.block span,
.block p {
  color: #666666;
}
.cart-header {
  height: 60px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: white;
  .cart-header-wrap{
    position: relative;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    color: #666;
  }
  .cart-header-home{
    position: absolute;
    width: 20px;
    left: 10px;
    top: 0;
  }
  .cart-header-recycle{
    position: absolute;
    width: 20px;
    right: 10px;
    top: 0;
  }
}

.cart-wrap{
  padding: 65px 0;
  height: 100%;
  box-sizing: border-box;
  p{
    margin: 0;
  }
  .cart-list{
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .cart-item{
    height: 100px;
    display: flex;
    position: relative;
    align-items: center;
    // padding: 0 10px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #eaeaea;
  }
  .cart-item-pic{
    height: 60px;
    width: 60px;
    margin-left: 10px;
  }
  .cart-item-cont{
    margin-left: 10px;
  }
  .num-wrap{
    position: relative;
    display: block;
    width: 107px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #f7f7f7;
    .num{
      float: left;
      position: relative;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      font-size: 14px;
      color: #999;
      flex: 1;
      min-width: 0;
      width: 45px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    
    .minus{
      position: relative;
      float: left;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &:after{
        position: absolute;
        left: 50%;
        top: 50%;
        content: "";
        display: block;
        width: 16px;
        height: 2px;
        margin: -1px 0 0 -8px;
        background: #999;
        border-radius: 1px;
      }
      &.disabled:after{
        background: hsla(0,0%,80%,.3);
      }
    }
    .plus{
      position: relative;
      float: right;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      &:after, &:before {
        position: absolute;
        left: 50%;
        top: 50%;
        content: "";
        display: block;
        width: 16px;
        height: 2px;
        margin: -1px 0 0 -8px;
        background: #999;
        border-radius: 1px;
      }
      &:before{
        width: 2px;
        height: 16px;
        margin: -8px 0 0 -1px;
        border-radius: 1px;
      }
      &.disabled:after, &.disabled:before{
        background: hsla(0,0%,80%,.3);
      }
    }
  }
  
}

.cart-footer {
  display: flex;
  height: 60px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  border-bottom: 1px solid #ccc;
  background-color: white;
  align-items: center;
  justify-content: space-between;
}
.cart-footer-left{
  display: flex;
}
.cart-footer-right{
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}
.cart-footer-select{
  height: 16px;
  padding-left: 10px;
  span{
    vertical-align: top;
  }
}

.noOpacity {
  opacity: initial !important;
}
.count-total {
  color: #ff6060 !important;
  font-family: PingFangSC-Regular;
  font-size: 18px;
}

.fee-total {
  position: relative;
  top: 10px;
}

.count-font {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: white !important;
}

.cart-word {
  display: inline-block;
  margin-top: 5px;
  vertical-align: top;
}

.small-word {
  font-size: 16px;
  font-weight: 400;
  float: right;
  margin-top: 5px;
}

.cart-tittle {
  height: 52px;
  background-color: white;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  padding-top: 13px;
  margin-bottom: 10px;
}

.half-line {
  display: inline-block;
  height: 1px;
  width: 37%;
  background: #dcdcdc;
}

.price-cls {
  font-size: 20px;
  color: red !important;
  font-family: "微软雅黑";
}

.goods-pic {
  width: 80px;
  height: 80px;
  margin-left: 8px;
}

.goods-checked {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  margin-bottom: 30px;
}

.check-all {
  width: 16px;
  height: 16px;
  margin: 0;
}

.font-falily {
  font-family: "微软雅黑";
  color: #ccc;
}

.line-gray {
  background-color: rgba(236, 232, 232, 0.98);
  height: 1px;
  border: none;
}

.goods-des {
  font-size: 14px;
  font-weight: 500;
  font-family: "微软雅黑";
  line-height: 21px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.telphone-icon {
  display: inline-block;
  float: right;
  margin-right: 20px;
  height: 40px;
}

.bold-word {
  font-weight: bold;
  font-size: 20px;
}

.store-detail {
  width: 98%;
  margin-left: 4px;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin-top: -19px;
  position: relative;
  height: 130px;
}

.line {
  width: 100%;
  height: 1px;
  background: #dcdcdc;
  margin: 12px 0 20px;
}

.store-btns {
  display: inline-block;
  width: 30%;
  text-align: center;
}

.store-btns p {
  margin-top: 0;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.set-bottome{
  bottom: 0 !important
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>