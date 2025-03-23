# Playback
Playback is an important feature in Monibuca that allows users to view historically recorded video files.

## Feature Highlights
- Supports multiple playback formats (FLV, MP4, TS)
- Supports fast forward and rewind
- Supports time point positioning
- Supports variable speed playback
- Supports recording file indexing

## Usage

The playback feature doesn't require separate configuration. To use the playback feature, follow these steps:

### 1. Enable Database Function During Recording

When recording video streams, ensure the database function is enabled so the system automatically saves recording file information to the database.

### 2. Play Back Recorded Streams

Play back recorded content by adding time parameters when subscribing to streams:

```
Subscription stream URL?start=start_time&end=end_time(optional)
```

Example:
```
http://localhost:8080/flv/vod12/live/camera1.flv?start=2024-01-01T12:00:00&end=2024-01-01T13:00:00
```

- `start`: Required parameter, specifies playback start time, can use:
  - ISO 8601 time format (YYYY-MM-DDThh:mm:ss)
  - Unix timestamp format (seconds)
- `end`: Optional parameter, specifies playback end time, if not specified plays until the end of the recording file, format same as start

### 3. Configure On-Demand Recording File Pulling

You can configure the on-demand pull feature of the corresponding plugin to automatically handle playback requests. Example configuration:

```yaml
mp4:
  publish:
    delayclosetimeout: 3s  # Set delay close timeout
  # Subscription trigger
  onsub:
    pull:
      ^vod(\d)/(.+)$: live/$2  # Forward stream through regex matching
  # Publish trigger
  onpub:
    record:
      ^live/.+:
        fragment: 1m
        filepath: record/$0  # Recording file path
```

**Configuration Description**:
- `delayclosetimeout`: Sets how long to delay automatically closing the recording playback publisher after all subscribers exit. This releases system resources and prevents idle playback streams from continuously occupying server resources.

#### Regular Expression Matching Description

In the `onsub.pull` configuration, you can use regular expressions to flexibly match stream names:

Subscription trigger regex matching:

In the `onsub.pull` configuration, use regular expressions to dynamically match stream names:
```yaml
onsub:
  pull:
    regex_pattern: match_result_template
```

Regular expressions can include capture groups, referenced in match results using `$number`:
- `$0`: Represents the entire matched string
- `$1`, `$2`, ...: Represents the 1st, 2nd... capture groups

**Example 1**: Basic Playback Matching
```yaml
^vod/(.+)$: live/$1
```
When subscribing to `vod/camera1`, the system automatically pulls the recording of `live/camera1`

**Example 2**: Multi-level Directory Matching
```yaml
^archive/(\d{4})/(\d{2})/(\d{2})/(.+)$: live/$4?start=$1-$2-$3T00:00:00
```
When subscribing to `archive/2024/01/15/camera1`, the system pulls `live/camera1?start=2024-01-15T00:00:00`

**Example 3**: Independent Playback Progress for Different Subscribers
```yaml
^vod(\d)/(.+)$: live/$2
```
When subscribing to `vod1/camera1` or `vod2/camera1`, the system pulls `live/camera1`, but different prefixes allow different subscribers to have their own independent playback progress without affecting each other

## Important Notes
1. Ensure recording files are complete
2. Set reasonable cache size
3. Ensure database function is properly enabled
4. Monitor disk usage
5. Regularly clean up expired recording files

## Recording Management API

Monibuca provides a series of APIs for obtaining and managing recording file information, facilitating the development of custom playback interfaces.

### Get List of Currently Recording Streams

```http
GET /api/record/list
```

**Response Example**:
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "streamPath": "live/camera1",
      "startTime": "2024-06-12T10:25:00Z",
      "type": "mp4",
      "pointer": 123456789
    }
  ]
}
```

### Get Recording File List

```http
GET /api/record/{type}/list/{streamPath}?start=2024-01-01T00:00:00&end=2024-01-02T00:00:00&pageNum=1&pageSize=20
```

**Parameter Description**:
- `type`: Recording type, such as "mp4", "flv", etc.
- `streamPath`: Stream path
- `start`: Start time (optional)
- `end`: End time (optional)
- `pageNum`: Page number, starting from 1 (optional)
- `pageSize`: Items per page (optional)
- `mode`: Recording mode (optional)
- `eventLevel`: Event level (optional)

**Response Example**:
```json
{
  "code": 0,
  "message": "success",
  "totalCount": 100,
  "pageNum": 1,
  "pageSize": 20,
  "data": [
    {
      "id": 1,
      "filePath": "record/live/camera1/20240101120000.mp4",
      "streamPath": "live/camera1",
      "startTime": "2024-01-01T12:00:00Z",
      "endTime": "2024-01-01T12:30:00Z",
      "eventLevel": "normal",
      "eventName": "",
      "eventDesc": ""
    }
  ]
}
```

### Get Recording Catalog

```http
GET /api/record/{type}/catalog
```

**Parameter Description**:
- `type`: Recording type, such as "mp4", "flv", etc.

**Response Example**:
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "streamPath": "live/camera1",
      "count": 150,
      "startTime": "2024-01-01T00:00:00Z",
      "endTime": "2024-01-15T23:59:59Z"
    },
    {
      "streamPath": "live/camera2",
      "count": 120,
      "startTime": "2024-01-02T00:00:00Z",
      "endTime": "2024-01-14T23:59:59Z"
    }
  ]
}
```

