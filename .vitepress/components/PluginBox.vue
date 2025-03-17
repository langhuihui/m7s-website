<template>
  <div class="plugin-box" :class="[`${type}-gradient`]">
    <span class="plugin-text">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: "func",
    validator: (value) => ["func", "protocol", "util", "core"].includes(value),
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.plugin-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  border-radius: 5px 5px 0 0; /* 移除底部圆角 */
  border: 1px solid var(--border-color);
  text-align: center;
  position: relative; /* 添加相对定位以支持伪元素 */
  margin-bottom: 10px; /* 为小脚留出空间 */
}

/* 添加插件的小脚 */
.plugin-box::before,
.plugin-box::after {
  content: "";
  position: absolute;
  bottom: -8px;
  width: 10px;
  height: 8px;
  background-color: transparent;
  border: 1px solid var(--border-color);
  border-top: none;
}

.plugin-box::before {
  left: 25%;
}

.plugin-box::after {
  right: 25%;
}

.plugin-text {
  font-size: 12px;
}

/* Gradient backgrounds (transparent) */
.func-gradient,
.protocol-gradient,
.util-gradient,
.core-gradient {
  background: transparent;
}
</style>
