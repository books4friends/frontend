<template>
    <div>
        <div v-for="borrow in borrows" v-bind:key="borrow.id">
            <FriendTitle :img="borrow.owner.image" :name="borrow.owner.name" :link="borrow.owner.link"/>
            <p>{{ borrow.book.description.title }}</p>
            <p>{{ borrow.book.description.author }}</p>
            <p> {{ $t('borrows.take_date') }}: {{ borrow.borrow_data.take_date }}</p>
            <p v-if="borrow.borrow_data.real_return_date">
                {{ $t('borrows.real_return_date') }}: {{ borrow.borrow_data.real_return_date }}
            </p>
            <p v-else>
                {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
            </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import FriendTitle from "../../../components/ui/FriendTitle";

    export default {
        name: "MyBorrowsPage",
        components: {
            FriendTitle
        },
        data: () => {
            return{
                borrows: []
            }
        },
        methods: {
            loadBorrows: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/my/')
                    .then(response => {
                        this.borrows = response.data.borrows
                    })
            }
        },
        mounted: function () {
            this.loadBorrows()
        },
        activated: function () {
            if (this.$route.query.reload){
                this.$router.push({path: '/app/my-borrows/'});
                this.loadBorrows()
            }
        },
    }
</script>

<style scoped>

</style>