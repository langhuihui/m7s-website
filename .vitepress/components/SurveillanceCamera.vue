<template>
  <div ref="container" class="camera-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useData } from "vitepress";

const { isDark } = useData();
const container = ref(null);
let scene, camera, renderer, controls, model;
let targetRotationY = 0;
let targetRotationZ = 0;
const rotationSpeed = 0.1; // 旋转速度系数
let directionalLight, spotLight, ambientLight; // 添加 ambientLight 声明

const handleMouseMove = (event) => {
  if (!container.value || !model) return;

  const rect = container.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // 计算鼠标在容器中的相对位置（0-1）
  const relativeX = Math.max(-2, Math.min(x / rect.width, 2));
  const relativeY = Math.min(y / rect.height, 1.5);
  // 计算目标旋转角度（-0.2 到 0.2 弧度）
  targetRotationY = (relativeX - 0.5) * 0.4 + Math.PI * 1.5;
  targetRotationZ = -(relativeY - 0.5) * 0.4 + 0.3;
};

const updateLighting = () => {
  if (isDark.value) {
    // 黑暗模式灯光设置
    if (directionalLight) {
      directionalLight.intensity = 0.8;
    }
    if (!spotLight) {
      spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(0, -2, 0);
      spotLight.penumbra = 0.1;
      spotLight.decay = 1;
      spotLight.distance = 50;
      spotLight.power = 100;
      if (scene) scene.add(spotLight);
    } else if (scene && !scene.children.includes(spotLight)) {
      scene.add(spotLight);
    }
    // 移除环境光
    if (ambientLight && scene && scene.children.includes(ambientLight)) {
      scene.remove(ambientLight);
    }
  } else {
    // 非黑暗模式灯光设置
    if (directionalLight) {
      directionalLight.intensity = 5;
    }
    if (spotLight && scene && scene.children.includes(spotLight)) {
      scene.remove(spotLight);
    }
    // 添加环境光
    if (!ambientLight) {
      ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 初始化环境光
      if (scene) scene.add(ambientLight);
    } else if (scene && !scene.children.includes(ambientLight)) {
      ambientLight.intensity = 0.5; // 确保强度正确
      scene.add(ambientLight);
    }
  }
};

// 监听 isDark 变化
watch(isDark, () => {
  updateLighting();
});

const init = () => {
  // 创建场景
  scene = new THREE.Scene();

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight); // 修正: 使用实际宽度和高度
  renderer.setClearColor(0x000000, 0); // 设置透明背景
  container.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // 添加环境光和平行光
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // 初始化平行光
  // directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 根据初始模式设置灯光
  updateLighting();

  // 加载 GLB 模型
  const loader = new GLTFLoader();
  loader.load("/models/camera.glb", (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // 调整模型位置和大小
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim;
    model.scale.setScalar(scale);

    model.position.sub(center.multiplyScalar(scale));
    model.rotateY(Math.PI * 1.5);
    model.rotateZ(-Math.PI * 0.15);
    // 如果模型包含动画，可以播放第一个动画
    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  });

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    // 平滑过渡到目标旋转角度
    model.rotation.y += (targetRotationY - model.rotation.y) * rotationSpeed;
    model.rotation.z += (targetRotationZ - model.rotation.z) * rotationSpeed;
  }

  controls.update();
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!container.value) return;

  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};

onMounted(() => {
  init();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (container.value) {
    window.removeEventListener("mousemove", handleMouseMove);
  }
  if (renderer) {
    renderer.dispose();
  }
  // 清理灯光资源
  if (directionalLight) {
    directionalLight.dispose();
  }
  if (spotLight) {
    spotLight.dispose();
  }
  if (ambientLight) {
    // 清理 ambientLight
    ambientLight.dispose();
  }
});
</script>

<style scoped>
.camera-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
}
</style>
