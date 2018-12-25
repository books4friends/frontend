<template>
  <div id="app">
    <PageHeader />
    <div id="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/layout/PageHeader.vue'
export default {
  name: 'app',
  components: {
    PageHeader
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
