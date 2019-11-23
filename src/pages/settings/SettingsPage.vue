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
            handleSave: async function () {
                let methods = [];
                if (this.$refs.privacySettings.changed)
                    methods.push(this.$refs.privacySettings.save());
                if (this.$refs.localeSettings.changed)
                    methods.push(this.$refs.localeSettings.save());
                await Promise.all(methods);

                if (this.$refs.localeSettings.changed)
                    window.location.reload();
                if (this.$refs.privacySettings.changed)
                    this.$refs.privacySettings.loadSettings();
            }
        }
    }
</script>

<style scoped>

</style>