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
      text: 'Release Notes',
      items: [{ text: 'v4', link: '/en/guide/v4' }]
    },
    {
      text: 'FAQ',
      items: [
        { text: 'Crash', link: '/en/guide/qa/error' },
        { text: 'Streaming', link: '/en/guide/qa/push' },
        { text: 'Playback', link: '/en/guide/qa/play' }
      ]
    }
  ],
  '/en/devel/': [
    {
      "text": "Development",
      "items": [
        { "text": "Preparation", "link": "/en/devel/startup" },
        { "text": "Define plugin", "link": "/en/devel/plugin" },
        { "text": "Plugin API", "link": "/en/devel/api" },
        { "text": "Publisher", "link": "/en/devel/publisher" },
        { "text": "Puller", "link": "/en/devel/puller" },
        { "text": "Subscriber", "link": "/en/devel/subscriber" },
        { "text": "Pusher", "link": "/en/devel/pusher" },
        { "text": "Authentication", "link": "/en/devel/authentication" },
        { "text": "Middleware", "link": "/en/devel/middleware" }
      ]
    }
  ],
  '/en/about/': [
    {
      text: 'About',
      items: [
        { text: 'FAQ', link: '/en/about/faq' },
        { text: 'Development Team', link: '/en/about/team' },
        { text: 'Birth Story', link: '/en/about/born' }
      ]
    }
  ]
}
