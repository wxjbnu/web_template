<template>
  <div class="block"
       style="height:100%;background-color:rgb(245,245,245);overflow:auto;padding-bottom:48px;">
    <div class="canscroll" style="height:100%;overflow:auto;">
      <div>
        <div class="detail-icons">
          <!-- <a :href="telephoneStr">
            <img  class="img-30"
                 src="../assets/images/电话-白.png">
          </a>
          <img class="img-30"
               @click="goToCart"
               src="../assets/images/购物车-白.png"> -->
        </div>
        <div class="squire-box">
          <div>
            <mt-swipe :auto="4000"
                      class="act-img-swipe-detail">
              <mt-swipe-item v-for="(item,index) in [$store.state.goodsDetail.imgUrl]"
                            :key="index"
                            :style="{backgroundImage:'url('+item+')'}"></mt-swipe-item>
            </mt-swipe>
          </div>
        </div>
        <div style="padding:5px" class="back-white">
          <!-- {{$store.state.goodsDetail}} -->
          <span style="margin:10px;"
                class="goods-tittle">{{$store.state.goodsDetail.name}}</span>
          <div style="margin:10px;">
            <span class="good-price">￥{{$store.state.goodsDetail.payPrice}}</span>&nbsp;
            <!-- <span class="good-preprice">￥{{prePrice}}</span> -->
          </div>
        </div>
      </div>

      <div class="back-white delivery-fee">
        <span class="stock-num">库存：{{$store.state.goodsDetail.num}}件</span>

      </div>

      <div class="detail-style" >
        <span class="font-black">商品详情</span>
      </div>

       <div class="back-white">
         <span class="good-detail-font">暂无</span>
       <!-- <div v-for="(item, index) in detail"
             style="text-align:left;" :class="{'hasPadding' : item.type=='txt'}"
             :key="index">
          <span class="good-detail-font"
                v-if="item.type=='txt'" v-html="item.value"></span>
          <img style="width:100%;display:block"
              :src="$store.state.goodsDetail.imgUrl" />
        </div>-->
      </div> 

    </div>
    <div class="store-footer-info" >
      <div class="store-footer-btn" style="width: 60px;padding: 0 15px;background: #fff;border-right: 1px solid #ff6060;"
        v-if="valid && stock !== 0"
        @click="goToCart">
        <img style="width: 100%;" src="./../assets/images/gouwucheActive.png" alt="">
      </div>
      <div class="store-footer-btn store-footer-car" 
           @click="addToCart"
           v-if="valid && stock !== 0">
        加入购物车
      </div>
      <div class="store-footer-btn store-footer-buy" 
           @click="buyInstant"
           v-if="valid && stock !== 0">
        立即购买
      </div>
      
      <div class="invalid-detail-footer"
           v-if="valid  && stock == 0">
        <p >该商品已售罄</p>
      </div>
      <div class="invalid-detail-footer"
           v-if="!valid">
        <p >该商品已删除或下架</p>
      </div>
    </div>

  </div>
</template>
<script>
import { Toast } from "mint-ui";
// import btnCon from '../components/btn_con'
function GetLocationParam(param) {
  var request = {
    QueryString: function(val) {
      var uri = window.location.search
      var re = new RegExp('' + val + '=([^&?]*)', 'ig')
      return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '')
    }
  }
  return request.QueryString(param)
}
 
