# Subscription

Subscription is another core feature of Monibuca that allows clients to play streams from Monibuca using multiple protocols.

## Supported Protocols

Monibuca supports various subscription protocols:

- RTMP/RTMPS
- RTSP/RTSPS
- SRT
- HTTP-FLV
- WebSocket-FLV
- HTTP-MP4
- HLS
- WebRTC

## Configuration

### HTTPS/WSS Security Configuration

To enable HTTPS and WSS (WebSocket Secure) access, add SSL certificate configuration in the config file:

```yaml
# config.yaml
global:
  http:
    listenaddr: :8080
    # Secure connection configuration
    listenaddrtls: :8443
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
```

### Detailed Subscription Configuration

#### ⚠️ Warning

> **Do not directly copy the following complete configuration**. Monibuca only needs the parameters you want to modify, other parameters will use default values. Copying the entire configuration may override default parameters set elsewhere, causing unexpected issues. The following configuration is for reference only, explaining the meaning and default values of each parameter.

Here are the detailed subscription (Subscribe) configuration options that can be used in global configuration or specific plugin configuration:

```yaml
subscribe:
  # Maximum number of simultaneous subscribers, 0 means unlimited
  maxCount: 0
  # Whether to subscribe to audio
  subAudio: true
  # Whether to subscribe to video
  subVideo: true
  # Buffer duration, start playback from keyframe at buffer duration
  bufferTime: 0s
  # Subscription mode
  # 0: Real-time mode - catch up with publisher progress, wait for next keyframe after first screen, then jump to that frame
  # 1: No catch-up after first screen
  # 2: Start playback from keyframe with maximum buffer, no catch-up, requires publisher to configure cache length
  subMode: 0
  # Synchronization mode
  # 0: Use timestamp synchronization
  # 1: Use write time synchronization
  syncMode: 1
  # Whether to only use keyframes
  iFrameOnly: false
  # Stream wait timeout
  waitTimeout: 10s
  # Write buffer size
  writeBufferSize: 0
  # Subscription authentication key
  key: ""
  # Subscription type
  subType: ""
```

#### Configuration Notes

Subscribe configuration can be set in two locations:

1. **Global Configuration**: Applies to all streams as default configuration
2. **Plugin Configuration**: Only applies to streams of specific plugins, overrides global configuration

Important notes:
- Only configure parameters you want to modify, unconfigured parameters will use default values
- Plugin configuration overrides parameters with the same name in global configuration

#### Configuration Examples

**Global Configuration Example**:

```yaml
# config.yaml
global:
  subscribe:
    waitTimeout: 30s  # Change stream wait timeout to 30 seconds
    iFrameOnly: true  # Only transmit keyframes to save bandwidth
```

**Specific Plugin Configuration Example**:

```yaml
# config.yaml
global:
  subscribe:
    waitTimeout: 30s

# HTTP-FLV plugin specific configuration
flv:
  subscribe:
    writeBufferSize: 4096  # Set larger write buffer
    waitTimeout: 60s  # Override global config, FLV stream wait timeout changed to 60 seconds

# HLS plugin specific configuration
hls:
  subscribe:
    bufferTime: 3s  # HLS buffer 3 seconds of content
```

## Usage Examples

You can subscribe to streams in Monibuca using various client protocols:

### HLS Subscription
```
# HTTP method
http://your-server:8080/hls/live/stream/index.m3u8

# HTTPS method
https://your-server:8443/hls/live/stream/index.m3u8
```

### HTTP-FLV Subscription
```
# HTTP method
http://your-server:8080/flv/live/stream

# HTTPS method
https://your-server:8443/flv/live/stream
```

### WebSocket-FLV Subscription
You can use WebSocket to subscribe to FLV streams from the server, suitable for browser playback:

```
# WS method
ws://your-server:8080/flv/live/stream

# WSS encrypted method
wss://your-server:8443/flv/live/stream
```

### HTTP-MP4 Subscription
Used for VOD MP4 files or outputting live streams in MP4 format:

```
// Live stream
http://your-server:8080/mp4/live/stream

// VOD with specified time range
http://your-server:8080/mp4/live/stream?start=1620000000&end=1620001000

// VOD from specified start time until current
http://your-server:8080/mp4/live/stream?start=1620000000
```

### RTMP Subscription
```
rtmp://your-server:1935/live/stream
```

### RTSP Subscription
```
rtsp://your-server:554/live/stream
```

### FFPlay Playback Examples

FFPlay is part of FFmpeg and can be used for low-latency playback of various protocol streams:

#### RTMP Playback
```bash
# Basic playback
ffplay rtmp://your-server:1935/live/stream

# Low latency settings
ffplay -fflags nobuffer -flags low_delay -framedrop rtmp://your-server:1935/live/stream
```

#### RTSP Playback
```bash
# Use TCP transport for better stability
ffplay -rtsp_transport tcp rtsp://your-server:554/live/stream

# Low latency settings
ffplay -fflags nobuffer -flags low_delay -framedrop -rtsp_transport tcp rtsp://your-server:554/live/stream
```

#### HTTP-FLV Playback
```bash
# Basic playback
ffplay http://your-server:8080/flv/live/stream

# Low latency settings
ffplay -fflags nobuffer -flags low_delay -framedrop http://your-server:8080/flv/live/stream
```

#### HLS Playback
```bash
# HLS is usually not suitable for low latency scenarios, but you can try these settings
ffplay -fflags nobuffer http://your-server:8080/hls/live/stream/index.m3u8
```

## Important Notes

1. Choose appropriate protocol based on client environment, e.g., HLS, HTTP-FLV, or WebSocket-FLV for browser environments
2. WebRTC or WebSocket-FLV recommended for low latency scenarios
3. HLS or HTTP-MP4 recommended for mobile devices
4. Set appropriate buffer size to balance latency and smoothness

## Common Issues

1. High Playback Latency
   - Reduce buffer time
   - Adjust subscription mode to real-time mode
   - Consider using low latency protocols like WebRTC or WebSocket-FLV

2. Unstable Playback
   - Increase buffer time
   - Check if network bandwidth is sufficient
   - Consider reducing video bitrate or resolution

3. Unable to Play
   - Confirm if stream exists on server
   - Check if URL path format is correct
   - Verify if player supports the protocol

### Key Parameters for Low Latency Playback

When using FFPlay or FFmpeg-based players, these parameters are helpful for reducing latency:

- `-fflags nobuffer`: Disable frame buffering
- `-flags low_delay`: Enable low delay mode
- `-framedrop`: Drop lagging frames to maintain real-time
- `-probesize 32`: Reduce probe size, speed up startup
- `-analyzeduration 0`: Reduce analysis time
- `-sync ext`: Use external clock sync, helpful for live streaming

Complete low latency FFPlay command example:
```bash
ffplay -fflags nobuffer -flags low_delay -framedrop -probesize 32 -analyzeduration 0 -sync ext rtmp://your-server:1935/live/stream
``` 