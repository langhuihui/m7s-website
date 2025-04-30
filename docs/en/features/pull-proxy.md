# Pull Proxy
Pull proxy is an important feature in Monibuca that allows importing video streams from other streaming servers into Monibuca.

## Feature Highlights
- Supports multiple source proxies
- Supports dynamic addition/deletion of proxy sources
- Supports multiple protocol proxies
- Supports on-demand pulling to save resources

## Configuration
Pull proxy can be pre-configured through configuration files or dynamically added via API. In the Monibuca configuration file, you can configure pull proxy as follows:

```yaml
global:
  pullproxy:
    - id: 1                        # Unique ID identifier, must be greater than 0
      name: "camera-1"             # Pull proxy name
      type: "rtmp"                 # Pull protocol type
      pullurl: "rtmp://example.com/live/stream1"  # Pull source URL
      streampath: "live/camera1"   # Stream path in Monibuca
      pullonstart: true            # Whether to start pulling automatically on startup
      stoponidle: true             # Whether to stop pulling when no viewers
      audio: true                  # Whether to pull audio stream
      description: "Front Door Camera"     # Description
      parentid: 0                  # Parent ID for hierarchical management
      record:                      # Recording configuration
        filepath: "record/camera1" # Recording file save path
        fragment: "1h"             # Recording fragment duration
```

### Configuration Merge Mechanism

Monibuca automatically merges settings from the configuration file and those stored in the database. The startup process is as follows:

1. First reads pull proxy settings from the configuration file
2. Then reads pull proxy information from the database
3. If configurations with the same ID exist in both the configuration file and database, the configuration file settings override the database settings
4. All pull proxy configurations added or modified through API interfaces are saved in the database

### Conditional Compilation Instructions

If you need to enable database storage functionality during compilation, you need to add the corresponding conditional compilation options:

```
go build -tags="sqlite" ...
```

Available database tags include:
- `sqlite`: Use SQLite as database
- `mysql`: Use MySQL as database
- `postgres`: Use PostgreSQL as database

If these tags are not added during compilation, database functionality cannot be used, and configuration can only be done through configuration files.

### Configuration Item Description

| Item | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| id | Integer | Yes | - | Pull proxy unique identifier, must be greater than 0 |
| name | String | Yes | - | Pull proxy name |
| type | String | No | - | Pull protocol type, such as rtmp, rtsp, srt, etc., if not specified will be automatically determined from URL |
| pullurl | String | Yes | - | Pull source URL |
| streampath | String | No | pull/{type}/{id} | Stream path in system, auto-generated if not specified |
| pullonstart | Boolean | No | false | Whether to start pulling automatically on startup, when false enables on-demand pulling, i.e., only pulls from remote when clients request the streamPath |
| stoponidle | Boolean | No | false | Whether to automatically stop pulling when no clients are watching |
| audio | Boolean | No | true | Whether to pull audio stream |
| description | String | No | - | Pull proxy description |
| parentid | Integer | No | 0 | Parent ID for hierarchical management |
| record.filepath | String | No | - | Recording file save path, enables automatic recording when set |
| record.fragment | String | No | - | Recording fragment duration, e.g., "1h" means generate one file per hour |

### Configuring Multiple Pull Proxies

```yaml
global:
  pullproxy:
    - id: 1
      name: "camera-1"
      type: "rtmp"
      pullurl: "rtmp://example.com/live/stream1"
      streampath: "live/camera1"
      pullonstart: true
      
    - id: 2
      name: "camera-2"
      type: "rtsp"
      pullurl: "rtsp://192.168.1.100:554/live"
      streampath: "live/camera2"
      pullonstart: false
      stoponjdle: true
```

## API Interface Examples
Monibuca provides complete pull proxy management APIs that can be operated through HTTP interfaces.

### Get Pull Proxy List
```http
GET /api/proxy/pull/list
```

Returns all currently configured pull proxy information.

#### Return Value Description
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "ID": 1,
      "createTime": "2023-10-01T10:00:00Z",
      "updateTime": "2023-10-02T15:30:00Z",
      "parentID": 0,
      "name": "proxy-source",
      "type": "rtmp",
      "status": 1,
      "pullURL": "rtmp://source-server:1935/live/stream-key",
      "pullOnStart": true,
      "stopOnIdle": false,
      "audio": true,
      "description": "My Pull Proxy",
      "recordPath": "record/mystream",
      "recordFragment": "3600s",
      "rtt": 150,
      "streamPath": "live/mystream"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| code | Integer | Return code, 0 indicates success |
