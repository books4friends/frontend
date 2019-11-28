<template>
    <span>{{ title }}</span>
</template>

<script>
    import config from "../../../plugins/getDjangoConfig";

    export default {
        name: "BookGenre",
        props:{
            index: {
                type: Number,
                required: true
            }
        },
        computed: {
            title: function () {
                return config.genres.find(o => o.index === this.index).title;
            }
        }
    }
</script>

<style scoped>

</style>