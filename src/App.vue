<template>
  <div id="app">
    <h1>欢迎来到 Vue.js 的世界</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['msg', 'num'],
  mounted() {
    console.log('Mounted!', this.msg, this.num)
  }
})
</script>

<style lang="less">
@my-color: gray;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
  color: @my-color;
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