export default {
  name: "goodsDetail",
  data() {
    return {
      imgsArr: [],
      goodsId: 0,
      form: {
        // phone: this.$store.state.userInfo.inputPhone || "12110000001",
        captcha: "123456"
      },
      btnSms: {
        isCoolDown: false,
        text: "获取验证码"
      },
      goodName: "",
      price: "",
      prePrice: "",
      deliveryFee: "",
      detail: [],
      valid: true,
      telephoneStr: '',
      goodobj: {
　　　　"id":77,
　　　　"serviceId":413,
　　　　"code":"123",
　　　　"name":"123",
　　　　"shortDetail":null,
　　　　"prePrice":123,
　　　　"price":12,
　　　　"status":1,
　　　　"picUrl":"http://storage.test.rfmember.net/G1/M00/00/15/Ch3-RFnpYbmAdsVvAAvea_OGt2M891.jpg",
　　　　"detail":[
          {type:"img",
          value:"http://storage.test.rfmember.net/G1/M00/00/15/Ch39jFnpYx2AGdYuAAvea_OGt2M624.jpg"}
        ],
　　　　"createTime":"2017-10-20 10:44:47",
　　　　"stock":9999,
　　　　"premiumNum":0,
　　　　"premiumPrice":12
　　},
      stock: 0
    };
  },
  computed: {},
  
  methods: {
    buyInstant() {
      this.addToCart()
      this.goToCart()
    },

    getGoodDetail() {
      return
      let params = {
        goodId: this.goodsId
      };
      let action = 'getGoodDetail'
      if(this.$store.state.isXfsh){
        action = 'getFairGoodDetail'
      }
      this.$store.dispatch(action, { params: params }).then(data => {
        if (data.status == 200) {
          this.$store.state.instantBuyGoodObj = this.goodobj
          this.imgsArr = this.goodobj.picUrl.split(",")
          this.goodName = this.goodobj.name
          this.stock = this.goodobj.stock
          this.price = this.goodobj.price.toFixed(2)
          this.prePrice = this.goodobj.prePrice.toFixed(2)
          this.detail = JSON.parse(this.goodobj.detail)
          this.valid = this.goodobj.status == 1 ? true : false;
        }
      })
    },
    goToCart() {
      this.$router.push({ name: "shopCart" })
      return
      if(this.$store.state.isXfsh && this.$store.state.rfAccessToken == '') {
        if(!this.getAccessTokenFromStorage()){
          localStorage.setItem('backUrl', location.href)
          this.$router.push({ name: "login" })
          return
        }
      }
      this.$router.push({ name: "shopCart" })
    },
    addToCart() {
      // 添加到购物车
      // console.log(JSON.stringify(this.$store.state.goodsDetail));
      
      const data = Object.assign({
        cid: this.$route.query.cid ? this.$route.query.cid : '',
        id: this.$route.query.id ? this.$route.query.id : '',
        checked: true,
      }, this.$store.state.goodsDetail, {ownNum: 1,})

      this.$store.commit('ADD_CART', {data})
      Toast({
        message: "添加到购物车成功",
        iconClass: "icon icon-success"
      })
    }
  },
  beforeMount() {
    // this.goodsId = this.$route.params.id;
    //  if(this.goodsId !== '' && this.goodsId !== null){
    //    this.deliveryFee = localStorage.getItem('expressMoney');//.toFixed(2)
    //    this.telephoneStr = "tel:" + localStorage.getItem('storephone')
    //  }else {
    //    this.deliveryFee = this.$store.state.storeInfo.expressMoney.toFixed(2);
    //    this.deliveryFee = parseInt(this.deliveryFee).toFixed(2);
    //     this.telephoneStr = "tel:" + this.$store.state.storeInfo.phone
    //  }
    //  let communityId = GetLocationParam('communityId')
    //  this.$store.state.communityId = communityId
    //  if(communityId !== '' && communityId !== null){
    //    this.$store.state.isXfsh = true;
    //  }
    // this.getGoodDetail();
  },
  created() {},
  mounted() {
    this.imgsArr = this.goodobj.picUrl.split(",");
    this.goodName = this.goodobj.name;
    this.stock = this.goodobj.stock
    this.price = this.goodobj.price.toFixed(2);
    this.prePrice = this.goodobj.prePrice.toFixed(2);
    this.detail = (this.goodobj.detail)
    this.valid = this.goodobj.status == 1 ? true : false;
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.block span,
.block p {
  color: #666666;
}
.detail-style{
  height:50px;
  margin-bottom:10px;
}
.delivery-fee{
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.padding-left-10{
  padding-left: 10px;
}
.img-30{
  width:30px;
  height:30px;
}
.back-white{
  background-color: white
}
.stock-num{
  padding-left: 20px;
  font-size: 12px;
  font-family: PingFangSC-Light;
}
.invalid-detail-footer {
  background-color: #dcdcdc;
  text-align: center;
  height: 100%;
  width: 100%;
  padding-top: 0 !important;
  margin-top: 0 !important;
  p {
    padding-top: 10px;
    color: #ffffff !important;
    font-size: 20px;
    margin: 0;
    display: inline-block;
  }
}
.store-footer-info {
  height: 8%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  padding-top: 0 !important;
  
  font-size: 20px;
  // align-items: center;
  .store-footer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    padding-top: 0 !important;
    margin-top: 0 !important;
    width: 50%;
  }
  .store-footer-buy {
    background-color: white;
    color: #ff6060 !important;
  }
  .store-footer-car {
    background-color: #ff6060;
    color: #ffffff !important;
  }
}
.squire-box {
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  position: relative;
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
.detail-icons {
  position: relative;
  z-index: 999;
  top: 10px;
  right: 10px;
  height: 0px;
  float: right;
}

.good-detail-font {
  font-family: PingFangSC-Light;
  color: #4a4a4a !important;
  font-size: 16px;
  line-height: 23px;
}

.font-gray {
  color: #9b9b9b !important;
  font-size: 12px;
  font-family: PingFangSC-Light;
}
.font-gray-detail{
  font-size: 14px;
  color:#4A4A4A !important
}

.good-price {
  font-size: 24px;
  color: #ff6060 !important;
  font-family: PingFangSC-Regular;
}

.hasPadding {
  padding: 10px;
}

.font-black {
  font-size: 20px;
  color: #4a4a4a !important;
  display: inline-block;
  margin-top: 20px;
  margin-left: 10px;
  font-family: PingFangSC-Regular;
}

.good-preprice {
  color: #999999;
  text-decoration: line-through;
  font-family: "Arial-BoldMT", "Arial Bold", "Arial";
}

.goods-tittle {
  color: #4a4a4a !important;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  word-break: break-all;
}

.half-line {
  display: inline-block;
  height: 1px;
  width: 40%;
  background: #dcdcdc;
}

.line {
  width: 100%;
  height: 1px;
  background: #dcdcdc;
  margin: 12px 0 20px;
}

.goods-btns {
  display: inline-block;
  width: 48%;
  text-align: center;
  height: 100%;
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

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>