<template>
    <BookListFrame>
        <BookItemFrame v-for="book in books" v-bind:key="book.item.id">
            <BookOwner :link="book.owner.link" :img="book.owner.image" :name="book.owner.name"/>
            <router-link class="route-book" :to="'/app/book/'+book.item.id+'/'">
                <BookImage v-if="book.item.description.image" :img="book.item.description.image" :alt="book.item.description.title"/>
                <BookTitle>{{ book.item.description.title }}</BookTitle>
                <BookAuthor>{{ book.item.description.author }}</BookAuthor>
                <BookGenre :index="book.item.description.genre" v-if="book.item.description.genre"/>
            </router-link>
            <BreakLine v-if="book.item.comment"/>
            <BookComment>{{ book.item.comment }}</BookComment>
        </BookItemFrame>
        <InfiniteLoading :identifier="infiniteId" @infinite="loadBooks">
            <div slot="no-more"></div>
            <div slot="no-results">{{ $t('filters.not_founded') }}</div>
        </InfiniteLoading>
    </BookListFrame>
</template>

<script>
    import axios from 'axios';
    import InfiniteLoading from 'vue-infinite-loading';

    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookComment from "../../components/ui/book_card/BookComment"
    import BookGenre from "../../components/ui/book_card/BookGenre";
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookItemFrame from "../../components/ui/book_card/BookItemFrame"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookTitle from "../../components/ui/book_card/BookTitle"
    import BreakLine from "../../components/ui/BreakLine";
    import { SearchTimeout } from "../../utils/stringUtils"

    import { FILTER_ALL, FILTER_BY_CITY, FILTER_BY_FRIEND } from "./consts"

    export default {
        components: {
            BookAuthor,
            BookComment,
            BookGenre,
            BookImage,
            BookItemFrame,
            BreakLine,
            BookListFrame,
            BookOwner,
            BookTitle,
            InfiniteLoading,
        },
        props: {
            searchStr: {
                type: String,
                required: true
            },
            filter: {
                type: Object,
                required: true
            },
            genreFilter: {
                type: Number,
                required: true
            }
        },
        data:  function(){
            return {
                books: [],
                token: undefined,
                infiniteId: +new Date(),
                searchTimeout: undefined,
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
                this.searchTimeout.reset();
            },
            genreFilter: {
                handler(){
                    this.infiniteId += 1;
                    this.books = [];
                },
                deep: true
            },
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
                if (this.genreFilter !== -1)
                    params.genre = this.genreFilter;

                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/friends-books/', {
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
        },
        mounted: function () {
            this.searchTimeout = new SearchTimeout(function () {
                this.infiniteId += 1;
                this.books = [];
            }.bind(this))
        },
    }
</script>