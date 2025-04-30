# Monibuca 流别名功能技术实现文档

## 1. 功能概述

流别名（Stream Alias）是 Monibuca 中的一个重要功能，它允许为已存在的流创建一个或多个别名，使得同一个流可以通过不同的路径被访问。这个功能在以下场景特别有用：

- 为长路径的流创建简短别名
- 动态修改流的访问路径
- 实现流的重定向功能

## 2. 核心数据结构

### 2.1 AliasStream 结构

```go
type AliasStream struct {
    *Publisher      // 继承自 Publisher
    AutoRemove bool // 是否自动移除
    StreamPath string // 原始流路径
    Alias      string // 别名路径
}
```

### 2.2 StreamAlias 消息结构

```protobuf
message StreamAlias {
    string streamPath = 1;  // 原始流路径
    string alias = 2;       // 别名
    bool autoRemove = 3;    // 是否自动移除
    uint32 status = 4;      // 状态
}
```

## 3. 核心功能实现

### 3.1 别名创建和修改

当调用 `SetStreamAlias` API 创建或修改别名时，系统会：

1. 验证并解析目标流路径
2. 检查目标流是否存在
3. 处理以下场景：
   - 修改现有别名：更新自动移除标志和流路径
   - 创建新别名：初始化新的 AliasStream 结构
4. 处理订阅者转移或唤醒等待的订阅者

### 3.2 Publisher 启动时的别名处理

当一个 Publisher 启动时，系统会：

1. 检查是否存在指向该 Publisher 的别名
2. 对于每个匹配的别名：
   - 如果别名的 Publisher 为空，设置为新的 Publisher
   - 如果别名已有 Publisher，转移订阅者到新的 Publisher
3. 唤醒所有等待该流的订阅者

### 3.3 Publisher 销毁时的别名处理

Publisher 销毁时的处理流程：

1. 检查是否因被踢出而停止
2. 从 Streams 中移除 Publisher
3. 遍历所有别名，对于指向该 Publisher 的别名：
   - 如果设置了自动移除，则删除该别名
   - 否则保留别名结构
4. 处理相关订阅者

### 3.4 订阅者处理机制

当新的订阅请求到来时：

1. 检查是否存在匹配的别名
2. 如果存在别名：
   - 别名对应的 Publisher 存在：添加订阅者
   - Publisher 不存在：触发 OnSubscribe 事件
3. 如果不存在别名：
   - 检查是否有匹配的正则表达式别名
   - 检查原始流是否存在
   - 根据情况添加订阅者或加入等待列表

## 4. API 接口

### 4.1 设置别名

```http
POST /api/stream/alias
```

请求体：
```json
{
    "streamPath": "原始流路径",
    "alias": "别名路径",
    "autoRemove": false
}
```

### 4.2 获取别名列表

```http
GET /api/stream/alias
```

响应体：
```json
{
    "code": 0,
    "message": "",
    "data": [
        {
            "streamPath": "原始流路径",
            "alias": "别名路径",
            "autoRemove": false,
            "status": 1
        }
    ]
}
```

## 5. 状态说明

别名状态（status）说明：
- 0：初始状态
- 1：别名已关联 Publisher
- 2：存在同名的原始流

## 6. 最佳实践

1. 使用自动移除（autoRemove）
   - 当需要临时重定向流时，建议启用自动移除
   - 这样在原始流结束时，别名会自动清理

2. 别名命名建议
   - 使用简短且有意义的别名
   - 避免使用特殊字符
   - 建议使用规范的路径格式

3. 性能考虑
   - 别名机制采用高效的内存映射
   - 订阅者转移时保持连接状态
   - 支持动态修改，无需重启服务

## 7. 注意事项

1. 别名冲突处理
   - 当创建的别名与现有流路径冲突时，系统会进行适当处理
   - 建议在创建别名前检查是否存在冲突

2. 订阅者行为
   - 别名修改时，现有订阅者会被转移到新的流
   - 确保客户端能够处理流重定向

3. 资源管理
   - 及时清理不需要的别名
   - 合理使用自动移除功能
   - 监控别名状态，避免资源泄露
``` 