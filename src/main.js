import Vue from 'vue'
import App from './App.vue'
import store from "./store/store"
import vuetify from "@/plugins/vuetify"
import router from "@/router/router"
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(VueApexCharts)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
