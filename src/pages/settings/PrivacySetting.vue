<template>
    <div id="mb-privacy_settings">
        <div id="mb-privacy_settings-left">
            <span>Кто видит список моих книг</span>
        </div>
        <div id="mb-privacy_settings-right">
            <select @click="onSelectOption" v-model="key">
                <option value="ALL_FRIENDS">Только друзья</option>
                <option value="SOME_FRIENDS">Некоторые друзья</option>
            </select>
            <div id="mb-privacy_settings-accepted_list">
                <span v-for="(item, index) in list_description">
                    {{ item.title }}
                    <span v-if="index < list_description.length - 1"> ,</span>
                </span>
            </div>
        </div>

        <FriendsWhitelist v-if="key==='SOME_FRIENDS'" :friends="friends"/>

        <AppButton :onClick="handleCancel" transparent>Отмена</AppButton>
        <AppButton :onClick="handleAccept" >Сохранить</AppButton>
    </div>
</template>

<script>
    import axios from 'axios';

    import AppButton from "../../components/ui/AppButton.vue"
    import FriendsWhitelist from './FriendsWhitelist.vue'

    export default {
        name: 'App',
        components: {
            FriendsWhitelist,
            AppButton
        },
        data:  function(){
            return {
                key: "SOME_FRIENDS",
                list_description: [
                    {
                        title: "Семья"
                    },
                    {
                        title: "Каюмовы"
                    }
                ],
                friends: []
            }
        },
        methods: {
            handleAccept: function(){
                console.log("friends saved");
            },
            handleCancel: function(){

            },
            loadFriendsList: function(){
                if (this.friends.length === 0)
                    axios.get('http://127.0.0.1:8000/app/api/settings/friends-list/')
                        .then(response => {
                            this.friends = response.data.friends
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
            },
            onSelectOption(){
                if (this.key==='SOME_FRIENDS'){
                    this.loadFriendsList()
                }
            }
        },
        created() {
            this.loadFriendsList();
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