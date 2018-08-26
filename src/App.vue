<template>
  <div id="app">
    <div class="wrapper">
      <vue-bullet-screen v-bind:bulletList="bulletList" ref="vueBulletScreen"></vue-bullet-screen>
    </div>
    <input type="text" v-model="message">
    <button @click="addBulletWithAvatar">发送(带头像)</button>
    <button @click="addBullettWithoutAvatar">发送(不带头像)</button>
    <button @click="play">开始</button>
    <button @click="stop">停止</button>
  </div>
</template>

<script>
import VueBulletScreen from "./lib/BulletScreen";

export default {
  name: "App",
  data() {
    return {
      bulletList: [],
      message: "",
      count: 0
    };
  },
  components: {
    VueBulletScreen
  },
  methods: {
    addBulletWithAvatar() {
      this.count++;
      this.bulletList.push({
        id: this.count,
        avatar: "/static/logo.png",
        message: this.message,
        time: 5
      });
    },
    addBullettWithoutAvatar() {
      this.count++;
      this.bulletList.push({
        id: this.count,
        avatar: "",
        message: this.message,
        time: 5
      });
    },
    play() {
      this.$refs.vueBulletScreen.play();
    },
    stop() {
      this.$refs.vueBulletScreen.stop();
    }
  }
};
</script>

<style lang="stylus">
@import url('https://cdn.staticfile.org/minireset.css/0.0.2/minireset.min.css')

html, body
  width 100%
  heigh 100%
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    width 100%
    height 100%
    .wrapper
      background-color #787878
</style>
