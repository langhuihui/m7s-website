# Screenshot Plugin

This plugin allows you to obtain an I-frame screenshot (in jpg format) of a specified stream through an HTTP request.

## Plugin Address

https://github.com/Monibuca/plugin-snap

## Plugin Importing
```go
import (
    _ "m7s.live/plugin/snap/v4"
)
```
## Default Configuration

```yaml
snap:
    ffmpeg: "ffmpeg"
```

If ffmpeg cannot be accessed globally, you can modify the ffmpeg path to the local absolute path.

## API

### `/snap/[streamPath]`

Get a screenshot of the latest I-frame of the specified stream in jpg format.
For example, if there is a stream live/test in Monibuca (localhost), you can obtain the latest screenshot of the stream by accessing http://localhost:8080/snap/live/test.