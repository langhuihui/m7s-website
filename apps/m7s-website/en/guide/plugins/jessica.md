# JESSICA Plugin

Transmit audio and video data via WebSockets and use Jessibuca player for playback.

## Plugin Address

https://github.com/Monibuca/plugin-jessica

## Plugin Import
```go
import (
    _ "m7s.live/plugin/jessica/v4"
)
```

## Configuration

WS protocol and WSS protocol listening address ports can be configured.

```yaml
jessica:
    http:
      listenaddr: :8080 # Gateway address for API access.
      listenaddrtls: "" # Port configuration for accessing the API using the HTTPS method.
      certfile: ""
      keyfile: ""
      cors: true # Whether to add CORS headers automatically.
      username: "" # Username and password for basic authentication during API access.
      password: ""
    subscribe:
        subaudio: true # Whether to subscribe to audio streams.
        subvideo: true # Whether to subscribe to video streams.
        subaudioargname: ats # Parameter name for subscribing to audio tracks.
        subvideoargname: vts # Parameter name for subscribing to video tracks.
        subdataargname: dts # Parameter name for subscribing to data tracks.
        subaudiotracks: [] # List of audio track names to subscribe to.
        subvideotracks: [] # List of video track names to subscribe to.
        submode: 0 # Subscription mode, where 0 is skip frame chasing mode, 1 is non-chasing mode (often used for recording), and 2 is time-backtracking mode.
        iframeonly: false # Only subscribe to key frames.
        waittimeout: 10s # Timeout for waiting for the publisher to subscribe to the stream before it's published.
```

## Protocol Description

This plugin provides two formats of protocols for the player to use for playback.

### WS-RAW

- Address format: ws://[HOST]/jessica/[streamPath]

- This protocol transmits a private format, where the first byte represents audio or video, with 1 representing audio and 2 representing video. This is then followed by 4-byte timestamp and the bytes for the RTMP VideoTag or AudioTag.

### WS-FLV

- Address format: ws://[HOST]/jessica/[streamPath].flv

- This protocol transmits the file stream in FLV format.