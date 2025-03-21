# Stream Pushing

Stream pushing is one of Monibuca's core features that allows pushing video streams to the Monibuca server.

## Supported Protocols

Monibuca supports various push protocols:

- RTMP/RTMPS
- RTSP/RTSPS
- SRT
- WebRTC

## Configuration

By default, Monibuca automatically listens on standard ports, such as port 1935 for RTMP and port 554 for RTSP.

You can modify the listening ports through configuration:

Only configure when there are port conflicts, default ports are recommended
```yaml
rtmp:
  tcp: :1936
rtsp:
  tcp: :8554
srt:
  listenaddr: :6001
  passphrase: foobarfoobar
```

### Configuring Encrypted Push

To enable RTMPS and RTSPS encrypted push, configure SSL certificates:

```yaml
rtmp:
  # Regular RTMP
  tcp:
    listenaddr: :1935
    lisenaddrtls: :1936
    # SSL certificate configuration
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
  
rtsp:
  # Regular RTSP
  tcp:
    listenaddr: :554
    lisenaddrtls: :8554
    # SSL certificate configuration
    certfile: /path/to/cert.pem
    keyfile: /path/to/key.pem
```

### Detailed Push Configuration

#### ⚠️ Warning

> **Do not directly copy the following complete configuration**. Monibuca only needs the parameters you want to modify, other parameters will use default values. Copying the entire configuration may override default parameters set elsewhere, causing unexpected issues. The following configuration is for reference only, explaining the meaning and default values of each parameter.

Here are the detailed push (Publish) configuration options that can be used in global configuration or specific plugin configuration:

```yaml
publish:
  # Maximum number of simultaneous publishers, 0 means unlimited
  maxCount: 0
  # Whether to publish audio
  pubAudio: true
  # Whether to publish video
  pubVideo: true
  # Whether to kick existing publisher with same name
  kickExist: false
  # No data timeout for publishing
  publishTimeout: 10s
  # Auto-close delay time (waiting for reconnection)
  waitCloseTimeout: 0s
  # Auto-close delay time (when no subscribers)
  delayCloseTimeout: 0s
  # Idle (no subscribers) timeout
  idleTimeout: 0s
  # Pause timeout
  pauseTimeout: 30s
  # Buffer duration, 0 means use latest keyframe
  bufferTime: 0s
  # Send rate, 0 means unlimited
  speed: 0
  # Scale factor
  scale: 1
  # Maximum FPS
  maxFPS: 30
  # Publish authentication key
  key: ""
  # Buffer size range
  ringSize: "20-1024"
  # Forward mode: remux(transcode), relay(pure forward), mix(mixed forward)
  relayMode: "remux"
  # Publish type
  pubType: "server"
```

#### Configuration Notes

Publish configuration can be set in two locations:

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
  publish:
    kickExist: true  # Allow new push to kick existing stream with same name
    publishTimeout: 30s  # Change no data timeout to 30 seconds
    idleTimeout: 300s  # Auto-close stream after 5 minutes without viewers
```

**Specific Plugin Configuration Example**:

```yaml
# config.yaml
global:
  publish:
    kickExist: true
    maxFPS: 25

# RTMP plugin specific configuration
rtmp:
  publish:
    kickExist: false  # Override global config, RTMP does not allow kicking existing streams
    publishTimeout: 60s  # RTMP push timeout after 60 seconds without data
    maxFPS: 30  # RTMP maximum frame rate 30

# RTSP plugin specific configuration
rtsp:
  publish:
    waitCloseTimeout: 10s  # Wait 10 seconds for reconnection after RTSP disconnection
```

## Usage Examples

### RTMP Push

Using streaming software like OBS, set the push URL to:

```
rtmp://your-server/live/stream-key
```

### RTSP Push

Using devices or software supporting RTSP, set the push URL to:

```
rtsp://your-server/live/stream-key
```

### RTMPS Push

Using software supporting RTMPS, set the push URL to:

```
rtmps://your-server:1936/live/stream-key
```

### RTSPS Push

Using devices or software supporting RTSPS, set the push URL to:

```
rtsps://your-server:322/live/stream-key
```

### FFmpeg Push

FFmpeg is a powerful multimedia processing tool that can be used for pushing streams in various protocols.

#### RTMP Push Example
```bash
ffmpeg -re -i input.mp4 -c copy -f flv rtmp://your-server:1935/live/stream-key
```

#### RTSP Push Example

```bash
ffmpeg -re -i input.mp4 -c copy -f rtsp -rtsp_transport tcp rtsp://your-server:554/live/stream-key
```

#### RTMPS Push Example
```bash
# Push using RTMPS encryption
ffmpeg -re -i input.mp4 -c copy -f flv rtmps://your-server:1936/live/stream-key
```

#### RTSPS Push Example
```bash
# Push using RTSPS encryption
ffmpeg -re -i input.mp4 -c copy -f rtsp -rtsp_transport tcp rtsps://your-server:322/live/stream-key
```

#### Codec Conversion

If your source video uses unsupported codecs, you need to convert it to H.264 video codec and AAC audio codec:

```bash
ffmpeg -re -i input.mp4 -c:v libx264 -c:a aac -f rtsp -rtsp_transport tcp rtsp://your-server:554/live/stream-key
```

#### SRT Push Example
```bash
ffmpeg -re -i input.mp4 -c copy -f mpegts srt://your-server:6000?streamid=publish:live/stream-key
```

## Important Notes

1. Ensure server firewall allows the corresponding ports
2. Ensure sufficient server bandwidth before pushing
3. Recommend using stable network environment for pushing

## Common Issues

1. Push Failure
   - Check network connection
   - Verify push URL is correct
   - Confirm server configuration is correct

2. Push Latency
   - Check network bandwidth
   - Adjust encoding parameters
   - Consider using low latency protocols like SRT 