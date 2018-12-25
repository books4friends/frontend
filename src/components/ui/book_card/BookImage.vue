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
        text-align: center;
        margin-top: 6px;
    }

    .image > img{
        max-width: 150px;
        max-height: 300px;
        border: 1px solid rgba(0, 0, 0, 0.10);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
    }
</style>