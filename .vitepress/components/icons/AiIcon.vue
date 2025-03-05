<template>
  <BaseIcon>
    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bd34fe" />
        <stop offset="100%" stop-color="#47caff" />
      </linearGradient>
    </defs>

    <!-- Brain Outline -->
    <path
      d="M32 12c-6 0-10 4-10 10 0 2-2 4-4 4-4 0-6 2-6 6s2 6 6 6c2 0 2 2 2 2v4c0 4 4 8 12 8s12-4 12-8v-4c0 0 0-2 2-2 4 0 6-2 6-6s-2-6-6-6c-2 0-4-2-4-4 0-6-4-10-10-10z"
      class="brain-outline"
      stroke="url(#aiGradient)"
    />

    <!-- Neural Network Lines -->
    <g class="neural-network">
      <!-- Left Side -->
      <path d="M24 18c-2 2-2 6-2 8" class="neural-path" />
      <path d="M20 28c-2 2-2 4-2 6" class="neural-path" />
      <path d="M20 36c0 2 2 4 4 6" class="neural-path" />
      <path d="M28 44c0 2-2 4-4 4" class="neural-path" />

      <!-- Right Side -->
      <path d="M40 18c2 2 2 6 2 8" class="neural-path" />
      <path d="M44 28c2 2 2 4 2 6" class="neural-path" />
      <path d="M44 36c0 2-2 4-4 6" class="neural-path" />
      <path d="M36 44c0 2 2 4 4 4" class="neural-path" />

      <!-- Cross Connections -->
      <path d="M24 24h16" class="neural-path" />
      <path d="M24 32h16" class="neural-path" />
      <path d="M24 40h16" class="neural-path" />
    </g>

    <!-- Neural Network Nodes -->
    <g class="nodes">
      <circle cx="24" cy="18" r="2" class="node" />
      <circle cx="20" cy="28" r="2" class="node" />
      <circle cx="20" cy="36" r="2" class="node" />
      <circle cx="24" cy="44" r="2" class="node" />
      <circle cx="24" cy="48" r="2" class="node" />

      <circle cx="40" cy="18" r="2" class="node" />
      <circle cx="44" cy="28" r="2" class="node" />
      <circle cx="44" cy="36" r="2" class="node" />
      <circle cx="40" cy="44" r="2" class="node" />
      <circle cx="40" cy="48" r="2" class="node" />

      <circle cx="32" cy="24" r="2" class="node center-node" />
      <circle cx="32" cy="32" r="2" class="node center-node" />
      <circle cx="32" cy="40" r="2" class="node center-node" />
    </g>

    <!-- Data Pulses -->
    <g class="data-pulses">
      <circle cx="0" cy="0" r="1.5" class="pulse pulse-1" />
      <circle cx="0" cy="0" r="1.5" class="pulse pulse-2" />
      <circle cx="0" cy="0" r="1.5" class="pulse pulse-3" />
      <circle cx="0" cy="0" r="1.5" class="pulse pulse-4" />
    </g>
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.brain-outline {
  fill: rgba(189, 52, 254, 0.05);
  stroke-width: 1.5;
  animation: pulse 4s infinite alternate;
}

.neural-path {
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 1;
}

.node {
  fill: #47caff;
  stroke: none;
  animation: glow 2s infinite alternate;
}

.center-node {
  fill: #bd34fe;
}

.node:nth-child(even) {
  animation-delay: 0.5s;
}

.node:nth-child(3n) {
  animation-delay: 1s;
}

.node:nth-child(3n + 1) {
  animation-delay: 1.5s;
}

.pulse {
  fill: white;
  stroke: none;
  opacity: 0;
}

.pulse-1 {
  animation: movePulse1 4s infinite;
}

.pulse-2 {
  animation: movePulse2 3s infinite 1s;
}

.pulse-3 {
  animation: movePulse3 4s infinite 2s;
}

.pulse-4 {
  animation: movePulse4 3s infinite 0.5s;
}

@keyframes pulse {
  0% {
    stroke-width: 1.5;
  }
  100% {
    stroke-width: 2;
    filter: drop-shadow(0 0 4px rgba(189, 52, 254, 0.4));
  }
}

@keyframes glow {
  0% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes movePulse1 {
  0% {
    transform: translate(24px, 18px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  45% {
    transform: translate(32px, 24px);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  55% {
    transform: translate(40px, 18px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(44px, 28px);
    opacity: 0;
  }
}

@keyframes movePulse2 {
  0% {
    transform: translate(20px, 28px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  45% {
    transform: translate(32px, 32px);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  55% {
    transform: translate(44px, 36px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(40px, 44px);
    opacity: 0;
  }
}

@keyframes movePulse3 {
  0% {
    transform: translate(44px, 28px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  45% {
    transform: translate(32px, 32px);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  55% {
    transform: translate(20px, 36px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(24px, 44px);
    opacity: 0;
  }
}

@keyframes movePulse4 {
  0% {
    transform: translate(20px, 36px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  45% {
    transform: translate(32px, 40px);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  55% {
    transform: translate(40px, 44px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(40px, 48px);
    opacity: 0;
  }
}
</style>
