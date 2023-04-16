# RTSP Plugin

The RTSP plugin provides the ability to push and pull the RTSP protocol and also to push and pull the RTSP protocol to remote servers.

## Plugin address

https://github.com/Monibuca/plugin-rtsp

## Plugin introduction

```go
import (
    _ "m7s.live/plugin/rtsp/v4"
)
```

## Push and Pull address form

```
rtsp://localhost/live/test
```
- `localhost` is the m7s server domain name or IP address, and the default port `554` can be omitted, otherwise it is required to be written.
- `live` represents `appName`
- `test` represents `streamName`
- `live/test` in m7s will serve as the stream identity.

For example, push stream to m7s through ffmpeg

```bash
ffmpeg -i [video source] -c:v h264 -c:a aac -f rtsp rtsp://localhost/live/test
```

This will create a stream named `live/test` inside m7s.

If the `live/test` stream already exists in m7s, then you can use the RTSP protocol to play it.

```bash
ffplay rtsp://localhost/live/test
```

## Configuration

```yaml
rtsp:
    publish:
        pubaudio: true  # Whether to publish audio stream
        pubvideo: true  # Whether to publish video stream
        kickexist: false  # Remove the existing publisher, used to replace the original publisher
        publishtimeout: 10s  # Default expiration time of published stream, if the publisher fails to resume streaming within this time, it will be deleted
        delayclosetimeout: 0  # Delay time after automatic closure trigger (if there is a new subscription during this period, the trigger will be canceled), 0 means closing this function to keep the connection.
        waitclosetimeout: 0  # Waiting time after the publisher disconnects, if the publisher fails to resume streaming within this time, it will be deleted, 0 means closing this function, allowing subscribers or playback to decide whether to delete
        buffertime: 0  # Buffering time for time travel, 0 means turning off buffering
    subscribe:
        subaudio: true  # Whether to subscribe to audio stream
        subvideo: true  # Whether to subscribe to video stream
        subaudioargname: ats  # Parameter name of audio track for subscription
        subvideoargname: vts  # Parameter name of video track for subscription
        subdataargname: dts  # Parameter name of data track for subscription
        subaudiotracks: []  # List of subscribed audio track names
        subvideotracks: []  # List of subscribed video track names
        submode: 0  # Subscription mode, 0 represents jump frame follow mode, 1 represents not follow mode (mostly for recording), and 2 represents time travel mode.
        iframeonly: false  # Only subscribe to key frame
        waittimeout: 10s  # Waiting time for publisher timeout, used to subscribe to streams that have not yet been published
    pull:
        repull: 0
        pullonstart: {}
        pullonsub: {}
    push:
        repush: 0
        pushlist: {}
    listenaddr: :554
    udpaddr: :8000
    rtcpaddr: :8001
    readbuffersize: 2048
    pullprotocol: 'auto'
```
:::tip Configuration override
publish and subscribe, any section not configured will use global configuration.
:::

## API

### `rtsp/api/list`
Get all RTSP streams

### `rtsp/api/pull?target=[RTSP address]&streamPath=[Stream identity]`
Pull the RTSP to m7s from a remote server

### `rtsp/api/push?target=[RTSP address]&streamPath=[Stream identity]`
Push local streams to remote servers