<template lang="pug">
  el-container#app
    el-header
      h1 WinesBar
    el-main
      WineList
    el-footer
      p Copyright &copy; 2019 by 
        a(href="mailto:marudits@gmail.com") marudits
</template>

<script>
import WineList from './components/WineList.vue'

export default {
  name: 'app',
  components: {
    WineList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
