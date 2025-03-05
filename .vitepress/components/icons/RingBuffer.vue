<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="props.className"
    @mouseenter="accelerateAnimation"
    @mouseleave="normalizeAnimation"
  >
    <!-- 背景 -->
    <circle
      cx="200"
      cy="200"
      r="200"
      fill="#111"
    />
    
    <!-- 分段圆环 - 使用多个圆弧代替完整圆环 -->
    <g class="ring-segments" :style="{ transform: `rotate(${rotationAngle}deg)`, transformOrigin: 'center' }">
      <path
        v-for="(segment, index) in segments"
        :key="index"
        :d="describeArc(200, 200, 140, segment.startAngle, segment.endAngle)"
        :class="{ 'segment-active': segment.active, 'segment-filled': segment.filled }"
        stroke="currentColor"
        stroke-width="30"
        stroke-linecap="butt"
        fill="none"
      />
    </g>
    
    <!-- 分隔线 -->
    <g class="segment-dividers" :style="{ transform: `rotate(${rotationAngle}deg)`, transformOrigin: 'center' }">
      <line
        v-for="(angle, index) in dividerAngles"
        :key="'divider-'+index"
        :x1="200 + 125 * Math.cos((angle * Math.PI) / 180)"
        :y1="200 + 125 * Math.sin((angle * Math.PI) / 180)"
        :x2="200 + 155 * Math.cos((angle * Math.PI) / 180)"
        :y2="200 + 155 * Math.sin((angle * Math.PI) / 180)"
        stroke="#111"
        stroke-width="2"
      />
    </g>
    
    <!-- 外环指示器 -->
    <circle
      cx="200"
      cy="200"
      r="170"
      stroke="currentColor"
      stroke-width="1"
      stroke-opacity="0.2"
      stroke-dasharray="4 4"
      fill="none"
    />
    
    <!-- 内环指示器 -->
    <circle
      cx="200"
      cy="200"
      r="110"
      stroke="currentColor"
      stroke-width="1"
      stroke-opacity="0.2"
      stroke-dasharray="4 4"
      fill="none"
    />

    <!-- 发光动画 -->
    <circle
      cx="200"
      cy="200"
      r="30"
      class="glow-effect"
    >
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
    <g class="gear" :style="{ transform: `rotate(${-rotationAngle}deg)`, transformOrigin: 'center' }">
      <path style="transform: scale(1.5);"
        d="M200,185 L203,170 L197,170 Z M200,215 L203,230 L197,230 Z M185,200 L170,203 L170,197 Z M215,200 L230,203 L230,197 Z M188,188 L177,177 L183,183 Z M212,188 L223,177 L217,183 Z M188,212 L177,223 L183,217 Z M212,212 L223,223 L217,217 Z"
        fill="currentColor"
        fill-opacity="0.3"
      />
      <circle
        cx="200"
        cy="200"
        r="40"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-opacity="0.3"
      />
    </g>

    <!-- 中心罗马数字 V -->
    <text
      x="200"
      y="220"
      text-anchor="middle"
      class="center-text"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1"
      stroke-opacity="0.3"
    >V</text>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  width?: number
  height?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  className: ''
})

interface Segment {
  startAngle: number
  endAngle: number
  active: boolean
  filled: boolean
}

// 创建12个分段
const segmentCount = 12
const segments = ref<Segment[]>([])
const dividerAngles = ref<number[]>([])

// 初始化分段
for (let i = 0; i < segmentCount; i++) {
  const startAngle = i * (360 / segmentCount)
  const endAngle = (i + 1) * (360 / segmentCount) - 1 // 留出1度间隔
  segments.value.push({
    startAngle,
    endAngle,
    active: false,
    filled: false
  })
  dividerAngles.value.push(i * (360 / segmentCount))
}

