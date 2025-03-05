export default {
  hero: {
    title: 'Monibuca 5.0',
    subtitle: 'High-performance, scalable, plugin-based pure Go streaming server development framework',
    quickStart: 'Quick Start',
    viewDocs: 'View Docs',
    documentation: 'Documentation'
  },
  features: {
    title: 'Core Features',
    highPerformance: {
      title: 'High Performance',
      desc: 'Lock-free design, partial manual memory management, multi-core computing'
    },
    lowLatency: {
      title: 'Low Latency',
      desc: 'Zero-wait forwarding, sub-second end-to-end latency'
    },
    multiProtocol: {
      title: 'Multi-Protocol',
      desc: 'Support for RTMP, RTSP, WebRTC, HLS, SRT, ONVIF and other protocols'
    },
    pluginBased: {
      title: 'Plugin-Based',
      desc: 'Load on demand, unlimited extensibility'
    },
    aiCapabilities: {
      title: 'AI Capabilities',
      desc: 'Integrated ONNX inference engine, support for custom processing'
    },
    mediaProcessing: {
      title: 'Media Processing',
      desc: 'Support for screenshots, transcoding, SEI data processing'
    }
  },
  architecture: {
    title: 'Architecture'
  },
  coreFeatures: {
    title: 'Core Features',
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
        'Complete core functionality',
        'Basic plugin support',
        'Community support',
        'Non-commercial use only',
        'Admin source code not included'
      ]
    },
    commercial: {
      title: 'Commercial Version',
      features: [
        'Complete core functionality',
        'All plugin support',
        'Commercial technical support',
        'Commercial authorization',
        'Admin source code (sold separately)'
      ],
      contact: 'For commercial licensing details, please contact:'
    }
  },
  nav: {
    features: 'Features',
    quickStart: 'Quick Start',
    plugins: 'Plugins',
    pricing: 'Pricing',
    admin: 'Admin',
    github: 'GitHub'
  },
  sidebar: {
    introduction: 'Introduction',
    whatIsMonibuca: 'What is Monibuca',
    quickStart: 'Quick Start',
    architecture: 'Architecture',
    features: 'Features',
    coreFeatures: 'Core Features',
    mediaProcessing: 'Media Processing',
    aiCapabilities: 'AI Capabilities'
  },
  themeConfig: {
    siteTitle: 'Monibuca',
    darkModeSwitchLabel: 'Toggle dark mode',
    returnToTopLabel: 'Return to top',
    lastUpdatedText: 'Last updated',
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
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
  }
};
