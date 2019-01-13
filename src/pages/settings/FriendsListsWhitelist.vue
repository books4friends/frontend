<template>
    <DialogSetting title="Выберите списки друзей" :onAccept="onSave" :cancelDialog="cancelDialog" acceptTitle="Сохранить">
        <div id="mb-friends_list_whitelist-friends_list">
            <div v-for="friendsList in friendsLists" class="mb-friends_list_whitelist-friends_list-item">
                <span>{{ friendsList.title }}</span>
                <CircleCheckbox :selected="friendsList.selected" :onClick="circleClick.bind(null, friendsList)"/>
            </div>
        </div>
    </DialogSetting>
</template>

<script>
    import CircleCheckbox from "../../components/ui/CircleCheckbox.vue"
    import DialogSetting from "../../components/ui/dialog/DialogSetting.vue"

    export default {
        name: 'app',
        components: {
            CircleCheckbox,
            DialogSetting
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
                friendsLists: [
                    {
                        "title": "Родные",
                        "selected": false
                    },
                    {
                        "title": "Универ",
                        "selected": false
                    },
                    {
                        "title": "Школа",
                        "selected": true
                    }
                ]
            }
        },
        methods: {
            circleClick: function(friendsList){
                friendsList.selected = !friendsList.selected;
            }
        }
    }

</script>


<style scoped>
#mb-friends_list_whitelist-friends_list{
    height: 400px;
    overflow-y: scroll;
}
.mb-friends_list_whitelist-friends_list-item{
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #e6e7eb;
    position: relative;
}
</style>