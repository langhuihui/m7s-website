<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="['ring-buffer', props.className]"
  >
    <!-- 背景 -->
    <circle cx="200" cy="200" r="200" class="ring-background" />

    <!-- 分段圆环 - 使用多个圆弧代替完整圆环 -->
    <g
      class="ring-segments"
      :style="{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: 'center',
      }"
    >
      <path
        v-for="(segment, index) in segments"
        :key="index"
        :d="describeArc(200, 200, 140, segment.startAngle, segment.endAngle)"
        :class="{
          'segment-active': segment.active,
          'segment-filled': segment.filled,
        }"
        stroke="currentColor"
        stroke-width="30"
        stroke-linecap="butt"
        fill="none"
      />
    </g>

    <!-- 分隔线 -->
    <g
      class="segment-dividers"
      :style="{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: 'center',
      }"
    >
      <line
        v-for="(angle, index) in dividerAngles"
        :key="'divider-' + index"
        :x1="200 + 125 * Math.cos((angle * Math.PI) / 180)"
        :y1="200 + 125 * Math.sin((angle * Math.PI) / 180)"
        :x2="200 + 155 * Math.cos((angle * Math.PI) / 180)"
        :y2="200 + 155 * Math.sin((angle * Math.PI) / 180)"
        class="divider-line"
      />
    </g>

    <!-- 外环指示器 -->
    <circle
      cx="200"
      cy="200"
      r="170"
      class="indicator-circle"
      stroke-dasharray="4 4"
      fill="none"
    />

    <!-- 内环指示器 -->
    <circle
      cx="200"
      cy="200"
      r="110"
      class="indicator-circle"
      stroke-dasharray="4 4"
      fill="none"
    />

    <!-- 发光动画 -->
    <circle cx="200" cy="200" r="30" class="glow-effect">
      <animate
        attributeName="opacity"
        values="0.3;0.6;0.3"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="r"
        values="28;32;28"
        dur="3s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- 旋转齿轮 -->
    <g
      class="gear"
      :style="{
        transform: `rotate(${-rotationAngle}deg)`,
        transformOrigin: 'center',
      }"
    >
      <path
        style="transform: scale(1.5)"
        d="M200,185 L203,170 L197,170 Z M200,215 L203,230 L197,230 Z M185,200 L170,203 L170,197 Z M215,200 L230,203 L230,197 Z M188,188 L177,177 L183,183 Z M212,188 L223,177 L217,183 Z M188,212 L177,223 L183,217 Z M212,212 L223,223 L217,217 Z"
        fill="currentColor"
        class="gear-path"
      />
      <circle
        cx="200"
        cy="200"
        r="40"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        class="gear-circle"
      />
    </g>

    <text
      x="200"
      y="220"
      text-anchor="middle"
      class="center-text"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
    >
      v5
    </text>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

interface Props {
  width?: number;
  height?: number;
  className?: string;
  speed?: number; // 0-100之间的值，表示速度百分比
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  className: "",
  speed: 0, // 默认为最慢速度
});

interface Segment {
  startAngle: number;
  endAngle: number;
  active: boolean;
  filled: boolean;
}

// 创建12个分段
const segmentCount = 12;
const segments = ref<Segment[]>([]);
const dividerAngles = ref<number[]>([]);

// 初始化分段
for (let i = 0; i < segmentCount; i++) {
  const startAngle = i * (360 / segmentCount);
  const endAngle = (i + 1) * (360 / segmentCount) - 1; // 留出1度间隔
  segments.value.push({
    startAngle,
    endAngle,
    active: false,
    filled: false,
  });
  dividerAngles.value.push(i * (360 / segmentCount));
}

// 动画计时器和速度控制
let animationTimer: number | null = null;
let currentWriteIndex = 0;
const maxInterval = 600; // 最大间隔（毫秒）
const minInterval = 50; // 最小间隔（毫秒）
let currentInterval = maxInterval;
let lastUsedInterval = maxInterval; // 记录上一次使用的间隔

// 添加旋转角度状态
const rotationAngle = ref(0);
// 基于props.speed计算旋转速度
const rotationSpeed = ref(0);
// 目标速度和当前实际速度
const targetSpeed = ref(props.speed);
const currentSpeed = ref(0);
// 速度过渡动画
let speedTransitionTimer: number | null = null;

// 旋转动画
let rotationTimer: number | null = null;

// 根据速度属性计算动画间隔
const calculateInterval = (speed: number) => {
  // 将0-100的速度映射到最大间隔-最小间隔
  return maxInterval - ((maxInterval - minInterval) * speed) / 100;
};

// 平滑过渡到目标速度
const transitionToTargetSpeed = () => {
  // 如果当前速度接近目标速度，则直接设置为目标速度
  if (Math.abs(currentSpeed.value - targetSpeed.value) < 0.3) {
    currentSpeed.value = targetSpeed.value;
    if (speedTransitionTimer !== null) {
      cancelAnimationFrame(speedTransitionTimer);
      speedTransitionTimer = null;
    }
  } else {
    // 否则，逐渐向目标速度过渡
    // 使用缓动函数使过渡更平滑自然
    const step = (targetSpeed.value - currentSpeed.value) * 0.01;
    currentSpeed.value += step;

    // 更新基于当前实际速度的间隔和旋转速度
    currentInterval = calculateInterval(currentSpeed.value);
    rotationSpeed.value = -360 / (currentInterval * 2);

    // 继续动画
    speedTransitionTimer = requestAnimationFrame(transitionToTargetSpeed);
  }
};

