<template>
  <div id="app" class = "largestwidth">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   margin-top: 0px !important;
}

body{
  margin: 0;
  height:100vh;
  background: #fff;
}

</style>

