<template>
    <DialogSetting title="Выберите списки друзей" :onSave="onSave" :cancelDialog="cancelDialog">
        <div id="mb-friends_list_whitelist-friends_list">
            <div v-for="friends_list in friends_lists" class="mb-friends_list_whitelist-friends_list-item">
                <span>{{ friends_list.title }}</span>
                <CircleCheckbox :selected="friends_list.selected" :onClick="circleClick"/>
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
                friends_lists: [
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
            circleClick: function(){
                console.log('circleClick');
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