<template>
  <BaseIcon>
    <defs>
      <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#47caff" />
        <stop offset="100%" stop-color="#bd34fe" />
      </linearGradient>
    </defs>

    <!-- Globe -->
    <circle cx="32" cy="32" r="20" class="globe" stroke="url(#globeGradient)" />

    <!-- Latitude Lines -->
    <path d="M12 32h40" class="latitude" />
    <path d="M14 22h36" class="latitude" />
    <path d="M14 42h36" class="latitude" />

    <!-- Longitude Lines -->
    <path d="M32 12v40" class="longitude" />
    <ellipse cx="32" cy="32" rx="10" ry="20" class="longitude" />
    <ellipse cx="32" cy="32" rx="16" ry="20" class="longitude" />

    <!-- Connection Lines -->
    <g class="connections">
      <path d="M32 12C42 18 45 28 42 38" class="connection-line connection-1" />
      <path d="M32 52C22 46 19 36 22 26" class="connection-line connection-2" />
      <path d="M12 32C18 22 28 19 38 22" class="connection-line connection-3" />

      <!-- Data Packets -->
      <circle cx="0" cy="0" r="2" class="data-packet packet-1" />
      <circle cx="0" cy="0" r="2" class="data-packet packet-2" />
      <circle cx="0" cy="0" r="2" class="data-packet packet-3" />
    </g>
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.globe {
  fill: rgba(71, 202, 255, 0.05);
  stroke-width: 1.5;
  animation: pulse 4s infinite alternate;
}

.latitude,
.longitude {
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 0.75;
}

.longitude {
  animation: rotate 20s linear infinite;
  transform-origin: center;
}

.connection-line {
  stroke: #bd34fe;
  stroke-width: 1.5;
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  opacity: 0.6;
}

.connection-1 {
  animation: dash 3s infinite;
}

.connection-2 {
  animation: dash 3s infinite 1s;
}

.connection-3 {
  animation: dash 3s infinite 2s;
}

.data-packet {
  fill: #47caff;
  stroke: none;
}

.packet-1 {
  animation: movePacket1 3s infinite;
}

.packet-2 {
  animation: movePacket2 3s infinite 1s;
}

.packet-3 {
  animation: movePacket3 3s infinite 2s;
}

@keyframes pulse {
  0% {
    stroke-width: 1.5;
  }
  100% {
    stroke-width: 2;
    filter: drop-shadow(0 0 4px rgba(71, 202, 255, 0.5));
  }
}

@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 40;
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0.6;
  }
}

@keyframes movePacket1 {
  0% {
    transform: translate(32px, 12px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(42px, 38px);
    opacity: 0;
  }
}

@keyframes movePacket2 {
  0% {
    transform: translate(32px, 52px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(22px, 26px);
    opacity: 0;
  }
}

@keyframes movePacket3 {
  0% {
    transform: translate(12px, 32px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translate(38px, 22px);
    opacity: 0;
  }
}
</style>
