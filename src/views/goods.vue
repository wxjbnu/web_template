<template>
  <div class="goods">
    <!-- 分类 -->
    <div class="goods-bar">
      <!-- <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"> -->
        <ul>
          <li
            v-for="(o, i) in $store.state.goodsList"
            :key="i"
            @click="setSort(i)">{{o.name}}</li>
        </ul>
      <!-- </mt-loadmore> -->
    </div>
    
    <!-- 商品列表 -->
    <div class="goods-wrap"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      :infinite-scroll-distance="10">
      <!-- {{$store.state.shopCart}} -->
        <div class="good-item"
              v-if="$store.state.goodsList[goodsItemIndex]"
              @click="goGoodDetail(item)"
              v-show="true"
              v-for="(item, index) in itemsList"
              :key="index">
            <img :src="item.imgUrl"
                class="goods-pic float-left" />
            <div class="div-1">
              <div class="goods-name">
                <span class="goods-des" style="">{{item.name}}</span>
                <span v-show="!!item.ownNum && item.ownNum > 0" class="price-cls" style="">数量×{{item.ownNum}}</span>
              </div>
              <div style="line-height: 12px;">
                <span class="price-cls">¥{{Number(item.payPrice).toFixed(2)}}</span>
                <span class="store-num">库存{{item.num}}</span>
                <img v-if="item.stock !== 0" @click="addToCar(item, $event)" class="img-2"
                    src="../assets/images/gouwucheActive.png"/>
                <img v-else class="img-2" @click="toastInfo($event)"
                    src="../assets/images/cart_gray.png"/>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      // loadTop: true,
      // loadBottom: true,
      // allLoaded: true,
      loading: false,
      goodsItemIndex: 0, // 哪个类别下的商品

      goodsList: [
        
      ],
      itemsList: [],
      goods: {
　　　　"id":111,
　　　　"serviceId":413,
　　　　"code":"123",
　　　　"name":"那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那",
　　　　"shortDetail":null,
　　　　"prePrice":123,
　　　　"price":0.01,
　　　　"status":1,
　　　　"picUrl":"http://storage.test.rfmember.net/G1/M00/00/16/Ch39jFntmVKAPhdFAAvea_OGt2M041.jpg",
　　　　"detail":null,
　　　　"createTime":"2017-10-23 15:25:21",
　　　　"stock":0,
　　　　"premiumNum":0,
　　　　"premiumPrice":0.01,
　　　　"nameStr":"那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那你呢那..."
  　　},
    }
  },
  methods: {
    goGoodDetail(obj) {
      const query = {cid: this.$store.state.goodsList[this.goodsItemIndex].id, id: obj.id }
      const data = obj
      this.$store.commit('SET_GOODS_DETAIL', {data})
      // console.log(JSON.stringify(data))
      
      // return
      this.$router.push({path: 'goodsDetail', query})
    },
    loadMore() {
      // this.topStatus = false
      this.loading = true
      setTimeout(() => {
        // let last = this.list[this.list.length - 1];
        // for (let i = 1; i <= 10; i++) {
        //   this.list.push(last + i);
        // }
        this.loading = false
      }, 2500)
    },
    // handleTopChange() {},
    setSort(i) {
      this.goodsItemIndex = i
      this.getItems()
    },
    getItems() {
      this.itemsList = this.$store.state.goodsList[this.goodsItemIndex].items
    },
    storeItems() {
      const params = {}
      this.$store.dispatch("storeItems", { params: params }).then(data => {
        if (data.status === 200) {
          this.$store.commit('SET_GOODS_LIST', {data: data.data})
          this.getItems()
        }
      })
    },
    // 添加到购物车
    addToCar(goodsDetail, event) {
      
      const data = Object.assign({
        cid: this.$store.state.goodsList[this.goodsItemIndex].id,
        id: goodsDetail.id,
        checked: true,
      }, goodsDetail, {ownNum: 1,})

      this.$store.commit('ADD_CART', {data})

      event.cancelBubble = true
      event.target.style.opacity = 0.5

      return
      let params = {
        goodId: id
      };
      this.$store.dispatch("addToCar", { params: params }).then(data => {
        if (data.status == 200) {
          Toast({
            message: "添加到购物车成功",
            iconClass: "icon icon-success"
          });
        } else {
          this.$messagebox({
            title: "提示",
            message: "加入购物车失败！",
            confirmButtonText: "我知道了"
          }).then(action => {});
        }
        event.target.style.opacity = 1
      }, data => {
        event.target.style.opacity = 1
      }).catch(reason => {
        event.target.style.opacity = 1
      })
    },
    // 库存不足
    toastInfo(event){
      event.cancelBubble = true;
      Toast({
            message: "库存不足",
            iconClass: "icon icon-error"
          });
    },
  },
  mounted() {
    this.storeItems()
    for (let i = 0; i < 8; i++) {
      this.goodsList.push(JSON.parse(JSON.stringify(this.goods)))
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods{
  height: 100%;
  overflow: hidden;
  position: relative;
}
.goods-bar{
  height: 100%;
  width: 2.5rem;
  position: absolute;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* border-right: 1px solid red; */
  /* background: rebeccapurple; */
}
.goods-bar ul{
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei",Arial;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background: rgb(249, 249, 249);
  
}
.goods-bar ul li{
  list-style-type: none;
  font-size: .45rem;
  width: 100%;
  height: 1.5rem;
  /* float: left; */
  line-height: 1.5rem;
  text-align: center;
  /* border-left: 4px solid #f9f9f9; */
  border-bottom: 1px solid red;
  color: red;
}
.goods-wrap{
  height: 100%;
  margin-left: 2.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: #eaeaea;
}
.goods-list{

}


.goods-pic {
  width: 80px;
  height: 80px;
  margin-left: 8px;
  margin-top: 5px;
}
.goods-des {
  font-size: 12px;
  font-weight: 500;
  font-family: "微软雅黑";
  line-height: 16px;
  overflow: hidden;
}
.price-cls {
  font-size: 16px;
  line-height: 12px;
  color: red !important;
  font-family: "微软雅黑";
}
.font-falily {
  font-family: "微软雅黑";
  font-size: 12px;
  line-height: 12px;
  color: #ccc;
}
.store-num{
  font-size: 12px;
  line-height: 12px;
  color: #eaeaea;
}

.good-item {
  display: flex;
  background-color: white;
  margin-bottom: 2px;
  height: 100px;
  padding: 5px;
}
.good-item .div-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 73%;
  height: 100%;
  margin-left: 5px;
  padding-top: 5px;
}
.goods-name{
  display: flex;
  justify-content: space-between;
}
.good-item .img-2 {
  width: 18px;
  height: 18px;
  float: right;
  margin: 5px;
}
</style>
