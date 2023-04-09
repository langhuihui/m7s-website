import { defineConfig } from 'vitepress'
import { searchForWorkspaceRoot } from 'vite';
import MermaidPlugin from "vitepress-plugin-mermaid";
import { nav } from './constants';
import { sidebar } from './sidebar/zh'

export const sharedConfig = defineConfig({
  title: 'Monibuca',
  description: 'Monibuca - Go语言开源流媒体服务器开发框架',
  scrollOffset: 'header',
  lastUpdated: true,

  head: [
    [
      'script',
      {
        src: 'https://hm.baidu.com/hm.js?6f9fb3a11639b7e2db0819676f002c55'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          '开源,流媒体,Golang,Flv,HLS,RTMP,GB28181,RTSP,WebRTC,RTP,HDL,H265'
      }
    ],
    [
      'meta',
      {
        name: 'description',
        content: '开源的Go语言实现的流媒体服务器开发框架'
      }
    ]
  ],

  markdown: {
    config: MermaidPlugin
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        allow: [
          // search up for workspace root
          searchForWorkspaceRoot(process.cwd())
        ]
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  },
})
