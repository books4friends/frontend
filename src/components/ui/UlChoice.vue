<template>
    <ul class="ul">
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: "ulChoice.vue"
    }
</script>

<style scoped>
    .ul > li{
        font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: #656565;

        display: block;
        min-height: 32px;
        line-height: 31px;
        cursor: pointer;
        padding: 0 5px 0 28px;
    }

    .ul > li:hover{
        background-color: #edeef0;
    }

    .ul > li.selected{
        border-right: 2px solid #5181b8;
        font-weight: 800;
        color: #000;
        background-color: #edeef0;
    }
</style>