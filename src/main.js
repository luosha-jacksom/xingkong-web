import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import router from './router';
import store from './store'
import {i18n, vantLocales} from "./lang/index"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import http from './http';
import 'video.js/dist/video-js.css'
// import {VanNavBar} from 'vant'
Vue.use(Vant)

Vue.prototype.$t = (key, value) => i18n.t(key, value)
Vue.use(vantLocales);
vantLocales(i18n.locale);
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
Vue.prototype.$http = http
const vm = new Vue({
  render: h => h(App),
  // 上面Vue.use(Vuex)之后，这里就可以传store了
  store,
  router,
  i18n
}).$mount('#app')
