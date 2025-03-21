# 订阅

订阅是 Monibuca 的另一个核心功能，允许客户端以多种协议播放 Monibuca 中的流。

## 支持的协议

Monibuca 支持多种订阅协议：

- RTMP/RTMPS
- RTSP/RTSPS
- SRT
- HTTP-FLV
- WebSocket-FLV
- HTTP-MP4
- HLS
- WebRTC

## 配置说明

### HTTPS/WSS 安全配置

要启用HTTPS和WSS（WebSocket Secure）访问，需要在配置文件中添加SSL证书配置：

```yaml
# config.yaml
global:
  http:
    listenaddr: :8080
    # 安全连接配置
    listenaddrtls: :8443
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
```

### 订阅配置详解

#### ⚠️ 警告

> **请勿直接复制以下完整配置**。Monibuca 只需要配置您需要修改的参数，其他参数将使用默认值。复制全部配置可能会覆盖其他地方设置的默认参数，导致意外问题。以下配置仅作为参考，说明各参数的含义和默认值。

以下是订阅(Subscribe)相关的详细配置选项，可以在全局配置或特定插件配置中使用：

```yaml
subscribe:
  # 最大同时订阅者数量，0表示不限制
  maxCount: 0
  # 是否订阅音频
  subAudio: true
  # 是否订阅视频
  subVideo: true
  # 缓冲时长，从缓冲时长的关键帧开始播放
  bufferTime: 0s
  # 订阅模式
  # 0: 实时模式-追赶发布者进度，在播放首屏后等待发布者的下一个关键帧，然后跳到该帧
  # 1: 首屏后不进行追赶
  # 2: 从缓冲最大的关键帧开始播放，也不追赶，需要发布者配置缓存长度
  subMode: 0
  # 同步模式
  # 0: 采用时间戳同步
  # 1: 采用写入时间同步
  syncMode: 1
  # 是否只要关键帧
  iFrameOnly: false
  # 等待流超时时间
  waitTimeout: 10s
  # 写缓冲大小
  writeBufferSize: 0
  # 订阅鉴权key
  key: ""
  # 订阅类型
  subType: ""
```

#### 配置说明

Subscribe 配置可以在以下两个位置设置：

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
  subscribe:
    waitTimeout: 30s  # 等待流超时时间改为30秒
    iFrameOnly: true  # 只传输关键帧，节省带宽
```

**特定插件配置示例**：

```yaml
# config.yaml
global:
  subscribe:
    waitTimeout: 30s

# HTTP-FLV插件特定配置
flv:
  subscribe:
    writeBufferSize: 4096  # 设置更大的写缓冲区
    waitTimeout: 60s  # 覆盖全局配置，FLV等待流超时改为60秒

# HLS插件特定配置
hls:
  subscribe:
    bufferTime: 3s  # HLS缓冲3秒内容
```

## 使用示例

可以通过多种客户端协议订阅Monibuca中的流：

### HLS 订阅
```
# HTTP方式
http://your-server:8080/hls/live/stream/index.m3u8

# HTTPS方式
https://your-server:8443/hls/live/stream/index.m3u8
```

### HTTP-FLV 订阅
```
# HTTP方式
http://your-server:8080/flv/live/stream

# HTTPS方式
https://your-server:8443/flv/live/stream
```

### WebSocket-FLV 订阅
可以使用WebSocket从服务器订阅FLV流，适用于浏览器端播放：

```
# WS方式
ws://your-server:8080/flv/live/stream

# WSS加密方式
wss://your-server:8443/flv/live/stream
```

### HTTP-MP4 订阅
用于点播MP4文件或将实时流以MP4格式输出：

```
// 实时流
http://your-server:8080/mp4/live/stream

// 指定时间范围的点播
http://your-server:8080/mp4/live/stream?start=1620000000&end=1620001000

// 指定起始时间，直到当前
http://your-server:8080/mp4/live/stream?start=1620000000
```

### RTMP 订阅
```
rtmp://your-server:1935/live/stream
```

### RTSP 订阅
```
rtsp://your-server:554/live/stream
```

### FFPlay 播放示例

FFPlay是FFmpeg的一部分，可用于低延迟播放各种协议的流：

#### RTMP 播放
```bash
# 基本播放
ffplay rtmp://your-server:1935/live/stream

# 低延迟设置
ffplay -fflags nobuffer -flags low_delay -framedrop rtmp://your-server:1935/live/stream
```

#### RTSP 播放
```bash
# 使用TCP传输，提高稳定性
ffplay -rtsp_transport tcp rtsp://your-server:554/live/stream

# 低延迟设置
ffplay -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp rtsp://your-server:554/live/stream
```

#### HTTP-FLV 播放
```bash
# 基本播放
ffplay http://your-server:8080/flv/live/stream

# 低延迟设置
ffplay -fflags nobuffer -flags low_delay -framedrop http://your-server:8080/flv/live/stream
```

#### HLS 播放
```bash
# HLS通常不适合低延迟场景，但可以尝试以下设置
ffplay -fflags nobuffer http://your-server:8080/hls/live/stream/index.m3u8
```

## 注意事项

1. 根据客户端环境选择合适的协议，例如浏览器环境建议使用HLS、HTTP-FLV或WebSocket-FLV
2. 低延迟场景推荐使用WebRTC或WebSocket-FLV
3. 移动设备推荐使用HLS或HTTP-MP4
4. 设置适当的缓冲区大小平衡延迟和流畅度

## 常见问题

1. 播放延迟高
   - 减小缓冲时间
   - 调整订阅模式为实时模式
   - 考虑使用低延迟协议如WebRTC或WebSocket-FLV

2. 播放不流畅
   - 增加缓冲时间
   - 检查网络带宽是否足够
   - 考虑降低视频码率或分辨率

3. 无法播放
   - 确认流是否存在于服务器
   - 检查URL路径格式是否正确
   - 确认使用的播放器是否支持相应协议

### 低延迟播放的关键参数

使用FFPlay或基于FFmpeg的播放器时，以下参数对降低延迟很有帮助：

- `-fflags nobuffer`: 禁用帧缓冲
- `-flags low_delay`: 启用低延迟模式
- `-framedrop`: 丢弃落后的帧以保持实时性
- `-probesize 32`: 减少探测大小，加速启动
- `-analyzeduration 0`: 减少分析时间
- `-sync ext`: 使用外部时钟同步，对直播有帮助

完整的低延迟FFPlay命令示例：
```bash
ffplay -fflags nobuffer -flags low_delay -framedrop -probesize 32 -analyzeduration 0 -sync ext rtmp://your-server:1935/live/stream
```