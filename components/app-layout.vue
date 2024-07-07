<script setup lang="ts">
import { generate } from "@arco-design/color";
import { type GlobalThemeOverrides, NConfigProvider, NElement, NGlobalStyle, NMessageProvider, darkTheme, enUS, zhCN } from "naive-ui";

withDefaults(defineProps<{
  showTopbar?: boolean;
}>(), {
  showTopbar: true,
});

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

const dark = useLocalStorage<boolean>("sgh-dark", false, { initOnMounted: true });
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
    <NMessageProvider>
      <NGlobalStyle />
      <NElement>
        <main class=":uno: w-full h-full min-w-md">
          <span
            class=":uno: pointer-events-none bg-gradient-to-b from-[var(--primary-color)] to-50% pos-fixed w-full h-full transition-opacity"
            :class="[{ ':uno: opacity-15': !dark, ':uno: opacity-30': dark }]"
          />
          <Topbar v-if="showTopbar" v-model:dark="dark" />
          <slot />
        </main>
      </NElement>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style lang="less" scoped>

</style>
