# 目录结构说明
```bash
monibuca/
├── api.go               # API接口定义
├── plugin.go            # 插件系统核心实现
├── publisher.go         # 发布者实现
├── subscriber.go        # 订阅者实现
├── server.go            # 服务器核心实现
├── puller.go           # 拉流器实现
├── pusher.go           # 推流器实现
├── pull-proxy.go       # 拉流代理实现
├── push-proxy.go       # 推流代理实现
├── recoder.go          # 录制器实现
├── transformer.go      # 转码器实现
├── wait-stream.go      # 流等待实现
├── prometheus.go       # Prometheus监控实现
│
├── pkg/                # 核心包
│   ├── auth/          # 认证相关
│   ├── codec/         # 编解码实现
│   ├── config/        # 配置相关
│   ├── db/            # 数据库相关
│   ├── task/          # 任务系统
│   ├── util/          # 工具函数
│   ├── filerotate/    # 文件轮转管理
│   ├── log.go         # 日志实现
│   ├── raw.go         # 原始数据处理
│   ├── error.go       # 错误处理
│   ├── track.go       # 媒体轨道实现
│   ├── track_test.go  # 媒体轨道测试
│   ├── annexb.go      # H.264/H.265 Annex-B格式处理
│   ├── av-reader.go   # 音视频读取器
│   ├── avframe.go     # 音视频帧结构
│   ├── ring-writer.go # 环形缓冲区写入器
│   ├── ring-reader.go # 环形缓冲区读取器
│   ├── adts.go        # AAC-ADTS格式处理
│   ├── port.go        # 端口管理
│   ├── ring_test.go   # 环形缓冲区测试
│   └── event.go       # 事件系统
│
├── plugin/            # 插件目录
│   ├── rtmp/         # RTMP协议插件
│   ├── rtsp/         # RTSP协议插件
│   ├── hls/          # HLS协议插件
│   ├── flv/          # FLV协议插件
│   ├── webrtc/       # WebRTC协议插件
│   ├── gb28181/      # GB28181协议插件
│   ├── onvif/        # ONVIF协议插件
│   ├── mp4/          # MP4相关插件
│   ├── room/         # 房间管理插件
│   ├── monitor/      # 监控插件
│   ├── rtp/          # RTP协议插件
│   ├── srt/          # SRT协议插件
│   ├── sei/          # SEI数据处理插件
│   ├── snap/         # 截图插件
│   ├── crypto/       # 加密插件
│   ├── debug/        # 调试插件
│   ├── cascade/      # 级联插件
│   ├── logrotate/    # 日志轮转插件
│   ├── stress/       # 压力测试插件
│   ├── vmlog/        # 虚拟内存日志插件
│   ├── preview/      # 预览插件
│   └── transcode/    # 转码插件
│
├── pb/               # Protocol Buffers定义和生成的代码
├── scripts/          # 脚本文件
├── doc/             # 英文文档
├── doc_CN/          # 中文文档
├── example/         # 示例代码
├── test/            # 测试代码
│
├── go.mod           # Go模块定义
├── go.sum           # Go依赖版本锁定
├── Dockerfile       # Docker构建文件
└── README.md        # 项目说明文档
```