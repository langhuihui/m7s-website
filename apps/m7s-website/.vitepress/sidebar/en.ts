import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Sidebar = {
  '/en/guide/': [
    {
      text: 'Get Started',
      items: [
        { text: 'Introduction', link: '/en/guide/introduction' },
        { text: 'Get Started', link: '/en/guide/startup' },
        { text: 'Config', link: '/en/guide/config' },
        { text: 'API', link: '/en/guide/api' }
      ]
    },
    {
      text: 'Official Plugin',
      items: [
        { text: 'rtmp', link: '/en/guide/plugins/rtmp' },
        { text: 'rtsp', link: '/en/guide/plugins/rtsp' },
        { text: 'hdl', link: '/en/guide/plugins/hdl' },
        { text: 'hls', link: '/en/guide/plugins/hls' },
        { text: 'gb28181', link: '/en/guide/plugins/gb28181' },
        { text: 'jessica', link: '/en/guide/plugins/jessica' },
        { text: 'webrtc', link: '/en/guide/plugins/webrtc' },
        { text: 'webtransport', link: '/en/guide/plugins/webtransport' },
        { text: 'fmp4', link: '/en/guide/plugins/fmp4' },
        { text: 'record', link: '/en/guide/plugins/record' },
        { text: 'debug', link: '/en/guide/plugins/debug' },
        { text: 'logrotate', link: '/en/guide/plugins/logrotate' },
        { text: 'hook', link: '/en/guide/plugins/hook' },
        { text: 'room', link: '/en/guide/plugins/room' },
        { text: 'preview', link: '/en/guide/plugins/preview' },
        { text: 'snap', link: '/en/guide/plugins/snap' },
        { text: 'edge', link: '/en/guide/plugins/edge' },
        { text: 'exporter', link: '/en/guide/plugins/exporter' },
        { text: 'monitor', link: '/en/guide/plugins/monitor' }
      ]
    },
    {
      text: '升级日志',
      items: [{ text: 'v4', link: '/en/guide/v4' }]
    },
    {
      text: '常见问题',
      items: [
        { text: '崩溃问题', link: '/en/guide/qa/error' },
        { text: '推流问题', link: '/en/guide/qa/push' },
        { text: '播放问题', link: '/en/guide/qa/play' }
      ]
    }
  ],
  '/en/devel/': [
    {
      text: '开发',
      items: [
        { text: '准备', link: '/en/devel/startup' },
        { text: '定义插件', link: '/en/devel/plugin' },
        { text: '插件接口', link: '/en/devel/api' },
        { text: '发布者', link: '/en/devel/publisher' },
        { text: '拉流者', link: '/en/devel/puller' },
        { text: '订阅者', link: '/en/devel/subscriber' },
        { text: '推流者', link: '/en/devel/pusher' },
        { text: '鉴权', link: '/en/devel/authentication' },
        { text: '中间件', link: '/en/devel/middleware' }
      ]
    }
  ],
  '/en/about/': [
    {
      text: '关于',
      items: [
        { text: 'FAQ', link: '/en/about/faq' },
        { text: '开发团队', link: '/en/about/team' },
        { text: '诞生故事', link: '/en/about/born' }
      ]
    }
  ]
}
