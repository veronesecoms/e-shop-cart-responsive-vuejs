import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import './registerServiceWorker'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import Header from './components/Header.vue'
import Carousel from './components/Carousel'
import Produtos from './components/Produtos'
import Footer from './components/Footer'
import Carrinho from './components/Carrinho'
import Checkout from './components/Checkout'
import ModalCheckout from './components/ModalCheckout'

Vue.use(BootstrapVue)
Vue.use(VueTheMask, { masked: false })
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

Vue.component('e-header', Header)
Vue.component('carousel', Carousel)
Vue.component('produtos', Produtos)
Vue.component('e-footer', Footer)
Vue.component('carrinho', Carrinho)
Vue.component('checkout', Checkout)
Vue.component('modal-checkout', ModalCheckout)

const routes = [
  { path: '/home', alias: '/', component: Produtos },
  { path: '/cart', component: Carrinho },
  { path: '/checkout', component: Checkout }
]

const router = new VueRouter({
  routes
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
