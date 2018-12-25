<template>
    <DialogSetting title="Выберите списки друзей" :onSave="saveClick">
        <div id="mb-friends_list_whitelist-friends_list">
            <div class="mb-friends_list_whitelist-friends_list-item">
                <span>Родные</span>
                <CircleCheckbox :onClick="saveClick"/>
            </div>
            <div class="mb-friends_list_whitelist-friends_list-item">
                <span>Универ</span>
                <CircleCheckbox selected :onClick="saveClick"/>
            </div>
            <div class="mb-friends_list_whitelist-friends_list-item">
                <span>Школа</span>
                <CircleCheckbox selected :onClick="saveClick"/>
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
        methods: {
            saveClick: function() {
                console.log('saveClick clicked')
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