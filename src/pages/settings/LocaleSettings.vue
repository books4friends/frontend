<template>
    <SettingsSelect title="navigation.select_locale">
        <select v-model="key">
            <option value="en">English</option>
            <option value="ru">Русский</option>
        </select>
    </SettingsSelect>

</template>

<script>
    import axios from 'axios';
    import i18n from '../../plugins/i18n';

    import SettingsSelect from "../../components/ui/SettingsSelect";

    export default {
        name: "LocaleSettings",
        components: {SettingsSelect},
        data: function(){
            return {
                key: i18n.locale,
            }
        },
        methods: {
            save: async function(){
                await axios.post(process.env.VUE_APP_SERVER_URL + 'api/app/settings/locale/set/', {locale: this.key});
            },
            cancel: function () {
                this.key = i18n.locale;
            }
        },
        computed: {
            changed: function () {
                return this.key !== i18n.locale;
            }
        }
    }
</script>

<style scoped>

</style>