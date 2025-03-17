<template>
  <div class="database-item">
    <div class="db-box db-gradient">
      <Icon :icon="iconify" />
    </div>
    <div class="db-text">{{ name }}</div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  iconify: {
    type: String,
    required: true,
    description: "完整的Iconify图标名称",
  },
});
</script>

<style scoped>
.database-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.db-box {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  /* border: 1px solid var(--border-color); */
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-color);
}

.db-gradient {
  background: transparent;
}

.db-box svg {
  width: 30px;
  height: 30px;
}

.db-text {
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
}
</style>
