<template>
    <div>
        <AddBookForm />
        <h2>Мои книги</h2>
        <MyBooksList id="mb-book_list"/>
    </div>
</template>

<script>
import AddBookForm from './AddBookForm.vue'
import MyBooksList from './MyBooksList.vue'

export default {
    components: {
        AddBookForm,
        MyBooksList
    }
}

</script>

<style scoped>

    #mb-book_list{
        width: 70%;
    }

</style>