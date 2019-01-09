<template>
    <div id="mb-privacy_settings">
        <div id="mb-privacy_settings-left">
            <span>Кто видит список моих книг</span>
        </div>
        <div id="mb-privacy_settings-right">
            <select @click="onSelectOption" v-model="key">
                <option value="all-friends">Только друзья</option>
                <option value="some-friends">Некоторые друзья</option>
                <option value="some-friends-list">Некоторые списки друзей</option>
            </select>
            <div id="mb-privacy_settings-accepted_list">
                <span v-for="(item, index) in list_description">
                    {{ item.title }}
                    <span v-if="index < list_description.length - 1"> ,</span>
                </span>
            </div>
        </div>

        <FriendsWhitelist
                v-if="modalStatus==MODAL_FRIENDS"
                :cancelDialog="cancelModal"
                :onSave="saveFriendsWhitelist"
        />
        <FriendsListsWhitelist
                v-if="modalStatus==MODAL_FRIENDS_LISTS"
                :cancelDialog="cancelModal"
                :onSave="saveFriendsListsWhitelist"
        />
    </div>
</template>

<script>

import FriendsListsWhitelist from './FriendsListsWhitelist.vue'
import FriendsWhitelist from './FriendsWhitelist.vue'

const MODAL_NONE = 0
const MODAL_FRIENDS = 1
const MODAL_FRIENDS_LISTS = 2

export default {
  name: 'App',
  components: {
    FriendsListsWhitelist,
    FriendsWhitelist
  },
  data:  function(){
    return {
        key: "some-friends",
        list_description: [
            {
                title: "Семья"
            },
            {
                title: "Каюмовы"
            }
        ],
        hard_key: "some-friends",
        modalStatus: MODAL_NONE,
        MODAL_NONE: MODAL_NONE,
        MODAL_FRIENDS: MODAL_FRIENDS,
        MODAL_FRIENDS_LISTS: MODAL_FRIENDS_LISTS
    }
  },
  methods: {
    saveFriendsWhitelist: function(){
        console.log("friends saved");
        this.modalStatus = MODAL_NONE;
        this.hard_key = this.key;
    },
    saveFriendsListsWhitelist: function(){
        console.log("friends list saved");
        this.modalStatus = MODAL_NONE;
        this.hard_key = this.key;
    },
    cancelModal: function(){
        this.modalStatus = MODAL_NONE;
        this.key = this.hard_key;
    },
    onSelectOption(){
        switch(this.key){
            case "all-friends":
                this.hard_key = this.key;
                console.log("all-friends");
                break;
            case "some-friends":
                console.log("some-friends");
                this.modalStatus = MODAL_FRIENDS;
                break;
            case "some-friends-list":
                console.log("some-friends");
                this.modalStatus = MODAL_FRIENDS_LISTS;
                break;
        }
    }
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