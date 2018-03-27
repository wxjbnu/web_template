<template>
  <div id="store">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import "./assets/less/base.less";
@import "./assets/less/style.less";
html, body{
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#store {
  height: 100%;
  /* text-align: center; */
  max-width: 640px;
  margin: auto;
  color: #2c3e50;
  /* margin-top: 60px; */
}
@media screen and (min-width: 540px){
  html, body{
    font-size: 60px;
  }
}
@media screen and(min-width: 420px) and (max-width: 540px) {
  html, body{
    font-size: 55px;
  }
}
@media screen and(min-width: 360) and (max-width: 420px) {
  html, body{
    font-size: 50px;
  }
}
</style>
