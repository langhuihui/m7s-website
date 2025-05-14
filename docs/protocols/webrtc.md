# WebRTC 集成

本文档描述了 Monibuca (m7s) 中的 WebRTC 协议实现，解释了如何通过 WebRTC 插件支持实时通信。有关其他协议（如 RTMP 或 RTSP）的信息，请参阅 [RTMP 协议](./rtmp.md) 或 [RTSP 协议](./rtsp.md)。

## 1. 概述

Monibuca 的 WebRTC 插件支持低延迟、基于浏览器的双向流媒体功能。该插件支持 WebRTC 发布（将流推送到 Monibuca）和 WebRTC 播放（从 Monibuca 拉取流），具有 ICE 服务器配置、编解码器协商和多流管理等功能。

## 2. 插件架构

### 2.1 插件结构

WebRTC 插件作为 Monibuca 插件实现，用于处理 WebRTC 协议通信。核心组件是 `WebRTCPlugin` 结构体：

```go
type WebRTCPlugin struct {
    m7s.Plugin
    ICEServers []ICEServer   `desc:"ice服务器配置"`
    Port       string        `default:"tcp:9000" desc:"监听端口"`
    PLI        time.Duration `default:"2s" desc:"发送PLI请求间隔"`
    EnableOpus bool          `default:"true" desc:"是否启用opus编码"`
    EnableVP9  bool          `default:"false" desc:"是否启用vp9编码"`
    EnableAv1  bool          `default:"false" desc:"是否启用av1编码"`
    EnableDC   bool          `default:"true" desc:"是否启用DataChannel"`
    m          MediaEngine
    s          SettingEngine
    api        *API
}
```

插件注册了各种 WebRTC 操作的 HTTP 处理器，并在启动时初始化必要的组件。

### 2.2 插件初始化

在初始化过程中，插件会：

1. 配置用于 NAT 穿透的 ICE 服务器
2. 设置日志
3. 注册支持的编解码器（H.264、VP8、Opus 等）
4. 配置网络传输（TCP/UDP）
5. 创建 WebRTC API 实例

插件支持基于配置的多种传输模式：

* TCP 模式：监听指定的 TCP 端口
* UDP 模式：监听指定的 UDP 端口
* UDP 范围模式：使用一系列 UDP 端口进行 WebRTC 通信

## 3. 连接管理

### 3.1 连接类型

WebRTC 插件使用多种连接类型来处理不同的流媒体场景：

1. **Connection**：管理 WebRTC PeerConnection 的基础连接类型
2. **MultipleConnection**：处理单个发布者或订阅者流
3. **SingleConnection**：在单个 WebRTC 连接中管理多个流
4. **RemoteStream**：表示 SingleConnection 中的远程视频流

### 3.2 媒体流

WebRTC 连接在两个方向上处理媒体：

1. **发布**：客户端向服务器发送媒体  
   * 通过 `OnTrack` 回调接收轨道  
   * 媒体帧被处理并写入 Publisher
2. **订阅**：服务器向客户端发送媒体  
   * 为每个音频/视频流创建媒体轨道  
   * 通过 RTP 数据包发送帧  
   * 对于不支持的编解码器，可以使用可选的 DataChannel

## 4. 发布和播放流

### 4.1 发布（推送）

`servePush` 端点允许客户端将 WebRTC 流推送到 Monibuca。该过程包括：

1. 客户端发送带有 SDP offer 的 HTTP 请求
2. 服务器创建 PeerConnection 和 Publisher
3. 服务器设置远程描述并生成 answer
4. 通过 OnTrack 回调处理媒体轨道
5. 媒体帧被发送到 Publisher

<SVG src="webrtc_push"/>

服务器支持用于 WebRTC 摄取的 WHIP 协议标准。

> Monibuca 自带测试页面，访问 `http://localhost:8080/webrtc/test/publish` 即可测试推流。
> 此外可以访问 `http://localhost:8080/webrtc/test/sharescreen` 测试屏幕分享推流。

### 4.2 播放（订阅）

`servePlay` 端点允许客户端从 Monibuca 接收 WebRTC 流：

1. 客户端发送带有 SDP offer 的 HTTP 请求
2. 服务器创建 PeerConnection 和 Subscriber
3. 服务器设置远程描述并生成 answer
4. 服务器创建并将媒体轨道添加到 PeerConnection
5. Publisher 的媒体帧被发送到客户端

