export default {
  hero: {
    title: 'Monibuca',
    subtitle: 'Pure Go open-source one-stop streaming media server development framework',
    quickStart: 'Quick Start',
  },
  features: {
    sectionTitle: 'Core Advantages',
    oneStop: {
      title: 'One-stop Solution',
      desc: 'Fully built-in, cross-platform, easy to deploy'
    },
    observability: {
      title: 'Observable System Architecture',
      desc: 'Visualizable, traceable, testable'
    },
    extendable: {
      title: 'Extendable & Developer-Friendly',
      desc: 'Plugin-based, interface-based, standardized'
    }
  },
  architecture: {
    title: 'Architecture',
    visualization: 'Visualization',
    admin: 'Admin',
    integration: 'Integration',
    functional_plugins: 'Functional Plugins',
    protocol_plugins: 'Protocol Plugins',
    util_plugins: 'Utility Plugins',
    core: 'Core',
    database: 'Database',
    clients: 'Clients'
  },
  coreFeatures: {
    title: 'Feature Overview',
    mediaProcessing: {
      title: 'Media Processing',
      desc: 'Support for screenshots, transcoding, SEI data processing'
    },
    preview: {
      title: 'Preview Functionality',
      desc: 'Support for video preview, split-screen preview, custom split-screen'
    },
    performanceMonitoring: {
      title: 'Performance Monitoring',
      desc: 'Support for stress testing and performance metrics collection'
    },
    logManagement: {
      title: 'Log Management',
      desc: 'Log rotation, automatic cleanup, custom extensions'
    },
    recordingPlayback: {
      title: 'Recording & Playback',
      desc: 'Support for MP4, HLS, FLV format recording, speed playback, drag-and-fast-forward'
    },
    dynamicTimeshift: {
      title: 'Dynamic Timeshift',
      desc: 'Dynamic cache design, support for live timeshift playback'
    },
    remoteCall: {
      title: 'Remote Call',
      desc: 'Support for gRPC interface, convenient for cross-language integration'
    },
    streamAlias: {
      title: 'Stream Alias',
      desc: 'Support for dynamically setting stream aliases, flexible management of multiple streams'
    },
    aiCapabilities: {
      title: 'AI Capabilities',
      desc: 'Integrated inference engine, support for ONNX models and custom processing'
    },
    webhook: {
      title: 'WebHook',
      desc: 'Support for subscribing to stream lifecycle events, enabling business system linkage'
    },
    privateProtocol: {
      title: 'Private Protocol',
      desc: 'Support for custom private protocols to meet special business needs'
    },
    multiProtocolSupport: {
      title: 'Multi-Protocol Support',
      desc: 'RTMP, RTSP, HTTP-FLV, WS-FLV, HLS, WebRTC, GB28181, ONVIF, SRT'
    }
  },
  quickstart: {
    title: 'Quick Start',
    install: 'Installation',
    copy: 'Copy',
    code: {
      clone: '# Clone repository',
      enterExample: '# Enter example directory',
      runConfig: '# Run with default configuration',
      adminUI: '# Access admin interface',
      adminZip: '# Place admin.zip in the same directory as config file',
      visit: '# Visit http://localhost:8080'
    }
  },
  pricing: {
    title: 'Version Information',
    free: {
      title: 'Free Version',
      features: [
        '✅ Complete core functionality',
        '✅ Basic plugin support',
        '✅ Community technical support',
        '❌ Non-commercial use only',
        '❌ Admin source code not included'
      ]
    },
    commercial: {
      title: 'Commercial Version',
      features: [
        '✅ Complete core functionality',
        '✅ Plugin customization services',
        '✅ VIP technical support',
        '✅ Commercial authorization',
        '✅ Admin source code'
      ],
      contact: 'For commercial licensing details, please contact:'
    }
  },
  nav: {
    features: 'Features',
    quickStart: 'Quick Start',
    plugins: 'Plugins',
    pricing: 'Pricing',
    document: 'Document',
    admin: 'Admin',
    github: 'GitHub'
  },
  sidebar: {
    protocols: 'Protocols',
    introduction: 'Introduction',
    whatIsMonibuca: 'What is Monibuca',
    quickStart: 'Quick Start',
    architecture: 'Architecture',
    features: 'Features',
    coreFeatures: 'Core Features',
    mediaProcessing: 'Media Processing',
    aiCapabilities: 'AI Capabilities',
    whyMonibuca: 'Why Monibuca',
    streamPushing: 'Stream Pushing',
    streamSubscription: 'Stream Subscription',
    pushProxy: 'Push Proxy',
    pullProxy: 'Pull Proxy',
    recording: 'Recording',
    playback: 'Playback',
    timeShift: 'Time Shift',
    authentication: 'Authentication',
    alias: 'Alias',
    grpc: 'gRPC',
    hook: 'Hook',
    transcoding: 'Transcoding',
    encryption: 'Encryption',
    screenshot: 'Screenshot',
    preview: 'Preview',
    routeForwarding: 'Route Forwarding',
    monitoring: 'Monitoring',
    cluster: 'Cluster',
    cascade: 'Cascade',
    secondaryDevelopment: 'Advanced Guide',
    pluginDevelopment: 'Plugin Development',
    apiReference: 'API Reference',
    coreArchitecture: 'Core Architecture',
    config: 'Configuration',
    catalog: 'Catalog',
    db: 'Database',
    log: 'Logging',
    task: 'Task System',
    relay: 'Relay System',
    http: 'HTTP'
  },
  themeConfig: {
    siteTitle: 'Monibuca v5',
    darkModeSwitchLabel: 'Toggle dark mode',
    returnToTopLabel: 'Return to top',
    lastUpdatedText: 'Last updated',
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    search: {
      placeholder: 'Search documentation',
      noResults: 'No results found',
      buttonText: 'Search'
    }
  },
  footer: {
    message: 'Released under the AGPL License',
    copyright: 'Copyright © 2025 Monibuca Team'
  },
  plugins: {
    title: 'Official Plugins',
    protocol: {
      title: '📹 Protocol Plugins',
      items: [
        'RTMP - RTMP protocol for streaming',
        'RTSP - RTSP protocol for streaming',
        'HLS - HLS protocol for live and VOD',
        'WebRTC - WebRTC protocol for low latency',
        'GB28181 - GB28181 protocol support',
        'ONVIF - ONVIF protocol device access',
        'SRT - SRT protocol transmission',
        'FLV - HTTP-FLV and WebSocket-FLV'
      ]
    },
    feature: {
      title: '📱 Feature Plugins',
      items: [
        'Preview - Video preview and split-screen',
        'Room - Room management and cascade',
        'SEI - SEI data processing',
        'Snap - Video frame capture',
        'Transcode - Video transcoding',
        'MP4 - MP4 recording and playback'
      ]
    },
    system: {
      title: '🛠️ System Plugins',
      items: [
        'Monitor - System monitoring',
        'Debug - Debug tools',
        'LogRotate - Log rotation',
        'Stress - Stress testing',
        'Crypto - Encrypted transmission',
        'Cascade - Cascade functionality'
      ]
    }
  },
  admin: {
    title: 'Admin Interface',
    videoNotSupported: 'Your browser does not support the video tag.'
  }
};
