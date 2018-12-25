//import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue'
import VueRouter from 'vue-router'

import FriendsBooksPage from "./pages/friends_books/FriendsBooksPage.vue"
import MyBooksPage from './pages/my_books/MyBooksPage.vue'
import SettingsPage from './pages/settings/SettingsPage.vue'
import AboutPage from './pages/about/AboutPage.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const NotFound = { template: '<p>Page not found</p>' }
/*const routes = {
    "/": FriendsBooksPage ,
    "/my-books/": MyBooksPage,
    "/settings/": SettingsPage,
    "/about/": AboutPage
}
new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')
*/

const routes = [
    { path: "/", component: FriendsBooksPage },
    { path: "/my-books/", component: MyBooksPage },
    { path: "/settings/", component: SettingsPage },
    { path: "/about/", component: AboutPage },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

new Vue({
    router,
    render: function (h) { return h(App)}
}).$mount('#app')