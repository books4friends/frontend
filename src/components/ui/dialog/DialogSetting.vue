<template>
    <div>
        <div class="setting_dialog" v-bind:style="{ top: dialogTop + 'px' }">
            <DialogHeader :cancelDialog="cancelDialog" :attrs="attrs" :title="title" />
            <div class="content" ><slot></slot></div>
            <div class="setting_dialog-control">
                <AppButton :onClick="cancelDialog" :attrs="attrs" transparent>{{ $t(cancelTitle) }}</AppButton>
                <AppButton :onClick="onAccept" :attrs="attrs">{{ $t(acceptTitle) }}</AppButton>
            </div>
        </div>
        <div class="black-background"></div>
    </div>

</template>

<script>
    import AppButton from "../AppButton.vue"
    import DialogHeader from "./DialogHeader.vue"

    export default {
        name: 'app',
        components: {
            AppButton,
            DialogHeader
        },
        props: {
            title:{
                type: String,
                required: true
            },
            onAccept: {
                type: Function,
                required: true
            },
            cancelDialog: {
                type: Function,
                required: true
            },
            cancelTitle: {
                type: String,
                required: false,
                default: 'actions.cancel'
            },
            acceptTitle: {
                type: String,
                required: false,
                default: 'actions.accept'
            },
            attrs: {
                type: Array,
                required: false,
                default: () => []
            }
        },
        data: function(){
            return {
                dialogTop: 0
            }
        },
        mounted: function () {
            this.dialogTop = window.pageYOffset + 60;
        }
    }
</script>

<style scoped>
.setting_dialog{
    position: absolute;
    top: 60px;
    width: 560px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,.35);
    outline: none;
    background-color: #fff;
    overflow: hidden;
    border-radius: 4px;
}

.setting_dialog-control{
    background-color: #fafbfc;
    text-align: right;
    border-top: 1px solid #e6e7eb;
    padding: 10px 15px;
}

.black-background{
    z-index: 500;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
}

</style>