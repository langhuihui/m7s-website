<template>
  <BaseIcon>
    <defs>
      <linearGradient id="pluginGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bd34fe" />
        <stop offset="100%" stop-color="#47caff" />
      </linearGradient>
      <linearGradient id="pluginGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#47caff" />
        <stop offset="100%" stop-color="#bd34fe" />
      </linearGradient>
    </defs>

    <!-- Central Piece -->
    <path
      d="M32 23v-5a4 4 0 0 0-8 0v5h-5a4 4 0 0 0 0 8h5v5a4 4 0 0 0 8 0v-5h5a4 4 0 0 0 0-8h-5z"
      class="central-piece"
      stroke="url(#pluginGradient1)"
    />

    <!-- Plugin Pieces -->
    <g class="plugin-pieces">
      <!-- Top Plugin -->
      <path
        d="M32 12v-5a4 4 0 0 0-8 0v5h-5a4 4 0 0 0 0 8h13"
        class="plugin-piece top-piece"
        stroke="url(#pluginGradient2)"
      />

      <!-- Right Plugin -->
      <path
        d="M52 32h-5v-5a4 4 0 0 0-8 0v13"
        class="plugin-piece right-piece"
        stroke="url(#pluginGradient2)"
      />

      <!-- Bottom Plugin -->
      <path
        d="M32 52v-5h5a4 4 0 0 0 0-8h-13"
        class="plugin-piece bottom-piece"
        stroke="url(#pluginGradient2)"
      />

      <!-- Left Plugin -->
      <path
        d="M12 32h5v5a4 4 0 0 0 8 0v-13"
        class="plugin-piece left-piece"
        stroke="url(#pluginGradient2)"
      />
    </g>

    <!-- Connection dots -->
    <circle cx="32" cy="15" r="1.5" class="connect-dot" />
    <circle cx="49" cy="32" r="1.5" class="connect-dot" />
    <circle cx="32" cy="49" r="1.5" class="connect-dot" />
    <circle cx="15" cy="32" r="1.5" class="connect-dot" />
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "./base-icon.vue";
</script>

<style scoped>
.central-piece {
  fill: rgba(189, 52, 254, 0.1);
  stroke-width: 2;
  animation: pulse 3s infinite alternate;
}

.plugin-piece {
  fill: none;
  stroke-width: 2;
  opacity: 0.8;
  transform-origin: center;
}

.connect-dot {
  fill: white;
  stroke: none;
  r: 1.5;
  opacity: 0;
  animation: blink 2s infinite;
}

.top-piece {
  animation: float 3s infinite alternate;
  animation-delay: 0s;
}

.right-piece {
  animation: float 3s infinite alternate;
  animation-delay: 0.5s;
}

.bottom-piece {
  animation: float 3s infinite alternate;
  animation-delay: 1s;
}

.left-piece {
  animation: float 3s infinite alternate;
  animation-delay: 1.5s;
}

.connect-dot:nth-child(1) {
  animation-delay: 0.2s;
}

.connect-dot:nth-child(2) {
  animation-delay: 0.7s;
}

.connect-dot:nth-child(3) {
  animation-delay: 1.2s;
}

.connect-dot:nth-child(4) {
  animation-delay: 1.7s;
}

@keyframes pulse {
  0% {
    stroke-width: 2;
    filter: drop-shadow(0 0 1px rgba(189, 52, 254, 0));
  }
  100% {
    stroke-width: 2.5;
    filter: drop-shadow(0 0 4px rgba(189, 52, 254, 0.5));
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -3px);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 0;
    r: 1.5;
  }
  50% {
    opacity: 1;
    r: 2;
  }
}
</style>
