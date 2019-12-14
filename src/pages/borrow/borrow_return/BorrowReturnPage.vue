<template>
    <div>
        <FriendTitle :img="borrow.friend.image" :name="borrow.friend.name" :link="borrow.friend.link"/>
        <p>{{ borrow.book.description.title }}</p>
        <p>{{ borrow.book.description.author }}</p>
        <p> {{ $t('borrows.take_date') }}: {{ borrow.borrow_data.take_date }}</p>
        <div v-if="ownerType==='self' && borrow.borrow_data.status==='approved'">
            {{ $t('borrows.planned_return_date') }}: {{ borrow.borrow_data.planned_return_date }}
            <div>
                <label>{{ $t('borrows.keeping.label') }} </label>
                <select v-model="keeping">
                    <option selected :value="0">{{ $t('borrows.keeping.same') }}</option>
                    <option selected :value="1">{{ $t('borrows.keeping.spoiled_a_little') }}</option>
                    <option selected :value="2">{{ $t('borrows.keeping.spoiled') }}</option>
                </select>
            </div>
            <div>
                <label>{{ $t('borrows.time.label') }} </label>
                <select v-model="keeping">
                    <option selected :value="0">{{ $t('borrows.time.in_time') }}</option>
                    <option selected :value="1">{{ $t('borrows.time.late_a_little') }}</option>
                    <option selected :value="2">{{ $t('borrows.time.late') }}</option>
                </select>
            </div>
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
                },
                keeping: 0,
                time: 0
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
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/'+ this.$route.params.id + '/return/', {
                    keeping: this.keeping,
                    time: this.time
                }).then(
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