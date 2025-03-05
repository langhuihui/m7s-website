<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    class="animated-icon"
  >
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(defineProps<{
  size?: number
  viewBox?: string
}>(), {
  size: 48,
  viewBox: "0 0 64 64",
});
</script>

<style scoped>
.animated-icon {
  overflow: visible;
}

/* Common styling for SVG elements */
:deep(path),
:deep(circle),
:deep(rect),
:deep(line),
:deep(polyline),
:deep(polygon) {
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

:deep(.gradient-stroke) {
  stroke: url(#gradient);
}

:deep(.primary) {
  stroke: #bd34fe;
}

:deep(.secondary) {
  stroke: #47caff;
}
</style>
