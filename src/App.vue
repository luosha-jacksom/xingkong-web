<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <router-view></router-view>
     <Footer />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Login from './pages/login'
import Footer from './components/footer/index.vue'

export default {
  name: 'App',
  components: {
    // Login,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
