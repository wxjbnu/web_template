<template>
  <div class="login">
    
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: 'xxx'
    }
  },
  methods: {
    userLogin() {
      let params = {}
      this.$store.dispatch('userLogin', { params }).then(data => {
        if (data.status == 200) {
        }
      })
    }
  },
  watch: {
    username(curVal, oldVal) {
      
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
