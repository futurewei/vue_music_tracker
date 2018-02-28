// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import VueTouTubeEmbed from 'vue-youtube-embed'
import Panel from '@/components/globals/Panel'
import '../node_modules/vue-material-design-icons/styles.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueTouTubeEmbed)
Vue.component('panel', Panel)
/* eslint-disable no-new */

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
