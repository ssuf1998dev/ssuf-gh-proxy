<script setup lang="tsx">
import type { DataTableColumns } from "naive-ui";
import { NButton, NCard, NDataTable, NModal } from "naive-ui";
import { nanoid } from "nanoid";

import TablerTrash from "~icons/tabler/trash";
import TablerCopy from "~icons/tabler/copy";
import TablerCopyCheck from "~icons/tabler/copy-check";
import TablerCopyX from "~icons/tabler/copy-x";
import TablerX from "~icons/tabler/x";
import TablerRefresh from "~icons/tabler/refresh";

defineEmits<{ "update:show": [value: boolean] }>();
const { t } = useI18n();
const show = defineModel<boolean>("show", { default: false });

const { data: list, refresh, status } = await useFetch("/share", { method: "GET", default: () => [] });
type Row = typeof list["value"][number];
const copyShared = useStatedCopy();
const deleted = ref<Row>();
const { execute: deleteShared } = await useLazyAsyncData("deleteShared", async () => {
  if (!deleted.value) {
    return {};
  }

  const resp = await $fetch(`/share/${deleted.value.hash ?? ""}`, { method: "DELETE" });
  refresh();
  deleted.value = undefined;
  return resp;
});
watch(() => deleted.value, () => {
  deleted.value && deleteShared();
});

const columns = computed<DataTableColumns<Row>>(() => [
  {
    key: "hash",
    title: t("shared.hash"),
    ellipsis: { tooltip: true },
  },
  {
    key: "url",
    title: t("shared.url"),
    ellipsis: { tooltip: true },
  },
  {
    key: "times",
    title: t("shared.times"),
    render: ({ times }) => {
      return 3 - times;
    },
  },
  {
    key: "actions",
    title: t("actions"),
    align: "right",
    render: (row) => {
      const key = nanoid();
      return (
        <div class=":uno: flex gap-1 justify-end">
          <NButton
            quaternary
            size="small"
            class=":uno: aspect-ratio-square p-0"
            onClick={() => {
              copyShared.copy(key, `${location.protocol}//${location.host}/share/${row.hash}`);
            }}
          >
            {{
              icon: () => ({
                stale: <TablerCopy />,
                copied: <TablerCopyCheck class="color-[var(--success-color)]" />,
                failed: <TablerCopyX class="color-[var(--error-color)]" />,
              }[copyShared.statuses.value[key] || "stale"]),
            }}
          </NButton>
          <NButton
            type="error"
            quaternary
            size="small"
            class=":uno: aspect-ratio-square p-0"
            onClick={() => {
              deleted.value = row;
            }}
          >
            {{
              icon: () => <TablerTrash />,
            }}
          </NButton>
        </div>
      );
    },
  },
]);

watch(() => show.value, () => {
  show.value && refresh();
});
</script>

<template>
  <NModal
    v-model:show="show"
    to="#__nuxt .n-element"
    :auto-focus="false"
  >
    <NCard
      class=":uno: landscape:w-2xl portrait:w-full portrait:mx-4"
      :bordered="false"
      :title="t('shared.manager')"
    >
      <template #header-extra>
        <div class=":uno: flex gap-1">
          <NButton
            quaternary
            size="small"
            class=":uno: aspect-ratio-square p-0"
            @click="() => {
              refresh();
            }"
          >
            <template #icon>
              <TablerRefresh />
            </template>
          </NButton>
          <NButton
            quaternary
            size="small"
            class=":uno: aspect-ratio-square p-0"
            @click="() => {
              $emit('update:show', false);
            }"
          >
            <template #icon>
              <TablerX />
            </template>
          </NButton>
        </div>
      </template>
      <NDataTable
        :loading="status === 'pending'"
        :data="list"
        :columns="columns"
        size="small"
        :pagination="{}"
      />
    </NCard>
  </NModal>
</template>

<style lang="less" scoped>

</style>
