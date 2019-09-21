<template>
    <div>
        <PrivacySetting ref="privacySettings"/>

        <AppButton :onClick="handleCancel" transparent>{{ $t('actions.cancel') }}</AppButton>
        <AppButton :onClick="handleSave" >{{ $t('actions.save') }}</AppButton>
    </div>
</template>

<script>
    import AppButton from "../../components/ui/AppButton";
    import PrivacySetting from './PrivacySetting.vue'


    export default {
        components: {
            AppButton,
            PrivacySetting,
        },
        methods: {
            handleCancel: function () {
                this.$refs.privacySettings.cancel();
            },
            handleSave: function () {
                this.$refs.privacySettings.save();
            }
        }
    }
</script>

<style scoped>

</style>