<template>
  <BaseIcon>
    <defs>
      <linearGradient id="mediaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bd34fe" />
        <stop offset="100%" stop-color="#47caff" />
      </linearGradient>
    </defs>

    <!-- Media Player Circle -->
    <circle
      cx="32"
      cy="32"
      r="20"
      class="player-circle"
      stroke="url(#mediaGradient)"
    />

    <!-- Play Triangle -->
    <polygon points="28,22 40,32 28,42" class="play-triangle" />

    <!-- Audio Waveform -->
    <g class="waveform">
      <path d="M12 32h4" class="wave-bar" />
      <path d="M18 32h4" class="wave-bar" />
      <path d="M24 27v10" class="wave-bar" />
      <path d="M28 24v16" class="wave-bar" />
      <path d="M32 20v24" class="wave-bar" />
      <path d="M36 24v16" class="wave-bar" />
      <path d="M40 27v10" class="wave-bar" />
      <path d="M46 32h4" class="wave-bar" />
      <path d="M52 32h4" class="wave-bar" />
    </g>

    <!-- Streaming Rays -->
    <g class="streaming-rays">
      <path d="M32 8c4 4 6 8 6 12" class="ray ray-1" />
      <path d="M44 12c4 4 6 8 6 12" class="ray ray-2" />
      <path d="M54 24c4 4 4 8 2 12" class="ray ray-3" />
      <path d="M54 42c0 4-2 8-6 10" class="ray ray-4" />
      <path d="M42 54c-4 2-8 2-12 2" class="ray ray-5" />
      <path d="M24 54c-4 0-8-2-12-6" class="ray ray-6" />
      <path d="M8 40c-2-4-2-8 0-12" class="ray ray-7" />
      <path d="M12 18c2-4 6-6 10-8" class="ray ray-8" />
    </g>

    <!-- Processing Dots -->
    <g class="processing-dots">
      <circle cx="32" cy="8" r="2" class="dot" />
      <circle cx="44" cy="12" r="2" class="dot" />
      <circle cx="54" cy="24" r="2" class="dot" />
      <circle cx="56" cy="36" r="2" class="dot" />
      <circle cx="54" cy="48" r="2" class="dot" />
      <circle cx="44" cy="54" r="2" class="dot" />
      <circle cx="32" cy="56" r="2" class="dot" />
      <circle cx="20" cy="54" r="2" class="dot" />
      <circle cx="10" cy="48" r="2" class="dot" />
      <circle cx="8" cy="36" r="2" class="dot" />
      <circle cx="10" cy="24" r="2" class="dot" />
      <circle cx="20" cy="12" r="2" class="dot" />
    </g>
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.player-circle {
  fill: rgba(189, 52, 254, 0.05);
  stroke-width: 1.5;
}

.play-triangle {
  fill: #47caff;
  stroke: #47caff;
  stroke-width: 1;
  animation: pulse 2s infinite alternate;
}

.wave-bar {
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 2;
  animation: waveAnimation 2s infinite alternate;
}

.wave-bar:nth-child(1) {
  animation-delay: -1.8s;
}
.wave-bar:nth-child(2) {
  animation-delay: -1.6s;
}
.wave-bar:nth-child(3) {
  animation-delay: -1.4s;
}
.wave-bar:nth-child(4) {
  animation-delay: -1.2s;
}
.wave-bar:nth-child(5) {
  animation-delay: -1s;
}
.wave-bar:nth-child(6) {
  animation-delay: -0.8s;
}
.wave-bar:nth-child(7) {
  animation-delay: -0.6s;
}
.wave-bar:nth-child(8) {
  animation-delay: -0.4s;
}
.wave-bar:nth-child(9) {
  animation-delay: -0.2s;
}

.ray {
  stroke: #bd34fe;
  stroke-width: 1.5;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  opacity: 0;
}

.ray-1 {
  animation: rayAnim 4s infinite 0s;
}
.ray-2 {
  animation: rayAnim 4s infinite 0.5s;
}
.ray-3 {
  animation: rayAnim 4s infinite 1s;
}
.ray-4 {
  animation: rayAnim 4s infinite 1.5s;
}
.ray-5 {
  animation: rayAnim 4s infinite 2s;
}
.ray-6 {
  animation: rayAnim 4s infinite 2.5s;
}
.ray-7 {
  animation: rayAnim 4s infinite 3s;
}
.ray-8 {
  animation: rayAnim 4s infinite 3.5s;
}

.dot {
  fill: #47caff;
  opacity: 0.3;
}

.dot:nth-child(1) {
  animation: dotPulse 4s infinite 0s;
}
.dot:nth-child(2) {
  animation: dotPulse 4s infinite 0.33s;
}
.dot:nth-child(3) {
  animation: dotPulse 4s infinite 0.66s;
}
.dot:nth-child(4) {
  animation: dotPulse 4s infinite 1s;
}
.dot:nth-child(5) {
  animation: dotPulse 4s infinite 1.33s;
}
.dot:nth-child(6) {
  animation: dotPulse 4s infinite 1.66s;
}
.dot:nth-child(7) {
  animation: dotPulse 4s infinite 2s;
}
.dot:nth-child(8) {
  animation: dotPulse 4s infinite 2.33s;
}
.dot:nth-child(9) {
  animation: dotPulse 4s infinite 2.66s;
}
.dot:nth-child(10) {
  animation: dotPulse 4s infinite 3s;
}
.dot:nth-child(11) {
  animation: dotPulse 4s infinite 3.33s;
}
.dot:nth-child(12) {
  animation: dotPulse 4s infinite 3.66s;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1.05);
  }
}

@keyframes waveAnimation {
  0% {
    transform: scaleY(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scaleY(1.2);
    opacity: 1;
  }
}

@keyframes rayAnim {
  0%,
  100% {
    stroke-dashoffset: 20;
    opacity: 0;
  }
  20%,
  40% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}
</style>
