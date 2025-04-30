# Time Shift
## Background
Users have requested the ability to start playback from a point in time before the current moment, such as 10 seconds ago or 1 minute ago.

In v4, there was a time-shift feature that could specify cache time in the configuration, and playback could be started with submode: 2.

However, the limitation was that the time could not be dynamically specified. In v5, dynamic start time specification has been implemented, allowing each subscriber to start playback from different points in time.

## Usage
### Through Configuration File
Add the buffertime configuration in the subscribe section of the configuration file.

```yaml
global:
  subscribe:
    buffertime: 10s
```
> This doesn't have to be under global, this is just an example. It can be placed under any plugin configuration.

### Through Subscription URL Parameters
Example: http://localhost:8080/hdl/live/test?buffertime=10s

> In v5, URL parameters for publishing and subscribing automatically override values in the publish and subscribe configurations.

## Implementation Principle

### Publisher Cache
Publisher data is cached in a RingBuffer, which has dynamic size and can expand or shrink as needed.

### Recording Keyframe Positions
Keyframes in the cache are recorded, allowing subscribers to read from specified keyframe positions as needed.

### Expanding Cache
If subscribers need older data, they need to wait for buffering to make the RingBuffer large enough.

> You can also configure buffertime in the publisher to cache enough data from the start, in which case subscribers won't need to wait.

## Important Notes
1. The buffertime parameter supports various time units:
   - s: seconds
   - m: minutes
   - h: hours

2. Memory Usage:
   - Larger buffertime means more memory usage
   - Consider system resources when setting buffer size
   - Monitor memory usage in production

3. Performance Considerations:
   - Longer buffer times may impact system performance
   - Balance between buffer size and system resources
   - Consider using disk-based caching for longer time shifts

## Common Issues
1. Buffer Overflow
   - Monitor buffer size
   - Adjust buffertime if needed
   - Consider system memory limits

2. Playback Delay
   - Longer buffertime means longer initial delay
   - Consider user experience when setting buffer size
   - Monitor playback start times

3. Resource Usage
   - Monitor CPU and memory usage
   - Adjust buffer size based on system load
   - Consider using adaptive buffer sizes 