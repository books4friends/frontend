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

:root {
  --primary-color: #e29858e6;
  --primary-border-color: #ffa75be6;
  --sub-color: #e6a872e6;
  --primary-hover-color: #c77630e6;
}

* {
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
}

#content{
   width: 800px;
   margin: auto;
   padding: 70px 10px 40px 10px;
}


.hiden{
    display: none;
}
</style>
