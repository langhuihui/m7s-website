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
        { text: translation.sidebar.whyMonibuca, link: '/guide/why' }
      ]
    },
    {
      text: translation.sidebar.features,
      items: [
        { text: translation.sidebar.streamPushing, link: '/features/stream-pushing' },
        { text: translation.sidebar.streamSubscription, link: '/features/stream-subscription' },
        { text: translation.sidebar.pushProxy, link: '/features/push-proxy' },
        { text: translation.sidebar.pullProxy, link: '/features/pull-proxy' },
        { text: translation.sidebar.recording, link: '/features/recording' },
        { text: translation.sidebar.playback, link: '/features/playback' },
        { text: translation.sidebar.timeShift, link: '/features/time-shift' },
        { text: translation.sidebar.authentication, link: '/features/authentication' },
        { text: translation.sidebar.alias, link: '/features/alias' },
        { text: translation.sidebar.grpc, link: '/features/grpc' },
        { text: translation.sidebar.hook, link: '/features/hook' },
        { text: translation.sidebar.transcoding, link: '/features/transcoding' },
        { text: translation.sidebar.encryption, link: '/features/encryption' },
        { text: translation.sidebar.screenshot, link: '/features/screenshot' },
        { text: translation.sidebar.preview, link: '/features/preview' },
        { text: translation.sidebar.monitoring, link: '/features/monitoring' },
        { text: translation.sidebar.cluster, link: '/features/cluster' }
      ]
    },
    {
      text: translation.sidebar.secondaryDevelopment,
      items: [
        { text: translation.sidebar.pluginDevelopment, link: '/development/plugin-development' },
        { text: translation.sidebar.apiReference, link: '/development/api-reference' },
        { text: translation.sidebar.coreArchitecture, link: '/development/core-architecture' }
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

  // 忽略死链接检查，特别是对于本地服务器URL和某些协议前缀
  ignoreDeadLinks: [
    // 本地开发服务器URL
    /localhost/,
    // 流媒体特殊协议
    /^rtmp:/,
    /^rtsp:/,
    /^srt:/,
    /^ws:/,
    /^webrtc:/,
    // 开发文档链接
    /develop\/plugin\.md/,
    /arch\/index\.md/
  ],

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