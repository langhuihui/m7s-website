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
                <a
                  :href="withBase('/guide/quickstart')"
                  class="primary-button"
                  >{{ i18n.hero.documentation }}</a
                >
                <a
                  href="https://github.com/langhuihui/monibuca"
                  class="secondary-button"
                  target="_blank"
                  rel="noopener"
                  ><svg
                    height="20"
                    width="20"
                    style="margin-right: 8px"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                  >
                    <path
                      fill="currentColor"
                      d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                    ></path></svg
                  >Github</a
                >
              </div>
            </div>
            <div class="hero-visual">
              <RingBuffer class="ring-buffer" :width="480" :height="480" />
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
cd monibuca

{{ i18n.quickstart.code.enterExample }}
cd example/default

{{ i18n.quickstart.code.runConfig }}
go run -tags sqlite main.go

{{ i18n.quickstart.code.adminUI }}
{{ i18n.quickstart.code.adminZip }}
{{ i18n.quickstart.code.visit }}</code></pre>
          </div>
          <div id="pricing" class="pricing-section">
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
                  }}<a href="mailto:support@monibuca.com"
                    >support@monibuca.com</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plugins" class="plugins-section">
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
    </main>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { computed } from "vue";
import translations from "../i18n";
import PerformanceIcon from "./icons/PerformanceIcon.vue";
import LatencyIcon from "./icons/LatencyIcon.vue";
import ProtocolIcon from "./icons/ProtocolIcon.vue";
import PluginIcon from "./icons/PluginIcon.vue";
import AiIcon from "./icons/AiIcon.vue";
import MediaIcon from "./icons/MediaIcon.vue";
import Architecture from "./Architecture.vue";
import RingBuffer from "./icons/RingBuffer.vue";
const { lang } = useData();
const i18n = computed(() => translations[lang.value] || translations.zh);

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
}

// Container
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
    position: relative;
    z-index: 2;
  }

  &-visual {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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

  &::after {
    content: "";
    position: absolute;
    top: -20px;
    right: -40px;
    width: 80px;
    height: 80px;
    background: radial-gradient(
      circle,
      var(--vp-c-brand-light) 0%,
      transparent 70%
    );
    opacity: 0.3;
    border-radius: 50%;
    filter: blur(10px);
    z-index: -1;
    animation: float 6s ease-in-out infinite;

    html:not(.dark) & {
      opacity: 0.5;
      background: radial-gradient(
        circle,
        var(--vp-c-brand) 0%,
        transparent 70%
      );
      filter: blur(16px);
      animation: float-light 6s ease-in-out infinite;
    }
  }
}

// Subtitle
.subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
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

// Ring buffer styles
.ring-buffer {
  color: var(--vp-c-brand);
  opacity: 0.8;
  transform: scale(0.9);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    opacity: 1;
    transform: scale(1);
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

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
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

  h2 {
    color: var(--text-color-dark);
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
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

// Architecture section
.architecture {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }
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

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  &-cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: stretch;
    margin: 2rem auto;
    max-width: 800px;
    flex-wrap: wrap;
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

  a {
    color: @primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Quickstart section
.quickstart {
  padding: 80px 0;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
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
}

code {
  color: #fff;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;

  html:not(.dark) & {
    color: @text-color;
  }
}

// Plugins section
.plugins {
  padding: 80px 0;
  background: @black-card-bg;
  position: relative;

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

  h2 {
    color: @text-color-dark;
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

// Responsive Design
@media (max-width: 960px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }

  .hero-visual {
    order: -1;
  }

  .ring-buffer {
    transform: scale(0.8);
  }

  .cta-buttons {
    justify-content: center;
  }

  h1 {
    font-size: 40px;
  }

  .subtitle {
    font-size: 18px;
  }

  .plugin-categories {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 64px 0;
    min-height: auto;
  }

  .ring-buffer {
    transform: scale(0.7);
  }

  .cta-buttons {
    flex-direction: column;
  }

  h1 {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
