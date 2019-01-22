<template>
    <div>
        <AddBookForm :onBookAdded="onBookAdded"/>
        <h2>Мои книги</h2>
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
        onBookAdded: function(book){
            this.$refs.bookList.addBook(book);
        }
    }
}

</script>

<style scoped>

    #mb-book_list{
        width: 70%;
    }

</style>