| message | String | Return message |
| data | Array | Pull proxy information list |
| data[].ID | Integer | Pull proxy ID |
| data[].createTime | Timestamp | Creation time |
| data[].updateTime | Timestamp | Last update time |
| data[].parentID | Integer | Parent ID for hierarchical management of pull proxies |
| data[].name | String | Pull proxy name |
| data[].type | String | Pull protocol type, such as rtmp, rtsp, srt, etc. |
| data[].status | Integer | Pull proxy status: 0-offline, 1-online, 2-pulling, 3-disabled |
| data[].pullURL | String | Pull source URL |
| data[].pullOnStart | Boolean | Whether to start pulling automatically on startup |
| data[].stopOnIdle | Boolean | Whether to stop pulling when no viewers |
| data[].audio | Boolean | Whether to pull audio stream |
| data[].description | String | Pull proxy description |
| data[].recordPath | String | Recording file save path |
| data[].recordFragment | String | Recording fragment duration |
| data[].rtt | Integer | Network round-trip time (milliseconds) |
| data[].streamPath | String | Stream path in system |

### Add Pull Proxy
```http
POST /api/proxy/pull/add
Content-Type: application/json

{
    "name": "proxy-source",
    "pullURL": "rtmp://source-server:1935/live/stream-key",
    "type": "rtmp",
    "pullOnStart": true,
    "stopOnIdle": false,
    "audio": true,
    "streamPath": "live/mystream",
    "recordPath": "record/mystream",
    "recordFragment": "3600s",
    "description": "My Pull Proxy"
}
```

#### Parameter Description

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | String | Yes | Pull proxy name, used for identification and management |
| pullURL | String | Yes | Pull source URL, specifying where to pull the stream from |
| type | String | No | Pull protocol type, such as rtmp, rtsp, srt, hls, flv, mp4, etc., if not specified will be automatically inferred from URL |
| pullOnStart | Boolean | No | Whether to start pulling automatically when pull proxy starts, defaults to false |
| stopOnIdle | Boolean | No | Whether to automatically stop pulling when no clients are watching to save resources, defaults to false |
| audio | Boolean | No | Whether to pull audio stream, set to false to pull only video stream, defaults to true |
| streamPath | String | No | Specify stream path in system, clients access stream through this path, auto-generated if not specified |
| recordPath | String | No | Recording file save path, enables automatic recording when set |
| recordFragment | String | No | Recording fragment duration, e.g., "3600s" means generate one file per hour |
| description | String | No | Pull proxy description for management and identification |
| parentID | Number | No | Parent ID for hierarchical management of pull proxies |

### Update Pull Proxy
```http
POST /api/proxy/pull/update
Content-Type: application/json

{
    "id": 1,
    "name": "updated-proxy",
    "pullURL": "rtmp://new-server:1935/live/new-key",
    "type": "rtmp",
    "pullOnStart": true,
    "stopOnIdle": true,
    "audio": true,
    "streamPath": "live/updated-stream",
    "recordPath": "record/updated",
    "recordFragment": "1800s",
    "description": "Updated Pull Proxy"
}
```

### Delete Pull Proxy
Delete by ID:
```http
POST /api/proxy/pull/remove
Content-Type: application/json

{
    "id": 1
}
```

Delete by StreamPath:
```http
POST /api/proxy/pull/remove
Content-Type: application/json

{
    "streamPath": "live/mystream"
}
```

## On-Demand Pulling (pullonstart=false)

When `pullonstart=false` is set, the pull proxy won't start pulling immediately on startup, but will wait until a client requests the stream before pulling from the remote source. This approach has the following advantages:

1. **Save Bandwidth Resources**: Only establishes connection with source when actually needed, reducing unnecessary bandwidth consumption
2. **Reduce Server Load**: Avoids pulling streams that no one is watching, reducing server processing pressure
3. **Improve System Scalability**: Can configure many potential pull sources, but only those requested will actually work

Workflow:
1. Add pull proxy through configuration file or API interface, set `pullonstart=false`
2. Pull proxy enters "online" status (status=1), but won't pull immediately
3. When a client requests the stream with this streamPath from Monibuca, system detects the streamPath matches a configured pull proxy
4. System automatically triggers pull operation, pulling stream from remote source
5. Pull proxy status changes to "pulling" (status=2)
6. Client starts receiving stream content

If `stoponidle=true` is also set, it will automatically stop pulling when no clients are watching, further optimizing resource usage.

## Important Notes
1. Ensure source server has sufficient bandwidth and processing capability
2. Recommend configuring retry mechanism
3. Pay attention to network latency and bandwidth consumption
4. Set reasonable timeout values
5. Recommend configuring multiple source servers for high availability

## Common Issues
1. Proxy Failure
   - Check if source server is online
   - Verify source URL is correct
   - Confirm network connection is normal

2. Proxy Latency
   - Check network bandwidth
   - Adjust buffer size
   - Consider using faster protocols

3. Load Balancing
   - Reasonably assign source weights
   - Monitor source load
   - Adjust load strategy promptly

4. Source Server Failure
   - Check source health status
   - Confirm automatic switchover configuration
   - Monitor failover logs 