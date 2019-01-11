<template>
    <BookListFrame>
        <BookItemFrame v-for="book in filteredBooks">
            <BookOwner :link="book.owner.link" :img="book.owner.image" :name="book.owner.name"/>
            <BookImage :img="book.description.image" :alt="book.description.title"/>
            <BookTitle>{{ book.description.title }}</BookTitle>
            <BookAuthor>{{ book.description.author }}</BookAuthor>
            <BookComment>{{ book.comment }}</BookComment>
        </BookItemFrame>
    </BookListFrame>
</template>

<script>
    import BookAuthor from "../../components/ui/book_card/BookAuthor"
    import BookComment from "../../components/ui/book_card/BookComment"
    import BookImage from "../../components/ui/book_card/BookImage"
    import BookItemFrame from "../../components/ui/book_card/BookItemFrame"
    import BookListFrame from "../../components/ui/book_card/BookListFrame"
    import BookOwner from "../../components/ui/book_card/BookOwner"
    import BookTitle from "../../components/ui/book_card/BookTitle"
    import { doArraysContainArrays } from "../../utils/stringUtils.js"

    export default {
        components: {
            BookAuthor,
            BookComment,
            BookImage,
            BookItemFrame,
            BookListFrame,
            BookOwner,
            BookTitle
        },
        props: {
            searchStr: {
                type: String,
                required: true
            },
            friendsFilter: {
                type: Array,
                required: true
            }
        },
        data:  function(){
            return {
                books: [
                    {
                        owner: {
                            id: "1",
                            name: "Айгиз Мухамадиев",
                            link: "https://vk.com/aygiz_obstinate",
                            image: "https://pp.userapi.com/c630716/v630716015/559f0/cUjWkUZTZqI.jpg?ava=1"
                        },
                        description: {
                            title: "7 навыков высокоэффективных людей",
                            author: "Стивен Кови",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: "Могу подарить"
                    },
                    {
                        owner: {
                            id: "2",
                            name: "Ришат Галин",
                            link: "https://vk.com/choco_latepuma",
                            image: "https://m.vk.com/images/camera_100.png?ava=1"
                        },
                        description: {
                            title: "Бизнес как игра",
                            author: "Сергей Абдульманов",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: null
                    },
                    {
                        owner: {
                            id: "3",
                            name: "Руслан Билалов",
                            link: "https://vk.com/choco_latepuma",
                            image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1"
                        },
                        description: {
                            title: "Бизнес как игра",
                            author: "Сергей Абдульманов",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: null
                    },
                    {
                        owner: {
                            id: "3",
                            name: "Руслан Билалов",
                            link: "https://vk.com/choco_latepuma",
                            image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1"
                        },
                        description: {
                            title: "Бизнес как игра",
                            author: "Сергей Абдульманов",
                            image: "https://books.google.com/books/content?id=y68ZhLkkOmEC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
                        },
                        comment: null
                    }
                ]
            }
        },
        methods: {
            filterByTitleAndAuthor: function (book) {
                let searchWords = this.searchStr.toLowerCase().split(/\s+/);
                let titleWords = book.description.title.toLowerCase().split(/\s+/)
                    .concat(book.description.author.toLowerCase().split(/\s+/));
                return doArraysContainArrays(searchWords, titleWords);
            },
            filterByFriends: function (book) {
                return this.friendsFilter.includes(book.owner.id);
            }
        },
        computed: {
            filteredBooks: function(){
                let list = null;
                if (!this.searchStr.toLowerCase().split(/\s+/))
                    list = this.books;
                else
                    list = this.books.filter(this.filterByTitleAndAuthor);

                if (this.friendsFilter.length > 0){
                    list = list.filter(this.filterByFriends);
                }

                return list
            }
        }
    }
</script>