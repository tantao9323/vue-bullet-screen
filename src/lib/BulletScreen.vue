<template>
  <div class="screen" ref="screen" v-bind:style="{width:screenWidth+'px',height:screenHeight+'px'}">
      <div class="bullet" v-for="bullet in bulletList" v-bind:key="bullet.id" v-bind:style="bullet.style">
        <div class="avatar" v-show="bullet.avatar!=''">
          <img v-bind:src="bullet.avatar" alt="">
        </div>
        <div class="message">{{bullet.message}}</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "BulletScreen",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    bulletList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      screenWidth: this.width,
      screenHeight: this.height,
      frameId: null
    };
  },
  mounted() {
    if (this.screenWidth == 0) {
      const parentWidth = this.$refs.screen.parentNode.offsetWidth;
      this.screenWidth = parentWidth == 0 ? window.innerWidth : parentWidth;
    }
    if (this.screenHeight == 0) {
      const parentHeight = this.$refs.screen.parentNode.offsetHeight;
      this.screenHeight = parentHeight == 0 ? window.innerHeight : parentHeight;
    }
    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    window.cancelAnimationFrame =
      window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      function(frameId) {
        clearTimeout(frameId);
      };
    this.play();
  },
  methods: {
    bulletListUpdate(timeStamp) {
      if (typeof timeStamp != "undefined") {
        this.move(timeStamp);
      }
      if (this.bulletList.length > 0) {
        this.play();
      }
    },
    play() {
      this.stop();
      this.frameId = window.requestAnimationFrame(this.bulletListUpdate);
    },
    stop() {
      window.cancelAnimationFrame(this.frameId);
    },
    move(timeStamp) {
      this.bulletList.forEach((bullet, index) => {
        if (typeof bullet.startTime != "undefined") {
          const progress = timeStamp - bullet.currentTime;
          bullet.currentTime = timeStamp;
          const move = bullet.speed * progress;
          if (move <= 0 || isNaN(move)) {
            return;
          }
          bullet.left -= move;
          let backgroundColor = "";
          if (bullet.avatar !== "") {
            backgroundColor = "rgba(0, 0, 0, 0.7)";
          }
          this.$set(bullet, "style", {
            transform: `translate(${bullet.left}px,${bullet.top}px)`,
            width: `${bullet.width}px`,
            backgroundColor: backgroundColor
          });
          if (bullet.left + bullet.width < 0) {
            if (this.loop) {
              this.bulletReset(bullet, timeStamp);
            } else {
              this.bulletList.splice(index, 1);
            }
          }
        } else {
          this.bulletReset(bullet, timeStamp);
        }
      });
    },
    bulletReset(bullet, timeStamp) {
      bullet.startTime = timeStamp;
      bullet.currentTime = timeStamp;
      bullet.speed = this.screenWidth / (bullet.time * 1000);
      bullet.width = this.getLength(bullet.message) * 10 + 50;
      bullet.left = this.screenWidth;
      const randomHeight = parseInt(Math.random() * this.screenHeight);
      bullet.top =
        randomHeight < this.screenHeight - 50
          ? randomHeight
          : this.screenHeight - 50;
      this.$set(bullet, "style", {
        transform: `translate(${bullet.left}px,${bullet.top}px)`
      });
    },
    getLength(string) {
      let length = 0;
      for (let i in string) {
        if (string.charCodeAt(i) >= 0 || string.charCodeAt(i) <= 128) {
          length++;
        } else {
          length += 2;
        }
      }
      return length;
    }
  },
  watch: {
    bulletList() {
      this.bulletListUpdate();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.screen
  width 100%
  height 100%
  overflow hidden
  margin 0 auto
  position relative
  .bullet
    position absolute
    border-radius 50px
    display flex
    align-items center
    padding 5px
    .avatar
      width 30px
      height 30px
      background-color #fff
      border-radius 50%
      overflow hidden
      img
        width 100%
    .message
      color #fff
      padding 5px
</style>
