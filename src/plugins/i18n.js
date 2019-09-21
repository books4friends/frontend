import Vue from 'vue/dist/vue.esm.js';
import VueI18n from 'vue-i18n'

import axios from 'axios'

import en from '../locales/en'
import ru from '../locales/ru'

Vue.use(VueI18n);

const configElement = document.getElementById( 'config' );
const config = JSON.parse( configElement.innerHTML );

let locale;
if(config.locale !== 'undefined'){
    locale = config.locale;
}else{
    if (navigator.language === 'ru' || navigator.language === 'RU_ru')
        locale = 'ru';
    else
        locale = 'en';
    axios.post(process.env.VUE_APP_SERVER_URL + 'app/api/settings/locale/set/', {locale: locale});
}

const i18n = new VueI18n({
    locale: locale,
    messages:{
        en,
        ru
    },
});

export default i18n;