# Monibuca Stream Alias Feature Guide

## 1. Feature Introduction

Stream alias is a powerful feature provided by Monibuca that allows you to create multiple different access paths for the same stream. This feature not only simplifies stream access but more importantly enables seamless stream content switching, particularly suitable for scenarios like inserting advertisements during live streaming.

## 2. Basic Usage

### 2.1 Creating Aliases

Create an alias through HTTP API:

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "live/original",
    "alias": "live/simple",
    "autoRemove": false
  }'
```

### 2.2 Viewing Current Alias List

```bash
curl http://localhost:8080/api/stream/alias
```

### 2.3 Deleting Aliases

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "live/simple"
  }'
```

## 3. Practical Case: Live Streaming Ad Insertion

### 3.1 Scenario Description

During live streaming, it's often necessary to insert advertisements at appropriate times. Using the stream alias feature, we can achieve:
- Seamless switching between live content and advertisements
- Maintaining continuous viewing experience for audiences
- Flexible control over ad insertion timing
- Support for rotating multiple ad sources

### 3.2 Implementation Steps

1. **Preparation**
   ```bash
   # Assuming main live stream path is: live/main
   # Ad stream path is: ads/ad1
   ```

2. **Create Alias for Main Live Stream**
   ```bash
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "live/main",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

3. **When Ad Insertion is Needed**
   ```bash
   # Point alias to ad stream
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "ads/ad1",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

4. **After Ad Playback Ends**
   ```bash
   # Point alias back to main live stream
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "live/main",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

### 3.3 Effect Description

1. **Impact on Viewer Side**
   - Viewers always access the fixed address `live/show`
   - Switching process is transparent to viewers
   - No black screen or stuttering
   - No need to refresh player

2. **Impact on Live Streaming System**
   - Streamer's push is unaffected
   - Supports preloading multiple ad sources
   - Enables precise time control
   - Low system resource usage

## 4. Advanced Usage Tips

### 4.1 Ad Rotation Solution

```bash
# Create alias for multiple ad streams
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "ads/ad1",
    "alias": "ads/current",
    "autoRemove": true
  }'

# Switch between different ads using script
for ad in ad1 ad2 ad3; do
  curl -X POST http://localhost:8080/api/stream/alias \
    -H "Content-Type: application/json" \
    -d "{
      \"streamPath\": \"ads/$ad\",
      \"alias\": \"ads/current\",
      \"autoRemove\": true
    }"
  sleep 30  # Each ad plays for 30 seconds
done
```

### 4.2 Using Auto-Remove Feature

Automatically switch back to main stream when ad stream ends:

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "ads/ad1",
    "alias": "live/show",
    "autoRemove": true
  }'
```

### 4.3 Conditional Ad Triggering

Combining with other Monibuca features, you can achieve:
- Insert ads when viewer count reaches threshold
- Insert ads when live duration reaches specific value
- Trigger relevant ads based on live content tags

## 5. Best Practice Recommendations

1. **Ad Content Preloading**
   - Prepare ad streams in advance
   - Ensure ad source stability
   - Use caching mechanism to improve switching speed

2. **Reasonable Switching Strategy**
   - Avoid frequent switching affecting user experience
   - Choose appropriate switching timing
   - Maintain reasonable control over ad duration

3. **Monitoring and Statistics**
   - Record ad playback status
   - Monitor switching process smoothness
   - Track viewer watching data

4. **Error Handling**
   - Quickly switch back to main stream if ad stream fails
   - Set reasonable timeout periods
   - Maintain proper logging

## 6. Frequently Asked Questions

1. **Q: Will viewers experience stuttering during switching?**
   A: No. Stream alias switching is a server-side operation, completely transparent to client players.

2. **Q: How to ensure ads play at expected times?**
   A: You can control switching time through scripts and use auto-remove feature to ensure accuracy.

3. **Q: How many concurrent aliases are supported?**
   A: Theoretically unlimited, but recommend reasonable usage based on server resources.

4. **Q: How to handle ad stream abnormalities?**
   A: Recommend using auto-remove feature and monitoring system to detect and handle issues promptly.

## 7. Important Notes

1. **Resource Management**
   - Clean up unused aliases promptly
   - Avoid creating too many unnecessary aliases
   - Regularly check alias status

2. **Performance Considerations**
   - Control concurrent alias count
   - Set reasonable caching strategy
   - Monitor server resource usage

3. **User Experience**
   - Control ad frequency and duration
   - Ensure smooth switching
   - Consider users in different network environments 