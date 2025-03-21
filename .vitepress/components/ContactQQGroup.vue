<template>
  <div class="contact-item">
    <span>QQ群：751639168</span>
    <div class="qr-container">
      <img :src="withBase('/img/qqgroup.jpg')" alt="QQ群" class="qr-image" />
    </div>
  </div>
</template>

<script setup>
import { withBase } from "vitepress";
</script>

<style scoped>
.contact-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.qr-container {
  margin-top: 10px;
}

.qr-image {
  width: 256px;
  border-radius: 4px;
  background: white;
  padding: 4px;
}
</style>
