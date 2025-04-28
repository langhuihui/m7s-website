<template>
  <div class="home-content">
    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1>{{ i18n.hero.title }}</h1>

              <p class="subtitle">
                {{ i18n.hero.subtitle }}
              </p>
              <div class="cta-buttons">
                <a :href="withBase('/guide/quickstart')" class="primary-button"
                  ><Icon icon="teenyicons:doc-solid" width="20" height="20" />{{
                    i18n.hero.quickStart
                  }}</a
                >
                <a
                  href="https://github.com/langhuihui/monibuca"
                  class="secondary-button"
                  target="_blank"
                  rel="noopener"
                  ><Icon
                    icon="simple-icons:github"
                    width="20"
                    height="20"
                    style="margin-right: 8px"
                  />Github</a
                >
                <a
                  v-if="lang === 'zh'"
                  href="https://gitee.com/m7s/monibuca"
                  class="secondary-button"
                  target="_blank"
                  rel="noopener"
                  ><Icon
                    icon="simple-icons:gitee"
                    width="20"
                    height="20"
                    style="margin-right: 8px"
                  />Gitee</a
                >
              </div>
            </div>
            <div class="hero-visual">
              <RingBuffer
                class="ring-buffer"
                :width="480"
                :height="480"
                :speed="ringSpeed"
              />
              <div
                class="logo-container"
                @click="toggleLogo(void 0)"
                @mouseover="toggleLogo(true)"
                @mouseleave="toggleLogo(false)"
                :class="{ 'logo-open': isLogoOpen }"
              >
                <div class="logo-left">
                  <div class="logo"></div>
                </div>
                <div class="logo-right">
                  <div class="logo"></div>
                </div>
              </div>
              <SurveillanceCamera class="camera" />
            </div>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="icon"><PerformanceIcon /></div>
              <h3>{{ i18n.features.highPerformance.title }}</h3>
              <p>{{ i18n.features.highPerformance.desc }}</p>
            </div>
            <div class="feature-card">
              <div class="icon"><LatencyIcon /></div>
              <h3>{{ i18n.features.lowLatency.title }}</h3>
              <p>{{ i18n.features.lowLatency.desc }}</p>
            </div>
            <div class="feature-card">
              <div class="icon"><ProtocolIcon /></div>
              <h3>{{ i18n.features.observability.title }}</h3>
              <p>{{ i18n.features.observability.desc }}</p>
            </div>
            <div class="feature-card">
              <div class="icon"><PluginIcon /></div>
              <h3>{{ i18n.features.pluginBased.title }}</h3>
              <p>{{ i18n.features.pluginBased.desc }}</p>
            </div>
            <div class="feature-card">
              <div class="icon"><AiIcon /></div>
              <h3>{{ i18n.features.aiCapabilities.title }}</h3>
              <p>{{ i18n.features.aiCapabilities.desc }}</p>
            </div>
            <div class="feature-card">
              <div class="icon"><MediaIcon /></div>
              <h3>{{ i18n.features.mediaProcessing.title }}</h3>
              <p>{{ i18n.features.mediaProcessing.desc }}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="architecture" class="architecture">
        <div class="container">
          <h2>{{ i18n.architecture.title }}</h2>
          <Architecture />
        </div>
      </section>
      <section id="features" class="features">
        <div class="container">
          <h2>{{ i18n.coreFeatures.title }}</h2>
          <div class="features-list">
            <div
              v-for="feature in coreFeatureKeys"
              :key="feature"
              class="feature"
            >
              <h3>{{ i18n.coreFeatures[feature].title }}</h3>
              <p>{{ i18n.coreFeatures[feature].desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="quickstart" class="quickstart">
        <div class="container">
          <h2>{{ i18n.quickstart.title }}</h2>
          <div class="code-block">
            <div class="code-header">
              <span>{{ i18n.quickstart.install }}</span>
              <button class="copy-button" data-target="install-code">
                {{ i18n.quickstart.copy }}
              </button>
            </div>
            <pre><code id="install-code">{{ i18n.quickstart.code.clone }}
git clone https://github.com/langhuihui/monibuca.git

{{ i18n.quickstart.code.enterExample }}
cd monibuca/example/default

{{ i18n.quickstart.code.runConfig }}
go run -tags sqlite main.go

{{ i18n.quickstart.code.adminUI }}
{{ i18n.quickstart.code.adminZip }}
{{ i18n.quickstart.code.visit }}</code></pre>
          </div>

          <div class="code-block">
            <div class="code-header">
              <span>Docker</span>
              <button class="copy-button" data-target="docker-code">
                {{ i18n.quickstart.copy }}
              </button>
            </div>
            <pre><code id="docker-code">docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 langhuihui/monibuca:v5</code></pre>
          </div>
        </div>
      </section>

      <section id="plugins" class="plugins">
        <div class="container">
          <h2>{{ i18n.plugins.title }}</h2>
          <div class="plugin-categories">
            <div class="plugin-category">
              <h3>{{ i18n.plugins.protocol.title }}</h3>
              <ul>
                <li
                  v-for="(item, index) in i18n.plugins.protocol.items"
                  :key="'protocol-' + index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="plugin-category">
              <h3>{{ i18n.plugins.feature.title }}</h3>
              <ul>
                <li
                  v-for="(item, index) in i18n.plugins.feature.items"
                  :key="'feature-' + index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="plugin-category">
              <h3>{{ i18n.plugins.system.title }}</h3>
              <ul>
                <li
                  v-for="(item, index) in i18n.plugins.system.items"
                  :key="'system-' + index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="admin" class="admin">
        <div class="container">
          <h2>{{ i18n.admin?.title || "Admin" }}</h2>
          <div class="admin-video-container">
            <video
              ref="videoRef"
              :key="videoKey"
              controls
              autoplay
              loop
              muted
              playsinline
            >
              <source
                :src="withBase(isDark ? '/admin-dark.webm' : '/admin.webm')"
                type="video/mp4"
              />
              <source
                :src="withBase(isDark ? '/admin-dark.mp4' : '/admin.mp4')"
                type="video/mp4"
              />
              {{
                i18n.admin?.videoNotSupported ||
                "Your browser does not support the video tag."
              }}
            </video>
          </div>
        </div>
      </section>
      <section id="pricing" class="pricing-section">
        <div class="container">
          <h2>{{ i18n.pricing.title }}</h2>
          <div class="pricing-cards">
            <div class="pricing-card free">
              <h4>{{ i18n.pricing.free.title }}</h4>
              <ul>
                <li
                  v-for="(feature, index) in i18n.pricing.free.features"
                  :key="'free-' + index"
                >
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="pricing-card commercial">
              <h4>{{ i18n.pricing.commercial.title }}</h4>
              <ul>
                <li
                  v-for="(feature, index) in i18n.pricing.commercial.features"
                  :key="'commercial-' + index"
                >
                  {{ feature }}
                </li>
              </ul>
              <p class="contact-info">
                {{ i18n.pricing.commercial.contact
                }}<a href="mailto:support@monibuca.com">support@monibuca.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { computed, ref, watch, onMounted } from "vue";
import translations from "../i18n";
import PerformanceIcon from "./icons/PerformanceIcon.vue";
import LatencyIcon from "./icons/LatencyIcon.vue";
import ProtocolIcon from "./icons/ProtocolIcon.vue";
import PluginIcon from "./icons/PluginIcon.vue";
import AiIcon from "./icons/AiIcon.vue";
import MediaIcon from "./icons/MediaIcon.vue";
import Architecture from "./Architecture.vue";
import RingBuffer from "./icons/RingBuffer.vue";
import { Icon } from "@iconify/vue";
import SurveillanceCamera from "./SurveillanceCamera.vue";

const { lang, isDark } = useData();
const i18n = computed(() => translations[lang.value] || translations.zh);

// Video handling
const videoRef = ref(null);
const videoKey = ref(0);

// Watch for theme changes to reload the video
watch(isDark, () => {
  // Change the key to force Vue to recreate the video element
  videoKey.value += 1;

  // Additional handling to ensure video plays after reload
  setTimeout(() => {
    if (videoRef.value) {
      videoRef.value.load();
      const playPromise = videoRef.value.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.log("Auto-play was prevented:", error);
        });
      }
    }
  }, 100);
});

