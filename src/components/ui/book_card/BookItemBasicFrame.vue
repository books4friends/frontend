<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<style scoped>
    .item{
        border: 1px solid #f4d8bf;
        border-radius: 4px;
        box-sizing: border-box;
        transition: box-shadow 300ms;
        align-self: start;
        background-color: #fff;
    }
    .item:last-child{
        margin-bottom: 0;
    }
</style>