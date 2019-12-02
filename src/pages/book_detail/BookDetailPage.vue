<template>
    <div>
        <h1>{{book.description.title}}</h1>
        <h2>{{book.description.author}}</h2>
        <FriendTitle
                :img="owner.image"
                :name="owner.name"
                :link="owner.link"/>
        <div>
            <p>
                <img :src="book.description.image" class="description-image">
                {{book.description.description}}
            </p>
            <div v-if="ownerType==='self'">
                <BookCommentEditable :saveValue="saveComment" :value="book.comment" :bookId="book.id"/>
                <div class="actions">
                    <AppButton v-if="book.active" :onClick="deactivate" class="action-button">
                        {{ $t('book_desc.active') }}
                    </AppButton>
                    <AppButton v-else :onClick="activate" class="action-button">
                        {{ $t('book_desc.not_active') }}
                    </AppButton>
                    <AppButton :onClick="openDeleteDialog" class="action-button">
                        {{ $t('actions.delete') }}
                    </AppButton>
                </div>
            </div>
            <div v-else>
                <p>{{book.comment}}</p>

                <router-link class="route-book" :to="'/app/book/'+book.id+'/borrow/'">
                    {{ $t('actions.borrow_book') }}
                </router-link>
            </div>
        </div>
        <DialogSetting
                v-if="deleteSettings.visible"
                :title="$t('navigation.delete_book')"
                :onAccept="handleDeleteDialog"
                :cancelDialog="cancelDeleteDialog"
                :attrs="[this.book]"
                acceptTitle="actions.delete"
        >
            <i18n
                    path="dialogs.sure_to_delete"
                    tag="div"
                    id="deleteDialog"
            >
                <span place="author" id="deleteDialog_author">{{this.book.description.author}}</span>
                <span place="title" id="deleteDialog_title">"{{this.book.description.title}}"</span>
            </i18n>
        </DialogSetting>
    </div>
</template>

<script>
    import axios from 'axios';
    import FriendTitle from "../../components/ui/FriendTitle";
    import BookCommentEditable from "../../components/ui/book_card/BookCommentEditable";
    import AppButton from "../../components/ui/AppButton";
    import DialogSetting from "../../components/ui/dialog/DialogSetting";

    export default {
        name: "BookDetailPage",
        components: {
            FriendTitle,
            BookCommentEditable,
            AppButton,
            DialogSetting,
        },
        data:  function(){
            return {
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
                comment: "",
                deleteSettings: {
                    visible: false
                },
            }
        },
        methods: {
            loadBook: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/book/' + this.$route.params.id).then(function (response){
                    this.ownerType = response.data.owner_type;
                    this.book = response.data.book;
                    this.owner = response.data.owner;
                }.bind(this))
            },
            saveComment: function(bookId, value){
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + bookId + '/edit-comment/', {comment: value})
                    .then(function (response) {
                        this.loadBook()
                    }.bind(this));
            },
            activate: function() {
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + this.book.id + '/activate/')
                    .then(function (response) {
                        this.loadBook()
                    }.bind(this));
            },
            deactivate: function () {
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + this.book.id + '/deactivate/')
                    .then(function (response) {
                        this.loadBook()
                    }.bind(this));
            },
            openDeleteDialog: function (attrs) {
                this.deleteSettings.visible = true;
            },
            handleDeleteDialog: function(attrs){
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/my-books/' + this.book.id + '/delete/')
                    .then(function (response) {
                        this.$router.push({ path: '/app/my-books/' })
                    }.bind(this));
            },
            cancelDeleteDialog: function () {
                this.deleteSettings.visible = false;
            },
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
    .description-image{
        float: left;
    }
</style>