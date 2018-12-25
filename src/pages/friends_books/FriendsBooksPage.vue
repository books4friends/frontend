<template>
    <div id="fb">
        <div id="fb-left">
            <SearchByTitle />
            <BooksList />
        </div>
        <div id="fb-right">
            <FilterByFriends />
        </div>
    </div>
</template>


<script>
    import BooksList from './BooksList.vue'
    import FilterByFriends from './FilterByFriends.vue'
    import SearchByTitle from './SearchByTitle.vue'
    export default {
      components: {
        BooksList,
        FilterByFriends,
        SearchByTitle
      }
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