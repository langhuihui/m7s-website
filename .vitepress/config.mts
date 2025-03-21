import { defineConfig } from 'vitepress';
import translations from "./i18n";
const nav = {
  en: [],
  zh: [
    {
      text: '联系我们', link: '/#contact'
    }
  ],
};
const commonThemeConfig = (locales: '' | 'zh' | 'en' = '', translation = translations[locales || 'zh']) => ({
  nav: [
    { text: translation.nav.document, link: '/guide/what-is-monibuca' },
    { text: translation.nav.features, link: '/#features' },
    { text: translation.nav.quickStart, link: '/#quickstart' },
    { text: translation.nav.plugins, link: '/#plugins' },
    { text: translation.nav.admin, link: '/#admin' },
    { text: translation.nav.pricing, link: '/#pricing' },
    ...nav[locales || 'zh']
  ],

  sidebar: [
    {
      text: translation.sidebar.introduction,
      items: [
        { text: translation.sidebar.whatIsMonibuca, link: locales + '/guide/what-is-monibuca' },
        { text: translation.sidebar.quickStart, link: locales + '/guide/quickstart' },
        { text: translation.sidebar.whyMonibuca, link: locales + '/guide/why' }
      ]
    },
    {
      text: translation.sidebar.features,
      items: [
        { text: translation.sidebar.streamPushing, link: locales + '/features/stream-pushing' },
        { text: translation.sidebar.streamSubscription, link: locales + '/features/stream-subscription' },
        { text: translation.sidebar.pushProxy, link: locales + '/features/push-proxy' },
        { text: translation.sidebar.pullProxy, link: locales + '/features/pull-proxy' },
        { text: translation.sidebar.alias, link: locales + '/features/alias' },
        { text: translation.sidebar.recording, link: locales + '/features/recording' },
        { text: translation.sidebar.playback, link: locales + '/features/playback' },
        { text: translation.sidebar.timeShift, link: locales + '/features/time-shift' },
        { text: translation.sidebar.authentication, link: locales + '/features/authentication' },
        { text: translation.sidebar.hook, link: locales + '/features/hook' },
        { text: translation.sidebar.transcoding, link: locales + '/features/transcoding' },
        { text: translation.sidebar.encryption, link: locales + '/features/encryption' },
        { text: translation.sidebar.screenshot, link: locales + '/features/screenshot' },
        { text: translation.sidebar.preview, link: locales + '/features/preview' },
      ]
    },
    {
      text: translation.sidebar.secondaryDevelopment,
      items: [
        { text: translation.sidebar.catalog, link: locales + '/develop/catalog' },
        { text: translation.sidebar.config, link: locales + '/develop/config' },
        { text: translation.sidebar.pluginDevelopment, link: locales + '/develop/plugin' },
        { text: translation.sidebar.db, link: locales + '/develop/db' },
        { text: translation.sidebar.grpc, link: locales + '/develop/grpc' },
        { text: translation.sidebar.log, link: locales + '/develop/log' },
        { text: translation.sidebar.task, link: locales + '/develop/task' },
        { text: translation.sidebar.relay, link: locales + '/develop/relay' },
        { text: translation.sidebar.http, link: locales + '/develop/http' },
        { text: translation.sidebar.alias, link: locales + '/develop/alias' }
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
  title: 'Monibuca v5',
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
      themeConfig: commonThemeConfig()
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'High-performance streaming media server framework',
      themeConfig: commonThemeConfig('en')
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'x', link: 'https://x.com/m7server' },
      { icon: 'discord', link: 'https://discord.gg/QKrKMtCuDg' },
      { icon: 'github', link: 'https://github.com/langhuihui/monibuca' }
    ],
    search: {
      provider: 'local' as const,
      options: {
        detailedView: true
      }
    }
  }
}); 