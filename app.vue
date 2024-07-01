<script setup lang="ts">
import { generate } from "@arco-design/color";
import { type GlobalThemeOverrides, NConfigProvider, NElement } from "naive-ui";
import { enUS, zhCN } from "naive-ui";

const colors = generate("#37B7C3", { list: true });
const theme = {
  common: {
    primaryColor: colors[5],
    primaryColorHover: colors[4],
    primaryColorSuppl: colors[4],
    primaryColorPressed: colors[6],
  },
} satisfies GlobalThemeOverrides;

const { locale } = useI18n();
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
      <div class=":uno: w-screen h-screen color-[var(--body-color)]">
        <NuxtPage />
      </div>
    </NElement>
  </NConfigProvider>
</template>

<style lang="less">

</style>
