import zh_CN from "./zh_CN.json";
import en from "./en.json";

export default defineI18nConfig(() => ({
  locale: "zh_CN",
  fallbackLocale: "en",
  legacy: false,
  messages: {
    zh_CN,
    en,
  },
}));
