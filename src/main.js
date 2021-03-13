import Vue from 'vue'
import App from './App.vue'
import Routescomp from './routes.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

const myRouter = new VueRouter({
  routes: Routescomp,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
