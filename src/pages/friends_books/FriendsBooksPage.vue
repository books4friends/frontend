<template>
    <div id="fb">
        <div id="fb-left">
            <BookSearchFilter :onChange="changeSearch" />
            <BooksList :searchStr="searchStr" :filter="filter" :genreFilter="genreFilter"/>
        </div>
        <div id="fb-right">
            <FilterByFriends :setFilter="setFilter" />
            <FilterByGenre :setFilter="setGenreFilter" :currentIndex="genreFilter"/>
        </div>
    </div>
</template>


<script>
    import BooksList from './BooksList.vue'
    import BookSearchFilter from '../../components/ui/BookSearchFilter.vue'
    import FilterByFriends from './FilterByFriends.vue'
    import FilterByGenre from "./FilterByGenre";

    import {FILTER_ALL} from './consts'

    export default {
        components: {
            BooksList,
            BookSearchFilter,
            FilterByFriends,
            FilterByGenre,
        },
        data: function() {
            return {
                searchStr: "",
                filter: {
                    type: FILTER_ALL,
                    value: undefined
                },
                genreFilter: -1,
            }
        },
        methods: {
            changeSearch: function (str){
                this.searchStr = str;
            },
            setGenreFilter: function (value){
                this.genreFilter = value;
            },
            setFilter: function (type, value){
                this.filter.type = type;
                this.filter.value = value;
            }
        },
    }
</script>

<style scoped>
#fb{
    display: flex;
}

#fb-left{
    width: 70%;
}
#fb-right{
    width: 30%;
}


</style>