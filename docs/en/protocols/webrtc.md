# WebRTC Integration

This document describes the WebRTC protocol implementation in Monibuca (m7s), explaining how real-time communication is supported through the WebRTC plugin. For information about other protocols like RTMP or RTSP, see [RTMP Protocol](./rtmp.md) or [RTSP Protocol](./rtsp.md).

## 1. Overview

Monibuca's WebRTC plugin enables low-latency, browser-based streaming with bidirectional capabilities. The plugin supports both WebRTC publishing (pushing streams to Monibuca) and WebRTC playback (pulling streams from Monibuca), with features like ICE server configuration, codec negotiation, and multi-stream management.

## 2. Plugin Architecture

### 2.1 Plugin Structure

The WebRTC plugin is implemented as a Monibuca plugin that handles WebRTC protocol communication. The core component is the `WebRTCPlugin` struct:
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

The plugin registers HTTP handlers for various WebRTC operations and initializes the necessary components during startup.

### 2.2 Plugin Initialization

During initialization, the plugin:

1. Configures ICE servers for NAT traversal
2. Sets up logging
3. Registers supported codecs (H.264, VP8, Opus, etc.)
4. Configures network transport (TCP/UDP)
5. Creates the WebRTC API instance

The plugin supports multiple transport modes based on configuration:

* TCP mode: Listens on a specified TCP port
* UDP mode: Listens on a specified UDP port
* UDP range mode: Uses a range of UDP ports for WebRTC communication

## 3. Connection Management

### 3.1 Connection Types

The WebRTC plugin uses several connection types to handle different streaming scenarios:

1. **Connection**: Base connection type that manages a WebRTC PeerConnection
2. **MultipleConnection**: Handles a single publisher or subscriber stream
3. **SingleConnection**: Manages multiple streams in a single WebRTC connection
4. **RemoteStream**: Represents a remote video stream in a SingleConnection

### 3.2 Media Flow

WebRTC connections handle media in two directions:

1. **Publishing**: Client sends media to the server  
   * Tracks are received through `OnTrack` callback  
   * Media frames are processed and written to the Publisher
2. **Subscribing**: Server sends media to the client  
   * Media tracks are created for each audio/video stream  
   * Frames are sent through RTP packets  
   * Optional DataChannel can be used for unsupported codecs

## 4. Publishing and Playing Streams

### 4.1 Publishing (Push)

The `servePush` endpoint allows clients to push WebRTC streams to Monibuca. The process includes:

1. Client sends an HTTP request with SDP offer
2. Server creates a PeerConnection and Publisher
3. Server sets remote description and generates answer
4. Media tracks are processed through OnTrack callbacks
5. Media frames are sent to the Publisher

<SVG src="webrtc_push"/>

The server supports the WHIP protocol standard for WebRTC ingest.

### 4.2 Playing (Subscribe)

The `servePlay` endpoint allows clients to receive WebRTC streams from Monibuca:

1. Client sends an HTTP request with SDP offer
2. Server creates a PeerConnection and Subscriber
3. Server sets remote description and generates answer
4. Server creates and adds media tracks to the PeerConnection
5. Media frames from the Publisher are sent to the client

<SVG src="webrtc_play"/>

For codecs not supported by WebRTC, the plugin can use DataChannel to transmit media data as FLV format when `EnableDC` is true.

## 5. BatchV2 Mode for Multiple Streams

The BatchV2 mode allows handling multiple streams in a single WebRTC connection, which is more efficient for scenarios where a client needs to receive or send multiple streams.

### 5.1 Architecture

BatchV2 uses WebSocket for signaling and a single PeerConnection for multiple streams.

### 5.2 Signaling Protocol

The BatchV2 mode uses a custom signaling protocol over WebSocket:

| Signal Type   | Purpose                   | Direction       |
| ------------- | ------------------------- | --------------- |
| offer         | Initial SDP offer         | Client → Server |
| answer        | SDP answer                | Server → Client |
| publish       | Start publishing a stream | Client → Server |
| unpublish     | Stop publishing a stream  | Client → Server |
| subscribe     | Start receiving streams   | Client → Server |
| unsubscribe   | Stop receiving streams    | Client → Server |
| getStreamList | Request available streams | Client → Server |
| streamList    | List of available streams | Server → Client |
| error         | Error message             | Server → Client |

This protocol allows for dynamic management of multiple streams in a single connection.

### 5.3 Client Implementation

The BatchV2 mode includes a JavaScript client (`BatchV2Client.js`/`BatchV2Client.ts`) that handles the WebSocket signaling and WebRTC connection. Key features:

* Connection management
* Publishing local media
* Dynamic subscription to multiple streams
* Stream management with add/remove capabilities
* Event handling for stream state changes

<SVG src="webrtc_batch"/>

## 6. Advanced Features

### 6.1 ICE Configuration

The WebRTC plugin supports various ICE (Interactive Connectivity Establishment) configurations:

1. Custom ICE servers (STUN/TURN)
2. Public IP configuration for NAT traversal
3. TCP and UDP transport options

The plugin handles ICE candidate gathering and connection establishment automatically.

### 6.2 Codec Support

The plugin supports several codecs with configurable options:

| Codec | Type  | Enabled by Default | Configuration          |
| ----- | ----- | ------------------ | ---------------------- |
| H.264 | Video | Yes                | Default profile        |
| VP8   | Video | Yes                | Default configuration  |
| VP9   | Video | No                 | Enable with EnableVP9  |
| AV1   | Video | No                 | Enable with EnableAv1  |
| Opus  | Audio | Yes                | Enable with EnableOpus |

The plugin also includes H.264 profile matching functionality to ensure compatibility between different H.264 implementations.

### 6.3 CloudFlare Integration

The plugin supports integration with Cloudflare's Real-Time Communications platform, enabling pulling streams from Cloudflare's WebRTC platform into Monibuca.

## 7. Handling Reconnections and Errors

The WebRTC plugin implements error handling and connection monitoring:

1. ICE connection state monitoring
2. Peer connection state changes
3. Graceful cleanup on disconnection
4. PLI (Picture Loss Indication) for video recovery

Connection errors trigger appropriate cleanup to ensure resources are released properly.

## 8. Testing and Example Usage

The plugin includes test pages for different WebRTC scenarios:

* `/webrtc/test/publish`: Publishing test page
* `/webrtc/test/subscribe`: Subscribing test page
* `/webrtc/test/push`: Push API test page
* `/webrtc/test/pull`: Pull API test page
* `/webrtc/test/batchv2`: BatchV2 mode test page

These test pages provide working examples for WebRTC integration with Monibuca.

## Summary

Monibuca's WebRTC plugin provides a comprehensive implementation for real-time communication, supporting both publishing and subscribing with various configuration options. The plugin integrates with Monibuca's core architecture, enabling WebRTC streams to be processed alongside other protocols. Features like BatchV2 mode and Cloudflare integration extend its capabilities for advanced use cases.
