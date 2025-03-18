import { defineConfig } from 'vitepress';
import translations from "./i18n";

const commonThemeConfig = (translation) => ({
  nav: [
    { text: translation.nav.features, link: '/#features' },
    { text: translation.nav.quickStart, link: '/#quickstart' },
    { text: translation.nav.plugins, link: '/#plugins' },
    { text: translation.nav.admin, link: '/#admin' },
    { text: translation.nav.pricing, link: '/#pricing' },
    { text: 'API', link: 'https://apifox.com/apidoc/shared-25b77980-8f42-42f3-b1b3-9b36275c2439' }
  ],

  sidebar: [
    {
      text: translation.sidebar.introduction,
      items: [
        { text: translation.sidebar.whatIsMonibuca, link: '/guide/what-is-monibuca' },
        { text: translation.sidebar.quickStart, link: '/guide/quickstart' },
        { text: translation.sidebar.architecture, link: '/guide/architecture' }
      ]
    },
    {
      text: translation.sidebar.features,
      items: [
        { text: translation.sidebar.coreFeatures, link: '/features' },
        { text: translation.sidebar.mediaProcessing, link: '/features/media-processing' },
        { text: translation.sidebar.aiCapabilities, link: '/features/ai-capabilities' }
      ]
    }
  ],
  footer: {
    message: translation.footer.message,
    copyright: translation.footer.copyright
  },

  siteTitle: translation.themeConfig.siteTitle,
  darkModeSwitchLabel: translation.themeConfig.darkModeSwitchLabel,
  returnToTopLabel: translation.themeConfig.returnToTopLabel,
  lastUpdatedText: translation.themeConfig.lastUpdatedText,
  docFooter: {
    prev: translation.themeConfig.docFooter.prev,
    next: translation.themeConfig.docFooter.next
  }
});

export default defineConfig({
  title: 'Monibuca',
  description: '高性能流媒体服务器框架',
  lastUpdated: true,
  appearance: 'dark',

  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      description: '高性能流媒体服务器框架',
      themeConfig: commonThemeConfig(translations.zh)
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'High-performance streaming media server framework',
      themeConfig: commonThemeConfig(translations.en)
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'x', link: 'https://x.com/m7server' },
      { icon: 'discord', link: 'https://discord.gg/QKrKMtCuDg' },
      { icon: 'github', link: 'https://github.com/langhuihui/monibuca' }
    ]
  }
}); 