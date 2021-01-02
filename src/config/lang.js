import i18next from 'i18next';
import { initReactI18next } from "react-i18next";
import detector from 'i18next-browser-languagedetector';
import commonEN from '../translations/en/commonEN.json';
import commonFR from '../translations/fr/commonFR.json';
import commonJP from '../translations/jp/commonJP.json';
import commonES from '../translations/es/commonES.json';

const supportedLocales = [
    {id: 'en', label: 'English'},
    {id: 'es', label: 'Español'},
    {id: 'fr', label: 'Français'},
    {id: 'jp', label: '日本語'}
];

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['navigator']
    },
    load: 'languageOnly',
    preload: supportedLocales.map(lng => lng.id),
    supportedLngs: supportedLocales.map(lng => lng.id),
    debug: true,
    resources: {
      en: {
        common: commonEN
      },
      fr: {
        common: commonFR
      },
      jp: {
        common: commonJP
      },
      es: {
        common: commonES
      }      
    },
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    keySeparator: '.'  
  }, function(err, t) {}
);


export const lang = {
    
  supportedLocales(){
    return supportedLocales;
  },
  

  current(){
    return i18next.language.substring(0, 2);
  },

  changeLang(lng, callback){
    i18next.changeLanguage(lng).then(
      () => callback(lng)
    );
  },

  t(key, opt){
    return ((key && (key !== "")) ? i18next.t(key, opt) : "");
  }

};




/*
function updateContent() {
  return true;
}


i18next.on('languageChanged', () => {
  return true;
  //updateContent();
});
*/