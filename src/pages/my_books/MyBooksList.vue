<template>
    <div>
        <BookSearchFilter :onChange="handleSearch"/>
        <BookListFrame>
            <BookItemFrame  v-for="book in filteredBooks" v-bind:key="book.id">
                <router-link class="route-book" :to="'/app/book/'+book.id+'/'">
                    <BookImage :img="book.description.image" :alt="book.description.title"/>
                    <BookTitle>{{ book.description.title }}</BookTitle>
                    <BookAuthor>{{ book.description.author }}</BookAuthor>
                </router-link>
                <BreakLine />
                <BookCommentEditable :saveValue="saveComment" :value="book.comment" :bookId="book.id"/>
                <div class="actions">
                    <AppButton v-if="book.active" :onClick="deactivate" :attrs="[book]" class="action-button">
                        {{ $t('book_desc.active') }}
                    </AppButton>
                    <AppButton v-else :onClick="activate" :attrs="[book]" class="action-button">
                        {{ $t('book_desc.not_active') }}
                    </AppButton>
                    <AppButton :onClick="openDeleteDialog" :attrs="[book]" class="action-button">
                        {{ $t('actions.delete') }}
                    </AppButton>
                </div>
            </BookItemFrame>
        </BookListFrame>
        <DialogSetting
                v-if="deleteSettings.visible"
                :title="$t('navigation.delete_book')"
                :onAccept="handleDeleteDialog"
                :cancelDialog="cancelDeleteDialog"
                :attrs="[deleteSettings.book]"
                acceptTitle="actions.delete"
        >
            <i18n
                path="dialogs.sure_to_delete"
                tag="div"
                id="deleteDialog"
            >
                <span place="author" id="deleteDialog_author">{{deleteSettings.book.description.author}}</span>
                <span place="title" id="deleteDialog_title">"{{deleteSettings.book.description.title}}"</span>
            </i18n>

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
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/')
                    .then(response => {
                        this.books = response.data.books
                    })
            },
            saveComment: function(bookId, value){
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + bookId + '/edit-comment/', {comment: value})
                    .then(function (response) {
                        this.loadBooksList()
                    }.bind(this));
            },
            activate: function(attr) {
                let book = attr[0];
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + book.id + '/activate/')
                    .then(function (response) {
                        attr[0].active = true;
                    }.bind(this));
            },
            deactivate: function (attr) {
                let book = attr[0];
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + book.id + '/deactivate/')
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
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + book.id + '/delete/')
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