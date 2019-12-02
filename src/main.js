//import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios';

import i18n from './plugins/i18n.js'

import FriendsBooksPage from "./pages/friends_books/FriendsBooksPage.vue"
import MyBooksPage from './pages/my_books/MyBooksPage.vue'
import SettingsPage from './pages/settings/SettingsPage.vue'
import AboutPage from './pages/about/AboutPage.vue'
import BookDetailPage from "./pages/book_detail/BookDetailPage";
import BorrowBookPage from "./pages/borrow_book/BorrowBookPage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

//TODO: move url apps/ to constants
const routes = [
    { path: "/app/", component: FriendsBooksPage },
    { path: "/app/my-books/", component: MyBooksPage },
    { path: "/app/settings/", component: SettingsPage },
    { path: "/app/about/", component: AboutPage },
    { path: "/app/book/:id/", component: BookDetailPage },
    { path: "/app/book/:id/borrow/", component: BorrowBookPage },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        router.go('/');
    }
    return Promise.reject(error)
});

new Vue({
    router,
    i18n,
    render: function (h) { return h(App)}
}).$mount('#app');