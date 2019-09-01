<template>
    <div class="image">
        <img
                :src="img"
                :alt="alt"
        >
    </div>
</template>

<script>
    export default {
        props:{
            img: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped>
    .image{
        display: flex;
        margin-top: 6px;
        width: 170px;
        height: 256px;
    }

    .image > img{
        max-width: 170px;
        max-height: 256px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        margin: auto auto;
    }
</style>