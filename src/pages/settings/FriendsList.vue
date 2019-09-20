<template>
    <div class="root">
        <div class="search">
            <SearchInline :onChange="changeSearch" placeholder="filters.start_type_friends_name" />
            <ToggleButton :onClick="switchFilterSelected" :selected="toFilterSelected">
                {{ $t('actions.show_selected_friends') }}
            </ToggleButton>
        </div>
        <div class="friends_list">
            <div v-for="friend in filteredFriends" class="friends_list-item">
                <FriendTitle :img="friend.image" :name="friend.name"/>
                <CircleCheckbox :selected="friend[selectedParam]" :onClick="circleClick.bind(null, friend)"/>
            </div>
        </div>
    </div>
</template>

<script>
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
            friends:  {
                type: Array,
                required: true
            },
            selectedParam: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                searchStr: "",
                toFilterSelected: false
            }
        },
        methods: {
            circleClick: function (friend) {
                friend[this.selectedParam] = !friend[this.selectedParam];
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
        computed: {
            filteredFriends: function(){
                let list = null;
                if (!this.searchStr.toLowerCase().split(/\s+/))
                    list = this.friends;
                else
                    list = this.friends.filter(this.filterBySearchWord)

                if (this.toFilterSelected)
                    list = list.filter(friend => friend[this.selectedParam]);

                return list
            }
        }
    }

</script>


<style scoped>
.root{
    width: 600px;
    margin: auto;
}
.search{
    border-bottom: 1px solid #e6e7eb;
}
.search > div{
    display: inline-block;
}

.friends_list{
    height: 350px;
    overflow-y: scroll;
}
.friends_list-item{
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e6e7eb;
    position: relative;
}
</style>