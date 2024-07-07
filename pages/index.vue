<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  type InputInst,
  NAlert,
  NButton,
  NEllipsis,
  NForm,
  NFormItem,
  NH1,
  NInput,
  NInputGroup,
  NSpace,
  NTag,
  NText,
  NTooltip,
  useMessage,
} from "naive-ui";

import TablerArrowRight from "~icons/tabler/arrow-right";
import TablerBrandGithub from "~icons/tabler/brand-github";
import TablerHelp from "~icons/tabler/help";
import TablerTrash from "~icons/tabler/trash";
import TablerShare from "~icons/tabler/share";

const { t } = useI18n();

const formRef = ref<FormInst | null>(null);
const formValue = ref({ url: "" });

const urlInputRef = ref<InputInst | null>(null);
const urlInputRule = {
  required: true,
  validator: async (rule, value: string) => {
    if (!value) {
      throw new Error(t("feeback.required"));
    }
    const url = value.startsWith("https://") ? value : `https://${value}`;
    const pass = urlTests.map(test => test.test(url)).some(Boolean);
    if (!pass) {
      throw new Error(t("feeback.invalid"));
    }
  },
  trigger: ["input"],
} satisfies FormRules[string];

const urlHistory = useLocalStorage<string[]>("sgh-url-history", [], { initOnMounted: true });

function go(url: string) {
  window.open(`proxy/${url}`, "_blank");
}

function clearUrlHistory(url: string) {
  const idx = urlHistory.value.indexOf(url);
  idx !== -1 && urlHistory.value.splice(idx, 1);
}

function submit() {
  void formRef.value?.validate((errors) => {
    if (errors?.length) {
      urlInputRef.value?.focus();
      return;
    }

    urlHistory.value = Array.from(new Set([formValue.value.url, ...urlHistory.value])).slice(0, 5);
    go(formValue.value.url);
  });
}

const { copy } = useClipboard();
const message = useMessage();

function share() {
  void formRef.value?.validate(async (errors) => {
    if (errors?.length) {
      urlInputRef.value?.focus();
      return;
    }

    urlHistory.value = Array.from(new Set([formValue.value.url, ...urlHistory.value])).slice(0, 5);
    try {
      const resp = await $fetch("/share", {
        method: "POST",
        body: { url: formValue.value.url },
      });
      const hash = resp.hash;
      await copy(`${location.protocol}//${location.host}/share/${hash}`);
      message.success(t("shared.ok"));
    }
    catch {
      message.error(t("shared.no"));
    }
  });
}
</script>

<template>
  <section class=":uno: flex flex-col justify-center items-center mb-6 portrait:px-8">
    <div class=":uno: flex items-center gap-2 mt-16">
      <TablerBrandGithub class=":uno: w-11 h-11 color-[var(--primary-color)]" />
      <NH1 class=":uno: my-0">
        {{ t("title") }}
      </NH1>
    </div>
    <NText class=":uno: my-2">
      {{ t("description") }}
    </NText>

    <NForm
      ref="formRef"
      :model="formValue"
      :rules="{ url: urlInputRule }"
      class=":uno: landscape:w-1/3! landscape:max-w-164 landscape:min-w-128 portrait:w-full mt-8"
    >
      <NFormItem path="url" :show-label="false" feedback-class=":uno: mx-2">
        <NInputGroup>
          <NInput
            ref="urlInputRef"
            :value="formValue.url"
            autofocus
            :input-props="{ autocomplete: 'off' }"
            :placeholder="t('placeholder.url')"
            size="large"
            clearable
            @update:value="(value) => {
              formValue.url = value.toString().trim()
            }"
            @keyup="(evt) => {
              evt.key === 'Enter' && submit();
            }"
          />
          <NButton
            type="primary"
            size="large"
            @click="submit"
          >
            <template #icon>
              <TablerArrowRight />
            </template>
          </NButton>

          <NTooltip>
            <template #trigger>
              <NButton
                type="primary"
                secondary
                size="large"
                @click="share"
              >
                <template #icon>
                  <TablerShare />
                </template>
              </NButton>
            </template>
            {{ t('sharing') }}
          </NTooltip>
        </NInputGroup>
      </NFormItem>
    </NForm>

    <NSpace
      v-if="urlHistory.length"
      class=":uno: landscape:max-w-lg portrait:w-full mt-4 overflow-hidden"
      justify="center"
    >
      <NTag
        v-for="item in urlHistory"
        :key="item"
        class=":uno: cursor-pointer w-full [&_.n-tag\\_\\_content]:w-[calc(100%_-_18px)]"
        closable
        @close="() => {
          clearUrlHistory(item)
        }"
        @click="() => {
          go(item);
        }"
      >
        <NEllipsis class=":uno: w-full">
          {{ item }}
        </NEllipsis>
      </NTag>
      <NButton
        quaternary
        size="small"
        @click="() => {
          urlHistory = []
        }"
      >
        <TablerTrash />
      </NButton>
    </NSpace>

    <div class=":uno: mt-16 landscape:max-w-128">
      <NAlert :title="t('helping')">
        <template #icon>
          <TablerHelp />
        </template>

        <NText>{{ t('help.url') }}</NText>
      </NAlert>
    </div>
  </section>
</template>

<style lang="less" scoped>

</style>
