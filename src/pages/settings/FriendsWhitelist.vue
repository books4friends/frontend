<template>
    <DialogSetting title="Выберите друзей" :onSave="onSave" :cancelDialog="cancelDialog">
        <div id="mb-friends_whitelist-search">
            <SearchInline placeholder="Начните вводить имя друга" />
            <ToggleButton :onClick="circleClick" selected>показать выбранных</ToggleButton>
        </div>
        <div id="mb-friends_whitelist-friends_list">
            <div v-for="friend in friends" class="mb-friends_whitelist-friends_list-item">
                <FriendTitle :img="friend.image" :name="friend.name"/>
                <CircleCheckbox :selected="friend.selected" :onClick="circleClick.bind(null, friend)"/>
            </div>
        </div>
    </DialogSetting>
</template>

<script>
    import CircleCheckbox from "../../components/ui/CircleCheckbox.vue"
    import DialogSetting from "../../components/ui/dialog/DialogSetting.vue"
    import FriendTitle from "../../components/ui/FriendTitle.vue"
    import SearchInline from "../../components/ui/SearchInline.vue"
    import ToggleButton from "../../components/ui/ToggleButton.vue"

    export default {
        name: 'app',
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
            },
        },
        data: function(){
            return {
                friends: [
                    {
                        name: "Айбулат Шашкин",
                        image: "https://m.vk.com/images/camera_100.png?ava=1",
                        selected: false
                    },
                    {
                        name: "Ришат Галин",
                        image: "https://m.vk.com/images/camera_100.png?ava=1",
                        selected: true
                    },
                    {
                        name: "Руслан Билалов",
                        image: "https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1",
                        selected: false
                    }
                ]
            }
        },
        methods: {
            circleClick: function(friend){
                friend.selected = !friend.selected;
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
    height: 400px;
    overflow-y: scroll;
}
.mb-friends_whitelist-friends_list-item{
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e6e7eb;
    position: relative;
}
</style>