### Delete Recording Files

```http
POST /api/record/{type}/delete/{streamPath}
```

**Request Body Example**:
```json
{
  "ids": [1, 2, 3],  // Specify file IDs to delete
  "startTime": "2024-01-01T00:00:00",  // Or specify time range to delete
  "endTime": "2024-01-02T00:00:00"
}
```

**Parameter Description**:
- `type`: Recording type, such as "mp4", "flv", etc.
- `streamPath`: Stream path
- `ids`: Array of file IDs to delete (optional)
- `startTime`: Start time (optional, used with endTime)
- `endTime`: End time (optional, used with startTime)

**Response Example**:
```json
{
  "code": 0,
  "message": "success",
  "data": [  // Returns list of deleted files
    {
      "id": 1,
      "filePath": "record/live/camera1/20240101120000.mp4",
      "streamPath": "live/camera1",
      "startTime": "2024-01-01T12:00:00Z",
      "endTime": "2024-01-01T12:30:00Z"
    }
  ]
}
```

## Stream Control API

Monibuca provides a series of APIs for controlling playback stream progress and speed, implementing functions such as pause, resume, speed adjustment, and time seeking.

### Pause Stream Playback

```http
POST /api/stream/pause/{streamPath}
```

**Parameter Description**:
- `streamPath`: Stream path, needs URL encoding

**Response Example**:
```json
{
  "code": 0,
  "message": "success"
}
```

### Resume Stream Playback

```http
POST /api/stream/resume/{streamPath}
```

**Parameter Description**:
- `streamPath`: Stream path, needs URL encoding

**Response Example**:
```json
{
  "code": 0,
  "message": "success"
}
```

### Set Stream Playback Speed

```http
POST /api/stream/speed/{streamPath}
```

**Request Body Example**:
```json
{
  "speed": 2.0  // Set playback speed, 1.0 is normal speed
}
```

**Parameter Description**:
- `streamPath`: Stream path, needs URL encoding
- `speed`: Playback speed multiplier, common values: 0.5(half speed), 1.0(normal), 2.0(double speed), 4.0(quadruple speed)

**Response Example**:
```json
{
  "code": 0,
  "message": "success"
}
```

### Seek Stream Playback Position

```http
POST /api/stream/seek/{streamPath}
```

**Request Body Example**:
```json
{
  "timeStamp": 1612960800  // Unix timestamp (seconds)
}
```

**Parameter Description**:
- `streamPath`: Stream path, needs URL encoding
- `timeStamp`: Target timestamp, Unix timestamp format (seconds)

**Response Example**:
```json
{
  "code": 0,
  "message": "success"
}
```

### Usage Example

Here's an example code using JavaScript to control playback streams with the above APIs:

```javascript
// Pause playback stream
async function pauseStream(streamPath) {
  const response = await fetch(`/api/stream/pause/${encodeURIComponent(streamPath)}`, {
    method: 'POST'
  });
  return await response.json();
}

// Resume playback stream
async function resumeStream(streamPath) {
  const response = await fetch(`/api/stream/resume/${encodeURIComponent(streamPath)}`, {
    method: 'POST'
  });
  return await response.json();
}

// Set playback speed
async function setStreamSpeed(streamPath, speed) {
  const response = await fetch(`/api/stream/speed/${encodeURIComponent(streamPath)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ speed: speed })
  });
  return await response.json();
}

// Seek to specified time point
async function seekStream(streamPath, timestamp) {
  const response = await fetch(`/api/stream/seek/${encodeURIComponent(streamPath)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timeStamp: timestamp })
  });
  return await response.json();
}
```

## Frontend Player Integration 