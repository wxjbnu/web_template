<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  mounted() {
    this.$router.push({path: 'goods'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  height: 100%;
}
</style>
