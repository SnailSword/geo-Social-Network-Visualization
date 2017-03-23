<template>
  <div id="app">
      <s-header></s-header>
      <s-cards></s-cards>
    <!--<el-button @click.native="startHacking">Let's do it</el-button>-->
  </div>
</template>

<script>
    import Header from './components/header.vue';
    import Cards from './components/cards.vue';

    export default {
      data () {
        return {
          msg: 'Use Vue 2.0 Today!'
        }
      },

      methods: {
        startHacking () {
          this.$notify({
            title: 'It Works',
            message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
            duration: 6000
          })
        }
      },
      components: {
          "s-header": Header,
          "s-cards" : Cards
      }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    @import "./css/font";
    body {
        font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        font-size: 15px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #fff;
        margin: 0;
    }
</style>
