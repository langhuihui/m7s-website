# Snap Plugin

The Snap plugin provides screenshot functionality for streaming media, supporting scheduled screenshots, keyframe-based screenshots, and manual trigger screenshots. It also supports watermark functionality and historical screenshot queries.

## Configuration

```yaml
snap:
  snapwatermark:
    text: ""              # Watermark text content
    fontpath: ""          # Watermark font file path
    fontcolor: "rgba(255,165,0,1)" # Watermark font color, supports rgba format
    fontsize: 36          # Watermark font size
    offsetx: 0           # Watermark X position offset
    offsety: 0           # Watermark Y position offset
  snaptimeinterval: 1m   # Screenshot time interval, default 1 minute
  snapsavepath: "snaps"  # Screenshot save path
  filter: ".*"           # Screenshot stream filter, supports regular expressions
  snapiframeinterval: 3  # Screenshot interval in frames
  snapmode: 1            # Screenshot mode: 0-time interval, 1-keyframe interval, 2-HTTP request mode (manual trigger)
  snapquerytimedelta: 3  # Maximum allowed time difference for querying screenshots (seconds)
```

## HTTP API

### 1. Manual Screenshot Trigger

```http
GET /{streamPath}
```

Parameters:
- `streamPath`: Stream path

Response:
- Success: Returns JPEG image
- Failure: Returns error message

### 2. Query Historical Screenshots

```http
GET /query?streamPath={streamPath}&snapTime={timestamp}
```

Parameters:
- `streamPath`: Stream path
- `snapTime`: Unix timestamp (seconds)

Response:
- Success: Returns JPEG image closest to the requested time
- Failure: Returns error message
  - 404: Screenshot not found or time difference exceeds configured range
  - 400: Parameter error
  - 500: Internal server error

## Screenshot Mode Description

### Time Interval Mode (snapmode: 0)
- Takes screenshots at configured `timeinterval` intervals
- Suitable for scenarios requiring fixed time interval screenshots

### Keyframe Interval Mode (snapmode: 1)
- Takes screenshots at configured `iframeinterval` for keyframes
- Suitable for scenarios requiring screenshots based on video content changes

### HTTP Request Mode (snapmode: 2)
- Manually triggers screenshots through HTTP API
- Suitable for scenarios requiring real-time frame capture

## Watermark Function

Supports adding text watermarks to screenshots with configurable:
- Watermark text content
- Font file
- Font color (RGBA format)
- Font size
- Position offset

### Time Format Watermark

Watermark text supports time formatting using `$T{format}` syntax, where `format` is a Go time format string.

Common time format examples:
- `$T{2006-01-02}` - Display current date, e.g., 2024-01-20
- `$T{15:04:05}` - Display current time, e.g., 14:30:45
- `$T{2006-01-02 15:04:05}` - Display full date and time, e.g., 2024-01-20 14:30:45
- `$T{01/02/2006}` - Display US date format, e.g., 01/20/2024
- `$T{Mon 02 Jan}` - Display short date format, e.g., Sat 20 Jan

Configuration example:
```yaml
snap:
  watermark:
    text: "Test Watermark $T{2006-01-02 15:04:05}"
    fontpath: "/path/to/font.ttf"
    fontcolor: "rgba(255,0,0,0.5)"
    fontsize: 48
    offsetx: 20
    offsety: 20
  mode: 0
  timeinterval: 1m
```

## Database Records

Each screenshot records the following information in the database:
- Stream Name (StreamName)
- Screenshot Mode (SnapMode)
- Screenshot Time (SnapTime)
- Screenshot Path (SnapPath)
- Creation Time (CreatedAt)

## Usage Examples

1. Basic configuration example:
```yaml
snap:
  timeinterval: 30s
  savepath: "./snapshots"
  mode: 1
  iframeinterval: 5
```

2. Configuration example with watermark:
```yaml
snap:
  watermark:
    text: "Test Watermark"
    fontpath: "/path/to/font.ttf"
    fontcolor: "rgba(255,0,0,0.5)"
    fontsize: 48
    offsetx: 20
    offsety: 20
  mode: 0
  timeinterval: 1m
```

3. API call examples:
```bash
# Manual screenshot trigger
curl http://localhost:8080/snap/live/stream1

# Query historical screenshot
curl http://localhost:8080/snap/query?streamPath=live/stream1&snapTime=1677123456
```

## Best Practices
1. Storage Management
   - Implement automatic cleanup for old screenshots
   - Monitor disk usage
   - Use appropriate file naming conventions
   - Consider using external storage for large deployments

2. Performance Optimization
   - Choose appropriate screenshot intervals
   - Optimize image quality vs. size
   - Use efficient storage formats
   - Implement caching mechanisms

3. Watermark Usage
   - Keep watermark text concise
   - Use appropriate font sizes
   - Ensure watermark visibility
   - Consider watermark position impact

## Common Issues
1. Screenshot Quality
   - Check image resolution
   - Verify compression settings
   - Monitor file sizes
   - Test different quality levels

2. Storage Issues
   - Monitor disk space
   - Implement cleanup policies
   - Check file permissions
   - Verify storage paths

3. Performance Problems
   - Monitor CPU usage
   - Check memory consumption
   - Optimize screenshot frequency
   - Consider system load 