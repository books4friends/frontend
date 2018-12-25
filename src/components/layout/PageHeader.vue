<template>
<div id="navigation">
    <div id="center">
        <div class="menu active">Книги друзей</div>
        <div class="menu">Мои книги</div>
        <div class="menu">Настройки</div>
        <div class="menu">О проекте</div>
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
}

.menu:hover{
    background-color: #3d6898;
}

.menu.active, .menu.active:hover{
    background-color: #335e8f;
}
</style>