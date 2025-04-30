// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import HomeContent from '../components/HomeContent.vue';
import FooterChinese from '../components/FooterChinese.vue';
import ContactQQGroup from '../components/ContactQQGroup.vue';
import ContactQQChannel from '../components/ContactQQChannel.vue';
import ContactWechatPublic from '../components/ContactWechatPublic.vue';
import SVG from '../components/SVG.vue';
import './custom.css'; // 导入自定义 CSS

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom components
    app.component('HomeContent', HomeContent);
    app.component('FooterChinese', FooterChinese);
    app.component('ContactQQGroup', ContactQQGroup);
    app.component('ContactQQChannel', ContactQQChannel);
    app.component('ContactWechatPublic', ContactWechatPublic);
    app.component('SVG', SVG);
  },
  setup() {
    // Theme setup
    if (typeof window !== 'undefined') {
      // Client-side only code
      const { pathname } = window.location;
      const isRoot = pathname === '/' || pathname === '/index.html';

      if (isRoot) {
        const userLang = navigator.language || navigator.userLanguage;
        const preferredLang = userLang.startsWith('zh') ? '' : '/en/';

        // Only redirect if we're at the root and need to go to another language
        if ((userLang.startsWith('zh') && pathname !== '/') ||
          (!userLang.startsWith('zh') && !pathname.startsWith('/en/'))) {
          window.location.pathname = preferredLang;
        }
      }
    }
  }
};
