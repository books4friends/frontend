<template>
    <div>
        <BookListFrame>
            <BookItemFrame  v-for="book in books">
                <BookImage :img="book.description.image" :alt="book.description.title"/>
                <BookTitle>{{ book.description.title }}</BookTitle>
                <BookAuthor>{{ book.description.author }}</BookAuthor>
                <BreakLine />
                <BookCommentEditable :saveValue="saveComment" :value="book.comment" :bookId="book.id"/>
                <div class="actions">
                    <AppButton v-if="book.active" :onClick="deactivate" :attrs="[book]" class="action-button">Активно</AppButton>
                    <AppButton v-else :onClick="activate" :attrs="[book]" class="action-button">Не активно</AppButton>
                    <AppButton :onClick="openDeleteDialog" :attrs="[book]" class="action-button">Удалить</AppButton>
                </div>
            </BookItemFrame>
        </BookListFrame>
        <DialogSetting
                v-if="deleteSettings.visible"
                title="Удалить книгу"
                :onAccept="saveDeleteDialog"
                :cancelDialog="cancelDeleteDialog"
                :attrs="[deleteSettings.book]"
                acceptTitle="Удалить"
        >
                <div id="deleteDialog">
                Вы уверены что хотите удалить книгу
                <span id="deleteDialog_author">{{deleteSettings.book.description.author}}</span>
                <span>.&nbsp;</span>
                <span id="deleteDialog_title">"{{deleteSettings.book.description.title}}"</span>
            </div>
        </DialogSetting>
    </div>
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
    import DialogSetting from "../../components/ui/dialog/DialogSetting"


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
            BreakLine,
            DialogSetting
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
                ],
                deleteSettings: {
                    visible: false,
                    book: {
                        id: "",
                        description: {
                            title: "",
                            author: ""
                        }
                    }
                }
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
            openDeleteDialog: function (attrs) {
                let book = attrs[0];
                this.deleteSettings.visible = true;
                this.deleteSettings.book = book;
            },
            saveDeleteDialog: function(attrs){
                let book = attrs[0];
                console.log(book.id, "delete");
                this.deleteSettings.visible = false;
            },
            cancelDeleteDialog: function () {
                this.deleteSettings.visible = false;
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
    #deleteDialog{
        padding: 15px;
        font-size: 15px;
    }
    #deleteDialog_author, #deleteDialog_title{
        font-style: italic;
    }
</style>