<template>
    <div id="notification">
        <div id="rel">
            <div id="text"><slot></slot></div>
            <div id="close" @click="close()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            close: {
                type: Function,
                required: true
            }
        },
        mounted() {
            setTimeout(this.close, 60000)
        }
    }
</script>

<style scoped>
    #notification{
        position: fixed;
        display: flex;
        right: 35px;
        bottom: 35px;
        min-width: 200px;
        height: 60px;
        background-color: #5b88bd;
        color: #fff;
    }

    #rel{
        position: relative;
        width: 100%;
        height: 100%;
    }

    #text{
        padding: 21px 54px 21px 21px;
    }

    #close{
        position: absolute;
        top: 3px;
        right: 0;
        background: url(../../assets/images/close.png) no-repeat 12px 21px;
        padding: 21px 25px 21px 12px;
        width: 12px;
        height: 12px;
        opacity: 0.75;
        cursor: pointer;
        outline: none;
    }
</style>