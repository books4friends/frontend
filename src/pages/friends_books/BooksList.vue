<template>
    <BookListFrame>
        <BookItemFrame>
            <BookOwner link="https://vk.com/aygiz_obstinate" img="https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1" name="Айгиз Мухамадиев"/>
            <BookImage img="https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" alt="7 навыков высокоэффективных людей"/>
            <BookTitle>7 навыков высокоэффективных людей</BookTitle>
            <BookAuthor>Стивен Кови</BookAuthor>
            <BookComment>Могу подарить</BookComment>
        </BookItemFrame>
    </BookListFrame>
</template>

<script>
    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookComment from "../../components/ui/book_card/BookComment"
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookItemFrame from "../../components/ui/book_card/BookItemFrame"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookTitle from "../../components/ui/book_card/BookTitle"

    export default {
        components: {
            BookAuthor,
            BookComment,
            BookImage,
            BookItemFrame,
            BookListFrame,
            BookOwner,
            BookTitle
        }
    }
</script>