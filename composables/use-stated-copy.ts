export default function useTickCopy() {
  const { copy: rawCopy } = useClipboard();
  const timeouts: Record<string, NodeJS.Timeout> = {};
  const statuses = ref<Record<string, "stale" | "copied" | "failed">>({});
  const copy = async (key: string, text: string) => {
    timeouts[key] && clearTimeout(timeouts[key]);
    try {
      await rawCopy(text);
      statuses.value[key] = "copied";
    }
    catch {
      statuses.value[key] = "failed";
    }

    timeouts[key] = setTimeout(() => {
      statuses.value[key] = "stale";
    }, 1500);
  };

  return { statuses, copy };
}
