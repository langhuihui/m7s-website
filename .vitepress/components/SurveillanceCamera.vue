<template>
  <div class="surveillance-camera" ref="camera">
    <div class="camera-stand">
      <div class="camera-neck"></div>
      <div class="camera-head">
        <div class="camera-body"></div>
        <div class="camera-lens">
          <div class="camera-lens-inner"></div>
        </div>
        <div class="camera-indicator"></div>
      </div>
    </div>
    <div class="camera-base"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const camera = ref<HTMLElement | null>(null);

// 定义摄像头可能的角度状态
const cameraAngles = {
  center: { x: -45, y: 0 },
  left: { x: -45, y: -20 },
  right: { x: -45, y: 20 },
  up: { x: -30, y: 0 },
  down: { x: -60, y: 0 },
  upLeft: { x: -30, y: -20 },
  upRight: { x: -30, y: 20 },
  downLeft: { x: -60, y: -20 },
  downRight: { x: -60, y: 20 },
};

// 处理鼠标移动更新摄像头朝向
const handleMouseMove = (e: MouseEvent) => {
  if (!camera.value) return;

  const cameraRect = camera.value.getBoundingClientRect();
  const cameraCenterX = cameraRect.left + cameraRect.width / 2;
  const cameraCenterY = cameraRect.top + cameraRect.height / 2;

  // 计算鼠标与摄像头中心的相对位置
  const deltaX = e.clientX - cameraCenterX;
  const deltaY = e.clientY - cameraCenterY;

  // 根据鼠标位置选择摄像头角度状态
  let angle;

  if (Math.abs(deltaX) < 100 && Math.abs(deltaY) < 100) {
    angle = cameraAngles.center;
  } else if (deltaY < -100) {
    if (deltaX < -100) angle = cameraAngles.upLeft;
    else if (deltaX > 100) angle = cameraAngles.upRight;
    else angle = cameraAngles.up;
  } else if (deltaY > 100) {
    if (deltaX < -100) angle = cameraAngles.downLeft;
    else if (deltaX > 100) angle = cameraAngles.downRight;
    else angle = cameraAngles.down;
  } else {
    if (deltaX < -100) angle = cameraAngles.left;
    else if (deltaX > 100) angle = cameraAngles.right;
    else angle = cameraAngles.center;
  }

  // 应用旋转
  const cameraHead = camera.value.querySelector(".camera-head") as HTMLElement;
  if (cameraHead) {
    cameraHead.style.transform = `rotateX(${angle.x}deg) rotateY(${angle.y}deg)`;
  }
};

onMounted(() => {
  // 设置初始角度为向下45度
  const cameraHead = camera.value?.querySelector(".camera-head") as HTMLElement;
  if (cameraHead) {
    cameraHead.style.transform = `rotateX(${cameraAngles.center.x}deg) rotateY(${cameraAngles.center.y}deg)`;
  }

  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
});
</script>

<style scoped lang="less">
// 监控摄像头样式
.surveillance-camera {
  position: absolute;
  top: -50px;
  right: 30px;
  width: 80px;
  height: 120px;
  z-index: 3;
  perspective: 500px;
}

.camera-stand {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camera-neck {
  width: 10px;
  height: 40px;
  background: linear-gradient(to bottom, #333, #555);
  border-radius: 5px;
}

.camera-head {
  width: 60px;
  height: 45px;
  background: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-out;
  transform-origin: center bottom;
}

.camera-body {
  position: absolute;
  width: 100px;
  height: 30px;
  background: linear-gradient(to bottom, #555, #444);
  border-radius: 8px;
  transform: translateZ(20px); // 改为向前伸出
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    height: 3px;
    background: #333;
    border-radius: 5px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
    height: 3px;
    background: #333;
    border-radius: 5px;
  }
}

.camera-lens {
  width: 25px;
  height: 25px;
  background: #222;
  border-radius: 50%;
  position: absolute;
  left: 50%; // 居中
  transform: translateX(-50%) translateZ(60px); // 向前伸出到机身前端
  overflow: hidden;
  border: 2px solid #111;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.camera-indicator {
  position: absolute;
  top: 5px;
  right: 30px; // 调整指示灯位置
  width: 6px;
  height: 6px;
  background: #f00;
  border-radius: 50%;
  animation: blink 2s infinite;
  z-index: 2;
}

.camera-base {
  width: 40px;
  height: 10px;
  background: linear-gradient(to bottom, #777, #555);
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
