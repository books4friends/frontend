<template>
    <DialogSetting
            v-if="visible"
            :title="$t('navigation.cancel_borrow')"
            :onAccept="handleAccept"
            :cancelDialog="cancelDialog"
            acceptTitle="actions.yes"
            cancelTitle="actions.no"
    >
        <i18n
                path="dialogs.sure_to_cancel_borrow"
                tag="div"
        >
            <span place="author">{{borrow.book.description.author}}</span>
            <span place="title">"{{borrow.book.description.title}}"</span>
        </i18n>
    </DialogSetting>
</template>

<script>
    import axios from 'axios';
    import DialogSetting from "../../../components/ui/dialog/DialogSetting";

    export default {
        name: "CancelBorrowDialog",
        components: {
            DialogSetting
        },
        props: {
            afterAccept: {
                type: Function,
                required: true
            }
        },
        data: function () {
            return {
                borrow: {
                    id: '',
                    book: {
                        description: {
                            author: '',
                            title: ''
                        },
                    }
                },
                visible: false,
            }
        },
        methods: {
            openDialog: function (borrow) {
                this.borrow = borrow[0];
                this.visible = true;
            },
            handleAccept: function(){
                axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/borrows/' + this.borrow.id + '/cancel/')
                    .then(function (response) {
                        this.afterAccept(this.borrow)
                    }.bind(this));
                this.visible = false;
            },
            cancelDialog: function () {
                this.visible = false;
            },
        }
    }
</script>