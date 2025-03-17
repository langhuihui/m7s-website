<template>
  <div class="features-list">
    <div v-for="feature in coreFeatureKeys" :key="feature" class="feature">
      <h3>{{ i18n.coreFeatures[feature].title }}</h3>
      <p>{{ i18n.coreFeatures[feature].desc }}</p>
    </div>
  </div>
</template>

<script setup>
// Props to receive i18n data from parent component
const props = defineProps({
  i18n: {
    type: Object,
    required: true,
  },
});

// Core features keys array
const coreFeatureKeys = [
  "mediaProcessing",
  "preview",
  "performanceMonitoring",
  "logManagement",
  "recordingPlayback",
  "dynamicTimeshift",
  "remoteCall",
  "streamAlias",
  "aiCapabilities",
  "webhook",
  "privateProtocol",
  "multiProtocolSupport",
];
</script>

<style scoped>
/* Features List Styles */
.feature {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.feature h3 {
  color: #47caff;
  margin-bottom: 1rem;
}

.feature p {
  color: var(--text-color-dark-2);
}
</style>
