<template>
  <div class="architecture-diagram">
    <!-- m7s Admin section -->
    <div class="admin-section">
      <div class="section-container">
        <h3 class="section-title">{{ i18n.architecture.visualization }}</h3>
        <div class="admin-box">{{ i18n.architecture.admin }}</div>
      </div>
    </div>

    <!-- Main grid layout for the architecture diagram -->
    <div class="architecture-grid">
      <!-- Left sidebar -->
      <div class="left-sidebar">
        <div class="section-container">
          <h3 class="section-title">{{ i18n.architecture.integration }}</h3>
          <div class="sidebar-box">
            <SidebarItem
              v-for="item in leftSidebarItems"
              :key="item.icon"
              position="left"
              :iconify="item.iconify"
              :text="item.text"
            />
          </div>
        </div>
      </div>

      <!-- Center sections -->
      <div class="center-content">
        <!-- Functional plugins section -->
        <div class="section functional-section">
          <div class="section-container">
            <h3 class="section-title">
              {{ i18n.architecture.functional_plugins }}
            </h3>
            <div class="plugins-grid">
              <PluginBox
                v-for="plugin in functionPlugins"
                :key="plugin"
                type="func"
                :text="plugin"
              />
            </div>
          </div>
        </div>

        <!-- Protocol plugins section -->
        <div class="section protocol-section">
          <div class="section-container">
            <h3 class="section-title">
              {{ i18n.architecture.protocol_plugins }}
            </h3>
            <div class="plugins-grid">
              <PluginBox
                v-for="plugin in protocolPlugins"
                :key="plugin"
                type="protocol"
                :text="plugin"
              />
            </div>
          </div>
        </div>

        <!-- Util plugins section -->
        <div class="section util-section">
          <div class="section-container">
            <h3 class="section-title">{{ i18n.architecture.util_plugins }}</h3>
            <div class="plugins-grid">
              <PluginBox
                v-for="plugin in utilPlugins"
                :key="plugin"
                type="util"
                :text="plugin"
              />
            </div>
          </div>
        </div>

        <!-- Core section -->
        <div class="section core-section">
          <div class="section-container">
            <h3 class="section-title">{{ i18n.architecture.core }}</h3>
            <div class="core-grid">
              <div
                v-for="component in coreComponents"
                :key="component"
                class="core-box core-gradient"
              >
                <div class="glow-square"></div>
                <span class="core-text">{{ component }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Database section -->
        <div class="section database-section">
          <div class="section-container">
            <h3 class="section-title">{{ i18n.architecture.database }}</h3>
            <div class="database-grid">
              <DatabaseItem
                v-for="db in databases"
                :key="db.name"
                :name="db.name"
                :iconify="db.iconify"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="right-sidebar">
        <div class="section-container">
          <h3 class="section-title">{{ i18n.architecture.clients }}</h3>
          <div class="sidebar-box">
            <SidebarItem
              v-for="item in rightSidebarItems"
              :key="item.icon"
              position="right"
              :iconify="item.iconify"
              :text="item.text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import translations from "../i18n";
import PluginBox from "./PluginBox.vue";
import DatabaseItem from "./DatabaseItem.vue";
import SidebarItem from "./SidebarItem.vue";

const { lang } = useData();
const i18n = computed(() => translations[lang.value] || translations.zh);

// 功能插件数据
const functionPlugins = [
  "transcode",
  "crypto",
  "cascade",
  "sei",
  "onvif",
  "ai",
  "...",
];

// 协议插件数据
const protocolPlugins = [
  "rtmp",
  "rtsp",
  "webrtc",
  "gb28181",
  "hls",
  "flv",
  "...",
];

// 工具插件数据
const utilPlugins = ["logrotate", "debug", "monitor", "hook", "stress"];

// 核心组件数据
const coreComponents = [
  "Ring Buffer",
  "Task System",
  "Plugin System",
  "Memory Pool",
  "Pub-Sub",
  "Alias System",
];

// 数据库数据
const databases = [
  { name: "SQLite", iconify: "simple-icons:sqlite" },
  { name: "MySQL", iconify: "simple-icons:mysql" },
  { name: "PostgreSQL", iconify: "simple-icons:postgresql" },
  { name: "DuckDB", iconify: "simple-icons:duckdb" },
  { name: "...", iconify: "mdi:dots-horizontal" },
];

// 左侧栏项目数据
const leftSidebarItems = [
  { iconify: "simple-icons:onnx", text: "ONNX" },
  { iconify: "mdi:docker", text: "Docker" },
  { iconify: "mdi:kubernetes", text: "Kubernetes" },
  {
    iconify: "simple-icons:prometheus",
    text: "Prometheus",
  },
  { iconify: "simple-icons:grafana", text: "Grafana" },
  { iconify: "mdi:cloud-outline", text: "Cloud" },
  { iconify: "simple-icons:etcd", text: "Etcd" },
];

// 右侧栏项目数据
const rightSidebarItems = [
  { iconify: "devicon-plain:grpc", text: "gRPC" },
  { iconify: "arcticons:restclient", text: "REST API" },
  { iconify: "mdi:cctv", text: "NVR" },
  { iconify: "mdi:quadcopter", text: "Drone" },
  { iconify: "mdi:traffic-cone", text: "VLC" },
  { iconify: "file-icons:ffmpeg", text: "FFmpeg" },
  { iconify: "simple-icons:obsstudio", text: "OBS" },
];
</script>

<style scoped>
/* Move variables to component level rather than :root for scoped styles */
.architecture-diagram {
  /* Light theme colors */
  --core-gradient-start: transparent;
  --core-gradient-end: transparent;
  --func-gradient-start: transparent;
  --func-gradient-end: transparent;
  --protocol-gradient-start: transparent;
  --protocol-gradient-end: transparent;
  --util-gradient-start: transparent;
  --util-gradient-end: transparent;
  --db-gradient-start: transparent;
  --db-gradient-end: transparent;
  --admin-gradient-start: transparent;
  --admin-gradient-end: transparent;
  --right-gradient-start: transparent;
  --right-gradient-end: transparent;
  --left-gradient-start: transparent;
  --left-gradient-end: transparent;
  --text-color: #333;
  --logo-color: #6200ee;
  --border-color: #666;
  --line-color: #666;
  --bg-color: #ffffff; /* 明确设置默认背景色 */

  /* Architecture diagram styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--text-color);
}

/* 检测VitePress的暗色主题 - 使用更多选择器确保能够匹配到 */
.dark .architecture-diagram,
html.dark .architecture-diagram,
:global(.dark) .architecture-diagram,
:global(html.dark) .architecture-diagram,
:global([data-theme="dark"]) .architecture-diagram,
:global(html[data-theme="dark"]) .architecture-diagram,
[class*="dark"] .architecture-diagram,
[data-theme*="dark"] .architecture-diagram,
body[class*="dark"] .architecture-diagram,
[class*="dark-mode"] .architecture-diagram {
  /* Dark theme colors */
  --core-gradient-start: transparent;
  --core-gradient-end: transparent;
  --func-gradient-start: transparent;
  --func-gradient-end: transparent;
  --protocol-gradient-start: transparent;
  --protocol-gradient-end: transparent;
  --util-gradient-start: transparent;
  --util-gradient-end: transparent;
  --db-gradient-start: transparent;
  --db-gradient-end: transparent;
  --admin-gradient-start: transparent;
  --admin-gradient-end: transparent;
  --right-gradient-start: transparent;
  --right-gradient-end: transparent;
  --left-gradient-start: transparent;
  --left-gradient-end: transparent;
  --text-color: #ffffff;
  --logo-color: #d7b8fc;
  --border-color: #aaaaaa;
  --line-color: #aaaaaa;
  --bg-color: #1e1e1e; /* 明确设置暗色背景色 */
}

/* 标题背景色设置 */
.section-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--bg-color); /* 使用组件变量 */
  padding: 0 10px;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
}

