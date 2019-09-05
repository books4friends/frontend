<template>
    <div id="mb-add_book">
            <h2>Добавить книгу</h2>
            <div class="mb-form">
                <div class="image_preview">
                    <img v-if="image" :src="image">
                    <ImageGenerator v-else :author="author" :title="title" ref="generatedImage"/>
                    <div v-if="image" class="image-remove" @click="removeImage">x</div>
                </div>
                <div id="mb-add_book-form-inputs">
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_title">Название<span class="red"> *</span></label>
                        <div id="add_title_div">
                            <input v-model="title"
                               @keyup="searchGoogle"
                               @focus="showGoogleSuggestions"
                               @blur="hideGoogleSuggestions"
                               name="title" id="add_title" type="text" placeholder="Название">
                                <div v-if="googleSuggestionsVisible && !!googleBooks.length" id="google_books_suggestion">
                                    <div v-for="book in googleBooks"
                                         @click="selectGoogleBook(book)"
                                         class="google_book"
                                    >
                                        <div class="google_book-image">
                                            <img v-if="book.image" :src="book.image"/>
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
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_author">Автор</label>
                        <input v-model="author" name="author" id="add_author" type="text" placeholder="Автор">
                    </div>
                    <div class="mb-add_book-form-inputs-line">
                        <label for="add_comment">Комментарий</label>
                        <input v-model="comment" name="comment" id="add_comment" type="text" placeholder="Комментарий">
                    </div>
                    <div class="add_image mb-add_book-form-inputs-line">
                        <button @click="launchFilePicker">Загрузить свою картинку</button>
                        <input
                                ref="custom_image"
                                type="file"
                                @change="handleFileUpload"
                                accept=".png, .jpg, .jpeg"
                        />
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
    import ImageGenerator from "./ImageGenerator";
    import NotificationWindow from "../../components/ui/NotificationWindow"

    const VUE_APP_GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

    export default {
        components: {
            AppButton,
            NotificationWindow,
            ImageGenerator
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
                customImage: null,
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
            launchFilePicker: function(event){
                this.$refs['custom_image'].click();
            },
            handleFileUpload: function(event){
                this.customImage = event.target.files[0];
                this.image = URL.createObjectURL(this.customImage);
            },
            removeImage: function(){
                if (this.customImage){
                    this.customImage = null;
                    if (this.selectedGoogleBook){
                        this.image = this.selectedGoogleBook.image;
                    }else{
                        this.image = null;
                    }
                }else{
                    this.image = null;
                }
            },
            clearFields: function(){
                this.title = '';
                this.author = '';
                this.comment = '';
                this.image = undefined;
                this.customImage = undefined;
            },
            submit: function () {
                if(!this.title)
                    return;

                let formData = new FormData();
                formData.append('title', this.title);
                if (this.author)
                    formData.append('author', this.author);
                if (this.comment)
                    formData.append('comment', this.comment);

                if (this.customImage)
                    formData.append('image', this.customImage);
                if (!this.image)
                    formData.append('image', this.$refs.generatedImage.getBlob(), 'name.jpg');

                if (
                    ! this.customImage &&
                    this.selectedGoogleBook
                    && this.title === this.selectedGoogleBook.title
                    && this.author === this.selectedGoogleBook.author
                    && this.image === this.selectedGoogleBook.image
                )
                    formData.append('external_id', this.selectedGoogleBook.id);

                this.clearFields();

                axios.post('http://127.0.0.1:8000/app/api/books/add-book/', formData).then(function (response) {
                    this.notificationText = "Книга \""+ response.data.book.description.title + "\" добавлена";
                    this.notificationVisible = true;
                    this.onBookAdded();
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
    height: 200px;
}

.image_preview{
    float:left;
    width: 128px;
    height: 199px;
    position: relative;
}

.image_preview > img{
    max-width: 128px;
    max-height: 199px;
}

.image-remove{
    position: absolute;
    right: 5px;
    top: 5px;
    background: #ffff00;
    border-radius: 50%;
    height: 25px;
    width: 25px;
    vertical-align: center;
    text-align: center;
}

.add_image > input{
    display: none;
}

#mb-add_book{
    width: 100%;
}

.mb-add_book-form-inputs-line {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
}

.mb-add_book-form-inputs-line > label{
    display: inline-block;
    width: 50%;
}

.mb-add_book-form-inputs-line input[type="text"]{
    border: none;
    border-bottom: 1px solid #333;
    width: 50%;
}

.mb-add_book-form-inputs-line input[type="text"]:focus{
    outline-width: 0;
}
.mb-add_book-form-inputs-line input[type="text"]::placeholder{
    color: #8c8c8c;
}
.mb-add_book-form-inputs-line input[type="text"]:focus::placeholder{
    color: #bfbfbf;
}

.red{
    color: darkred;
}

#add_title_div{
    width: 50%;
    position: relative;
}

#add_title_div > input{
    width: 100%;
}

#mb-add_book-form-submit{
    margin-top: 20px;
    text-align: right;
}
#google_books_suggestion{
    position: absolute;
    width: 400px;
    top: 22px;
    right: 0;
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