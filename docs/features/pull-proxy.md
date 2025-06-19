# 拉流代理
拉流代理是 Monibuca 的一个重要功能，允许将其他流媒体服务器的视频流导入到 Monibuca 中。

## 功能特点
- 支持多源代理
- 支持动态添加/删除代理源
- 支持多种协议代理
- 支持按需拉流，节省资源

## 配置说明
拉流代理可以通过配置文件进行预配置，也可以通过API动态添加。在Monibuca配置文件中，可以按照如下方式配置拉流代理：

```yaml
global:
  pullproxy:
    - id: 1                        # 唯一ID标识，必须大于0
      name: "camera-1"             # 拉流代理名称
      type: "rtmp"                 # 拉流协议类型
      pull:
        url: "rtmp://example.com/live/stream1"  # 拉流源地址
      streampath: "live/camera1"   # 在Monibuca中的流路径
      pullonstart: true            # 是否在启动时自动开始拉流
      stoponidle: true             # 是否在无人观看时停止拉流
      audio: true                  # 是否拉取音频流
      description: "前门摄像头"     # 描述信息
      parentid: 0                  # 父级ID，用于分层管理
      record:                      # 录制相关配置
        filepath: "record/camera1" # 录制文件保存路径
        fragment: "1h"             # 录制片段时长
```

### 配置合并机制

Monibuca 会自动合并配置文件中的设置和数据库中存储的设置。启动流程如下：

1. 首先读取配置文件中的拉流代理设置
2. 然后读取数据库中的拉流代理信息
3. 如果配置文件和数据库中存在相同ID的配置，配置文件的设置会覆盖数据库中的设置
4. 所有通过API接口添加或修改的拉流代理配置都会保存在数据库中

### 条件编译说明

如果需要在编译时启用数据库存储功能，需要添加相应的条件编译选项：

```
go build -tags="sqlite" ...
```

可用的数据库标签包括：
- `sqlite`: 使用SQLite作为数据库
- `mysql`: 使用MySQL作为数据库
- `postgres`: 使用PostgreSQL作为数据库

如果不添加这些标签编译，则无法使用数据库功能，只能通过配置文件进行配置。

### 配置项说明

| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|------|------|
| id | 整数 | 是 | - | 拉流代理唯一标识，必须大于0 |
| name | 字符串 | 是 | - | 拉流代理名称 |
| type | 字符串 | 否 | - | 拉流协议类型，如rtmp、rtsp、srt等，不填会根据URL自动判断 |
| pull.url | 字符串 | 是 | - | 拉流源地址 |
| streampath | 字符串 | 否 | pull/{type}/{id} | 流在系统中的路径，不填自动生成 |
| pullonstart | 布尔值 | 否 | false | 是否在启动时自动开始拉流，设为false时启用按需拉流，即只有当有客户端请求该streamPath的流时才从远端拉流 |
| stoponidle | 布尔值 | 否 | false | 是否在没有客户端观看时自动停止拉流 |
| audio | 布尔值 | 否 | true | 是否拉取音频流 |
| description | 字符串 | 否 | - | 拉流代理描述信息 |
| parentid | 整数 | 否 | 0 | 父级ID，用于分层管理 |
| record.filepath | 字符串 | 否 | - | 录制文件保存路径，设置后会自动录制 |
| record.fragment | 字符串 | 否 | - | 录制片段时长，如"1h"表示每小时生成一个文件 |

### 配置多个拉流代理

```yaml
global:
  pullproxy:
    - id: 1
      name: "camera-1"
      type: "rtmp"
      pull:
        url: "rtmp://example.com/live/stream1"
      streampath: "live/camera1"
      pullonstart: true
      
    - id: 2
      name: "camera-2"
      type: "rtsp"
      pull:
        url: "rtsp://192.168.1.100:554/live"
      streampath: "live/camera2"
      pullonstart: false
      stoponidle: true
```

## API接口示例
Monibuca提供了完整的拉流代理管理API，可以通过HTTP接口进行操作。

### 获取拉流代理列表
```http
GET /api/proxy/pull/list
```

返回所有当前配置的拉流代理信息。

#### 返回值说明
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
      "description": "我的拉流代理",
      "recordPath": "record/mystream",
      "recordFragment": "3600s",
      "rtt": 150,
      "streamPath": "live/mystream"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | 整数 | 返回码，0表示成功 |
