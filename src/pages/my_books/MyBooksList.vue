<template>
    <div>
        <BookSearchFilter :onChange="handleSearch"/>
        <BookListFrame>
            <BookItemFrame  v-for="book in filteredBooks" v-bind:key="book.id">
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
                :onAccept="handleDeleteDialog"
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
    import axios from 'axios';

    import AppButton from "../../components/ui/AppButton"
    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookCommentEditable from "../../components/ui/book_card/BookCommentEditable"
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookItemFrame from "../../components/ui/book_card/BookItemFrame"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookSearchFilter from '../../components/ui/BookSearchFilter.vue'
    import BookTitle from "../../components/ui/book_card/BookTitle"
    import BreakLine from "../../components/ui/BreakLine"
    import DialogSetting from "../../components/ui/dialog/DialogSetting"
    import { doArraysContainArrays } from "../../utils/stringUtils.js"


    export default {
        components: {
            AppButton,
            BookAuthor,
            BookCommentEditable,
            BookImage,
            BookItemFrame,
            BookListFrame,
            BookOwner,
            BookSearchFilter,
            BookTitle,
            BreakLine,
            DialogSetting
        },
        data:  function() {
            return {
                books: [],
                deleteSettings: {
                    visible: false,
                    book: {
                        id: "",
                        description: {
                            title: "",
                            author: ""
                        }
                    }
                },
                searchStr: ""
            }
        },
        methods: {
            loadBooksList: function(){
                axios.get('http://127.0.0.1:8000/app/api/books/my-books/')
                    .then(response => {
                        this.books = response.data.books
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            addBook: function(){
                this.loadBooksList()
            },
            saveComment: function(bookId, value){
                axios.post('http://127.0.0.1:8000/app/api/books/my-books/' + bookId + '/edit-comment/', {comment: value})
                    .then(function (response) {
                        this.loadBooksList()
                    }.bind(this));
            },
            activate: function(attr) {
                let book = attr[0];
                axios.post('http://127.0.0.1:8000/app/api/books/my-books/' + book.id + '/activate/')
                    .then(function (response) {
                        attr[0].active = true;
                    }.bind(this));
            },
            deactivate: function (attr) {
                let book = attr[0];
                axios.post('http://127.0.0.1:8000/app/api/books/my-books/' + book.id + '/deactivate/')
                    .then(function (response) {
                        attr[0].active = false;
                    }.bind(this));
            },
            openDeleteDialog: function (attrs) {
                let book = attrs[0];
                this.deleteSettings.visible = true;
                this.deleteSettings.book = book;
            },
            handleDeleteDialog: function(attrs){
                let book = attrs[0];
                axios.post('http://127.0.0.1:8000/app/api/books/my-books/' + book.id + '/delete/')
                    .then(function (response) {
                        this.loadBooksList()
                    }.bind(this));
                this.deleteSettings.visible = false;
            },
            cancelDeleteDialog: function () {
                this.deleteSettings.visible = false;
            },
            handleSearch: function (newValue) {
                this.searchStr = newValue;
            },
            filterByTitleAndAuthor: function (book) {
                let searchWords = this.searchStr.toLowerCase().split(/\s+/);
                let titleWords = book.description.title.toLowerCase().split(/\s+/)
                    .concat(book.description.author.toLowerCase().split(/\s+/));
                return doArraysContainArrays(searchWords, titleWords);
            }
        },
        computed: {
            filteredBooks : function () {
                if (!this.searchStr.toLowerCase().split(/\s+/))
                    return this.books;
                else
                    return this.books.filter(this.filterByTitleAndAuthor);
            }
        },
        created() {
            this.loadBooksList()
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