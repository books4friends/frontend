<template>
    <div v-if="!!googleBooks.length" id="google_books_suggestion">
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
</template>

<script>
    const VUE_APP_GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

    export default {
        name: "GoogleSuggestions",
        props: {
            selectGoogleBook: {
                type: Function,
                required: true
            },
            title: {
                type: String,
                required: true
            },
        },
        data: () => {
            return {
                googleSearchTimeout: null,
                googleBooks: []
            }
        },
        watch: {
            title: function (){
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
            }
        }
    }
</script>

<style scoped>

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