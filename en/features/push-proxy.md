# Push Proxy
Push proxy is an important feature in Monibuca that allows forwarding video streams from Monibuca to other streaming servers.

## Feature Highlights
- Supports multiple target forwarding
- Supports dynamic addition/deletion of forwarding targets
- Supports multiple protocol forwarding
- Supports on-demand forwarding to save resources

## Configuration
Push proxy can be pre-configured through configuration files or dynamically added via API. In the Monibuca configuration file, you can configure push proxy as follows:

```yaml
global:
  pushproxy:
    - id: 1                        # Unique ID identifier, must be greater than 0
      name: "target-1"             # Push proxy name
      type: "rtmp"                 # Push protocol type
      pushurl: "rtmp://target-server:1935/live/stream1"  # Push target URL
      streampath: "live/camera1"   # Source stream path to monitor
      pushonstart: true            # Whether to start pushing automatically on stream publish
      audio: true                  # Whether to forward audio stream
      description: "Push to CDN"    # Description
      parentid: 0                  # Parent ID for hierarchical management
```

### Configuration Merge Mechanism

Monibuca automatically merges settings from the configuration file and those stored in the database. The startup process is as follows:

1. First reads push proxy settings from the configuration file
2. Then reads push proxy information from the database
3. If configurations with the same ID exist in both the configuration file and database, the configuration file settings override the database settings
4. All push proxy configurations added or modified through API interfaces are saved in the database

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
| id | Integer | Yes | - | Push proxy unique identifier, must be greater than 0 |
| name | String | Yes | - | Push proxy name |
| type | String | No | - | Push protocol type, such as rtmp, rtsp, srt, etc., if not specified will be automatically determined from URL |
| pushurl | String | Yes | - | Push target URL |
| streampath | String | Yes | - | Source stream path to monitor, push will be triggered when stream at this path is published |
| pushonstart | Boolean | No | false | Whether to start pushing automatically when source stream is published, when false requires manual trigger |
| audio | Boolean | No | true | Whether to forward audio stream, set to false to forward only video stream |
| description | String | No | - | Push proxy description |
| parentid | Integer | No | 0 | Parent ID for hierarchical management |

### Configuring Multiple Push Proxies

```yaml
global:
  pushproxy:
    - id: 1
      name: "target-1"
      type: "rtmp"
      pushurl: "rtmp://target1.com/live/stream1"
      streampath: "live/camera1"
      pushonstart: true
      
    - id: 2
      name: "target-2"
      type: "rtmp"
      pushurl: "rtmp://target2.com/live/stream1"
      streampath: "live/camera1"
      pushonstart: true
      
    - id: 3
      name: "backup-server"
      type: "srt"
      pushurl: "srt://backup.com:10080"
      streampath: "live/camera2"
      pushonstart: false
      audio: false
```

## API Interface Examples
Monibuca provides complete push proxy management APIs that can be operated through HTTP interfaces.

### Get Push Proxy List
```http
GET /api/proxy/push/list
```

Returns all currently configured push proxy information.

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
      "name": "target-1",
      "type": "rtmp",
      "status": 1,
      "pushURL": "rtmp://target-server:1935/live/stream1",
      "pushOnStart": true,
      "audio": true,
      "description": "Push to CDN",
      "rtt": 150,
      "streamPath": "live/camera1"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| code | Integer | Return code, 0 indicates success |
| message | String | Return message |
| data | Array | Push proxy information list |
| data[].ID | Integer | Push proxy ID |
| data[].createTime | Timestamp | Creation time |
| data[].updateTime | Timestamp | Last update time |
| data[].parentID | Integer | Parent ID for hierarchical management |
| data[].name | String | Push proxy name |
| data[].type | String | Push protocol type, such as rtmp, rtsp, srt, etc. |
| data[].status | Integer | Push proxy status: 0-offline, 1-online, 2-pushing, 3-disabled |
| data[].pushURL | String | Push target URL |
| data[].pushOnStart | Boolean | Whether to start pushing automatically on stream publish |
| data[].audio | Boolean | Whether to forward audio stream |
| data[].description | String | Push proxy description |
| data[].rtt | Integer | Network round-trip time (milliseconds) |
| data[].streamPath | String | Source stream path to monitor |

### Add Push Proxy
```http
POST /api/proxy/push/add
Content-Type: application/json

{
    "name": "target-1",
    "pushURL": "rtmp://target-server:1935/live/stream1",
    "type": "rtmp",
    "pushOnStart": true,
    "audio": true,
    "streamPath": "live/camera1",
    "description": "Push to CDN"
}
```

#### Parameter Description

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | String | Yes | Push proxy name, used for identification and management |
| pushURL | String | Yes | Push target URL, specifying where to push the stream |
| type | String | No | Push protocol type, such as rtmp, rtsp, srt, etc., if not specified will be automatically inferred from URL |
| pushOnStart | Boolean | No | Whether to start pushing automatically when source stream is published, defaults to false |
| audio | Boolean | No | Whether to forward audio stream, set to false to forward only video stream, defaults to true |
| streamPath | String | Yes | Source stream path to monitor, push will be triggered when stream at this path is published |
| description | String | No | Push proxy description for management and identification |
| parentID | Number | No | Parent ID for hierarchical management of push proxies |

### Update Push Proxy
```http
POST /api/proxy/push/update
Content-Type: application/json

{
    "id": 1,
    "name": "updated-target",
    "pushURL": "rtmp://new-target:1935/live/new-stream",
    "type": "rtmp",
    "pushOnStart": true,
    "audio": true,
    "streamPath": "live/camera1",
    "description": "Updated Push Proxy"
}
```

### Delete Push Proxy
Delete by ID:
```http
POST /api/proxy/push/remove
Content-Type: application/json

{
    "id": 1
}
```

## On-Demand Pushing (pushonstart=false)

When `pushonstart=false` is set, the push proxy won't start pushing immediately when the source stream is published, but will wait for manual trigger or other events. This approach has the following advantages:

1. **Save Bandwidth Resources**: Only establishes connection with target server when actually needed, reducing unnecessary bandwidth consumption
2. **Flexible Control**: Can decide when to start pushing based on business requirements, such as when specific events occur
3. **Improve System Scalability**: Can configure many potential push targets, but only those triggered will actually work

Workflow:
1. Add push proxy through configuration file or API interface, set `pushonstart=false`
2. When monitored source stream is published, push proxy enters "online" status (status=1), but won't push immediately
3. When pushing is needed, manually trigger push through API interface or other means
4. Push proxy status changes to "pushing" (status=2)
5. Starts pushing stream content to target server

## Important Notes
1. Ensure target server has sufficient bandwidth and processing capability
2. Set reasonable push parameters to avoid overloading target server
3. Pay attention to network latency and bandwidth consumption
4. Recommend monitoring push status and handling anomalies promptly
5. For important push tasks, recommend configuring multiple redundant targets

## Common Issues
1. Push Failure
   - Check if target server is online
   - Verify push URL is correct
   - Confirm network connection is normal
   - Check if target server allows pushing

2. Push Latency
   - Check network bandwidth
   - Adjust encoding parameters
   - Consider using faster protocols

3. Push Quality Issues
   - Check source stream quality
   - Adjust transcoding parameters
   - Ensure network stability

4. Audio-Video Sync Issues
   - Check audio-video timestamps
   - Confirm audio-video sample rate settings
   - Adjust buffer settings 