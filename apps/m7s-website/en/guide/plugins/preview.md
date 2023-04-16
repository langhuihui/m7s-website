# Preview Plugin

Plugin for previewing local video player.

## Plugin Address

https://github.com/Monibuca/plugin-preview

## Plugin Import

```go
import (
    _ "m7s.live/plugin/preview/v4"
)
```

## Configuration

None

## API

- `/preview/[streamPath]?type=[hdl|hls|ws|wt|rtc]` can be used to preview live streams.
- `/preview/[filepath]` can be used to preview recorded files (under development).

## Notes for Using WebTransport

- Local testing requires a locally started HTTPS service with a valid certificate configured.
- Since the certificate is bound to the domain name, it is necessary to configure the corresponding domain name in the host file. For example: `127.0.0.1  monibuca.com`