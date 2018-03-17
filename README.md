# vue-bullet-screen
> A Vue.js bullet screen plugin
## Install
### npm
        npm install vue-bullet-screen --save
>
        import VueBulletScreen from 'vue-bullet-screen'
        Vue.use(VueBulletScreen)
### Direct include
        <script src="/dist/vue-bullet-screen.js"></script>
## Usage
### Template
>
        <vue-bullet-screen v-bind:bulletList="bulletList" ref="vueBulletScreen"></vue-bullet-screen>
### Script
>
        export default {
            name: 'app',
            data() {
                return {
                    id: 0,
                    message: 'vue bullet screen'
                    bulletList: []
                }
            },
            methods: {
                addBullet() {
                    this.bulletList.push({
                        id: ++id,
                        avatar: "/static/logo.png",
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
            ...
## Options
|Recognizer|Type|Default|Example|
|---|----|----|----|
|**show**|Boolean|true|v-bind:show="isShow"|
|**loop**|Boolean|false|v-bind:loop="isLoop"|
|**bulletList**|Array|[ ]|v-bind:bulletList="bulletList"|
# Lisence
### MIT
