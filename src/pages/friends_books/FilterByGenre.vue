<template>
    <UlChoice>
        <li
                @click="filter(-1)"
                v-bind:class="{selected: currentIndex===-1}"
        >
            {{ $t('filters.all_genres') }}
        </li>
        <li
                @click="filter(genre.index)"
                v-for="genre in config.genres"
                v-bind:class="{selected: currentIndex===genre.index}"
        >
            {{ genre.title }}
        </li>
    </UlChoice>
</template>

<script>
    import UlChoice from "../../components/ui/UlChoice";
    import config from "../../plugins/getDjangoConfig";

    export default {
        name: "FilterByGenre",
        components: {
            UlChoice,
        },
        props: {
            setFilter: {
                type: Function,
                required: true
            },
            currentIndex: {
                type: Number,
                required: true
            }
        },
        data: function(){
            return {
                config
            }
        },
        methods: {
            filter: function (index) {
                this.setFilter(index);
            }
        },
    }
</script>

<style scoped>

</style>