# 推流代理
推流代理是 Monibuca 的一个重要功能，允许将 Monibuca 中的视频流转发到其他流媒体服务器。

## 功能特点
- 支持多目标转发
- 支持动态添加/删除转发目标
- 支持多种协议转发
- 支持按需转发，节省资源

## 配置说明
推流代理可以通过配置文件进行预配置，也可以通过API动态添加。在Monibuca配置文件中，可以按照如下方式配置推流代理：

```yaml
global:
  pushproxy:
    - id: 1                        # 唯一ID标识，必须大于0
      name: "target-1"             # 推流代理名称
      type: "rtmp"                 # 推流协议类型
      pushurl: "rtmp://target-server:1935/live/stream1"  # 推流目标地址
      streampath: "live/camera1"   # 监听的源流路径
      pushonstart: true            # 是否在启动时自动开始推流
      audio: true                  # 是否转发音频流
      description: "推流到CDN"      # 描述信息
      parentid: 0                  # 父级ID，用于分层管理
```

### 配置合并机制

Monibuca 会自动合并配置文件中的设置和数据库中存储的设置。启动流程如下：

1. 首先读取配置文件中的推流代理设置
2. 然后读取数据库中的推流代理信息
3. 如果配置文件和数据库中存在相同ID的配置，配置文件的设置会覆盖数据库中的设置
4. 所有通过API接口添加或修改的推流代理配置都会保存在数据库中

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
| id | 整数 | 是 | - | 推流代理唯一标识，必须大于0 |
| name | 字符串 | 是 | - | 推流代理名称 |
| type | 字符串 | 否 | - | 推流协议类型，如rtmp、rtsp、srt等，不填会根据URL自动判断 |
| pushurl | 字符串 | 是 | - | 推流目标地址 |
| streampath | 字符串 | 是 | - | 监听的源流路径，当该路径的流发布时会触发推流 |
| pushonstart | 布尔值 | 否 | false | 是否在配置的源流发布时自动开始推流，设为false时需要手动触发推流 |
| audio | 布尔值 | 否 | true | 是否转发音频流，设为false可以只转发视频流 |
| description | 字符串 | 否 | - | 推流代理描述信息 |
| parentid | 整数 | 否 | 0 | 父级ID，用于分层管理 |

### 配置多个推流代理

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

## API接口示例
Monibuca提供了完整的推流代理管理API，可以通过HTTP接口进行操作。

### 获取推流代理列表
```http
GET /api/proxy/push/list
```

返回所有当前配置的推流代理信息。

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
      "name": "target-1",
      "type": "rtmp",
      "status": 1,
      "pushURL": "rtmp://target-server:1935/live/stream1",
      "pushOnStart": true,
      "audio": true,
      "description": "推流到CDN",
      "rtt": 150,
      "streamPath": "live/camera1"
    }
  ]
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | 整数 | 返回码，0表示成功 |
| message | 字符串 | 返回信息 |
| data | 数组 | 推流代理信息列表 |
| data[].ID | 整数 | 推流代理ID |
| data[].createTime | 时间戳 | 创建时间 |
| data[].updateTime | 时间戳 | 最后更新时间 |
| data[].parentID | 整数 | 父级ID，用于分层管理 |
| data[].name | 字符串 | 推流代理名称 |
| data[].type | 字符串 | 推流协议类型，如rtmp、rtsp、srt等 |
| data[].status | 整数 | 推流代理状态：0-离线，1-在线，2-推流中，3-禁用 |
| data[].pushURL | 字符串 | 推流目标地址 |
| data[].pushOnStart | 布尔值 | 是否在源流发布时自动开始推流 |
| data[].audio | 布尔值 | 是否转发音频流 |
| data[].description | 字符串 | 推流代理描述信息 |
| data[].rtt | 整数 | 网络往返时间(毫秒) |
| data[].streamPath | 字符串 | 监听的源流路径 |

### 添加推流代理
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
    "description": "推流到CDN"
}
```

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | 字符串 | 是 | 推流代理的名称，用于标识和管理 |
| pushURL | 字符串 | 是 | 推流的目标地址URL，指定向哪里推送流媒体 |
| type | 字符串 | 否 | 推流协议类型，如rtmp、rtsp、srt等，若不指定会从URL自动推断 |
| pushOnStart | 布尔值 | 否 | 是否在源流发布时自动开始推流，默认为false |
| audio | 布尔值 | 否 | 是否转发音频流，设为false可以只转发视频流，默认为true |
| streamPath | 字符串 | 是 | 监听的源流路径，当该路径的流发布时会触发推流 |
| description | 字符串 | 否 | 推流代理的描述信息，方便管理和识别 |
| parentID | 数字 | 否 | 父级ID，用于分层管理推流代理 |

### 更新推流代理
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
    "description": "已更新的推流代理"
}
```

### 删除推流代理
通过ID删除：
```http
POST /api/proxy/push/remove
Content-Type: application/json

{
    "id": 1
}
```

## 按需推流 (pushonstart=false)

当设置`pushonstart=false`时，推流代理不会在源流发布时立即开始推流，而是等待手动触发或其他事件触发。这种方式有以下优势：

1. **节省带宽资源**：只有实际需要时才会建立与目标服务器的连接，减少不必要的带宽消耗
2. **灵活控制**：可以根据业务需求决定何时开始推流，如特定事件发生时
3. **提高系统扩展性**：可以配置大量的潜在推流目标，但只有被触发的才会实际工作

工作流程：
1. 通过配置文件或API接口添加推流代理，设置`pushonstart=false`
2. 当监听的源流被发布时，推流代理进入"在线"状态(status=1)，但不会立即推流
3. 当需要推流时，通过API接口或其他方式手动触发推流
4. 推流代理状态变为"推流中"(status=2)
5. 开始向目标服务器推送流媒体内容

## 注意事项
1. 确保目标服务器有足够的带宽和处理能力
2. 合理设置推流参数，避免目标服务器负载过高
3. 注意网络延迟和带宽消耗
4. 建议监控推流状态，及时处理异常情况
5. 对于重要的推流任务，建议配置多个冗余目标

## 常见问题
1. 推流失败
   - 检查目标服务器是否在线
   - 验证推流地址是否正确
   - 确认网络连接是否正常
   - 检查目标服务器是否允许推流

2. 推流延迟
   - 检查网络带宽
   - 调整编码参数
   - 考虑使用更快的协议

3. 推流质量问题
   - 检查源流质量
   - 调整转码参数
   - 确保网络稳定性

4. 音视频不同步
   - 检查音视频时间戳
   - 确认音视频采样率设置
   - 调整缓冲区设置