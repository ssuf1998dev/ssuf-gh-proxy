<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: title => [title, t("title")].filter(Boolean).join(" - "),
});
</script>

<template>
  <AppLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </AppLayout>
</template>

<style lang="less" scoped>

</style>