// Ensure video plays on mount
onMounted(() => {
  if (videoRef.value) {
    const playPromise = videoRef.value.play();
    if (playPromise !== undefined) {
      playPromise.catch((error: Error) => {
        console.log("Auto-play was prevented:", error);
      });
    }
  }
});

// RingBuffer速度控制
const ringSpeed = ref(100); // 默认速度0

// 添加logo开关状态控制
const isLogoOpen = ref(false);

// 处理logo点击事件
const toggleLogo = (value?: boolean) => {
  if (typeof value === "boolean") {
    isLogoOpen.value = value;
  } else isLogoOpen.value = !isLogoOpen.value;
  ringSpeed.value = isLogoOpen.value ? 0 : 100;
};

// Core features keys array
const coreFeatureKeys = [
  "mediaProcessing",
  "preview",
  "performanceMonitoring",
  "logManagement",
  "recordingPlayback",
  "dynamicTimeshift",
  "remoteCall",
  "streamAlias",
  "aiCapabilities",
  "webhook",
  "privateProtocol",
  "multiProtocolSupport",
];
</script>

<style scoped lang="less">
// Base variables
@primary-color: #646cff;
@primary-color-dark: #535bf2;
@text-color: #213547;
@text-color-light: #666;
@background-color: #242424;
@text-color-dark: rgba(255, 255, 255, 0.87);
@text-color-dark-2: rgba(255, 255, 255, 0.6);
@border-color: #eee;
@code-background: #1a1a1a;
@code-background-light: #f9f9f9;
@black-card-bg: black;
@dark-card-bg: #0c0c0c;
@gradient-highlight-1: #bd34fe;
@gradient-highlight-2: #47caff;
@gradient-highlight-3: #41d1ff;