// 更新旋转速度
const updateRotationSpeed = (newSpeed) => {
  const speedValue = Math.max(0, Math.min(100, newSpeed));
  targetSpeed.value = speedValue;
  // 如果没有正在进行的过渡动画，启动一个
  if (speedTransitionTimer === null) {
    speedTransitionTimer = requestAnimationFrame(transitionToTargetSpeed);
  }
};

// 监听speed属性变化
watch(() => props.speed, updateRotationSpeed, { immediate: true });

const updateRotation = () => {
  rotationAngle.value += rotationSpeed.value;
  rotationTimer = requestAnimationFrame(updateRotation);
};

// 创建圆弧路径
const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

// 极坐标转笛卡尔坐标
const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

// 模拟环形缓冲区操作
const simulateRingBuffer = () => {
  // 检查间隔是否发生变化
  if (currentInterval !== lastUsedInterval) {
    // 更新定时器使用新的间隔
    if (animationTimer !== null) {
      clearInterval(animationTimer);
    }
    animationTimer = window.setInterval(simulateRingBuffer, currentInterval);
    // 更新记录的间隔
    lastUsedInterval = currentInterval;
  }

  // 重置所有节点状态
  segments.value.forEach((segment) => {
    segment.active = false;
    segment.filled = true;
  });

  // 设置当前节点为active状态
  segments.value[currentWriteIndex].active = false;

  // 设置下一个节点为filled状态
  const nextIndex = (currentWriteIndex + 1) % segmentCount;
  segments.value[nextIndex].filled = false;
  segments.value[nextIndex].active = true;
  // 更新写入索引
  currentWriteIndex = nextIndex;
};

onMounted(() => {
  // 启动动画
  animationTimer = window.setInterval(simulateRingBuffer, currentInterval);
  // 启动旋转动画
  rotationTimer = requestAnimationFrame(updateRotation);
});

onUnmounted(() => {
  if (animationTimer !== null) {
    clearInterval(animationTimer);
  }
  if (rotationTimer !== null) {
    cancelAnimationFrame(rotationTimer);
  }
  if (speedTransitionTimer !== null) {
    cancelAnimationFrame(speedTransitionTimer);
  }
});
</script>

<style scoped>
/* 基础的环形缓冲区样式 */
.ring-buffer {
  /* 使用VitePress的变量来定义颜色 */
  --ring-bg-color: var(--vp-c-bg-alt); /* 背景色使用VitePress背景色替代品 */
  --ring-text-color: var(--vp-c-text-1);
  --ring-active-color: var(--vp-c-brand);
  --ring-filled-opacity: 0.15;
  --ring-indicator-opacity: 0.3;
  --ring-divider-color: var(--vp-c-divider);
  color: var(--vp-c-text-1); /* 设置默认文本颜色 */
  cursor: pointer;
}

/* 背景圆形 */
.ring-background {
  fill: var(--ring-bg-color);
}

/* 分隔线 */
.divider-line {
  stroke: var(--ring-divider-color);
  stroke-width: 2;
}

/* 指示器圆 */
.indicator-circle {
  stroke: var(--ring-text-color);
  stroke-opacity: var(--ring-indicator-opacity);
  stroke-width: 1;
}

/* 活跃段落 */
.segment-active {
  stroke: var(--ring-active-color);
  stroke-opacity: 1;
  filter: drop-shadow(0 0 8px var(--ring-active-color));
}

.segment-filled {
  stroke-opacity: var(--ring-filled-opacity);
  filter: drop-shadow(0 0 12px var(--ring-active-color));
  transition: all 3s ease;
}

.pointer-arrow {
  filter: drop-shadow(0 0 3px currentColor);
}

.data-point {
  filter: drop-shadow(0 0 4px currentColor);
}

.ring-segments,
.segment-dividers {
  transition: transform 0.05s linear;
}

.gear-path,
.gear-circle {
  opacity: 0.3;
}

.center-text {
  font-family: "Tahoma", serif;
  font-size: 48px;
  font-weight: bold;
  filter: drop-shadow(0 0 8px var(--ring-active-color));
  paint-order: stroke fill;
  stroke-opacity: 0.3;
}

.glow-effect {
  fill: var(--ring-active-color);
  opacity: 0.3;
  filter: blur(8px);
  mix-blend-mode: screen;
}

@keyframes textGlow {
  0% {
    filter: drop-shadow(0 0 8px var(--ring-active-color));
    stroke-opacity: 0.2;
  }
  50% {
    filter: drop-shadow(0 0 12px var(--ring-active-color));
    stroke-opacity: 0.4;
  }
  100% {
    filter: drop-shadow(0 0 8px var(--ring-active-color));
    stroke-opacity: 0.2;
  }
}

.center-text {
  animation: textGlow 2s ease-in-out infinite;
}

.gear {
  transform-origin: center;
  animation: gearRotate 10s linear infinite;
}

@keyframes gearRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
