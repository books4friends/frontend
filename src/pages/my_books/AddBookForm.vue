<template>
    <div id="mb-add_book">
            <h2>Добавить книгу</h2>
            <div id="mb-add_book-form-inputs">
                <label for="add_title">Название*</label>
                <div id="add_title_div">
                    <input v-model="title"
                           @keyup="searchGoogle"
                           @focus="showGoogleSuggestions"
                           @blur="hideGoogleSuggestions"
                           name="title" id="add_title" type="text" placeholder="Название">

                    <div v-if="googleSuggestionsVisible" id="google_books_suggestion">
                        <div v-for="book in googleBooks"
                             @click="selectGoogleBook(book)"
                             class="google_book"
                        >
                            <span v-if="book.author" class="google_book-author">{{ book.author }}</span>
                            <span v-if="book.author">.&nbsp;</span>
                            <span class="google_book-title">{{ book.title }}</span>
                        </div>
                    </div>
                </div>
                <label for="add_author">Автор*</label>
                <input v-model="author" name="author" id="add_author" type="text" placeholder="Автор">
                <label for="add_comment">Комментарий</label>
                <input v-model="comment" name="comment" id="add_comment" type="text" placeholder="Комментарий">
            </div>
            <div id="mb-add_book-form-submit">
                <AppButton :onClick="submit">Добавить</AppButton>
            </div>
    </div>
</template>

<script>
    import AppButton from "../../components/ui/AppButton"

    export default {
        components: {
            AppButton
        },
        data: function () {
            return {
                title: "",
                author: "",
                comment: null,
                selectedGoogleBook: null,
                googleSuggestionsVisible: false,
                googleSearchTimeout: null,
                googleBooks: []
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
                    fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.title + "&maxResults=5")
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
                                        book.author = data.items[i].volumeInfo.authors[0];
                                        book.title = data.items[i].volumeInfo.title;
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
                if(!this.title || !this.author)
                    return;

                if (
                    this.selectedGoogleBook
                    && this.title === this.selectedGoogleBook.title
                    && this.author === this.selectedGoogleBook.author
                ){
                    console.log("Add book: ", this.selectedGoogleBook.id, this.title, this.author);
                }else{
                    console.log("Add book: ", this.title, this.author);
                }
            }
        }
    }
</script>


<style scoped>
#mb-add_book-form-inputs{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 20px;
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