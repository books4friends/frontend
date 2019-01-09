<template>
    <div class="friend-title">
        <a v-if="link" :href="link">
            <img :src="img" :alt="name">
            <span>{{name}}</span>
        </a>
        <div v-else>
            <img :src="img" :alt="name">
            <span>{{name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            link: {
                type: String,
                required: false,
            },
            img: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }

</script>

<style scoped>
.friend-title > div, .friend-title > a {
    display: flex;
}
.friend-title img{
    border-radius: 50%;
    width: 35px;
    height: 35px;
}

.friend-title span{
    line-height: 35px;
    display: inline-block;
    margin-left: 10px;
    text-decoration-line: none;
    font-family: -apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #656565;
}

.friend-title > a {
    text-decoration-line: none;
}

.friend-title > a > span{
    color: #2a5885;
    text-decoration-line: none;
    font-weight: 900;
    font-size: 14px;
}

</style>