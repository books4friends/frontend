<template>
    <div>
        <div v-for="borrow in borrows" v-bind:key="borrow.id">
            <FriendTitle :img="borrow.friend.image" :name="borrow.friend.name" :link="borrow.friend.link"/>
            <p>{{ borrow.book.description.title }}</p>
            <p>{{ borrow.book.description.author }}</p>
            <p> {{ $t('borrows.take_date') }}: {{ borrow.borrow_data.take_date }}</p>
            <div v-if="borrow.borrow_data.status==='new'">
                {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
                <AppButton :onClick="$refs.approveDialog.openDialog" :attrs="[borrow]">{{ $t('actions.approve') }}</AppButton>
                <AppButton :onClick="$refs.rejectDialog.openDialog" :attrs="[borrow]">{{ $t('actions.reject') }}</AppButton>
            </div>
            <div v-else-if="borrow.borrow_data.status==='approved'">
                {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
                <router-link :to="'/app/borrow/'+borrow.id+'/'">Вернуть книгу</router-link>
            </div>
            <div v-else>
                {{ $t('borrows.real_return_date') }}: {{ borrow.borrow_data.real_return_date }}
            </div>
        </div>
        <div v-if="borrows.length === 0">
            {{ $t('borrows.no_friend_borrows') }}
        </div>
        <ApproveBorrowDialog  ref="approveDialog" :afterAccept="loadBorrows"/>
        <DiscardBorrowDialog  ref="rejectDialog" :afterAccept="loadBorrows"/>
    </div>
</template>

<script>
    import axios from 'axios';

    import AppButton from "../../../components/ui/AppButton";
    import ApproveBorrowDialog from "../dialogs/ApproveBorrowDialog";
    import DiscardBorrowDialog from "../dialogs/RejectBorrowDialog";
    import FriendTitle from "../../../components/ui/FriendTitle";

    export default {
        name: "FriendsBorrowsPage",
        components: {
            AppButton,
            ApproveBorrowDialog,
            DiscardBorrowDialog,
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