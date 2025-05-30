export default {
  hero: {
    title: 'Monibuca',
    subtitle: '纯 Go 开源一站式流媒体服务器开发框架',
    quickStart: '快速入门',
  },
  features: {
    sectionTitle: '核心优势',
    oneStop: {
      title: '一站式解决方案',
      desc: '全内置、跨平台、易部署'
    },
    observability: {
      title: '可观测系统架构',
      desc: '可视化、可追溯、可测试'
    },
    extendable: {
      title: '易扩展二开友好',
      desc: '插件化、接口化、标准化'
    }
  },
  architecture: {
    title: '整体架构',
    visualization: '可视化',
    admin: 'Admin',
    integration: '集成',
    functional_plugins: '功能插件',
    protocol_plugins: '协议插件',
    util_plugins: '工具插件',
    core: '核心',
    database: '数据库',
    clients: '客户端'
  },
  coreFeatures: {
    title: '功能一览',
    mediaProcessing: {
      title: '🎥 媒体处理',
      desc: '支持截图、转码、SEI数据处理'
    },
    preview: {
      title: '🎮 预览功能',
      desc: '支持视频预览、分屏预览、自定义分屏'
    },
    performanceMonitoring: {
      title: '📊 性能监控',
      desc: '支持压力测试和性能指标采集'
    },
    logManagement: {
      title: '📝 日志管理',
      desc: '日志轮转、自动清理、自定义扩展'
    },
    recordingPlayback: {
      title: '🎬 录制回放',
      desc: '支持MP4、HLS、FLV格式录制、倍速播放、拖拽快进'
    },
    dynamicTimeshift: {
      title: '⏱️ 动态时移',
      desc: '动态缓存设计，支持直播时移回看'
    },
    remoteCall: {
      title: '🌐 远程调用',
      desc: '支持gRPC接口，方便跨语言集成'
    },
    streamAlias: {
      title: '🏷️ 流别名',
      desc: '支持动态设置流别名，灵活管理多路流'
    },
    aiCapabilities: {
      title: '🤖 AI能力',
      desc: '集成推理引擎，支持ONNX模型和自定义处理'
    },
    webhook: {
      title: '🪝 WebHook',
      desc: '支持订阅流的生命周期事件，实现业务系统联动'
    },
    privateProtocol: {
      title: '🔒 私有协议',
      desc: '支持自定义私有协议，满足特殊业务需求'
    },
    multiProtocolSupport: {
      title: '🌐 多协议支持',
      desc: 'RTMP、RTSP、HTTP-FLV、WS-FLV、HLS、WebRTC、GB28181、ONVIF、SRT'
    }
  },
  quickstart: {
    title: '快速开始',
    install: '安装',
    copy: '复制',
    code: {
      clone: '# 克隆仓库',
      enterExample: '# 进入示例目录',
      runConfig: '# 运行默认配置',
      adminUI: '# 访问管理界面',
      adminZip: '# 将 admin.zip 放在配置文件相同目录下',
      visit: '# 访问 http://localhost:8080'
    }
  },
  pricing: {
    title: '版本说明',
    free: {
      title: '免费版',
      features: [
        '✅ 完整的核心功能',
        '✅ 基础插件支持',
        '✅ 社区支持',
        '❌ 不可商用',
        '❌ 不含Admin源码'
      ]
    },
    commercial: {
      title: '商业版',
      features: [
        '✅ 完整的核心功能',
        '✅ 全部插件支持',
        '✅ 商业技术支持',
        '✅ 可商用授权',
        '💰 Admin源码（单独收费）'
      ],
      contact: '了解商业授权详情请联系：'
    }
  },
  nav: {
    features: '特性',
    quickStart: '快速开始',
    plugins: '插件',
    pricing: '价格',
    document: '文档',
    admin: 'Admin',
    github: 'GitHub'
  },
  sidebar: {
    protocols: '传输协议',
    introduction: '介绍',
    whatIsMonibuca: '什么是 Monibuca',
    quickStart: '快速开始',
    architecture: '架构',
    features: '功能特性',
    coreFeatures: '核心功能',
    mediaProcessing: '媒体处理',
    aiCapabilities: 'AI 能力',
    whyMonibuca: '为什么选择 Monibuca',
    streamPushing: '接受推流',
    streamSubscription: '接受订阅',
    pushProxy: '推流代理',
    pullProxy: '拉流代理',
    recording: '录像',
    playback: '回放',
    timeShift: '时移',
    authentication: '鉴权',
    alias: '别名',
    grpc: 'gRPC',
    hook: 'Hook',
    transcoding: '转码',
    encryption: '加密',
    screenshot: '截图',
    preview: '预览',
    routeForwarding: '路由转发',
    monitoring: '监控',
    cluster: '集群',
    cascade: '级联',
    secondaryDevelopment: '进阶指南',
    pluginDevelopment: '插件开发',
    apiReference: 'API 参考',
    coreArchitecture: '核心架构',
    config: '配置系统',
    catalog: '目录说明',
    db: '数据库',
    log: '日志系统',
    task: '任务系统',
    relay: '中继系统',
    http: 'HTTP'
  },
  themeConfig: {
    siteTitle: 'Monibuca v5',
    darkModeSwitchLabel: '切换深色模式',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新于',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    search: {
      placeholder: '搜索文档',
      noResults: '没有找到相关结果',
      buttonText: '搜索'
    }
  },
  footer: {
    message: '基于 AGPL 许可发布',
    copyright: '版权所有 © 2025 Monibuca 团队'
  },
  plugins: {
    title: '官方插件',
    protocol: {
      title: '📹 协议插件',
      items: [
        'RTMP - 支持RTMP协议推流和拉流',
        'RTSP - 支持RTSP协议推流和拉流',
        'HLS - 支持HLS协议直播和点播',
        'WebRTC - 支持WebRTC协议低延迟传输',
        'GB28181 - 支持国标协议',
        'ONVIF - 支持ONVIF协议设备接入',
        'SRT - 支持SRT协议传输',
        'FLV - 支持HTTP-FLV和WebSocket-FLV'
      ]
    },
    feature: {
      title: '📱 功能插件',
      items: [
        'Preview - 视频预览和分屏功能',
        'Room - 房间管理和级联功能',
        'SEI - SEI数据处理',
        'Snap - 视频帧截图',
        'Transcode - 视频转码',
        'MP4 - MP4录制和点播'
      ]
    },
    system: {
      title: '🛠️ 系统插件',
      items: [
        'Monitor - 系统监控',
        'Debug - 调试工具',
        'LogRotate - 日志分片',
        'Stress - 压力测试',
        'Crypto - 加密传输',
        'Cascade - 级联功能'
      ]
    }
  },
  admin: {
    title: '管理界面',
    videoNotSupported: '您的浏览器不支持视频标签。'
  }
};
