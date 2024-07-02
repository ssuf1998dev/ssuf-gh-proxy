<script setup lang="ts">
import { generate } from "@arco-design/color";
import { type GlobalThemeOverrides, NConfigProvider, NElement, NGlobalStyle, darkTheme, enUS, zhCN } from "naive-ui";

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

const dark = ref(false);
</script>

<template>
  <NConfigProvider
    :theme-overrides="theme"
    :locale="{
      zh_CN: zhCN,
      en: enUS,
    }[locale] ?? enUS"
    inline-theme-disabled
    :theme="dark ? darkTheme : undefined"
  >
    <NGlobalStyle />
    <NuxtRouteAnnouncer />
    <NElement>
      <main class=":uno: w-full h-full">
        <span
          class=":uno: pointer-events-none bg-gradient-to-b from-[var(--primary-color)] to-50% pos-absolute w-full h-full transition-opacity"
          :class="[{ ':uno: opacity-15': !dark, ':uno: opacity-30': dark }]"
        />
        <Topbar v-model:dark="dark" />
        <NuxtPage />
      </main>
    </NElement>
  </NConfigProvider>
</template>

<style lang="less">

</style>