// Mixins
.card-base() {
  border-radius: 12px;
  transition: all 0.2s;
  padding: 2rem;
}

.dark-card() {
  background: @black-card-bg;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.light-card() {
  background: white;
  border: 1px solid @border-color;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: @text-color;
}

.hover-lift() {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);

  html:not(.dark) & {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
}

.gradient-text(@direction: 120deg, @color1: @gradient-highlight-1, @color2: @gradient-highlight-2) {
  background: linear-gradient(@direction, @color1 30%, @color2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Reset styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// Base styles
h1,
h3 {
  line-height: unset;
}

// Component structure
.home-content {
  // Define variables on the component itself
  --primary-color: @primary-color;
  --primary-color-dark: @primary-color-dark;
  --text-color: @text-color;
  --text-color-light: @text-color-light;
  --background-color: @background-color;
  --text-color-dark: @text-color-dark;
  --text-color-dark-2: @text-color-dark-2;
  --border-color: @border-color;
  --code-background: @code-background;
  --code-background-light: @code-background-light;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--text-color-dark);
  line-height: 1.6;
  background: var(--background-color);
  min-height: 100vh;

  // Dark mode variables
  .dark & {
    --code-background: #101010;
  }

  // Light mode variables
  html:not(.dark) & {
    --background-color: #ffffff;
    --text-color-dark: @text-color;
    --text-color-dark-2: @text-color-light;
    color: var(--text-color);
    background: #ffffff;
  }
}

// Container
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// Animation keyframes
@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

@keyframes float-light {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 0.7;
  }
}

// Logo container with sliding door effect
.logo-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: absolute;
  z-index: 2;
  user-select: none;
  pointer-events: auto;
  cursor: pointer;
  display: flex;

  transition: all 0.3s ease;
}

.logo {
  width: 300px;
  height: 300px;
  opacity: 0.9;
  background: url("/logo+dark.svg") no-repeat center center;
  background-size: contain;
  backdrop-filter: blur(4px);
  html:not(.dark) & {
    background: url("/logo+.svg") no-repeat center center;
    background-size: contain;
  }
}

// Left half of the logo
.logo-left {
  width: 150px;
  height: 300px;
  overflow: hidden;
  transition: transform 0.5s ease;
  border: gray 1px solid;
}

// Right half of the logo
.logo-right {
  width: 150px;
  height: 300px;
  overflow: hidden;
  transition: transform 0.5s ease;
  .logo {
    margin-left: -150px;
  }
  border: gray 1px solid;
}

// 添加基于类的效果
.logo-container.logo-open {
  .logo-left {
    transform: translateX(-50px);
  }

  .logo-right {
    transform: translateX(50px);
  }
}

