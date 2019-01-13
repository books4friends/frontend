<template>
    <button @click="onClick(clickParameters)" class="button" v-bind:class="{ transparent: transparent }">
        <slot></slot>
    </button>
</template>
​
<script>
    export default {
        props: {
            onClick: {
                type: Function,
                required: true
            },
            clickParameters: {
                type: Array,
                required: false,
                default: () => []
            },
            transparent: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>


<style scoped>
    .button{
        padding: 7px 16px 8px;
        margin: 0;
        font-size: 12.5px;
        display: inline-block;
        zoom: 1;
        cursor: pointer;
        white-space: nowrap;
        outline: none;
        vertical-align: top;
        line-height: 15px;
        text-align: center;
        text-decoration: none;
        background-color: #5181b8;
        color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        border: 1px solid #304b6b;
    }
    .button:active {
        background-color: #4872a3;
        padding-top: 8px;
        padding-bottom: 7px;
    }
    .button:hover {
        background-color: #5b88bd;
        text-decoration: none;
    }

    .button.transparent{
        background-color: transparent;
        border: none;
        color: #304b6b;
    }

</style>