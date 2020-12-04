<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
footer {
  background-color: black;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  color: white;
}
html {
  min-height: 100%;
  position: relative;
}
body {
  margin: 0;
  margin-bottom: 40px;
}
</style>