// Hero Section
.hero {
  padding: 96px 0;
  min-height: 640px;
  background: linear-gradient(
    to bottom,
    var(--vp-c-bg) 0%,
    var(--vp-c-bg-soft) 100%
  );

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    margin-bottom: 64px;
    position: relative;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 45%;
      width: 10%;
      height: 2px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--vp-c-brand-light),
        transparent
      );
      opacity: 0.5;
      z-index: 0;
      animation: pulse 3s infinite;
    }
  }

  &-text {
    flex: 1;
    z-index: 2;
  }

  &-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .camera {
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 150px;
      z-index: 10;
    }
  }
}

// Title styles
h1 {
  font-size: 80px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  position: relative;

  .dark & {
    background: linear-gradient(180deg, #fff, #ffffff4f);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  html:not(.dark) & {
    background: linear-gradient(
      180deg,
      var(--vp-c-brand-3, #3e54c8) 0%,
      var(--vp-c-brand-1) 60%,
      var(--vp-c-brand-2) 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
      -2px -2px 4px rgba(255, 255, 255, 0.5);
    filter: drop-shadow(0 2px 8px rgba(100, 108, 255, 0.5));
    font-weight: 800;
    opacity: 0.95;
  }
}

// Subtitle
.subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

// Ring buffer styles
.ring-buffer {
  color: var(--vp-c-brand);
  opacity: 0.8;
  transform: scale(0.5);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 1;
    transform: scale(0.7);
  }
}

// Button styles
.cta-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.primary-button,
.secondary-button {
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  width: fit-content;
  text-decoration: none;
}

.primary-button {
  background: radial-gradient(
      141.42% 141.42% at 100% 0%,
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0)
    ),
    radial-gradient(
      140.35% 140.35% at 100% 94.74%,
      @gradient-highlight-1,
      fade(@gradient-highlight-1, 0%)
    ),
    radial-gradient(
      89.94% 89.94% at 18.42% 15.79%,
      @gradient-highlight-3,
      fade(@gradient-highlight-3, 0%)
    );
  box-shadow: 0 1px rgba(255, 255, 255, 0.75) inset;

  &:hover {
    background: radial-gradient(
        141.42% 141.42% at 100% 0%,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      ),
      radial-gradient(
        140.35% 140.35% at 100% 94.74%,
        @gradient-highlight-1,
        fade(@gradient-highlight-1, 0%)
      ),
      radial-gradient(
        89.94% 89.94% at 18.42% 15.79%,
        @gradient-highlight-3,
        fade(@gradient-highlight-3, 0%)
      );
    box-shadow: 0 1.5px rgba(255, 255, 255, 0.8) inset;
    color: white;
    transform: translateY(-2px);
  }
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color-dark);
  border: 1px solid rgba(255, 255, 255, 0.2);

  html:not(.dark) & {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-color);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;

    html:not(.dark) & {
      background: rgba(0, 0, 0, 0.08);
      color: var(--text-color);
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}

// Features Grid
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

// Feature Card styles
.feature-card {
  .card-base();
  .dark-card();

  html:not(.dark) & {
    .light-card();
  }

  &:hover {
    .hover-lift();
    border-color: rgba(255, 255, 255, 0.2);

    html:not(.dark) & {
      border-color: @primary-color;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;

    svg {
      width: 64px;
      height: 64px;
    }
  }

  h3 {
    margin-bottom: 0.5rem;
    text-align: center;
    color: @gradient-highlight-1;

    html:not(.dark) & {
      color: @primary-color-dark;
    }
  }

  p {
    color: @text-color-dark-2;

    html:not(.dark) & {
      color: @text-color-light;
    }
  }
}

// Architecture section
.architecture {
  html:not(.dark) & {
    background: #ffffff;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

// Features section
.features {
  padding: 80px 0;
  background: var(--background-color);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 0% 0%,
        rgba(189, 52, 254, 0.15),
        rgba(36, 36, 36, 0) 50%
      ),
      radial-gradient(
        circle at 100% 0%,
        rgba(71, 202, 255, 0.15),
        rgba(36, 36, 36, 0) 50%
      );
    z-index: -1;
  }

  html:not(.dark) &::before {
    background: radial-gradient(
        circle at 0% 0%,
        rgba(189, 52, 254, 0.05),
        rgba(255, 255, 255, 0) 50%
      ),
      radial-gradient(
        circle at 100% 0%,
        rgba(71, 202, 255, 0.05),
        rgba(255, 255, 255, 0) 50%
      );
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
}

// Individual feature
.feature {
  .card-base();
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;

  .dark & {
    background: @dark-card-bg;
  }

  html:not(.dark) & {
    .light-card();
  }

  &:hover {
    .hover-lift();
    border-color: rgba(255, 255, 255, 0.2);

    html:not(.dark) & {
      border-color: @primary-color;
      background: rgba(0, 0, 0, 0.02);
    }
  }

  h3 {
    color: @gradient-highlight-2;
    margin-bottom: 1rem;

    html:not(.dark) & {
      color: @primary-color-dark;
    }
  }

  p {
    color: @text-color-dark-2;

    html:not(.dark) & {
      color: @text-color-light;
    }
  }
}

// Quickstart section
.quickstart {
  padding: 80px 0;

  html:not(.dark) & {
    background: #ffffff;
  }
}
h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;

  html:not(.dark) & {
    color: var(--text-color);
  }
}
// Code block
.code-block {
  background: @black-card-bg;
  border-radius: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  html:not(.dark) & {
    background: @code-background-light;
    border: 1px solid @border-color;
    color: @text-color;
  }
}

// Code header
.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.2);

  html:not(.dark) & {
    background: rgba(0, 0, 0, 0.05);
  }

  span {
    color: #fff;

    html:not(.dark) & {
      color: @text-color;
    }
  }
}

