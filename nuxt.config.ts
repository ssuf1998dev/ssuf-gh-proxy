// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "nuxtjs-naive-ui",
    "unplugin-icons/nuxt",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@kgierke/nuxt-basic-auth",
  ],
  css: [
    "normalize.css",
  ],
  unocss: {
    /**
     * disable this, otherwise it will compromise `.nuxt/components.d.ts` for TypeScript
     * @see https://github.com/unocss/unocss/issues/149#issuecomment-974606897
     */
    components: false,
  },
  i18n: {
    vueI18n: "locales/index.ts",
  },
  basicAuth: {
    enabled: process.env.SGP_DISABLE_AUTH !== "true",
    users: [
      {
        username: process.env.SGP_USERNAME || "admin",
        password: process.env.SGP_PASSWORD || "admin",
      },
    ],
  },
});
