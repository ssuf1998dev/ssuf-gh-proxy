<script setup lang="ts">
import { NSwitch } from "naive-ui";

import TablerSun from "~icons/tabler/sun";
import TablerMoon from "~icons/tabler/moon";

const dark = defineModel<boolean>("dark", { default: false });
</script>

<template>
  <aside class=":uno: py-6 px-8 flex justify-end">
    <NSwitch v-model:value="dark" size="large" :round="false">
      <template #checked-icon>
        <TablerMoon class=":uno: scale-80" />
      </template>
      <template #unchecked-icon>
        <TablerSun class=":uno: scale-80" />
      </template>
    </NSwitch>
  </aside>
</template>

<style lang="less" scoped>

</style>