<SVG src="webrtc_play"/>

对于 WebRTC 不支持的编解码器，当 `EnableDC` 为 true 时，插件可以使用 DataChannel 以 FLV 格式传输媒体数据。


> Monibuca 自带测试页面，访问 `http://localhost:8080/webrtc/test/play` 即可测试播放。

## 5. 多流 BatchV2 模式

BatchV2 模式允许在单个 WebRTC 连接中处理多个流，这对于客户端需要接收或发送多个流的场景更高效。

> Monibuca 自带测试页面，访问 `http://localhost:8080/webrtc/test/batchv2` 即可测试批量播放。

### 5.1 架构

BatchV2 使用 WebSocket 进行信令，并使用单个 PeerConnection 处理多个流。

### 5.2 信令协议

BatchV2 模式使用基于 WebSocket 的自定义信令协议：

| 信号类型   | 用途                   | 方向       |
| ------------- | ------------------------- | --------------- |
| offer         | 初始 SDP offer         | 客户端 → 服务器 |
| answer        | SDP answer                | 服务器 → 客户端 |
| publish       | 开始发布流 | 客户端 → 服务器 |
| unpublish     | 停止发布流  | 客户端 → 服务器 |
| subscribe     | 开始接收流   | 客户端 → 服务器 |
| unsubscribe   | 停止接收流    | 客户端 → 服务器 |
| getStreamList | 请求可用流 | 客户端 → 服务器 |
| streamList    | 可用流列表 | 服务器 → 客户端 |
| error         | 错误消息             | 服务器 → 客户端 |

该协议允许在单个连接中动态管理多个流。

### 5.3 客户端实现

BatchV2 模式包含一个 JavaScript 客户端（`BatchV2Client.js`/`BatchV2Client.ts`），用于处理 WebSocket 信令和 WebRTC 连接。主要功能：

* 连接管理
* 发布本地媒体
* 动态订阅多个流
* 具有添加/删除功能的流管理
* 流状态变化的事件处理

<SVG src="webrtc_batch"/>

## 6. 高级功能

### 6.1 ICE 配置

WebRTC 插件支持各种 ICE（交互式连接建立）配置：

1. 自定义 ICE 服务器（STUN/TURN）
2. 用于 NAT 穿透的公共 IP 配置
3. TCP 和 UDP 传输选项

插件自动处理 ICE 候选收集和连接建立。

### 6.2 编解码器支持

插件支持多种可配置选项的编解码器：

| 编解码器 | 类型  | 默认启用 | 配置          |
| ----- | ----- | ------------------ | ---------------------- |
| H.264 | 视频 | 是                | 默认配置文件        |
| VP8   | 视频 | 是                | 默认配置  |
| VP9   | 视频 | 否                 | 通过 EnableVP9 启用  |
| AV1   | 视频 | 否                 | 通过 EnableAv1 启用  |
| Opus  | 音频 | 是                | 通过 EnableOpus 启用 |

插件还包括 H.264 配置文件匹配功能，以确保不同 H.264 实现之间的兼容性。

### 6.3 CloudFlare 集成

插件支持与 Cloudflare 的实时通信平台集成，可以从 Cloudflare 的 WebRTC 平台拉取流到 Monibuca。

## 7. 处理重连和错误

WebRTC 插件实现了错误处理和连接监控：

1. ICE 连接状态监控
2. 对等连接状态变化
3. 断开连接时的优雅清理
4. 用于视频恢复的 PLI（图片丢失指示）

连接错误会触发适当的清理，以确保正确释放资源。

## 8. 测试和示例用法

插件包含用于不同 WebRTC 场景的测试页面：

* `/webrtc/test/publish`：发布测试页面
* `/webrtc/test/subscribe`：订阅测试页面
* `/webrtc/test/push`：推送 API 测试页面
* `/webrtc/test/pull`：拉取 API 测试页面
* `/webrtc/test/batchv2`：BatchV2 模式测试页面

这些测试页面提供了与 Monibuca 集成的 WebRTC 工作示例。

## 总结

Monibuca 的 WebRTC 插件提供了全面的实时通信实现，支持具有各种配置选项的发布和订阅。该插件与 Monibuca 的核心架构集成，使 WebRTC 流能够与其他协议一起处理。BatchV2 模式和 Cloudflare 集成等功能扩展了其高级用例的能力。
