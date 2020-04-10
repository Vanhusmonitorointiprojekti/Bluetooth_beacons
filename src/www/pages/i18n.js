import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "../../locales/en/translation.json"
import translationFI from "../../locales/fi/translation.json"


i18n
.use(LanguageDetector)
.init({
    
    // we init with resources
    resources: {
      en: {
        translation: translationEN
      },
      fi: {
        translation: translationFI
      }
    },
    fallbackLng: "en",
    debug: true,
  
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
  
    keySeparator: false, // we use content as keys
  
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ","
    },
  
    react: {

      useSuspense: false,
      wait: true
    }
  });
  
  export default i18n;