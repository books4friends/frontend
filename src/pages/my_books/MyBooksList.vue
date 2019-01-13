<template>
    <BookListFrame>
        <BookItemFrame  v-for="book in books">
            <BookImage :img="book.description.image" :alt="book.description.title"/>
            <BookTitle>{{ book.description.title }}</BookTitle>
            <BookAuthor>{{ book.description.author }}</BookAuthor>
            <BreakLine />
            <BookCommentEditable :saveValue="saveComment" :value="book.comment" :bookId="book.id"/>
            <div class="actions">
                <AppButton v-if="book.active" :onClick="deactivate" :clickParameters="[book]" class="action-button">Активно</AppButton>
                <AppButton v-else :onClick="activate" :clickParameters="[book]" class="action-button">Не активно</AppButton>
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
        data:  function() {
            return {
                books: [
                    {
                        id: "1",
                        description: {
                            title: "7 навыков высокоэффективных людей",
                            author: "Стивен Кови",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: "Могу подарить",
                        active: true
                    },
                    {
                        id: "2",
                        description: {
                            title: "Бизнес как игра",
                            author: "Сергей Абдульманов",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: null,
                        active: false
                    }
                ]
            }
        },
        methods: {
            saveComment: function(bookId, value){
                console.log(bookId, "updated, new value:", value)
            },
            activate: function(attr) {
                let book = attr[0];
                console.log(book.id, "activate")
            },
            deactivate: function (attr) {
                let book = attr[0];
                console.log(book.id, "deactivate")
            },
            foo: function () {
                
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