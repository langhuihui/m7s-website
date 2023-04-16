# Play issue
## Play Address

- Each stream in the m7s has a unique identifier, which is the StreamPath. The rule of StreamPath is `[AppName]/[StreamName]`, where AppName is the application name and StreamName is the stream name. For example, `live/test`, where `live` is the AppName and `test` is the StreamName.
- Given the StreamPath, any protocol can be used to pull the stream for play.

:::tip Address Concatenation Rule
There is an interactive UI for address concatenation on the home page of the official website, which generates the corresponding play address for a specific protocol.
:::

A play address usually follows the rule of `[protocol]://[Host][:Port]/[plugin name]/[StreamPath]`

:::danger Plugin Name
The Plugin Name is only necessary for cases where the publicly shared HTTP port is being used, including the websocket protocols, i.e. ws-flv and ws-raw.
:::

For example, if the host is localhost and the StreamPath is live/test,

the HTTP-FLV protocol's address would be
`http://localhost:8080/hdl/live/test.flv`

the fmp4 protocol's address would be
`http://localhost:8080/fmp4/live/test.mp4`

the HLS protocol's address would be
`http://localhost:8080/hls/live/test.m3u8`

the ws-flv protocol's address would be
`ws://localhost:8080/jessica/live/test.flv`

the ws-raw protocol's address would be
`ws://localhost:8080/jessica/live/test`

:::danger ws-raw protocol
The ws-raw protocol is a private protocol, which can only be played using the jessibuca player.
:::

:::warning HTTP Port Number
The default port number for the HTTP protocol is 8080, which can be modified through global configurations. For plugins containing the HTTP configuration, the port number can be configured separately. If a separate port number is used, the plugin name does not need to be concatenated into the address. For instance, in the previous example, if the hdl plugin uses the HTTP port number of 8081, then the address would be: `http://localhost:8081/live/test.flv`.
:::

The RTMP play address is:
`rtmp://localhost/live/test`

The RTSP play address is:
`rtsp://localhost/live/test`

:::tip Default Port Number
The default port number for RTMP is 1935 and for RTSP is 554. If the port number is not specified in the address, then the default port number will be used.
:::

### WebRTC Play Address
:::tip WebRTC Play Address
WebRTC does not actually have a play address. Instead, it is played using a JS API. The specific API can be found here: [WebRTC Play](/guide/plugins/webrtc.md)
If playing WebRTC requires reference, please refer to MDN: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
:::

The first step is to complete SDP exchange, and then play is realized through the established WebRTC connection. Jessibuca simplifies this process into a single address: `webrtc://localhost/live/test`. In fact, the SDP exchange connection is established to the server first, and then the WebRTC connection is established through this connection.

## Notes
- If H.265 is played through FLV and RTMP formats, a custom player (such as jessibuca) must be used for play. As FLV and RTMP do not define the format of H.265 themselves, it is implemented through expansion.