| message | 字符串 | 返回信息 |
| data | 数组 | 拉流代理信息列表 |
| data[].ID | 整数 | 拉流代理ID |
| data[].createTime | 时间戳 | 创建时间 |
| data[].updateTime | 时间戳 | 最后更新时间 |
| data[].parentID | 整数 | 父级ID，用于分层管理拉流代理 |
| data[].name | 字符串 | 拉流代理名称 |
| data[].type | 字符串 | 拉流协议类型，如rtmp、rtsp、srt等 |
| data[].status | 整数 | 拉流代理状态：0-离线，1-在线，2-拉流中，3-禁用 |
| data[].pullURL | 字符串 | 拉流源地址 |
| data[].pullOnStart | 布尔值 | 是否在启动时自动开始拉流 |
| data[].stopOnIdle | 布尔值 | 是否在无人观看时停止拉流 |
| data[].audio | 布尔值 | 是否拉取音频流 |
| data[].description | 字符串 | 拉流代理描述信息 |
| data[].recordPath | 字符串 | 录制文件保存路径 |
| data[].recordFragment | 字符串 | 录制片段时长 |
| data[].rtt | 整数 | 网络往返时间(毫秒) |
| data[].streamPath | 字符串 | 流在系统中的路径 |

### 添加拉流代理
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
    "description": "我的拉流代理"
}
```

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | 字符串 | 是 | 拉流代理的名称，用于标识和管理 |
| pullURL | 字符串 | 是 | 拉流的源地址URL，指定从哪里拉取流媒体 |
| type | 字符串 | 否 | 拉流协议类型，如rtmp、rtsp、srt、hls、flv、mp4等，若不指定会从URL自动推断 |
| pullOnStart | 布尔值 | 否 | 是否在拉流代理启动时自动开始拉流，默认为false |
| stopOnIdle | 布尔值 | 否 | 是否在没有客户端观看时自动停止拉流以节省资源，默认为false |
| audio | 布尔值 | 否 | 是否拉取音频流，设为false可以只拉取视频流，默认为true |
| streamPath | 字符串 | 否 | 指定流在系统中的路径，客户端通过该路径访问流媒体，若不指定则自动生成 |
| recordPath | 字符串 | 否 | 录制文件保存路径，设置后会自动录制流媒体 |
| recordFragment | 字符串 | 否 | 录制的片段时长，例如"3600s"表示每小时生成一个录制文件 |
| description | 字符串 | 否 | 拉流代理的描述信息，方便管理和识别 |
| parentID | 数字 | 否 | 父级ID，用于分层管理拉流代理 |

### 更新拉流代理
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
    "description": "已更新的拉流代理"
}
```

### 删除拉流代理
通过ID删除：
```http
POST /api/proxy/pull/remove
Content-Type: application/json

{
    "id": 1
}
```

通过StreamPath删除：
```http
POST /api/proxy/pull/remove
Content-Type: application/json

{
    "streamPath": "live/mystream"
}
```

## 按需拉流 (pullonstart=false)

当设置`pullonstart=false`时，拉流代理不会在启动时立即开始拉流，而是等待有客户端请求该流时才从远端源站拉取。这种方式有以下优势：

1. **节省带宽资源**：只有实际需要时才会建立与源站的连接，减少不必要的带宽消耗
2. **降低服务器负载**：避免拉取无人观看的流媒体，减轻服务器处理压力
3. **提高系统扩展性**：可以配置大量的潜在拉流源，但只有被请求的才会实际工作

工作流程：
1. 通过配置文件或API接口添加拉流代理，设置`pullonstart=false`
2. 拉流代理进入"在线"状态(status=1)，但不会立即拉流
3. 当客户端向Monibuca请求该streamPath的流时，系统检测到该streamPath匹配已配置的拉流代理
4. 系统自动触发拉流操作，从远端源站拉取流媒体
5. 拉流代理状态变为"拉流中"(status=2)
6. 客户端开始接收流媒体内容

如果同时设置了`stoponidle=true`，则在没有客户端观看时，会自动停止拉流，进一步优化资源使用。

## 注意事项
1. 确保源站服务器有足够的带宽和处理能力
2. 建议配置重试机制
3. 注意网络延迟和带宽消耗
4. 合理设置超时时间
5. 建议配置多个源站以实现高可用

## 常见问题
1. 代理失败
   - 检查源站服务器是否在线
   - 验证源站地址是否正确
   - 确认网络连接是否正常

2. 代理延迟
   - 检查网络带宽
   - 调整缓冲区大小
   - 考虑使用更快的协议

3. 负载均衡
   - 合理分配源站权重
   - 监控源站负载
   - 及时调整负载策略

4. 源站故障
   - 检查源站健康状态
   - 确认自动切换配置
   - 监控故障切换日志
