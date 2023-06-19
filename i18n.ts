import i18next from "i18next";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import { initReactI18next } from "react-i18next";
import translationEnglish from "./Translation/English/translation.json";
import translationPolish from "./Translation/Polish/translation.json";

const resources = {
  en: {
    translation: translationEnglish,
  },
  pl: {
    translation: translationPolish,
  },
};

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
    supportedLngs: ["en", "pl"],
    ns: [],
    defaultNS: undefined,
  });

export default i18next;
