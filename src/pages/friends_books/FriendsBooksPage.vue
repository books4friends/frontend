<template>
    <div id="fb">
        <div id="fb-left">
            <BookSearchFilter :onChange="changeSearch" />
            <BooksList :searchStr="searchStr" :filter="filter"/>
        </div>
        <div id="fb-right">
            <FilterByFriends :setFilter="setFilter"/>
        </div>
    </div>
</template>


<script>
    import BooksList from './BooksList.vue'
    import FilterByFriends from './FilterByFriends.vue'
    import BookSearchFilter from '../../components/ui/BookSearchFilter.vue'

    import {FILTER_ALL} from './consts'

    export default {
        components: {
            BooksList,
            FilterByFriends,
            BookSearchFilter,
        },
        data: function() {
            return {
                searchStr: "",
                filter: {
                    type: FILTER_ALL,
                    value: undefined
                }
            }
        },
        methods: {
            changeSearch: function (str){
                this.searchStr = str;
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