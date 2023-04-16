# plugin-edge
Edge server plugin - allows m7s instances to act as edge servers.


## Plugin Address

https://github.com/Monibuca/plugin-edge

## Plugin Introduction

```go
import (
    _ "m7s.live/plugin/edge/v4"
)
```

## Configuration

```yaml
edge:
  origin: "http://localhost:8080/hdl/"
```

Origin represents the prefix of the source server's stream pulling address and can be in the following formats:
- http://[host]:[port]/hdl/ - pull streams using the hdl protocol
- rtmp://[host]:[port]/ - pull streams using the rtmp protocol
- rtsp://[host]:[port]/ - pull streams using the rtsp protocol

## Usage

When the edge configuration is set, the instance will act as an edge server, and automatically send a stream pulling request to the source server when a subscriber is received, thereby achieving cascading effects.