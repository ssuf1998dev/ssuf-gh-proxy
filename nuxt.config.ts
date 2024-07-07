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
    enabled: true,
    users: [{ username: "admin", password: "admin" }],
    env: {
      disabled: "SGP_DISABLE_AUTH",
      users: "SGP_USERS",
    },
    allowedRoutes: ["/share/.*"],
  },
});
