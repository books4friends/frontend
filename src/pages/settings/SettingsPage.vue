<template>
    <div>
        <LocaleSettings ref="localeSettings"/>
        <PrivacySetting ref="privacySettings"/>

        <AppButton :onClick="handleCancel" transparent>{{ $t('actions.cancel') }}</AppButton>
        <AppButton :onClick="handleSave" >{{ $t('actions.save') }}</AppButton>
    </div>
</template>

<script>
    import AppButton from "../../components/ui/AppButton";
    import PrivacySetting from './PrivacySetting.vue'
    import LocaleSettings from "./LocaleSettings";


    export default {
        components: {
            AppButton,
            LocaleSettings,
            PrivacySetting,
        },
        methods: {
            handleCancel: function () {
                this.$refs.privacySettings.cancel();
                this.$refs.localeSettings.cancel();
            },
            handleSave: function () {
                this.$refs.privacySettings.save();
                this.$refs.localeSettings.save();
            }
        }
    }
</script>

<style scoped>

</style>