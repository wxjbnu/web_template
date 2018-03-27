<template>
  <div class="pay_callback">
    <p>支付完成</p>
    <p>{{leaveTime}}秒后回到首页</p>
  </div>
</template>

<script>
export default {
  name: 'pay_callback',
  data () {
    return {
      leaveTime: 3,
      clearLeaveTime: '',
      userAgent: {

      }
    }
  },
  watch: {
    leaveTime(curVal, oldVal) {
      if (curVal < 1) {
        clearInterval(this.clearLeaveTime)
        this.$router.replace({path: 'goods'})
      }
    }
  },
  methods: {
    
  },
  mounted() {
    this.clearLeaveTime = setInterval(() => {
      --this.leaveTime      
    }, 1000)
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay_callback{
  padding-top: 20px;
  text-align: center;
}
</style>
