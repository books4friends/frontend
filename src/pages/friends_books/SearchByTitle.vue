<template>
    <div id="fb-search">
        <input type="text" placeholder="Поиск">
    </div>
</template>


<style scoped>

#fb-search {
    margin: 10px 0 10px;
}

#fb-search > input{
    background: transparent;
    border: 0;
    display: block;
    width: 100%;
    padding: 10px 32px;
    font-size: 16px;
    box-sizing: border-box;
    background: url(../../assets/images/search_icon.png) no-repeat scroll 5px 10px;
}

#fb-search > input:focus{
    outline-width: 0;
}
#fb-search > input::placeholder{
    color: #8c8c8c;
}
#fb-search > input:focus::placeholder{
    color: #bfbfbf;
}
</style>