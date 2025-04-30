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
const protocols = {
  en: [],
  zh: [
    { text: 'gb28181', link: '/protocols/gb28181' }
  ]
};
const commonThemeConfig = (locales: '' | 'zh' | 'en' = '', translation = translations[locales || 'zh']) => ({
  nav: [
    { text: translation.nav.document, link: locales + '/guide/what-is-monibuca' },
    { text: translation.nav.features, link: locales + '/#features' },
    { text: translation.nav.quickStart, link: locales + '/#quickstart' },
    { text: translation.nav.plugins, link: locales + '/#plugins' },
    { text: translation.nav.admin, link: locales + '/#admin' },
    { text: translation.nav.pricing, link: locales + '/#pricing' },
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
        { text: translation.sidebar.routeForwarding, link: locales + '/features/route-forwarding' },
      ]
    },
    {
      text: translation.sidebar.protocols,
      items: [
        { text: "rtmp", link: locales + '/protocols/rtmp' },
        { text: "rtsp", link: locales + '/protocols/rtsp' },
        { text: "webrtc", link: locales + '/protocols/webrtc' },
        { text: "hls", link: locales + '/protocols/hls' },
        { text: "srt", link: locales + '/protocols/srt' },
        ...protocols[locales || 'zh']
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
  srcDir: 'docs',
  // 添加head配置，包含keywords元标签
  head: [
    ['meta', { name: 'keywords', content: '流媒体服务器,Monibuca,直播服务器,推流,拉流,录制,回放,转码,流媒体框架,RTMP,RTSP,WebRTC,HLS,SRT,Go' }]
  ],

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

  // 添加Vite配置以优化静态编译
  vite: {
    // 优化静态构建
    build: {
      // 禁用SSR
      ssr: false,
      // 减小构建包体积
      minify: 'terser',
      // 移除console和debugger语句
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      // 并行构建提高性能
      reportCompressedSize: false,
      // 拆分块以优化加载
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue'],
            vitepress: ['vitepress']
          }
        }
      }
    },
    // 优化依赖预构建
    optimizeDeps: {
      // 排除不需要预构建的依赖
      exclude: ['@vueuse/core', '@vueuse/head']
    },
  },

  locales: {
    root: {
      label: '中文',
      lang: 'zh',
      description: '高性能流媒体服务器框架',
      themeConfig: commonThemeConfig(),
      head: [
        ['meta', { name: 'keywords', content: '流媒体服务器,Monibuca,直播服务器,推流,拉流,代理,录制,回放,时移,认证,转码,加密,截图,预览,二次开发,插件开发,高性能' }]
      ]
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'High-performance streaming media server framework',
      themeConfig: commonThemeConfig('en'),
      head: [
        ['meta', { name: 'keywords', content: 'streaming media server,Monibuca,live server,stream pushing,stream subscription,proxy,recording,playback,time shift,authentication,transcoding,encryption,screenshot,preview,secondary development,plugin development,high-performance' }]
      ]
    }
  },

  themeConfig: {
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
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