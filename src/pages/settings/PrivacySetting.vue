<template>
    <div id="mb-privacy_settings">
        <div id="mb-privacy_settings-left">
            <span>{{ $t('navigation.who_can_see_my_books') }}</span>
        </div>
        <div id="mb-privacy_settings-right">
            <select @click="onSelectOption" v-model="key">
                <option :value="ALL_FRIENDS">{{ $t('privacy.all_friends') }}</option>
                <option :value="ONLY_SOME_FRIENDS">{{ $t('privacy.only_some_friends') }}</option>
                <option :value="EXCEPT_SOME_FRIENDS">{{ $t('privacy.except_some_friends') }}</option>
                <option :value="ONLY_OWNER">{{ $t('privacy.only_owner') }}</option>
            </select>
        </div>

        <FriendsList v-if="key===ONLY_SOME_FRIENDS" :friends="friends" selectedParam="whitelist_selected" />
        <FriendsList v-if="key===EXCEPT_SOME_FRIENDS" :friends="friends" selectedParam="blacklist_selected" />

        <NotificationWindow :close="hideNotification" v-if="notificationVisible">
            {{ $t('notifications.settings_saved') }}
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
                friends: [],
                ALL_FRIENDS: ALL_FRIENDS,
                ONLY_OWNER: ONLY_OWNER,
                ONLY_SOME_FRIENDS: ONLY_SOME_FRIENDS,
                EXCEPT_SOME_FRIENDS: EXCEPT_SOME_FRIENDS,
                notificationVisible: false,
            }
        },
        methods: {
            save: function(){
                switch (this.key) {
                    case this.ALL_FRIENDS:
                        axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/settings/privacy/set-all-friends/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_SOME_FRIENDS:
                        axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/settings/privacy/set-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.whitelist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.EXCEPT_SOME_FRIENDS:
                        axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/settings/privacy/set-except-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.blacklist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_OWNER:
                        axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/settings/privacy/set-only-owner/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                }
            },
            cancel: function(){
                this.loadSettings();
            },
            loadSettings: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'app/api/settings/')
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
                axios.get(process.env.VUE_APP_SERVER_URL + 'app/api/settings/privacy/friends/')
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
        width: 50%;
        display: inline-block;
    }
    #mb-privacy_settings-right {
        width: 50%;
        display: inline-block;
        text-align: right;
    }

    #mb-privacy_settings-right > select{
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
</style>