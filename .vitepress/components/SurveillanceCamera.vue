<template>
  <div ref="container" class="camera-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const container = ref(null);
let scene, camera, renderer, controls, model;
let targetRotationY = 0;
let targetRotationZ = 0;
const rotationSpeed = 0.1; // 旋转速度系数

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
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setClearColor(0x000000, 0); // 设置透明背景
  container.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // 添加环境光和平行光
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 添加从下往上的聚光灯
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(0, -2, 0);
  // spotLight.angle = Math.PI / 2; // 45度照射角度
  spotLight.penumbra = 0.1; // 边缘柔和度
  spotLight.decay = 1; // 光照衰减
  spotLight.distance = 50; // 照射距离
  spotLight.power = 100;
  scene.add(spotLight);

  // 添加聚光灯的辅助对象（可选，用于调试）
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);

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
