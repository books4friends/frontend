<template>
    <div id="fb">
        <div id="fb-left">
            <SearchFilter :onChange="changeSearch" />
            <BooksList :searchStr="searchStr" />
        </div>
        <div id="fb-right">
            <FilterByFriends/>
        </div>
    </div>
</template>


<script>
    import BooksList from './BooksList.vue'
    import FilterByFriends from './FilterByFriends.vue'
    import SearchFilter from './SearchFilter.vue'

    export default {
        components: {
            BooksList,
            FilterByFriends,
            SearchFilter
        },
        data: function() {
            return {
                searchStr: ""
            }
        },
        methods: {
            changeSearch: function (str) {
                this.searchStr = str;
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