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
                <a :href="withBase('/guide/quickstart')" class="primary-button">{{
                  i18n.hero.documentation
                }}</a>
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
              <h3>{{ i18n.features.multiProtocol.title }}</h3>
              <p>{{ i18n.features.multiProtocol.desc }}</p>
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
          <Architecture viewBox="0 0 1200 1200" style="width: 1200px; height: 1200px;"/>
        </div>
      </section>
      <section id="features" class="features">
        <div class="container">
          <h2>{{ i18n.coreFeatures.title }}</h2>
          <div class="features-list">
            <div class="feature">
              <h3>{{ i18n.coreFeatures.mediaProcessing.title }}</h3>
              <p>{{ i18n.coreFeatures.mediaProcessing.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.preview.title }}</h3>
              <p>{{ i18n.coreFeatures.preview.desc }}</p>
            </div>
            <div class="feature">
              <h3>
                {{ i18n.coreFeatures.performanceMonitoring.title }}
              </h3>
              <p>{{ i18n.coreFeatures.performanceMonitoring.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.logManagement.title }}</h3>
              <p>{{ i18n.coreFeatures.logManagement.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.recordingPlayback.title }}</h3>
              <p>{{ i18n.coreFeatures.recordingPlayback.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.dynamicTimeshift.title }}</h3>
              <p>{{ i18n.coreFeatures.dynamicTimeshift.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.remoteCall.title }}</h3>
              <p>{{ i18n.coreFeatures.remoteCall.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.streamAlias.title }}</h3>
              <p>{{ i18n.coreFeatures.streamAlias.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.aiCapabilities.title }}</h3>
              <p>{{ i18n.coreFeatures.aiCapabilities.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.webhook.title }}</h3>
              <p>{{ i18n.coreFeatures.webhook.desc }}</p>
            </div>
            <div class="feature">
              <h3>{{ i18n.coreFeatures.privateProtocol.title }}</h3>
              <p>{{ i18n.coreFeatures.privateProtocol.desc }}</p>
            </div>
            <div class="feature">
              <h3>
                {{ i18n.coreFeatures.multiProtocolSupport.title }}
              </h3>
              <p>{{ i18n.coreFeatures.multiProtocolSupport.desc }}</p>
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
            <h3>{{ i18n.pricing.title }}</h3>
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

<script setup>
import { useData, withBase } from "vitepress";
import { computed } from "vue";
import translations from "../i18n";
import PerformanceIcon from "./icons/PerformanceIcon.vue";
import LatencyIcon from "./icons/LatencyIcon.vue";
import ProtocolIcon from "./icons/ProtocolIcon.vue";
import PluginIcon from "./icons/PluginIcon.vue";
import AiIcon from "./icons/AiIcon.vue";
import MediaIcon from "./icons/MediaIcon.vue";
import Architecture from "./icons/ArchitectureIcon.vue";
import RingBuffer from "./icons/RingBuffer.vue";
const { lang } = useData();
const i18n = computed(() => translations[lang.value] || translations.zh);
</script>

<style scoped>
h1 {
  line-height: unset;
}
h3 {
  line-height: unset;
}
/* Import styles from style.css with scoping */
:root {
  --primary-color: #646cff;
  --primary-color-dark: #535bf2;
  --text-color: #213547;
  --text-color-light: #666;
  --background-color: #242424;
  --text-color-dark: rgba(255, 255, 255, 0.87);
  --text-color-dark-2: rgba(255, 255, 255, 0.6);
  --border-color: #eee;
  --code-background: #1a1a1a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: var(--text-color-dark);
  line-height: 1.6;
  background: var(--background-color);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero {
  padding: 96px 0;
  min-height: 640px;
  background: linear-gradient(to bottom, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  margin-bottom: 64px;
  position: relative;
  z-index: 1;
}

.hero-text {
  flex: 1;
  position: relative;
  z-index: 2;
}

.hero-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.ring-buffer {
  color: var(--vp-c-brand);
  opacity: 0.8;
  transform: scale(0.9);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.ring-buffer:hover {
  opacity: 1;
  transform: scale(1);
}

/* 添加连接线效果 */
.hero-content::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 45%;
  width: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-light), transparent);
  opacity: 0.5;
  z-index: 0;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

h1 {
  font-size: 80px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  background: linear-gradient(180deg,#fff,#ffffff4f);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

/* 添加标题光晕效果 */
h1::after {
  content: '';
  position: absolute;
  top: -20px;
  right: -40px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, var(--vp-c-brand-light) 0%, transparent 70%);
  opacity: 0.3;
  border-radius: 50%;
  filter: blur(10px);
  z-index: -1;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.1); }
}

.subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 32px;
}

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
  background: radial-gradient(141.42% 141.42% at 100% 0%, #fff6, #fff0),
    radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00);
  box-shadow: 0 1px #ffffffbf inset;
}

.primary-button:hover {
  background: radial-gradient(141.42% 141.42% at 100% 0%, #ffffff80, #fff0),
    radial-gradient(140.35% 140.35% at 100% 94.74%, #bd34fe, #bd34fe00),
    radial-gradient(89.94% 89.94% at 18.42% 15.79%, #41d1ff, #41d1ff00);
  box-shadow: 0 1.5px #fffc inset;
  color: white;
  transform: translateY(-2px);
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color-dark);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

/* Features Grid */
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

.feature-card {
  background: var(--code-background);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.feature-card .icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.icon svg {
  width: 64px;
  height: 64px;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  text-align: center;
  color: #bd34fe;
}

.feature-card p {
  color: var(--text-color-dark-2);
}

/* Features Section */
.features {
  padding: 80px 0;
  background: var(--background-color);
  position: relative;
}

.features::before {
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

.features h2 {
  color: var(--text-color-dark);
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.feature h3 {
  color: #47caff;
}

.feature p {
  color: var(--text-color-dark-2);
}

.architecture .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.architecture .container h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

/* Pricing Section */
.pricing-section {
  padding: 4rem 0;
  text-align: center;
  background: var(--background-color);
  position: relative;
}

.pricing-section::before {
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

.pricing-section h3 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(120deg, #bd34fe 30%, #47caff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pricing-cards {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.pricing-card {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  width: 300px;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.pricing-card h4 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.pricing-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.pricing-card li {
  margin: 1rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-color-dark-2);
}

.contact-info {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--text-color-dark-2);
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-info a {
  color: var(--primary-color);
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* Quickstart Section */
.quickstart {
  padding: 80px 0;
}

.quickstart h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.code-block {
  background: var(--code-background);
  border-radius: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
}

.code-header span {
  color: #fff;
}

.copy-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

pre {
  margin: 0;
  padding: 1.5rem;
}

code {
  color: #fff;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
}

/* Plugins Section */
.plugins {
  padding: 80px 0;
  background: var(--background-color);
  position: relative;
}

.plugins::before {
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

.plugins h2 {
  color: var(--text-color-dark);
}

.plugins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.plugin-card {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.plugin-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.plugin-card h3 {
  background: linear-gradient(120deg, #bd34fe 30%, #47caff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.plugin-card p {
  color: var(--text-color-dark-2);
}

/* Footer */
footer {
  background: var(--code-background);
  color: var(--text-color-dark);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

footer::before {
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

.footer-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
}

.footer-section h4 {
  color: #bd34fe;
}

.footer-section a {
  color: var(--text-color-dark-2);
}

.footer-section a:hover {
  color: var(--text-color-dark);
}

.plugin-categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.plugin-category {
  background: var(--code-background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.plugin-category:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
}

.plugin-category h3 {
  color: #47caff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plugin-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plugin-category li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-color-dark-2);
}

.plugin-category li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: #bd34fe;
}

/* Responsive Design */
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
