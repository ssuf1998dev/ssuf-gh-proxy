<script setup lang="ts">
import { NButton, NH1, NInput, NInputGroup, NText } from "naive-ui";

import TablerBrandGithub from "~icons/tabler/brand-github";
import TablerArrowRight from "~icons/tabler/arrow-right";

const { t } = useI18n();
</script>

<template>
  <div class=":uno: flex flex-col">
    <div class=":uno: w-full pt-24 pb-32 flex flex-col justify-center items-center">
      <div class=":uno: flex items-center gap-2">
        <TablerBrandGithub class=":uno: w-10 h-10 color-[var(--primary-color)]" />
        <NH1 class=":uno: my-0">
          {{ t("title") }}
        </NH1>
      </div>
      <NText class=":uno: my-2 opacity-75">
        {{ t("description") }}
      </NText>

      <NInputGroup class=":uno: w-1/3! max-w-128 min-w-84 mt-8">
        <NInput
          round
          autofocus
          :input-props="{ autocomplete: 'off' }"
        />
        <NButton type="primary" class=":uno: rounded-r-full pl-4">
          <template #icon>
            <TablerArrowRight />
          </template>
        </NButton>
      </NInputGroup>
    </div>
    <div />
  </div>
</template>

<style lang="less" scoped>

</style>
