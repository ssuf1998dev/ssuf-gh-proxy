<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  type InputInst,
  NButton,
  NForm,
  NFormItem,
  NH1,
  NInput,
  NInputGroup,
  NSpace,
  NTag,
  NText,
} from "naive-ui";

import TablerArrowRight from "~icons/tabler/arrow-right";
import TablerBrandGithub from "~icons/tabler/brand-github";
import TablerHelp from "~icons/tabler/help";

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
} satisfies FormRules[string];

const urlHistory = useLocalStorage<string[]>("sgh-url-history", []);

function go(url: string) {
  window.open(`proxy/${url}`, "_blank");
}

function submit() {
  formValue.value.url = formValue.value.url.trim();

  void formRef.value?.validate((errors) => {
    if (errors?.length) {
      urlInputRef.value?.focus();
      return;
    }

    urlHistory.value = Array.from(new Set([formValue.value.url, ...urlHistory.value])).slice(0, 5);
    go(formValue.value.url);
  });
}
</script>

<template>
  <section class=":uno: w-full flex flex-col justify-center items-center">
    <div class=":uno: flex items-center gap-2 mt-24">
      <TablerBrandGithub class=":uno: w-10 h-10 color-[var(--primary-color)]" />
      <NH1 class=":uno: my-0">
        {{ t("title") }}
      </NH1>
    </div>
    <NText class=":uno: my-2 opacity-50">
      {{ t("description") }}
    </NText>

    <NForm
      ref="formRef"
      :model="formValue"
      :rules="{ url: urlInputRule }"
      class=":uno: w-1/3! max-w-160 min-w-96 mt-8"
    >
      <NFormItem path="url" :show-label="false" feedback-class=":uno: mx-2">
        <NInputGroup>
          <NInput
            ref="urlInputRef"
            v-model:value="formValue.url"
            round
            autofocus
            :input-props="{ autocomplete: 'off' }"
            :placeholder="t('help.url')"
            @input="() => {
              formRef?.restoreValidation();
            }"
            @keyup="(evt) => {
              evt.key === 'Enter' && submit();
            }"
          />
          <NButton
            type="primary"
            class=":uno: rounded-r-full"
            @click="submit"
          >
            <template #icon>
              <TablerArrowRight />
            </template>
          </NButton>
        </NInputGroup>
      </NFormItem>
    </NForm>

    <NSpace v-if="urlHistory.length" class=":uno: max-w-lg" justify="center">
      <NTag
        v-for="item in urlHistory"
        :key="item"
        :bordered="false"
        class=":uno: opacity-67 hover:opacity-100 cursor-pointer"
        @click="() => {
          go(item);
        }"
      >
        {{ item }}
      </NTag>
    </NSpace>

    <div>
      <TablerHelp class=":uno: w-4 h-4 opacity-50 hover:opacity-100 transition-opacity" />
    </div>
  </section>
</template>

<style lang="less" scoped>

</style>