// Copy button
.copy-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  html:not(.dark) & {
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: @text-color;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);

    html:not(.dark) & {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

// Code content
pre {
  margin: 0;
  padding: 1.5rem;

  html:not(.dark) & {
    background: @code-background-light;
  }
}

code {
  color: #fff;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;

  html:not(.dark) & {
    color: @text-color;
  }

  &#docker-code {
    white-space: pre-wrap;
    word-break: break-all;
  }
}

// Pricing section
.pricing-section {
  padding: 4rem 0;
  text-align: center;
  background: var(--background-color);
  position: relative;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 0%,
        rgba(189, 52, 254, 0.15),
        rgba(36, 36, 36, 0) 50%
      ),
      radial-gradient(
        circle at 70% 0%,
        rgba(71, 202, 255, 0.15),
        rgba(36, 36, 36, 0) 50%
      );
    z-index: -1;
  }

  html:not(.dark) &::before {
    background: radial-gradient(
        circle at 30% 0%,
        rgba(189, 52, 254, 0.05),
        rgba(255, 255, 255, 0) 50%
      ),
      radial-gradient(
        circle at 70% 0%,
        rgba(71, 202, 255, 0.05),
        rgba(255, 255, 255, 0) 50%
      );
  }
}

.pricing-cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  margin: 2rem auto;
  max-width: 800px;
  flex-wrap: wrap;
}

// Pricing card
.pricing-card {
  .card-base();
  .dark-card();
  width: 350px;
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  html:not(.dark) & {
    .light-card();
  }

  &:hover {
    transform: translateY(-5px);
    border-color: @primary-color;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  h4 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: @primary-color;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    flex-grow: 1;
  }

  li {
    margin: 1rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: @text-color-dark-2;

    html:not(.dark) & {
      color: @text-color-light;
    }
  }
}

