<template>
    <div id="mb-add_book">
            <h2>Добавить книгу</h2>
            <div class="mb-form">
                <div class="image_preview">
                    <img v-if="image" :src="image">
                </div>
                <div id="mb-add_book-form-inputs">
                    <div>
                        <label for="add_title">Название<span class="red"> *</span></label>
                        <div>
                            <input v-model="title"
                               @keyup="searchGoogle"
                               @focus="showGoogleSuggestions"
                               @blur="hideGoogleSuggestions"
                               name="title" id="add_title" type="text" placeholder="Название">
                            <div id="add_title_div">
                                <div v-if="googleSuggestionsVisible && !!googleBooks.length" id="google_books_suggestion">
                                    <div v-for="book in googleBooks"
                                         @click="selectGoogleBook(book)"
                                         class="google_book"
                                    >
                                        <div class="google_book-image">
                                            <img v-if="book.image" :src="book.image" width="170" height="250"/>
                                        </div>
                                        <div class="google_book-text">
                                            <span v-if="book.author" class="google_book-author">{{ book.author }}</span>
                                            <span v-if="book.author">.&nbsp;</span>
                                            <span class="google_book-title">{{ book.title }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label for="add_author">Автор</label>
                        <input v-model="author" name="author" id="add_author" type="text" placeholder="Автор">
                    </div>
                    <div>
                        <label for="add_comment">Комментарий</label>
                        <input v-model="comment" name="comment" id="add_comment" type="text" placeholder="Комментарий">
                    </div>
                </div>
            </div>
            <div id="mb-add_book-form-submit">
                <AppButton :onClick="submit">Добавить</AppButton>
            </div>
        <NotificationWindow :close="hideNotification" v-if="notificationVisible">{{ notificationText }}</NotificationWindow>
    </div>
</template>

<script>
    import axios from 'axios';
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";

    import AppButton from "../../components/ui/AppButton"
    import NotificationWindow from "../../components/ui/NotificationWindow"

    const VUE_APP_GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

    export default {
        components: {
            AppButton,
            NotificationWindow
        },
        props: {
            onBookAdded: {
                type: Function,
                required: true
            }
        },
        data: function () {
            return {
                title: "",
                author: "",
                image: null,
                comment: null,
                selectedGoogleBook: null,
                googleSuggestionsVisible: false,
                googleSearchTimeout: null,
                googleBooks: [],
                notificationVisible: false,
                notificationText: ""
            }
        },
        methods: {
            searchGoogle: function () {
                if (this.title === "") {
                    this.googleBooks = [];
                    return;
                }
                if(this.googleSearchTimeout != null)
                    clearTimeout(this.googleSearchTimeout);
                this.googleSearchTimeout = setTimeout(function () {
                    fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.title + "&maxResults=5&xx&key="
                            + VUE_APP_GOOGLE_API_KEY)
                        .then((response) => {
                            if(response.ok) {
                                return response.json();
                            }
                         })
                        .then((data) => {
                            this.googleBooks = [];
                            if (data && data.items)
                                for(let i=0; i<data.items.length; i++){
                                    let book = {};
                                    book.id = data.items[i].id;
                                    if (data.items[i].volumeInfo.hasOwnProperty("authors")){
                                        book.author = data.items[i].volumeInfo.authors.join(', ');
                                        book.title = data.items[i].volumeInfo.title;
                                        book.image = data.items[i].volumeInfo.imageLinks ?
                                            data.items[i].volumeInfo.imageLinks.thumbnail : null;
                                    }else{
                                        book.title = data.items[i].volumeInfo.title;
                                    }
                                    this.googleBooks.push(book);
                                }
                        });
               }.bind(this), 350);
            },
            selectGoogleBook: function (book) {
                this.title = book.title;
                this.author = book.author;
                this.image = book.image;
                this.selectedGoogleBook = book;
            },
            showGoogleSuggestions: function(){
                this.googleSuggestionsVisible = true;
            },
            hideGoogleSuggestions: function(){
                setTimeout(function () {
                    this.googleSuggestionsVisible = false;
                }.bind(this), 200);
            },
            submit: function () {
                if(!this.title)
                    return;

                let google_id = null;
                if (
                    this.selectedGoogleBook
                    && this.title === this.selectedGoogleBook.title
                    && this.author === this.selectedGoogleBook.author
                )
                google_id =  this.selectedGoogleBook.id;

                //let csrftoken = Cookies.get('csrftoken');
                axios.post('http://127.0.0.1:8000/app/api/books/add-book/', {
                    external_id: google_id,
                    title: this.title,
                    author: this.author,
                    comment: this.comment,
                }).then(function (response) {
                    this.notificationText = "Книга \""+ response.data.book.description.title + "\" добавлена";
                    this.notificationVisible = true;
                    this.onBookAdded(response.data.book);
                }.bind(this)).catch(function (e) {
                    console.log(e);
                })
            },
            hideNotification: function(){
                this.notificationVisible = false;
            }
        }
    }
</script>


<style scoped>
.mb-form{
    display: flex;
    flex-direction: row;
}

.image_preview{
    width: 128px;
    height: 199px;
}

.image_preview > img{
    max-width: 128px;
    max-height: 199px;
}

#mb-add_book-form-inputs > div {
    margin-bottom: 20px;
}

#mb-add_book-form-inputs > div:last-child {
    margin-bottom: 0;
}

#mb-add_book-form-inputs label{
    display: inline-block;
}

#mb-add_book-form-inputs input[type="text"]{
    border: none;
    border-bottom: 1px solid #333;
    width: 100%;
}

#mb-add_book-form-inputs input[type="text"]:focus{
    outline-width: 0;
}
#mb-add_book-form-inputs input[type="text"]::placeholder{
    color: #8c8c8c;
}
#mb-add_book-form-inputs input[type="text"]:focus::placeholder{
    color: #bfbfbf;
}

.red{
    color: darkred;
}

#add_title_div{
    width: 100%;
    position: relative;
}

#mb-add_book-form-submit{
    margin-top: 20px;
    text-align: right;
}
#google_books_suggestion{
    position: absolute;
    width: 400px;
    top: 22px;
    background-color: #fff;
    border: 1px solid #c7c7c7;
    border-radius: 0 0 4px 4px;
    box-sizing: border-box;
}

.google_book{
    display: flex;
    flex-direction: row;
}

.google_book-image, .google_book-image > img{
    height: 45px;
    width: 30px;
}

.google_book-text{
    padding: 5px 3px 3px 10px;
    border-bottom: 1px solid #c7c7c7;
    cursor: pointer;
}

.google_book:last-child{
    border: none;
}
.google_book:hover{
    background-color: #f7f7f7;
}

.google_book-author{
    font-weight: bold;
}
</style>