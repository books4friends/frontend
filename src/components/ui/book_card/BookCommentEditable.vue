<template>
    <div>
        <BookComment v-if="!editing && value">{{ value }}</BookComment>
        <BookComment v-else-if="!editing && !value">Без комментария</BookComment>
        <input v-else v-model="newValue" type="text" id="edit_input" ref="edit_input" >

        <div id="buttons">
            <AppButton v-if="!editing" :onClick="startEditing" class="image-button" id="edit_image" transparent/>
            <div v-else id="cancel_and_save">
                <AppButton :onClick="cancelEditing" class="image-button" id="cancel_image" transparent/>
                <AppButton :onClick="setValue" class="image-button" id="checkmark_image" transparent/>
            </div>
        </div>
    </div>

</template>

<script>
    import AppButton from "../AppButton.vue"
    import BookComment from "./BookComment.vue"

    export default {
        components: {
            AppButton,
            BookComment
        },
        props: {
            value: {
                type: String,
                required: false
            },
            saveValue: {
                type: Function,
                required: true
            },
            bookId: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                editing: false,
                newValue: ""
            }
        },
        methods: {
            startEditing: function() {
                this.editing = true;
                let that = this;
                setTimeout(function () {
                    this.$refs.edit_input.focus();
                }.bind(this), 0);
            },
            cancelEditing: function() {
                this.editing = false;
                this.newValue = this.value;
            },
            setValue: function () {
                this.saveValue(this.bookId, this.newValue);
                this.editing = false;
            }
        },
        mounted: function () {
            this.newValue = this.value;
        }
    }

</script>

<style scoped>
    div{
        position: relative;
        display: flex;
    }
    #edit_input{
        font-family: 'PT Sans',sans-serif;
        font-size: 13px;
        padding: 8px;
        border: none;
    }
    #edit_input:focus{
        outline-width: 0;
    }
    #buttons{
        position: absolute;
        right: 0;
    }
    .image-button{
        width: 33px;
        height: 33px;
        background-repeat:no-repeat;
        border-radius: 0px;
        background-position: 3px 1px;
    }
    .image-button:active {
        background-position: 3px 2px;
    }
    #edit_image {
        background-image: url(../../../assets/images/edit-black.png);
    }
    #checkmark_image {
        background-image: url(../../../assets/images/checkmark.png);
    }
    #cancel_image {
        background-image: url(../../../assets/images/cancel.png);
    }
</style>