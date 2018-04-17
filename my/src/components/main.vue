<template>
  <div class="main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'main',
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

</style>
