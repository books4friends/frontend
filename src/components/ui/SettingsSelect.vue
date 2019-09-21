<template>
    <div>
        <div class="settings-left">
            <span>{{ $t(title) }}</span>
        </div>
        <div class="settings-right">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SettingsSelect",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .settings-left{
        width: 50%;
        display: inline-block;
    }
    .settings-right {
        width: 50%;
        display: inline-block;
        text-align: right;
    }

    select{
        font-size: 16px;
        height: 34px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        color: #2a5885;
        text-decoration: none;
        cursor: pointer;
        text-align-last: right;
    }

    select:focus{
        outline: none;
    }

    option {
        direction: rtl;
    }
</style>