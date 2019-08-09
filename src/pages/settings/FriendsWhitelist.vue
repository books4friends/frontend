<template>
    <DialogSetting title="Выберите друзей" :onAccept="onSave" :cancelDialog="cancelDialog" acceptTitle="Сохранить" >
        <div id="mb-friends_whitelist-search">
            <SearchInline :onChange="changeSearch" placeholder="Начните вводить имя друга" />
            <ToggleButton :onClick="switchFilterSelected" :selected="toFilterSelected">показать выбранных</ToggleButton>
        </div>
        <div id="mb-friends_whitelist-friends_list">
            <div v-for="friend in filteredFriends" class="mb-friends_whitelist-friends_list-item">
                <FriendTitle :img="friend.image" :name="friend.name"/>
                <CircleCheckbox :selected="friend.selected" :onClick="circleClick.bind(null, friend)"/>
            </div>
        </div>
    </DialogSetting>
</template>

<script>
    import axios from 'axios';

    import CircleCheckbox from "../../components/ui/CircleCheckbox.vue"
    import DialogSetting from "../../components/ui/dialog/DialogSetting.vue"
    import FriendTitle from "../../components/ui/FriendTitle.vue"
    import SearchInline from "../../components/ui/SearchInline.vue"
    import ToggleButton from "../../components/ui/ToggleButton.vue"
    import { doArraysContainArrays } from "../../utils/stringUtils.js"

    export default {
        components: {
            CircleCheckbox,
            DialogSetting,
            FriendTitle,
            SearchInline,
            ToggleButton
        },
        props: {
            cancelDialog:  {
                type: Function,
                required: true
            },
            onSave:  {
                type: Function,
                required: true
            }
        },
        data: function(){
            return {
                searchStr: "",
                toFilterSelected: false,
                friends: []
            }
        },
        methods: {
            loadFriendsList: function(){
                axios.get('http://127.0.0.1:8000/app/api/settings/friends-list/')
                    .then(response => {
                        this.friends = response.data.friends
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            circleClick: function (friend) {
                friend.selected = !friend.selected;
            },
            changeSearch: function (str) {
                this.searchStr = str;
            },
            filterBySearchWord: function (friend) {
                let searchWords = this.searchStr.toLowerCase().split(/\s+/);
                let nameWords = friend.name.toLowerCase().split(/\s+/);
                return doArraysContainArrays(searchWords, nameWords);
            },
            switchFilterSelected: function(){
                this.toFilterSelected = !this.toFilterSelected;
            }
        },
        created() {
            this.loadFriendsList();
        },
        computed: {
            filteredFriends: function(){
                let list = null;
                if (!this.searchStr.toLowerCase().split(/\s+/))
                    list = this.friends;
                else
                    list = this.friends.filter(this.filterBySearchWord)

                if (this.toFilterSelected)
                    list = list.filter(friend => friend.selected);

                return list
            }
        }
    }

</script>


<style scoped>
#mb-friends_whitelist-search{
    border-bottom: 1px solid #e6e7eb;
}
#mb-friends_whitelist-search > div{
    display: inline-block;
}

#mb-friends_whitelist-friends_list{
    height: 350px;
    overflow-y: scroll;
}
.mb-friends_whitelist-friends_list-item{
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e6e7eb;
    position: relative;
}
</style>