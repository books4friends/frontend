<template>
    <div>
        <BookListFrame>
            <BookItem v-for="book in books" :book="book" />
        </BookListFrame>
        <InfiniteLoading :identifier="infiniteId" @infinite="loadBooks">
            <div slot="no-more"></div>
        </InfiniteLoading>
    </div>
</template>

<script>
    import axios from 'axios';
    import InfiniteLoading from 'vue-infinite-loading';

    import BookItem from "./BookItem"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import { FILTER_ALL, FILTER_BY_CITY, FILTER_BY_FRIEND } from "./consts"

    export default {
        components: {
            InfiniteLoading,
            BookItem,
            BookListFrame
        },
        props: {
            searchStr: {
                type: String,
                required: true
            },
            filter: {
                type: Object,
                required: true
            }
        },
        data:  function(){
            return {
                books: [],
                token: undefined,
                infiniteId: +new Date(),
                searchTimeout1: undefined,
                searchTimeout2: undefined,
            }
        },
        watch: {
            filter: {
                handler(){
                    this.infiniteId += 1;
                    this.books = [];
                },
                deep: true
            },
            searchStr: function () {
                // send request after 0.3 seconds if there is no changes in the string
                // send request every 0.8 seconds while typing

                let timeoutLoad = function(){
                    clearTimeout(this.searchTimeout1);
                    clearTimeout(this.searchTimeout2);
                    this.searchTimeout2 = undefined;
                    this.infiniteId += 1;
                    this.books = [];
                }.bind(this);

                clearTimeout(this.searchTimeout1);
                this.searchTimeout1 = setTimeout(timeoutLoad, 300);
                if(this.searchTimeout2 === undefined)
                    this.searchTimeout2 = setTimeout(timeoutLoad, 800);

            }
        },
        methods: {
            loadBooks: function ($state) {
                let params = {};

                if (this.token)
                    params.token = this.token;

                params.offset = this.books.length;

                switch (this.filter.type) {
                    case FILTER_BY_FRIEND:
                        params.friend = this.filter.value;
                        break;
                    case FILTER_BY_CITY:
                        params.city = this.filter.value;
                        break;
                }
                if (this.searchStr.toLowerCase().split(/\s+/))
                    params.search = this.searchStr;

                axios.get('http://127.0.0.1:8000/app/api/books/friends-books/get-books/', {
                    params: params
                }).then(function (response){
                    if (response.data.data.books.length > 0){
                        this.books.push(...response.data.data.books);
                        if (response.data.token !== this.token)
                            this.token = response.data.token;
                        $state.loaded();
                    }else{
                        $state.complete();
                    }

                }.bind(this));
            }
        }
    }
</script>