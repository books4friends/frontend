<template>
    <div id="mb-privacy_settings">
        <div id="mb-privacy_settings-left">
            <span>Кто видит список моих книг</span>
        </div>
        <div id="mb-privacy_settings-right">
            <select @click="onSelectOption" v-model="key">
                <option :value="ALL_FRIENDS">Все друзья</option>
                <option :value="ONLY_SOME_FRIENDS">Некоторые друзья</option>
                <option :value="EXCEPT_SOME_FRIENDS">Всех, кроме некоторых друзей</option>
                <option :value="ONLY_OWNER">Только я</option>
            </select>
            <div id="mb-privacy_settings-accepted_list">
                <span v-for="(item, index) in list_description">
                    {{ item.title }}
                    <span v-if="index < list_description.length - 1"> ,</span>
                </span>
            </div>
        </div>

        <FriendsList v-if="key===ONLY_SOME_FRIENDS" :friends="friends" selectedParam="whitelist_selected" />
        <FriendsList v-if="key===EXCEPT_SOME_FRIENDS" :friends="friends" selectedParam="blacklist_selected" />

        <AppButton :onClick="handleCancel" transparent>Отмена</AppButton>
        <AppButton :onClick="handleAccept" >Сохранить</AppButton>
        <NotificationWindow :close="hideNotification" v-if="notificationVisible">
            Настройки сохранены
        </NotificationWindow>
    </div>
</template>

<script>
    import axios from 'axios';

    import AppButton from "../../components/ui/AppButton.vue"
    import FriendsList from './FriendsList.vue'
    import NotificationWindow from "../../components/ui/NotificationWindow"

    const ALL_FRIENDS = 0;
    const ONLY_OWNER = 1;
    const ONLY_SOME_FRIENDS = 2;
    const EXCEPT_SOME_FRIENDS = 3;

    export default {
        name: 'App',
        components: {
            AppButton,
            FriendsList,
            NotificationWindow,
        },
        data:  function(){
            return {
                key: undefined,
                list_description: [],
                friends: [],
                ALL_FRIENDS: ALL_FRIENDS,
                ONLY_OWNER: ONLY_OWNER,
                ONLY_SOME_FRIENDS: ONLY_SOME_FRIENDS,
                EXCEPT_SOME_FRIENDS: EXCEPT_SOME_FRIENDS,
                notificationVisible: false,
            }
        },
        methods: {
            handleAccept: function(){
                switch (this.key) {
                    case this.ALL_FRIENDS:
                        axios.post('http://127.0.0.1:8000/app/api/settings/privacy/set-all-friends/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_SOME_FRIENDS:
                        axios.post('http://127.0.0.1:8000/app/api/settings/privacy/set-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.whitelist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.EXCEPT_SOME_FRIENDS:
                        axios.post('http://127.0.0.1:8000/app/api/settings/privacy/set-except-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.blacklist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_OWNER:
                        axios.post('http://127.0.0.1:8000/app/api/settings/privacy/set-only-owner/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                }
            },
            handleCancel: function(){
                this.loadSettings();
            },
            loadSettings: function(){
                axios.get('http://127.0.0.1:8000/app/api/settings/')
                    .then(response => {
                        this.key = response.data.privacy_type;
                        switch (this.key) {
                            case this.ONLY_SOME_FRIENDS:
                            case this.EXCEPT_SOME_FRIENDS:
                                this.loadFriendsList();
                                break;
                        }
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            loadFriendsList: function(){
                axios.get('http://127.0.0.1:8000/app/api/settings/privacy/friends/')
                    .then(response => {
                        this.friends = response.data.friends
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            onSelectOption(){
                if (this.friends.length===0 &&
                    (this.key===this.ONLY_SOME_FRIENDS || this.key===this.EXCEPT_SOME_FRIENDS)){
                    this.loadFriendsList()
                }
            },
            hideNotification: function(){
                this.notificationVisible = false;
            }
        },
        created() {
            this.loadSettings();
        }
}
</script>

<style scoped>
    #mb-privacy_settings-left{
        width: 400px;
        display: inline-block;
        vertical-align: top;
    }
    #mb-privacy_settings-right {
        width: 350px;
        display: inline-block;

    }

    #mb-privacy_settings-right > select{
        width: 200px;
        font-size: 16px;
        height: 34px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        color: #2a5885;
        text-decoration: none;
        cursor: pointer;
    }
    #mb-privacy_settings-right > select:focus{
        outline: none;
    }

    #mb-privacy_settings-accepted_list{
        font-size: 12px;
    }
</style>