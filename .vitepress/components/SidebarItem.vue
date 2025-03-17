<template>
  <div class="sidebar-item">
    <div class="icon-box" :class="[position + '-gradient']">
      <Icon :icon="getIconName()" width="32" height="32" />
    </div>
    <div class="sidebar-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  position: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  iconify: {
    type: String,
    required: true,
    description: "完整的Iconify图标名称",
  },
  text: {
    type: String,
    required: true,
  },
});

/**
 * 获取Iconify图标名称
 * 如果有提供iconify名称则使用，否则返回默认图标
 */
const getIconName = () => {
  return props.iconify || "mdi:help-circle-outline";
};
</script>

<style scoped>
.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-box {
  width: 60px;
  height: 40px;
  border-radius: 5px;
  /* border: 1px solid var(--border-color); */
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-color);
}

.sidebar-text {
  font-size: 16px;
  margin-top: 5px;
  text-align: center;
}
</style>