// Contact info
.contact-info {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: @text-color-dark-2;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  html:not(.dark) & {
    color: @text-color-light;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  a {
    color: @primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Plugins section
.plugins {
  padding: 80px 0;
  background: @black-card-bg;
  position: relative;

  html:not(.dark) & {
    background: #ffffff;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 100% 50%,
        rgba(71, 202, 255, 0.15),
        rgba(36, 36, 36, 0) 50%
      ),
      radial-gradient(
        circle at 0% 50%,
        rgba(189, 52, 254, 0.15),
        rgba(36, 36, 36, 0) 50%
      );
    z-index: -1;
  }

  html:not(.dark) &::before {
    background: radial-gradient(
        circle at 100% 50%,
        rgba(71, 202, 255, 0.05),
        rgba(255, 255, 255, 0) 50%
      ),
      radial-gradient(
        circle at 0% 50%,
        rgba(189, 52, 254, 0.05),
        rgba(255, 255, 255, 0) 50%
      );
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
}

// Plugin card
.plugin-card {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  h3 {
    .gradient-text();
  }

  p {
    color: @text-color-dark-2;
  }
}

// Plugin categories
.plugin-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

// Plugin category
.plugin-category {
  .card-base();
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  html:not(.dark) & {
    .light-card();
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);

    html:not(.dark) & {
      transform: translateY(-5px);
      border-color: @primary-color;
      background: rgba(0, 0, 0, 0.02);
    }
  }

  h3 {
    color: @gradient-highlight-2;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
    padding-left: 1.5rem;
    position: relative;
    color: @text-color-dark-2;

    html:not(.dark) & {
      color: @text-color-light;
    }

    &::before {
      content: "▸";
      position: absolute;
      left: 0;
      color: @gradient-highlight-1;
    }
  }
}

// Footer
footer {
  background: var(--code-background);
  color: var(--text-color-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  html:not(.dark) & {
    background: var(--code-background-light);
    color: var(--text-color);
    border-top: 1px solid @border-color;
  }

  &::before {
    background: radial-gradient(
        circle at 0% 0%,
        rgba(189, 52, 254, 0.15),
        rgba(26, 26, 26, 0) 50%
      ),
      radial-gradient(
        circle at 100% 100%,
        rgba(71, 202, 255, 0.15),
        rgba(26, 26, 26, 0) 50%
      );

    html:not(.dark) & {
      background: radial-gradient(
          circle at 0% 0%,
          rgba(189, 52, 254, 0.05),
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          circle at 100% 100%,
          rgba(71, 202, 255, 0.05),
          rgba(255, 255, 255, 0) 50%
        );
    }
  }
}

// Footer content
.footer-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
}

// Footer section
.footer-section {
  h4 {
    color: @gradient-highlight-1;
  }

  a {
    color: @text-color-dark-2;

    &:hover {
      color: @text-color-dark;
    }
  }
}

// Admin section
.admin {
  padding: 80px 0;
  background: var(--background-color);
  position: relative;

  html:not(.dark) & {
    background: #ffffff;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 50% 0%,
        rgba(189, 52, 254, 0.15),
        rgba(36, 36, 36, 0) 50%
      ),
      radial-gradient(
        circle at 50% 100%,
        rgba(71, 202, 255, 0.15),
        rgba(36, 36, 36, 0) 50%
      );
    z-index: -1;
  }

  html:not(.dark) &::before {
    background: radial-gradient(
        circle at 50% 0%,
        rgba(189, 52, 254, 0.05),
        rgba(255, 255, 255, 0) 50%
      ),
      radial-gradient(
        circle at 50% 100%,
        rgba(71, 202, 255, 0.05),
        rgba(255, 255, 255, 0) 50%
      );
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;

    html:not(.dark) & {
      color: var(--text-color);
    }
  }

  .admin-video-container {
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);

    html:not(.dark) & {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    video {
      width: 100%;
      display: block;
      background: @black-card-bg;

      html:not(.dark) & {
        background: #f5f5f5;
      }
    }
  }
}

// Responsive Design
@media (max-width: 960px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 32px;
    margin-bottom: 32px;

    &::before {
      display: none;
    }
  }

  .hero-visual {
    order: -1;
  }

  .ring-buffer {
    transform: scale(0.8);
  }

  .cta-buttons {
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  h1 {
    font-size: 40px;
  }

  .subtitle {
    font-size: 18px;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 1rem;
  }

  .plugin-categories {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 1rem;
  }

  .pricing-card {
    width: 100%;
    flex: 0 1 auto;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 48px 0;
    min-height: auto;
  }

  .ring-buffer {
    transform: scale(0.6);
    margin: -40px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 32px;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }

  h1 {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 1.5rem;

    .icon svg {
      width: 48px;
      height: 48px;
    }
  }

  .pricing-section {
    padding: 2rem 0;
  }

  .pricing-cards {
    gap: 1rem;
  }

  .pricing-card {
    padding: 1.5rem;
  }

  .quickstart {
    padding: 40px 0;
  }

  .code-block {
    margin: 0 1rem;
  }

  pre {
    padding: 1rem;
    overflow-x: auto;
  }

  code {
    font-size: 0.8rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .plugins,
  .admin {
    padding: 40px 0;
  }

  h2 {
    font-size: 2rem !important;
    margin-bottom: 2rem !important;
  }

  .plugin-category {
    padding: 1.5rem;
  }

  .admin-video-container {
    margin: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 32px 0;
  }

  h1 {
    font-size: 28px;
  }

  .ring-buffer {
    transform: scale(0.5);
    margin: -60px;
  }

  .feature-card {
    padding: 1.25rem;
  }

  .plugin-category h3 {
    font-size: 1.25rem;
  }
}
</style>
