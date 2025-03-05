import { defineConfig } from 'vitepress';
import translations from "./i18n";
const commonThemeConfig = {
  nav: [
    { text: translations.zh.nav.features, link: '/#features' },
    { text: translations.zh.nav.quickStart, link: '/#quickstart' },
    { text: translations.zh.nav.plugins, link: '/#plugins' },
    { text: translations.zh.nav.admin, link: '/#admin' },
    { text: translations.zh.nav.pricing, link: '/#pricing' },
    { text: 'API', link: 'https://apifox.com/apidoc/shared-25b77980-8f42-42f3-b1b3-9b36275c2439' }
  ],

  sidebar: [
    {
      text: translations.zh.sidebar.introduction,
      items: [
        { text: translations.zh.sidebar.whatIsMonibuca, link: '/guide/what-is-monibuca' },
        { text: translations.zh.sidebar.quickStart, link: '/guide/quickstart' },
        { text: translations.zh.sidebar.architecture, link: '/guide/architecture' }
      ]
    },
    {
      text: translations.zh.sidebar.features,
      items: [
        { text: translations.zh.sidebar.coreFeatures, link: '/features' },
        { text: translations.zh.sidebar.mediaProcessing, link: '/features/media-processing' },
        { text: translations.zh.sidebar.aiCapabilities, link: '/features/ai-capabilities' }
      ]
    }
  ],
  footer: {
    message: translations.zh.footer.message,
    copyright: translations.zh.footer.copyright
  },

  siteTitle: translations.zh.themeConfig.siteTitle,
  darkModeSwitchLabel: translations.zh.themeConfig.darkModeSwitchLabel,
  returnToTopLabel: translations.zh.themeConfig.returnToTopLabel,
  lastUpdatedText: translations.zh.themeConfig.lastUpdatedText,
  docFooter: {
    prev: translations.zh.themeConfig.docFooter.prev,
    next: translations.zh.themeConfig.docFooter.next
  }
}
export default defineConfig({
  title: 'Monibuca',
  description: '高性能流媒体服务器框架',
  lastUpdated: true,
  appearance: 'dark',
  lang: 'zh',

  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      description: '高性能流媒体服务器框架',
      themeConfig: commonThemeConfig
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'High-performance streaming media server framework',
      themeConfig: commonThemeConfig
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