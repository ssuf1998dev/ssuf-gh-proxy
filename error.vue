<script setup lang="ts">
import { NButton, NResult } from "naive-ui";

import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const { t } = useI18n();

useHead({ title: t("errors.happened") });

const handleError = () => clearError({ redirect: "/" });

const status = computed(() => ({
  404: "404",
  403: "403",
}[props.error.statusCode] || "error") as InstanceType<typeof NResult>["$props"]["status"]);
const title = computed(() => ({
  404: t("errors.404"),
  403: t("errors.403"),
}[props.error.statusCode] || t("errors.unknown")) as string);
</script>

<template>
  <AppLayout :show-topbar="false">
    <NResult
      :status="status"
      :title="title"
      :description="error.cause?.toString()"
      class=":uno: pt-42"
    >
      <template #footer>
        <NButton @click="handleError">
          {{ t('goBackHome') }}
        </NButton>
      </template>
    </NResult>
  </AppLayout>
</template>

<style lang="less" scoped>

</style>
