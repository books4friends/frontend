<template>
    <div id="navigation">
        <div id="center">
            <router-link to="/app/" class="menu">Книги друзей</router-link>
            <router-link class="menu" to="/app/my-books/">Мои книги</router-link>
            <router-link class="menu" to="/app/settings/">Настройки</router-link>
            <router-link class="menu" to="/app/about/">О проекте</router-link>
        </div>
    </div>
</template>

<style scoped>
#navigation{
    background-color: #4a76a7;
}
#center{
    display: flex;
   width: 800px;
   margin: auto;
}
.menu{
    color: #ffffff;
    width: 25%;
    font-weight: 400;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    cursor: pointer;
    text-decoration: none;
}

.menu:hover{
    background-color: #3d6898;
}

.router-link-exact-active, .router-link-exact-active:hover{
    background-color: #335e8f;
}
</style>