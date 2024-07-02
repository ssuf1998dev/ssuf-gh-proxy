<script setup lang="ts">
import { generate } from "@arco-design/color";
import { type GlobalThemeOverrides, NConfigProvider, NElement, enUS, zhCN } from "naive-ui";

const colors = generate("#37B7C3", { list: true });
const theme = {
  common: {
    primaryColor: colors[5],
    primaryColorHover: colors[4],
    primaryColorSuppl: colors[4],
    primaryColorPressed: colors[6],
  },
} satisfies GlobalThemeOverrides;

const { locale, t } = useI18n();

useHead({
  titleTemplate: title => [title, t("title")].filter(Boolean).join(" - "),
});
</script>

<template>
  <NConfigProvider
    :theme-overrides="theme"
    :locale="{
      zh_CN: zhCN,
      en: enUS,
    }[locale] ?? enUS"
    inline-theme-disabled
  >
    <NuxtRouteAnnouncer />
    <NElement>
      <main class=":uno: w-screen h-screen">
        <span class=":uno: pointer-events-none bg-gradient-to-b from-[var(--primary-color)] to-50% opacity-15 pos-absolute w-full h-full" />
        <NuxtPage />
      </main>
    </NElement>
  </NConfigProvider>
</template>

<style lang="less">

</style>
