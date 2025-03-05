<template>
  <BaseIcon>
    <defs>
      <linearGradient
        id="lightningGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stop-color="#ffdd40" />
        <stop offset="100%" stop-color="#ff7e5f" />
      </linearGradient>
    </defs>

    <!-- Lightning Bolt -->
    <path
      d="M32 8L20 32h12l-4 24L44 32H32L32 8z"
      class="lightning"
      stroke="url(#lightningGradient)"
    />

    <!-- Speed Lines -->
    <g class="speed-lines">
      <line x1="12" y1="16" x2="24" y2="16" class="speed-line" />
      <line x1="8" y1="24" x2="20" y2="24" class="speed-line" />
      <line x1="10" y1="32" x2="18" y2="32" class="speed-line" />
      <line x1="8" y1="40" x2="20" y2="40" class="speed-line" />

      <line x1="52" y1="16" x2="40" y2="16" class="speed-line" />
      <line x1="56" y1="24" x2="44" y2="24" class="speed-line" />
      <line x1="54" y1="32" x2="46" y2="32" class="speed-line" />
      <line x1="56" y1="40" x2="44" y2="40" class="speed-line" />
    </g>

    <!-- Pulse circles -->
    <circle cx="32" cy="32" r="24" class="pulse-circle" />
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.lightning {
  stroke-width: 2.5;
  fill: rgba(255, 221, 64, 0.2);
  animation: flash 2s infinite;
}

.speed-line {
  stroke: #47caff;
  stroke-width: 1.5;
  opacity: 0;
  animation: slide 1.5s infinite;
}

.speed-lines line:nth-child(2) {
  animation-delay: 0.2s;
}
.speed-lines line:nth-child(3) {
  animation-delay: 0.4s;
}
.speed-lines line:nth-child(4) {
  animation-delay: 0.6s;
}
.speed-lines line:nth-child(5) {
  animation-delay: 0.1s;
}
.speed-lines line:nth-child(6) {
  animation-delay: 0.3s;
}
.speed-lines line:nth-child(7) {
  animation-delay: 0.5s;
}
.speed-lines line:nth-child(8) {
  animation-delay: 0.7s;
}

.pulse-circle {
  stroke: rgba(71, 202, 255, 0.5);
  stroke-width: 1;
  fill: none;
  opacity: 0;
  animation: pulse 2s infinite;
}

@keyframes flash {
  0%,
  90%,
  100% {
    stroke-width: 2.5;
    filter: drop-shadow(0 0 2px rgba(255, 221, 64, 0));
  }
  50% {
    stroke-width: 3;
    filter: drop-shadow(0 0 6px rgba(255, 221, 64, 0.8));
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateX(-4px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
