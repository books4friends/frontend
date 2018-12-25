<template>
  <div id="app">
    <PageHeader />
    <div id="content">
      <FriendsBooksPage v-if="page=='FriendsBooksPage'"/>
      <SettingsPage v-if="page=='SettingsPage'"/>
      <MyBooksPage v-if="page=='MyBooksPage'"/>
      <AboutPage v-if="page=='AboutPage'"/>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/layout/PageHeader.vue'

import FriendsBooksPage from './pages/friends_books/FriendsBooksPage.vue'
import MyBooksPage from './pages/my_books/MyBooksPage.vue'
import SettingsPage from './pages/settings/SettingsPage.vue'
import AboutPage from './pages/about/AboutPage.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    FriendsBooksPage,
    MyBooksPage,
    SettingsPage,
    AboutPage
  },
  data: function(){
    return{
      page: "MyBooksPage"
    }
  }
}
</script>

<style>
html, body{
    margin: 0;
    padding: 0;
}


* {
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
}

#content{
   width: 800px;
   margin: auto;
   padding: 20px 10px 40px 10px;
}


.hiden{
    display: none;
}
</style>
