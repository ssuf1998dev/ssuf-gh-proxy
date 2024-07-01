<script setup lang="ts">
import { NButton, NConfigProvider, NH2, NInput, NInputGroup, NText, darkTheme } from "naive-ui";

import TablerBrandGithub from "~icons/tabler/brand-github";
import TablerDownload from "~icons/tabler/download";

const { t } = useI18n();
</script>

<template>
  <div class=":uno: flex flex-col">
    <div class=":uno: w-full pt-24 pb-32 bg-[var(--primary-color)] flex flex-col justify-center items-center gap-2">
      <TablerBrandGithub class=":uno: w-14 h-14 color-[var(--body-color)]" />
      <NH2 class=":uno: color-[var(--body-color)] my-0">
        {{ t("title") }}
      </NH2>
      <NText class=":uno: color-[var(--body-color)]">
        {{ t("description") }}
      </NText>

      <NInputGroup class=":uno: w-1/3! max-w-128 mt-8">
        <NInput
          round
          autofocus
          :input-props="{ autocomplete: 'off' }"
          size="large"
        />

        <NConfigProvider :theme="darkTheme">
          <NButton secondary class=":uno: rounded-r-full pl-3" size="large">
            <template #icon>
              <TablerDownload class=":uno: w-6 h-6 [&_path]:stroke-width-3" />
            </template>
          </NButton>
        </NConfigProvider>
      </NInputGroup>
    </div>
    <div />
  </div>
</template>

<style lang="less" scoped>

</style>
