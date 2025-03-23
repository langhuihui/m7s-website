# 推流

推流是 Monibuca 的核心功能之一，允许将视频流推送到 Monibuca 服务器。

## 支持的协议

Monibuca 支持多种推流协议：

- RTMP/RTMPS
- RTSP/RTSPS
- SRT
- WebRTC

## 配置说明

默认情况下，Monibuca 会自动监听推理端口，例如 RTMP 默认端口为 1935，RTSP 默认端口为 554。

可以通过配置修改监听的端口：

仅在端口冲突时需要配置，建议使用默认端口
```yaml
rtmp:
  tcp: :1936
rtsp:
  tcp: :8554
srt:
  listenaddr: :6001
  passphrase: foobarfoobar
```

### 配置加密推流

要启用 RTMPS 和 RTSPS 加密推流，需要配置 SSL 证书：

```yaml
rtmp:
  # 普通 RTMP
  tcp:
    listenaddr: :1935
    lisenaddrtls: :1936
    # SSL 证书配置
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
  
rtsp:
  # 普通 RTSP
  tcp:
    listenaddr: :554
    lisenaddrtls: :8554
    # SSL 证书配置
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
```

### 推流配置详解

#### ⚠️ 警告

> **请勿直接复制以下完整配置**。Monibuca 只需要配置您需要修改的参数，其他参数将使用默认值。复制全部配置可能会覆盖其他地方设置的默认参数，导致意外问题。以下配置仅作为参考，说明各参数的含义和默认值。

以下是推流(Publish)相关的详细配置选项，可以在全局配置或特定插件配置中使用：

```yaml
publish:
  # 最大同时发布者数量，0表示不限制
  maxCount: 0
  # 是否发布音频
  pubAudio: true
  # 是否发布视频
  pubVideo: true
  # 是否踢掉同名已存在的发布者
  kickExist: false
  # 发布无数据超时时间
  publishTimeout: 10s
  # 延迟自动关闭时间（等待重连）
  waitCloseTimeout: 0s
  # 延迟自动关闭时间（无订阅时）
  delayCloseTimeout: 0s
  # 空闲(无订阅)超时时间
  idleTimeout: 0s
  # 暂停超时时间
  pauseTimeout: 30s
  # 缓冲时长，0代表取最近关键帧
  bufferTime: 0s
  # 发送速率，0为不限速
  speed: 0
  # 缩放倍数
  scale: 1
  # 最大FPS
  maxFPS: 30
  # 发布鉴权key
  key: ""
  # 缓冲区大小范围
  ringSize: "20-1024"
  # 转发模式：remux(转格式), relay(纯转发), mix(混合转发)
  relayMode: "remux"
  # 发布类型
  pubType: "server"
```

#### 配置说明

Publish 配置可以在以下两个位置设置：

1. **全局配置**：适用于所有流，作为默认配置
2. **插件配置**：仅适用于特定插件的流，会覆盖全局配置

重要提示：
- 只需要配置需要修改的参数，未配置的参数将使用默认值
- 插件配置会覆盖全局配置中的同名参数

#### 配置示例

**全局配置示例**：

```yaml
# config.yaml
global:
  publish:
    kickExist: true  # 允许同名流被新的推流踢掉
    publishTimeout: 30s  # 将无数据超时改为30秒
    idleTimeout: 300s  # 无人观看5分钟后自动关闭流
```

**特定插件配置示例**：

```yaml
# config.yaml
global:
  publish:
    kickExist: true
    maxFPS: 25

# RTMP插件特定配置
rtmp:
  publish:
    kickExist: false  # 覆盖全局配置，RTMP不允许同名流被踢掉
    publishTimeout: 60s  # RTMP推流无数据60秒后超时
    maxFPS: 30  # RTMP最大帧率30

# RTSP插件特定配置
rtsp:
  publish:
    waitCloseTimeout: 10s  # RTSP断开后等待10秒重连
```

## 使用示例

### RTMP 推流

使用 OBS 等推流软件，设置推流地址为：

```
rtmp://your-server/live/stream-key
```

### RTSP 推流

使用支持 RTSP 的设备或软件，设置推流地址为：

```
rtsp://your-server/live/stream-key
```

### RTMPS 推流

使用支持 RTMPS 的软件，设置推流地址为：

```
rtmps://your-server:1936/live/stream-key
```

### RTSPS 推流

使用支持 RTSPS 的设备或软件，设置推流地址为：

```
rtsps://your-server:322/live/stream-key
```

### FFmpeg 推流

FFmpeg 是一款功能强大的多媒体处理工具，可用于各种协议的推流。

#### RTMP 推流示例
```bash
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://your-server:1935/live/stream-key
```

#### RTSP 推流示例

```bash
ffmpeg -re -i input.mp4 -c copy -f rtsp -rtsp_transport tcp rtsp://your-server:554/live/stream-key
```

#### RTMPS 推流示例
```bash
# 使用 RTMPS 加密推流
ffmpeg -re -i input.mp4 -c copy -f flv rtmps://your-server:1936/live/stream-key
```

#### RTSPS 推流示例
```bash
# 使用 RTSPS 加密推流
ffmpeg -re -i input.mp4 -c copy -f rtsp -rtsp_transport tcp rtsps://your-server:322/live/stream-key
```

#### 编码格式转换

如果您的源视频使用了不支持的编码格式，需要将其转换为 H.264 视频编码和 AAC 音频编码：

```bash
ffmpeg -re -i input.mp4 -c:v libx264 -c:a aac -f rtsp -rtsp_transport tcp rtsp://your-server:554/live/stream-key
```

#### SRT 推流示例
```bash
ffmpeg -re -i input.mp4 -c copy -f mpegts srt://your-server:6000?streamid=publish:live/stream-key
```

## 注意事项

1. 确保服务器防火墙开放了相应的端口
2. 推流前需要确保服务器有足够的带宽
3. 建议使用稳定的网络环境进行推流

## 常见问题

1. 推流失败
   - 检查网络连接
   - 验证推流地址是否正确
   - 确认服务器配置是否正确

2. 推流延迟
   - 检查网络带宽
   - 调整编码参数
   - 考虑使用 SRT 等低延迟协议