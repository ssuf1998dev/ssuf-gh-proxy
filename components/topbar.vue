<script setup lang="ts">
import { NButton, NSwitch } from "naive-ui";

import TablerSun from "~icons/tabler/sun";
import TablerMoon from "~icons/tabler/moon";
import TablerShare from "~icons/tabler/share";

const dark = defineModel<boolean>("dark", { default: false });
const showShareManager = ref(false);
</script>

<template>
  <aside class=":uno: py-6 px-8 flex justify-end items-center gap-4">
    <NButton
      quaternary
      size="small"
      @click="() => {
        showShareManager = true;
      }"
    >
      <template #icon>
        <TablerShare />
      </template>
    </NButton>

    <NSwitch v-model:value="dark" size="large" :round="false">
      <template #checked-icon>
        <TablerMoon class=":uno: scale-80" />
      </template>
      <template #unchecked-icon>
        <TablerSun class=":uno: scale-80" />
      </template>
    </NSwitch>
  </aside>

  <ShareManager v-model:show="showShareManager" />
</template>

<style lang="less" scoped>

</style>
