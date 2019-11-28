<template>
    <div id="mb-privacy_settings">
        <SettingsSelect title="navigation.who_can_see_my_books">
            <select @click="onSelectOption" v-model="privacyType">
                <option :value="ALL_FRIENDS">{{ $t('privacy.all_friends') }}</option>
                <option :value="ONLY_SOME_FRIENDS">{{ $t('privacy.only_some_friends') }}</option>
                <option :value="EXCEPT_SOME_FRIENDS">{{ $t('privacy.except_some_friends') }}</option>
                <option :value="ONLY_OWNER">{{ $t('privacy.only_owner') }}</option>
            </select>
        </SettingsSelect>

        <FriendsList v-if="privacyType===ONLY_SOME_FRIENDS" :friends="friends" selectedParam="whitelist_selected" />
        <FriendsList v-if="privacyType===EXCEPT_SOME_FRIENDS" :friends="friends" selectedParam="blacklist_selected" />

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
    import SettingsSelect from "../../components/ui/SettingsSelect";

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
            SettingsSelect,
        },
        data:  function(){
            return {
                privacyType: undefined,
                privacyTypeOriginal: undefined,
                friends: [],
                friendsOriginal: [],
                ALL_FRIENDS: ALL_FRIENDS,
                ONLY_OWNER: ONLY_OWNER,
                ONLY_SOME_FRIENDS: ONLY_SOME_FRIENDS,
                EXCEPT_SOME_FRIENDS: EXCEPT_SOME_FRIENDS,
                notificationVisible: false,
            }
        },
        methods: {
            save: async function(){
                switch (this.privacyType) {
                    case this.ALL_FRIENDS:
                        await axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/settings/privacy/set-all-friends/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_SOME_FRIENDS:
                        await axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/settings/privacy/set-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.whitelist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.EXCEPT_SOME_FRIENDS:
                        await axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/settings/privacy/set-except-some-friends/',{
                            selected_friends: this.friends.filter(function(friend){
                                return friend.blacklist_selected
                            }).map(friend => friend.external_id)
                        })
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                    case this.ONLY_OWNER:
                        await axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/settings/privacy/set-only-owner/')
                            .then(response => {
                                this.notificationVisible = true;
                            });
                        break;
                }
            },
            cancel: function(){
                this.privacyType = this.privacyTypeOriginal;
                this.friends = [...this.friendsOriginal];
            },
            loadSettings: function(){
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/settings/')
                    .then(response => {
                        this.privacyType = response.data.privacy_type;
                        this.privacyTypeOriginal = response.data.privacy_type;
                        switch (this.privacyType) {
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
                axios.get(process.env.VUE_APP_SERVER_URL + 'api/app/settings/privacy/friends/')
                    .then(response => {
                        this.friendsOriginal = JSON.parse(JSON.stringify( response.data.friends ));
                        this.friends = JSON.parse(JSON.stringify( response.data.friends ));
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            onSelectOption(){
                if (this.friends.length===0 &&
                    (this.privacyType===this.ONLY_SOME_FRIENDS || this.privacyType===this.EXCEPT_SOME_FRIENDS)){
                    this.loadFriendsList()
                }
            },
            hideNotification: function(){
                this.notificationVisible = false;
            }
        },
        computed:{
            changed: function () {
                if (this.privacyType !== this.privacyTypeOriginal)
                    return true;
                else if (this.privacyType===this.ONLY_SOME_FRIENDS){
                    for (let i=0 ; i<this.friends.length ; i++){
                        if (this.friends[i].whitelist_selected !== this.friendsOriginal[i].whitelist_selected)
                            return true
                    }
                    return false
                }else if (this.privacyType===this.EXCEPT_SOME_FRIENDS){
                    for (let i=0 ; i<this.friends.length ; i++){
                        if (this.friends[i].blacklist_selected !== this.friendsOriginal[i].blacklist_selected)
                            return true
                    }
                    return false
                } else
                    return false
            }
        },
        created() {
            this.loadSettings();
        }
}
</script>

<style scoped>
</style>