<template>
  <div id="app">
    <h1 style="background-color:#e6f2ff;">Shack Shake</h1>
    <router-view></router-view>
  
  </div>

</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
