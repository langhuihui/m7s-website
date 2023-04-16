# Configuration

v4 supports zero-configuration startup by default, which means no configuration file is required to run. If there is a configuration file, the configuration in the file will override the default configuration.

:::tip Configuration Cache File
Calling some APIs will cause a cached configuration file to be generated and stored in the ".m7s" directory. For example, calling stream forwarding will save the configuration to that directory. When the instance is started, the cached configuration information and the configuration information in the configuration file will be merged.
:::

## Global Configuration

The following are all the configuration items for global configuration and their default values:

:::tip Note
Below are default configuration items, so they do not need to be copied to the configuration file. Just fill in the parts that need to be modified in the configuration file to override the default configuration.
:::

```yaml
global:
  loglang: zh # Language of log message, optional values: zh, en
  loglevel: info # Log level, optional values: debug, info, warn, error, panic, fatal
  http:
    listenaddr: :8080 # Gateway address for API access
    listenaddrtls: "" # Port configuration for accessing the API in HTTPS mode
    certfile: ""
    keyfile: ""
    cors: true  # Whether to automatically add CORS headers
    username: ""  # Username and password for basic authentication when accessing the API
    password: ""
  publish:
      pubaudio: true # Whether to publish audio stream
      pubvideo: true # Whether to publish video stream
      kickexist: false # Whether to kick out existing publishers for replacing
      publishtimeout: 10s # Default expiration time for published streams. If the publisher does not recover the stream after this time, it will be deleted
      delayclosetimeout: 0 # Delay time after auto-close trigger (if there is a new subscription during this period, the trigger will be cancelled), 0 means disabling this feature and keeping the connection open.
      waitclosetimeout: 0 # Waiting time after the publisher is disconnected, if the publisher does not recover the stream after this time, it will be deleted. 0 means to disable this feature, and it is up to the subscriber to decide whether to delete it
      buffertime: 0 # Buffer time for time-shift playback, 0 means closing the buffer
  subscribe:
      subaudio: true # Whether to subscribe to audio stream
      subvideo: true # Whether to subscribe to video stream
      subaudioargname: ats # Parameter name for subscribing to audio tracks
      subvideoargname: vts # Parameter name for subscribing to video tracks
      subdataargname: dts # Parameter name for subscribing to data tracks
      subaudiotracks: [] # A list of audio track names to be subscribed to
      subvideotracks: [] # A list of video track names to be subscribed to
      submode: 0 # Subscription mode, 0 is frame skipping and chasing mode, 1 is no chasing mode (mostly used for recording), 2 is time-shift playback mode
      iframeonly: false # Only subscribe to keyframes
      waittimeout: 10s # Timeout for waiting for the publisher, used for subscribing to streams that have not been published yet
  enableavcc : true  # Enable AVCC format caching for the RTMP protocol
  enablertp : true # Enable RTP format caching for the RTSP, WebSocket, and GB28181 protocols
  enableauth: true # Enable authentication, see authentication mechanism for details
  enablesubevent: true # Enable subscription events, used for subscriber online and offline events, disabled to improve performance
  rtpreoderbufferlen: 50 # Buffer length for RTP reordering
  speedlimit: 500ms # Timeout for speed limitation. If it is set to 0, the limit is turned off. Speed limitation is required for some streams such as file reading, otherwise it will be read too fast
  eventbussize: 10 # Event bus cache size. When there are too many events, it is easy to block threads and the cache needs to be increased
  pulseinterval: 5s # Interval time for heartbeat events
  console: 
    server : console.monibuca.com:4242 # Address for connecting to the remote console
    secret: "" # Secret key for the remote console
    publicaddr: "" # Instance public address, which provides an address for remote console access. If not configured, the automatically recognized address will be used
    publicaddrtls: "" # The instance public address provides an address for remote console access. If not configured, the automatically recognized address will be used (https)
```

## Plugin Configuration

:::tip Plugins Configuration Defined by Plugins
Please refer to the plugin document for specific configuration information for each plugin.
:::

### Pulling Stream Configuration

Some plugins have the ability to pull streams from a remote server, so they have pulling stream configurations, which have the same format. For example:

```yaml
Plugin:
  pull:
    repull: 10
    proxy: [Proxy URL]
    pullonstart:
      live/test: [URL1]
      live/test2: [URL2]
    pullonsub:
      live/test3: [URL3]
      live/test4: [URL4]
```

- `repull` indicates how many retries are allowed. If it is set to `-1`, it means that there are unlimited retries. If it is set to `0`, it means that no retries are allowed.
- `proxy` indicates the proxy address. If you need to proxy fetch a stream, you can configure this item
- `pullonstart` represents that the stream is pulled immediately when the `m7s` is started.
- `pullonstart` is a key-value pair map. `key` represents the `streamPath` of the stream after it enters `m7s`, and `value` is the remote stream address.
- `pullonsub` represents on-demand stream pulling, that is, the stream will be pulled when `m7s` receives the subscription for the specified stream.
- `pullonsub` is also a key-value pair map, with the same format as `pullonstart`.

### Push Stream Configuration

Some plugins have the ability to push streams to a remote server, so they have push stream configurations, which have the same format. For example:

```yaml
Plugin:
  push:
    repush: 10
    pushlist:
      live/test: [URL1]
      live/test2: [URL2]
```

- `repush` indicates how many retries are allowed. If it is set to `-1`, it means that there are unlimited retries. If it is set to `0`, it means that no retries are allowed.
- `pushlist` is a key-value pair map. `key` represents the `streamPath` of the stream, and `value` is the remote stream address.
- Once `m7s` contains a stream that is included in the map, it will be pushed to the remote server.