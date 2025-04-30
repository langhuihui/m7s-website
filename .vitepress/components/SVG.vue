<template>
  <img :src="withBase(`/svg/${isDark ? 'dark/' : ''}${src}.svg`)" :alt="alt" />
</template>

<script  setup lang="ts">
import { useData, withBase } from "vitepress";
const { lang, isDark } = useData();
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
});
</script>