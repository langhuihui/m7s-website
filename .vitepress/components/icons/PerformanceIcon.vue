<template>
  <BaseIcon>
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bd34fe" />
        <stop offset="100%" stop-color="#47caff" />
      </linearGradient>
    </defs>

    <!-- Rocket Body -->
    <path
      d="M32 8c-8 8-12 16-12 24v8l6 6v10l6-4v-6h4v6l6 4V46l6-6v-8c0-8-4-16-12-24z"
      class="rocket-body"
      stroke="url(#rocketGradient)"
    />

    <!-- Rocket Window -->
    <circle cx="32" cy="26" r="4" class="rocket-window" />

    <!-- Flame -->
    <g class="flames">
      <path d="M28 46c0 0 2 8 4 8 2 0 4-8 4-8" class="flame outer-flame" />
      <path d="M30 46c0 0 1 5 2 5 1 0 2-5 2-5" class="flame inner-flame" />
    </g>

    <!-- Stars -->
    <g class="stars">
      <circle cx="20" cy="15" r="1" />
      <circle cx="45" cy="12" r="1" />
      <circle cx="10" cy="30" r="1" />
      <circle cx="54" cy="30" r="1" />
      <circle cx="15" cy="50" r="1" />
      <circle cx="50" cy="45" r="1" />
    </g>
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.flames {
  transform: translate(3px, 8px);
}
.rocket-body {
  stroke-width: 2;
  animation: pulse 2s infinite alternate;
}

.rocket-window {
  fill: rgba(255, 255, 255, 0.3);
  stroke: white;
  stroke-width: 1;
}

.outer-flame {
  stroke: #ff6b6b;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 0;
  fill: none;
  animation: flicker 0.5s infinite alternate;
  transform-origin: center 46px;
}

.inner-flame {
  stroke: #ffdd40;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 0;
  fill: none;
  animation: flicker 0.35s infinite alternate;
  transform-origin: center 46px;
}

.stars circle {
  fill: white;
  stroke: none;
  animation: twinkle 1.5s infinite alternate;
  animation-delay: calc(var(--index, 0) * 0.2s);
}

.stars circle:nth-child(1) {
  --index: 1;
}
.stars circle:nth-child(2) {
  --index: 2;
}
.stars circle:nth-child(3) {
  --index: 3;
}
.stars circle:nth-child(4) {
  --index: 4;
}
.stars circle:nth-child(5) {
  --index: 5;
}
.stars circle:nth-child(6) {
  --index: 6;
}

@keyframes pulse {
  0% {
    transform: scale(1) translateY(0);
  }
  100% {
    transform: scale(1.05) translateY(-2px);
  }
}

@keyframes flicker {
  0% {
    stroke-width: 2;
    opacity: 0.8;
    transform: scaleY(0.8);
  }
  100% {
    stroke-width: 3;
    opacity: 1;
    transform: scaleY(1.2);
  }
}

@keyframes twinkle {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