// 动画计时器和速度控制
let animationTimer: number | null = null
let currentWriteIndex = 0
let currentReadIndex = 0
const animationSpeed = ref(1.5) // 动画持续时间（秒）
const normalInterval = 600 // 正常间隔（毫秒）
const fastInterval = 200 // 快速间隔（毫秒）
let currentInterval = normalInterval

// 添加旋转角度状态
const rotationAngle = ref(0)
// 调整旋转速度，使其与波浪动画同步
const rotationSpeed = ref(-360 / (currentInterval *2)) // 负值使其逆时针旋转，移除 *2 使速度加快

// 旋转动画
let rotationTimer: number | null = null

const updateRotation = () => {
  rotationAngle.value += rotationSpeed.value
  rotationTimer = requestAnimationFrame(updateRotation)
}

// 修改加速动画函数
const accelerateAnimation = () => {
  if (animationTimer !== null) {
    clearInterval(animationTimer)
  }
  currentInterval = fastInterval
  // 更新旋转速度
  rotationSpeed.value = -360 / (currentInterval  *2)
  animationTimer = window.setInterval(simulateRingBuffer, currentInterval)
}

// 修改恢复正常速度函数
const normalizeAnimation = () => {
  if (animationTimer !== null) {
    clearInterval(animationTimer)
  }
  currentInterval = normalInterval
  // 更新旋转速度
  rotationSpeed.value = -360 / (currentInterval  *2)
  animationTimer = window.setInterval(simulateRingBuffer, currentInterval)
}

// 创建圆弧路径
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ')
}

// 极坐标转笛卡尔坐标
const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

// 模拟环形缓冲区操作
const simulateRingBuffer = () => {
  // 重置所有节点状态
  segments.value.forEach(segment => {
    segment.active = false
    segment.filled = true
  })

  // 设置当前节点为active状态
  segments.value[currentWriteIndex].active = false

  // 设置下一个节点为filled状态
  const nextIndex = (currentWriteIndex + 1) % segmentCount
  segments.value[nextIndex].filled = false
  segments.value[nextIndex].active = true
  // 更新写入索引
  currentWriteIndex = nextIndex
}

onMounted(() => {
  // 启动动画
  animationTimer = window.setInterval(simulateRingBuffer, currentInterval)
  // 启动旋转动画
  rotationTimer = requestAnimationFrame(updateRotation)
})

onUnmounted(() => {
  if (animationTimer !== null) {
    clearInterval(animationTimer)
  }
  if (rotationTimer !== null) {
    cancelAnimationFrame(rotationTimer)
  }
})
</script>

<style scoped>
.segment-active {
  stroke: var(--vp-c-brand, currentColor);
  stroke-opacity: 1;
  filter: drop-shadow(0 0 8px var(--vp-c-brand, currentColor));
}

.segment-filled {
  stroke-opacity: 0.15;
  filter: drop-shadow(0 0 12px var(--vp-c-brand, currentColor));
  transition: all 3s ease;
}

.pointer-arrow {
  filter: drop-shadow(0 0 3px currentColor);
}

.data-point {
  filter: drop-shadow(0 0 4px currentColor);
}

.ring-segments, .segment-dividers {
  transition: transform 0.05s linear;
}

.center-text {
  font-family: "Times New Roman", serif;
  font-size: 48px;
  font-weight: bold;
  filter: drop-shadow(0 0 8px var(--vp-c-brand, currentColor));
  paint-order: stroke fill;
}

.glow-effect {
  fill: var(--vp-c-brand, currentColor);
  opacity: 0.3;
  filter: blur(8px);
  mix-blend-mode: screen;
}

@keyframes textGlow {
  0% {
    filter: drop-shadow(0 0 8px var(--vp-c-brand, currentColor));
    stroke-opacity: 0.2;
  }
  50% {
    filter: drop-shadow(0 0 12px var(--vp-c-brand, currentColor));
    stroke-opacity: 0.4;
  }
  100% {
    filter: drop-shadow(0 0 8px var(--vp-c-brand, currentColor));
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