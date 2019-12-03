<template>
    <div>
        <h1>{{ $t('actions.borrow_book') }}</h1>
        <p>{{ $t('forms.title') }}: {{book.description.title}}</p>
        <p>{{ $t('forms.author') }}: {{book.description.author}}</p>
        <p>{{ $t('forms.owner') }}:
            <FriendTitle
                :img="owner.image"
                :name="owner.name"
                :link="owner.link"/>
        </p>
        <p>
            {{ $t('forms.return_date') }}:
            <input type="date" v-model="returnDate">
        </p>
        <AppButton :onClick="borrowBook">
            {{ $t('actions.borrow_book') }}
        </AppButton>
    </div>

</template>

<script>
    import axios from 'axios';

    import FriendTitle from "../../../components/ui/FriendTitle";
    import AppButton from "../../../components/ui/AppButton";

    export default {
        name: "BorrowBookPage",
        components: {
            FriendTitle,
            AppButton
        },
        data: () => {
            return {
                returnDate: undefined,
                book: {
                    description: {
                        title: "",
                        author: "",
                        description: "",
                        image: "",
                    }
                },
                owner: {
                    link: "",
                    image: "",
                    name: ""
                },
                ownerType: "",
            }
        },
        methods: {
            loadBook: function () {
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/book/' + this.$route.params.id).then(function (response) {
                    this.ownerType = response.data.owner_type;
                    this.book = response.data.book;
                    this.owner = response.data.owner;
                }.bind(this))
            },
            borrowBook: function () {
                axios.post(
                    process.env.VUE_APP_SERVER_URL + 'api/app/borrows/create/',
                    {
                        book_id: this.$route.params.id,
                        planned_return_date: this.returnDate
                    }
                ).then(function(){
                    this.$router.push({name: 'my-borrows', query: {reload: true}})
                }.bind(this))
            }

        },
        watch: {
            '$route.params.id': function (id) {
                if(id)
                    this.loadBook();
            }
        },
        created: function () {
            this.loadBook();
        },
    }
</script>

<style scoped>

</style>