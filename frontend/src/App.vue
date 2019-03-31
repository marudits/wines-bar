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

<style lang="scss">
header {
  background-color: #68081f;
  color: white;
  font-weight: bolder;
  text-align: center;

  h1 {
    margin-top: 1rem;
    margin-bottom: 0;
  }
}

main {
  padding: 1rem 1rem 5rem 1rem !important;
}

footer {
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 100%;
  background-color: #68081f;
  color: white;
  z-index: 99;
  text-align: center;

  a {
    cursor: pointer;
    color: white !important;
  }
}
</style>
