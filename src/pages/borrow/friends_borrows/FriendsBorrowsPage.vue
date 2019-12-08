<template>
    <div>
        <div v-for="borrow in borrows" v-bind:key="borrow.id">
            <FriendTitle :img="borrow.friend.image" :name="borrow.friend.name" :link="borrow.friend.link"/>
            <p>{{ borrow.book.description.title }}</p>
            <p>{{ borrow.book.description.author }}</p>
            <p> {{ $t('borrows.take_date') }}: {{ borrow.borrow_data.take_date }}</p>
            <p v-if="borrow.borrow_data.real_return_date">
                {{ $t('borrows.real_return_date') }}: {{ borrow.borrow_data.real_return_date }}
            </p>
            <p v-else>
                {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
                 <router-link :to="'/app/borrow/'+borrow.id+'/'">Вернуть книгу</router-link>
            </p>
        </div>
        <div v-if="borrows.length === 0">
            {{ $t('borrows.no_friend_borrows') }}
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import FriendTitle from "../../../components/ui/FriendTitle";

    export default {
        name: "FriendsBorrowsPage",
        components: {
            FriendTitle
        },
        data: () => {
            return{
                borrows: [],
                ownerType: ''
            }
        },
        methods: {
            loadBorrows: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/friends/')
                    .then(response => {
                        this.borrows = response.data.borrows
                    })
            },
        },
        mounted: function () {
            this.loadBorrows()
        },
        activated: function () {
            if (this.$route.query.reload){
                this.$router.push({path: '/app/friends-borrows/'});
                this.loadBorrows()
            }
        },
    }
</script>

<style scoped>

</style>