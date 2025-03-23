# 钩子
钩子是 Monibuca 的一个重要功能，允许在特定事件发生时触发自定义操作。

## 功能特点
- 支持多种事件类型
- 支持 HTTP 回调
- 支持自定义脚本
- 支持异步处理
- 支持重试机制

## 配置说明
钩子可以配置在全局配置中，也可以配置在特定插件下。全局配置的钩子会对所有相关事件生效，插件特定的钩子仅对该插件产生的事件生效。

### 全局配置
在 Monibuca 的全局配置文件中，可以通过以下方式配置钩子：
```yaml
global:
  hook:
    # 钩子配置
    publish:  # 流发布事件
      url: http://your-server/hook  # Webhook 地址
      method: POST  # HTTP 方法
      headers:  # 自定义请求头
        Content-Type: application/json
      timeout: 5  # 超时时间(秒)
      retry: 3  # 重试次数
      retryInterval: 1s  # 重试间隔
    publish_end:  # 流发布结束事件
      url: http://your-server/hook
      method: POST
    subscribe:  # 流订阅事件
      url: http://your-server/hook
      method: POST
    subscribe_end:  # 流订阅结束事件
      url: http://your-server/hook
      method: POST
    server_keep_alive:  # 服务器心跳事件
      url: http://your-server/hook
      method: POST
      interval: 60  # 心跳间隔(秒)
```

### 插件配置
也可以为特定插件配置钩子，只处理该插件产生的事件：
```yaml
rtmp:  # 插件名称
  hook:
    publish:
      url: http://your-server/rtmp-hook
      method: POST
      headers:
        Content-Type: application/json
      timeout: 5
      retry: 3
      retryInterval: 1s
```

## 使用示例
### 配置多个事件钩子
```yaml
global:
  hook:
    publish:
      url: http://your-server/publish-hook
      method: POST
      headers:
        Content-Type: application/json
      timeout: 5
      retry: 3
      retryInterval: 1s
    subscribe:
      url: http://your-server/subscribe-hook
      method: POST
```

### 支持的事件类型
- publish：流发布事件
- publish_end：流发布结束事件
- subscribe：流订阅事件
- subscribe_end：流订阅结束事件
- server_keep_alive：服务器心跳事件

### 通过 API 添加钩子规则
```http
POST /api/v1/hook/rules
Content-Type: application/json
{
    "event": "publish",
    "url": "http://your-server/hook",
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    },
    "timeout": 5,
    "retry": 3,
    "retryInterval": 1,
    "interval": 60
}
```

## 钩子事件数据
### publish 事件
```json
{
  "event": "publish",
  "streamPath": "live/stream",
  "args": {},
  "publishId": "pub_xxxxx",
  "remoteAddr": "127.0.0.1:12345",
  "type": "rtmp",
  "pluginName": "RTMP",
  "timestamp": 1623123456
}
```

### publish_end 事件
```json
{
  "event": "publish_end",
  "streamPath": "live/stream",
  "publishId": "pub_xxxxx",
  "reason": "client disconnect",
  "timestamp": 1623123556
}
```

### subscribe 事件
```json
{
  "event": "subscribe",
  "streamPath": "live/stream",
  "publishId": "pub_xxxxx",
  "subscriberId": "sub_xxxxx",
  "remoteAddr": "127.0.0.1:54321",
  "type": "http-flv",
  "args": {},
  "timestamp": 1623123656
}
```

### subscribe_end 事件
```json
{
  "event": "subscribe_end",
  "streamPath": "live/stream",
  "subscriberId": "sub_xxxxx",
  "publishId": "pub_xxxxx",
  "reason": "client disconnect",
  "timestamp": 1623123756
}
```

### server_keep_alive 事件
```json
{
  "event": "server_keep_alive",
  "timestamp": 1623123856,
  "streams": 10,
  "subscribers": 100,
  "publisherCount": 10,
  "subscriberCount": 100,
  "uptime": 3600
}
```

## 注意事项
1. 确保回调地址可用
2. 合理设置超时时间
3. 注意请求体大小
4. 监控钩子执行情况
5. 及时处理失败回调
6. 全局钩子和插件特定钩子会同时触发

## 常见问题
1. 钩子执行失败
   - 检查回调地址
   - 验证请求格式
   - 确认网络连接
2. 性能问题
   - 优化回调逻辑
   - 使用异步处理
   - 监控响应时间
3. 重试机制
   - 检查重试配置
   - 验证重试日志
   - 确认重试结果