import Vue from 'vue'
import BulletScreen from './BulletScreen.vue'

const bulletScreen = {
  install(Vue) {
    Vue.component('VueBulletScreen', BulletScreen)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(bulletScreen)
}
export default bulletScreen
