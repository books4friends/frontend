<template>
    <div>
        <FriendTitle :img="borrow.friend.image" :name="borrow.friend.name" :link="borrow.friend.link"/>
        <p>{{ borrow.book.description.title }}</p>
        <p>{{ borrow.book.description.author }}</p>
        <p> {{ $t('borrows.take_date') }}: {{ borrow.borrow_data.take_date }}</p>
        <p v-if="borrow.borrow_data.real_return_date">
            {{ $t('borrows.real_return_date') }}: {{ borrow.borrow_data.real_return_date }}
        </p>
        <p v-else>
            {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
        </p>
        <div v-if="ownerType==='self' && !borrow.borrow_data.real_return_date">
            <AppButton :onClick="returnBorrow">Вернуть книгу</AppButton>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import AppButton from "../../../components/ui/AppButton";
    import FriendTitle from "../../../components/ui/FriendTitle";

    export default {
        name: "BorrowsDetailPage",
        components: {
            AppButton,
            FriendTitle,
        },
        data: function(){
            return {
                ownerType: '',
                borrow: {
                    id: '',
                    friend:{
                        image: '',
                        name: '',
                        link: '',
                    },
                    book: {
                        description: {
                            title: '',
                            author: '',

                        }
                    },
                    borrow_data: {
                        take_date: '',
                        real_return_date: '',
                        planned_return_date: '',
                    }
                }
            }
        },
        methods: {
            loadBorrow: function () {
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/'+ this.$route.params.id + '/')
                    .then(response => {
                        this.borrow = response.data.borrow;
                        this.ownerType = response.data.owner_type;
                    })
            },
            returnBorrow: function () {
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/'+ this.$route.params.id + '/return/').then(
                    this.$router.push({name: 'friends-borrows', query: {reload: true}})
                )
            },
        },
        watch: {
            '$route.params.id': function (id) {
                if(id)
                    this.loadBorrow();
            }
        },
        created: function () {
            this.loadBorrow();
        },
    }
</script>

<style scoped>

</style>