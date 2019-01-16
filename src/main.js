//import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue'
import VueRouter from 'vue-router'

import FriendsBooksPage from "./pages/friends_books/FriendsBooksPage.vue"
import MyBooksPage from './pages/my_books/MyBooksPage.vue'
import SettingsPage from './pages/settings/SettingsPage.vue'
import AboutPage from './pages/about/AboutPage.vue'

Vue.config.productionTip = false;

Vue.use(VueRouter)

//TODO: move url apps/ to constants
const routes = [
    { path: "/app/", component: FriendsBooksPage },
    { path: "/app/my-books/", component: MyBooksPage },
    { path: "/app/settings/", component: SettingsPage },
    { path: "/app/about/", component: AboutPage },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    router,
    render: function (h) { return h(App)}
}).$mount('#app');