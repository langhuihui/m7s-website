# WebTransport Plugin

Push and pull streams with WebTransport.

## Plugin Address

https://github.com/Monibuca/plugin-webtransport

## Plugin Introduction
```go
    import (  _ "m7s.live/plugin/webtransport/v4" )
```

## Configuration

```yaml
webtransport:
  listenaddr: :4433
  certfile: monibuca.com.pem
  keyfile: monibuca.com.key
```

## API Interface

- `/play/[streamPath]` used for playback.
- `/push/[streamPath]` used for pushing.

After establishing the two-way stream, transmit data in flv format.