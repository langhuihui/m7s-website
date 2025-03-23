# 回放
回放是 Monibuca 的一个重要功能，允许用户查看历史录制的视频文件。

## 功能特点
- 支持多种格式回放（FLV、MP4、TS）
- 支持快进快退
- 支持时间点定位
- 支持倍速播放
- 支持录制文件索引

## 使用方法

回放功能不需要单独配置。要使用回放功能，需要按照以下步骤操作：

### 1. 在录制时开启数据库功能

录制视频流时，需要确保数据库功能已开启，这样系统会自动保存录制文件的相关信息到数据库中。

### 2. 播放回放流

通过在订阅流时增加时间参数来播放回放内容：

```
订阅流地址?start=开始时间&end=结束时间(可选)
```

例如：
```
http://localhost:8080/flv/vod12/live/camera1.flv?start=2024-01-01T12:00:00&end=2024-01-01T13:00:00
```

- `start`: 必填参数，指定回放的开始时间，可使用以下格式：
  - ISO 8601 时间格式（YYYY-MM-DDThh:mm:ss）
  - Unix 时间戳格式（秒数）
- `end`: 可选参数，指定回放的结束时间，如不指定则播放到录制文件结束，格式同 start

### 3. 配置按需拉取录像文件

可以通过配置对应插件的按需拉取功能，自动处理回放请求。示例配置如下：

```yaml
mp4:
  publish:
    delayclosetimeout: 3s  # 设置延迟关闭时间
  # 订阅触发器
  onsub:
    pull:
      ^vod(\d)/(.+)$: live/$2  # 通过正则匹配转发流
  # 发布触发器
  onpub:
    record:
      ^live/.+:
        fragment: 1m
        filepath: record/$0  # 录制文件路径
```

**配置说明**:
- `delayclosetimeout`: 设置当录像回放的所有订阅者退出后，延迟多长时间自动关闭录像回放的发布者。这样可以释放系统资源，避免无人观看的回放流持续占用服务器资源。

#### 正则表达式匹配说明

在 `onsub.pull` 配置中，可以使用正则表达式来灵活匹配流名称：

订阅触发正则匹配：

在 `onsub.pull` 配置中，使用正则表达式动态匹配流名称：
```yaml
onsub:
  pull:
    正则表达式: 匹配结果模板
```

正则表达式可以包含捕获组，在匹配结果中使用 `$数字` 引用这些捕获组：
- `$0`: 表示整个匹配字符串
- `$1`, `$2`, ...: 表示第1个、第2个...捕获组

**示例1**: 基础回放匹配
```yaml
^vod/(.+)$: live/$1
```
当订阅 `vod/camera1` 时，系统会自动拉取 `live/camera1` 的录像

**示例2**: 多级目录匹配
```yaml
^archive/(\d{4})/(\d{2})/(\d{2})/(.+)$: live/$4?start=$1-$2-$3T00:00:00
```
当订阅 `archive/2024/01/15/camera1` 时，系统会拉取 `live/camera1?start=2024-01-15T00:00:00`

**示例3**: 不同订阅者独立回放进度
```yaml
^vod(\d)/(.+)$: live/$2
```
当订阅 `vod1/camera1` 或 `vod2/camera1` 时，系统都会拉取 `live/camera1`，但不同的前缀使不同的订阅者可以拥有各自独立的回放进度，互不影响

## 注意事项
1. 确保录制文件完整
2. 合理设置缓存大小
3. 确保数据库功能正常开启
4. 监控磁盘使用情况
5. 定期清理过期录制文件

## 录像管理API

Monibuca提供了一系列API用于获取和管理录像文件信息，便于开发自定义的回放界面。

### 获取正在录制的流列表

```http
GET /api/record/list
```

**响应示例**：
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

### 获取录像文件列表

```http
GET /api/record/{type}/list/{streamPath}?start=2024-01-01T00:00:00&end=2024-01-02T00:00:00&pageNum=1&pageSize=20
```

**参数说明**：
- `type`: 录像类型，如"mp4"、"flv"等
- `streamPath`: 流路径
- `start`: 开始时间(可选)
- `end`: 结束时间(可选)
- `pageNum`: 页码，从1开始(可选)
- `pageSize`: 每页数量(可选)
- `mode`: 录像模式(可选)
- `eventLevel`: 事件级别(可选)

**响应示例**：
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

### 获取录像目录

```http
GET /api/record/{type}/catalog
```

**参数说明**：
- `type`: 录像类型，如"mp4"、"flv"等

**响应示例**：
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

### 删除录像文件

```http
POST /api/record/{type}/delete/{streamPath}
```

**请求体示例**：
```json
{
  "ids": [1, 2, 3],  // 指定要删除的文件ID
  "startTime": "2024-01-01T00:00:00",  // 或指定时间范围删除
  "endTime": "2024-01-02T00:00:00"
}
```

**参数说明**：
- `type`: 录像类型，如"mp4"、"flv"等
- `streamPath`: 流路径
- `ids`: 要删除的文件ID数组(可选)
- `startTime`: 开始时间(可选，与endTime配合使用)
- `endTime`: 结束时间(可选，与startTime配合使用)

**响应示例**：
```json
{
  "code": 0,
  "message": "success",
  "data": [  // 返回被删除的文件列表
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

## 流控制API

Monibuca提供了一系列API用于控制回放流的播放进度和速度，实现诸如暂停、恢复、调速和时间跳转等功能。

### 暂停流播放

```http
POST /api/stream/pause/{streamPath}
```

**参数说明**：
- `streamPath`: 流路径，需要URL编码

**响应示例**：
```json
{
  "code": 0,
  "message": "success"
}
```

### 恢复流播放

```http
POST /api/stream/resume/{streamPath}
```

**参数说明**：
- `streamPath`: 流路径，需要URL编码

**响应示例**：
```json
{
  "code": 0,
  "message": "success"
}
```

### 设置流播放速度

```http
POST /api/stream/speed/{streamPath}
```

**请求体示例**：
```json
{
  "speed": 2.0  // 设置播放速度，1.0为正常速度
}
```

**参数说明**：
- `streamPath`: 流路径，需要URL编码
- `speed`: 播放速度倍率，常用值：0.5(半速)、1.0(正常)、2.0(两倍速)、4.0(四倍速)

**响应示例**：
```json
{
  "code": 0,
  "message": "success"
}
```

### 跳转流播放位置

```http
POST /api/stream/seek/{streamPath}
```

**请求体示例**：
```json
{
  "timeStamp": 1612960800  // Unix时间戳（秒）
}
```

**参数说明**：
- `streamPath`: 流路径，需要URL编码
- `timeStamp`: 目标时间戳，Unix时间戳格式（秒）

**响应示例**：
```json
{
  "code": 0,
  "message": "success"
}
```

### 使用示例

以下是使用JavaScript结合上述API控制回放流的示例代码：

```javascript
// 暂停回放流
async function pauseStream(streamPath) {
  const response = await fetch(`/api/stream/pause/${encodeURIComponent(streamPath)}`, {
    method: 'POST'
  });
  return await response.json();
}

// 恢复回放流
async function resumeStream(streamPath) {
  const response = await fetch(`/api/stream/resume/${encodeURIComponent(streamPath)}`, {
    method: 'POST'
  });
  return await response.json();
}

// 设置回放速度
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

// 跳转到指定时间点
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

## 前端播放器集成
