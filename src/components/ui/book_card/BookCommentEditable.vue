<template>
    <div>
        <BookComment class="text"><slot></slot></BookComment>
        <AppButton :onClick="foo" class="image-button" transparent/>
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
        methods: {
            foo: function() {
                console.log('cancelDialog')
            }
        }
    }

</script>

<style scoped>
    div{
        position: relative;
        display: flex;
    }
    .image-button{
        position: absolute;
        right: 0;
        width: 33px;
        height: 33px;
        background-image: url(../../../assets/images/edit-black.png);
        background-repeat:no-repeat;
        border-radius: 0px;
        background-position: 3px 1px;
    }
    .image-button:active {
        background-position: 3px 2px;
    }

</style>