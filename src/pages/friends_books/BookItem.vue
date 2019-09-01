<template>
    <BookItemBasicFrame>
        <div class="book-container">
            <BookOwner :link="book.owner.link" :img="book.owner.image" :name="book.owner.name"/>
            <BookImage v-if="book.description.image" :img="book.description.image" :alt="book.description.title"/>
            <BookTitle>{{ book.description.title }}</BookTitle>
            <BookAuthor>{{ book.description.author }}</BookAuthor>
            <BookComment>{{ book.comment }}</BookComment>
        </div>
    </BookItemBasicFrame>
</template>

<script>
    import BookItemBasicFrame from "../../components/ui/book_card/BookItemBasicFrame"

    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookComment from "../../components/ui/book_card/BookComment"
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookTitle from "../../components/ui/book_card/BookTitle"

    export default {
        components: {
            BookAuthor,
            BookComment,
            BookImage,
            BookItemBasicFrame,
            BookOwner,
            BookTitle,
        },
        props: {
            book: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .book-container {
        display: flex;
        flex-direction: column;
        flex: 0 1 40%;
    }

    .book-description{
        display: flex;
        flex-direction: column;
    }
</style>