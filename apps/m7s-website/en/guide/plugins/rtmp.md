# RTMP Plugin
The RTMP plugin provides the ability to push and pull streams via the RTMP protocol to remote servers.
 
## Repository Address
https://github.com/Monibuca/plugin-rtmp

## Import
```go
import _ "m7s.live/plugin/rtmp/v4"
```

## Push and Pull Address Format
```
rtmp://localhost/live/test
```
- `localhost` is the m7s server domain name or IP address, the default port `1935` can be omitted or explicitly stated. 
- `live` represents the `appName`.
- `test` represents the `streamName`.
- In m7s, `live/test` serves as the unique identifier of the stream.

For example, if pushing a stream to m7s via FFmpeg:

```bash
ffmpeg -i [source] -c:v h264 -c:a aac -f flv rtmp://localhost/live/test
```

it will form a stream named live/test inside m7s.


Once a stream named live/test already exists in m7s, it can be played using the rtmp protocol:
```bash
ffplay -i rtmp://localhost/live/test
```


## Configuration

```yaml
rtmp:
    publish:
        pubaudio: true # Whether to publish the audio stream
        pubvideo: true # Whether to publish the video stream
        kickexist: false # Whether to remove existing publishers, useful for replacing the existing publisher.
        publishtimeout: 10s # The default expiration time for publishing streams, publishers who do not recover the stream by the deadline will be removed.
        delayclosetimeout: 0 # The time delay from triggering auto-close to actual closing (the trigger is cancelled if a new subscription is made during the delay). 0 disables this function, so the connection is maintained.
        waitclosetimeout: 0 # The time to wait for the publisher to recover the stream once disconnected. Publishers who don't recover the stream will be removed after the specified timeout. 0 disables this function, with subscription deciding whether to remove it.
        buffertime: 0 # The cache time used for time-back tracking. 0 disables this function.
    subscribe:
        subaudio: true # Whether to subscribe to the audio stream
        subvideo: true # Whether to subscribe to the video stream
        subaudioargname: ats # The name of the parameter for the subscribing audio track.
        subvideoargname: vts # The name of the parameter for the subscribing video track.
        subdataargname: dts # The name of the parameter for the subscribing data track.
        subaudiotracks: [] # The list of the subscribing audio track names.
        subvideotracks: [] # The list of the subscribing video track names.
        submode: 0 # Subscription mode, 0 indicates the skip-frame chasing mode, 1 indicates the non-chasing mode (mainly used for recording), and 2 indicates the time-back tracking mode.
        iframeonly: false # Subscribe only to keyfranes.
        waittimeout: 10s # Timeout for waiting for publishers, used for subscribing to not-yet-published streams.
    tcp:
        listenaddr: :1935
        listennum: 0
    pull:
        repull: 0 # Whether to automatically pull the stream if disconnected. 0 indicates no automatic re-pull, -1 indicates unlimited re-pulls.
        pullonstart: {} # Whether to automatically pull the stream when m7s starts.
        pullonsub: {}  # Whether to automatically pull the stream upon subscription (pull according to demand).
    push:
        repush: 0 # Whether to automatically push the stream if disconnected. 0 indicates no automatic re-push, -1 indicates unlimited re-pushes.
        pushlist: {} # The push list, with streamPath as key and the remote address as the value.
    chunksize: 65536 # RTMP chunk size
    keepalive: false # Whether to keep the RTMP connection open. The default is to disconnect the session when stream is closed.
```
:::tip Configuration override
publish and subscribe items inherit from the global config if any relevant item is unspecified in them.
:::

## API
### `rtmp/api/list`
Get all RTMP streams.

### `rtmp/api/pull?target=[RTMP Address]&streamPath=[Stream Identifier]`
Fetch RTMP from remote to m7s.

### `rtmp/api/push?target=[RTMP Address]&streamPath=[Stream Identifier]`
Push the local stream to the remote end.