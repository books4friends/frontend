<template>
    <div>
        <AddBookForm :onBookAdded="onBookAdded"/>
        <h2>{{ $t('navigation.my_books') }}</h2>
        <MyBooksList ref="bookList" id="mb-book_list"/>
    </div>
</template>

<script>
import AddBookForm from './AddBookForm.vue'
import MyBooksList from './MyBooksList.vue'

export default {
    components: {
        AddBookForm,
        MyBooksList
    },
    methods: {
        onBookAdded: function(){
            this.$refs.bookList.addBook();
        }
    }
}

</script>

<style scoped>

    #mb-book_list{
        width: 70%;
    }

</style>