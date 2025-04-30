# Recording
Recording is an important feature in Monibuca that allows saving video streams as files for later playback and archiving.

## Feature Highlights
- Supports multiple recording formats (FLV, MP4, TS, HLS)
- Supports scheduled recording
- Supports size-based segmentation
- Supports time-based segmentation
- Supports automatic recording file cleanup

## Configuration
In Monibuca's configuration file, you can configure recording parameters as follows:

```yaml
record:
  # Recording configuration
  type: mp4           # Recording type: mp4, flv, hls, hlsv7
  filepath: "./records"   # Recording file save path
  fragment: 1m        # Fragment duration (supports time units: s, m, h)
  append: false       # Whether to append to existing recording
```

## Usage Examples
### Configuring Recording Rules
Configure recording rules in the YAML configuration file:

```yaml
# Global configuration
global:
  loglevel: debug

# MP4 plugin configuration
mp4:   
  # Behavior configuration when a stream is published
  onpub:
    record:
      ^live/.+:               # Match all streams starting with live/
        fragment: 1m          # Fragment duration of 1 minute
        filepath: record/$0   # Save path, $0 represents the complete matched stream name
```

## Important Notes
1. Ensure sufficient storage space
2. Set reasonable fragment duration
3. Pay attention to file naming rules
4. Regularly clean up expired files
5. Monitor disk usage

## Common Issues
1. Recording Failure
   - Check storage space
   - Verify file permissions
   - Confirm configuration correctness

2. File Corruption
   - Check disk status
   - Verify file integrity
   - Confirm recording process is normal

3. Automatic Cleanup
   - Check cleanup policy
   - Verify file retention period
   - Confirm cleanup logs

## Recording Management API

### Get Recording Status
```http
GET /api/record/status/{streamPath}
```

Response example:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "streamPath": "live/test",
    "status": "recording",
    "startTime": "2024-03-23T10:00:00Z",
    "currentFile": "record/live/test/20240323100000.mp4",
    "fileSize": 1024000,
    "duration": 3600
  }
}
```

### Start Recording
```http
POST /api/record/start/{streamPath}
```

Request body:
```json
{
  "type": "mp4",
  "fragment": "1m",
  "filepath": "record/live/test"
}
```

### Stop Recording
```http
POST /api/record/stop/{streamPath}
```

### Get Recording File List
```http
GET /api/record/files/{streamPath}?start=2024-03-23T00:00:00Z&end=2024-03-24T00:00:00Z
```

Response example:
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "filePath": "record/live/test/20240323100000.mp4",
      "startTime": "2024-03-23T10:00:00Z",
      "endTime": "2024-03-23T11:00:00Z",
      "fileSize": 1024000,
      "duration": 3600
    }
  ]
}
```

## Best Practices
1. Storage Management
   - Implement automatic cleanup policies
   - Monitor disk usage trends
   - Set up storage alerts
   - Consider using external storage

2. Recording Quality
   - Balance quality and storage space
   - Use appropriate codecs
   - Monitor recording quality
   - Implement quality checks

3. Performance Optimization
   - Use efficient file systems
   - Implement proper buffering
   - Monitor system resources
   - Optimize file operations 