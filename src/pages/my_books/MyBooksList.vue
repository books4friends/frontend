<template>
    <BookListFrame>
        <BookItemFrame>
            <BookOwner link="https://vk.com/aygiz_obstinate" img="https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1" name="Айгиз Мухамадиев"/>
            <BookImage img="https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api" alt="7 навыков высокоэффективных людей"/>
            <BookTitle>7 навыков высокоэффективных людей</BookTitle>
            <BookAuthor>Стивен Кови</BookAuthor>
            <BreakLine />
            <BookCommentEditable>Могу подарить</BookCommentEditable>
            <div class="actions">
                <AppButton :onClick="foo" class="action-button">Активно</AppButton>
                <AppButton :onClick="foo" class="action-button">Удалить</AppButton>
            </div>
        </BookItemFrame>
    </BookListFrame>
</template>


<script>
    import AppButton from "../../components/ui/AppButton"
    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookCommentEditable from "../../components/ui/book_card/BookCommentEditable"
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookItemFrame from "../../components/ui/book_card/BookItemFrame"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookTitle from "../../components/ui/book_card/BookTitle"
    import BreakLine from "../../components/ui/BreakLine"


    export default {
        components: {
            AppButton,
            BookAuthor,
            BookCommentEditable,
            BookImage,
            BookItemFrame,
            BookListFrame,
            BookOwner,
            BookTitle,
            BreakLine
        },
        methods: {
            foo: function() {
                console.log('cancelDialog')
            }
        }
    }
</script>

<style scoped>
    .actions{
        display: flex;
    }
    .action-button{
        width: 50%;
        height: 100%;
        border-radius: 0;
    }
</style>