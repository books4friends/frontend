<template>
    <DialogSetting title="Выберите друзей" :onSave="onSave" :cancelDialog="cancelDialog">
        <div id="mb-friends_whitelist-search">
            <SearchInline placeholder="Начните вводить имя друга" />
            <ToggleButton :onClick="circleClick" selected>показать выбранных</ToggleButton>
        </div>
        <div id="mb-friends_whitelist-friends_list">
            <div class="mb-friends_whitelist-friends_list-item">
                <FriendTitle img="https://m.vk.com/images/camera_100.png?ava=1" name="Айбулат Шашкин"/>
                <div class="friend_checkbox selected"></div><CircleCheckbox :onClick="circleClick"/>
            </div>
            <div class="mb-friends_whitelist-friends_list-item">
                <FriendTitle img="https://m.vk.com/images/camera_100.png?ava=1" name="Ришат Галин"/>
                <div class="friend_checkbox selected"></div>
                <CircleCheckbox selected :onClick="circleClick"/>
            </div>
            <div class="mb-friends_whitelist-friends_list-item">
                <FriendTitle img="https://pp.userapi.com/c836120/v836120064/234f/IfGZCWGnXtc.jpg?ava=1" name="Руслан Билалов"/>
                <CircleCheckbox selected :onClick="circleClick"/>
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
        methods: {
            circleClick: function(){
                console.log('circleClick');
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