import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
import underscore from 'vue-underscore'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(underscore)

new Vue({
  render: h => h(App)
}).$mount('#app')