/* 暗色模式下的标题背景明确设置 */
.dark .section-title,
html.dark .section-title,
:global(.dark) .section-title,
:global(html.dark) .section-title,
:global([data-theme="dark"]) .section-title,
:global(html[data-theme="dark"]) .section-title,
[class*="dark"] .section-title {
  background-color: #1e1e1e;
}

/* 为了确保标题背景跟随主题，添加内联样式 */
@supports (backdrop-filter: blur(0)) {
  .section-title {
    backdrop-filter: blur(5px);
    background-color: rgba(var(--bg-color, 255, 255, 255), 0.8);
  }
}

.logo {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

/* Admin section */
.admin-section {
  width: 100%;
  margin-bottom: 20px;
}

.admin-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  height: 40px;
  width: 100%;
  position: relative;
}

.logo-text {
  color: var(--logo-color);
  font-size: 24px;
  font-weight: bold;
  margin-right: 5px;
}

/* Main grid layout */
.architecture-grid {
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  gap: 20px;
  width: 100%;
}

/* Center content */
.center-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Sections styling */
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin-bottom: 0;
}

.section-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border: 1px dashed var(--border-color);
  border-radius: 5px;
  padding: 15px;
  padding-top: 20px;
}

h3 {
  margin: 0;
}

/* Plugins grid */
.plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 10px;
  width: 100%;
}

/* Core grid */
.core-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.core-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  text-align: center;
  position: relative;
  gap: 10px;
}

.glow-square {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #47caff, #bd34fe);
  border-radius: 3px;
  box-shadow: 0 0 8px #47caff, 0 0 12px rgba(189, 52, 254, 0.5);
  animation: pulse-glow 2s infinite alternate;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 5px #47caff, 0 0 8px rgba(189, 52, 254, 0.4);
    transform: scale(0.95);
  }
  100% {
    box-shadow: 0 0 10px #47caff, 0 0 15px rgba(189, 52, 254, 0.6);
    transform: scale(1.05);
  }
}

.core-text {
  font-size: 20px;
}

/* Database grid */
.database-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
}

.database-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.db-box {
  width: 60px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.db-text {
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
}

/* Sidebar styling */
.left-sidebar,
.right-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-box {
  border: none;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 23px;
  align-items: center;
}

/* 保留这些类，因为侧边栏盒子仍在使用 */
.left-gradient,
.right-gradient {
  background: transparent;
}
</style>
