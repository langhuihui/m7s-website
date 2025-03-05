// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import HomeContent from '../components/HomeContent.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom components
    app.component('HomeContent', HomeContent);
  },
  setup() {
    // Theme setup
  }
};
