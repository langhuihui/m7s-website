# Transcoding
Transcoding is an important feature in Monibuca that allows converting video streams to different encoding formats and resolutions.

## Feature Highlights
- Supports multiple encoding formats
- Supports multiple resolutions
- Supports bitrate control
- Supports framerate control
- Supports hardware acceleration

## Environment Requirements
The transcoding plugin depends on the FFmpeg transcoding engine. Before using, please ensure:
1. FFmpeg is properly installed in the system
2. FFmpeg's execution path is added to the system's PATH environment variable
3. You can verify the installation by running `ffmpeg -version` directly in the command line

> **Note**: If FFmpeg is not properly configured, the transcoding feature will not work. The method to configure PATH environment variables varies by operating system. Please refer to the relevant system documentation.

## Usage Examples
### Configuring Transcoding Rules
Here's an example of transcoding configuration in YAML format:

```yaml
transcode:
  onpub:
    transform:
      ^live.+:  # Use regular expression to match stream names
        input:
          mode: rtsp  # Input mode
        output:
          - target: rtmp://localhost/trans/$0/small  # Output target, $0 represents the matched stream name
            conf: -loglevel debug -c:a aac -c:v h264 -vf scale=320:240  # FFmpeg configuration parameters
```

This configuration will match all streams starting with "live" and create a transcoded output with resolution 320x240.

### Custom Transcoding Configuration
You can also set multiple different transcoding configurations for specific streams:

```yaml
transcode:
  transform:
    camera1:  # Specific stream name
      input:
        mode: rtsp
      output:
        - target: rtmp://localhost/trans/camera1/hd
          conf: -c:a aac -c:v h264 -vf scale=1280:720 -b:v 2000k -b:a 128k
        - target: rtmp://localhost/trans/camera1/sd
          conf: -c:a aac -c:v h264 -vf scale=640:360 -b:v 800k -b:a 64k
```

### Adding Transcoding Rules via API
```http
POST /api/v1/transcode/rules
Content-Type: application/json

{
    "streamPath": "camera1",
    "transform": {
        "input": {
            "mode": "rtsp"
        },
        "output": [
            {
                "target": "rtmp://localhost/trans/camera1/hd",
                "conf": "-c:a aac -c:v h264 -vf scale=1280:720 -b:v 2000k -b:a 128k"
            }
        ]
    }
}
```

## Important Notes
1. Ensure sufficient hardware resources
2. Set reasonable transcoding parameters
3. Pay attention to transcoding latency
4. Monitor system load
5. Regularly check transcoding quality

## Common Issues
1. Transcoding Failure
   - Check hardware status
   - Verify transcoding parameters
   - Confirm input stream is normal

2. Transcoding Latency
   - Optimize transcoding parameters
   - Use hardware acceleration
   - Adjust buffer size

3. Transcoding Quality
   - Check bitrate settings
   - Verify resolution
   - Confirm encoding parameters

## Best Practices
1. Hardware Acceleration
   - Use GPU acceleration when available
   - Monitor GPU utilization
   - Balance quality and performance

2. Resource Management
   - Monitor CPU usage
   - Track memory consumption
   - Implement load balancing
   - Set resource limits

3. Quality Control
   - Regular quality checks
   - Monitor bitrate stability
   - Verify output consistency
   - Implement quality metrics

## Advanced Configuration
1. Input Configuration
   ```yaml
   input:
     mode: rtsp
     buffer: 2s
     reconnect: true
     reconnect_interval: 5s
   ```

2. Output Configuration
   ```yaml
   output:
     - target: rtmp://localhost/trans/$0/hd
       conf: |
         -c:a aac -b:a 128k
         -c:v h264 -preset medium
         -b:v 2000k -maxrate 2500k
         -bufsize 4000k
         -vf scale=1280:720
         -r 30
   ```

3. Error Handling
   ```yaml
   error:
     retry: true
     max_retries: 3
     retry_interval: 5s
     on_failure: log
   ```

## Monitoring and Management
1. Status Monitoring
   ```http
   GET /api/v1/transcode/status/{streamPath}
   ```

2. Performance Metrics
   ```http
   GET /api/v1/transcode/metrics/{streamPath}
   ```

3. Resource Usage
   ```http
   GET /api/v1/transcode/resources
   ``` 