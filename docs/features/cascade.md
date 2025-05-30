# 级联功能

级联功能是 Monibuca 的高级特性，允许多个 Monibuca 实例之间建立级联关系，实现流媒体的分布式部署和负载分担。通过级联功能，可以构建多级流媒体分发网络，提高系统的可扩展性和可靠性。

## 功能特点

- **QUIC协议通信**：基于QUIC协议实现高性能、低延迟的数据传输
- **自动注册机制**：下级节点可以自动向上级节点注册
- **安全认证**：支持基于密钥的安全认证机制
- **流转发**：支持流媒体数据的上下级转发
- **状态管理**：实时监控级联节点的在线状态
- **HTTP代理**：支持HTTP API请求的级联转发
- **数据库存储**：级联配置信息持久化存储
- **访问控制**：提供细粒度的访问控制机制

## 架构说明

级联功能包含两个核心组件：

### 级联服务器（CascadeServerPlugin）
- 作为上级节点，接受下级节点的连接
- 管理下级节点的注册和状态
- 提供流转发和API代理服务
- 支持下级节点的自动注册

### 级联客户端（CascadeClientPlugin）
- 作为下级节点，连接到上级节点
- 支持自动推流到上级节点
- 提供拉流代理功能

## 配置说明

### 级联服务器配置

在配置文件中配置级联服务器：

```yaml
cascade-server:
  # QUIC监听地址配置
  quic:
    listenaddr: ":44944"  # 级联服务器监听端口
  
  # 是否允许下级节点自动注册
  autoregister: true      # 默认为true，允许自动注册
  
  # 访问控制配置
  relayapi:
    enable: true          # 是否启用API转发
    whitelist:            # IP白名单
      - "192.168.1.0/24"
      - "10.0.0.0/8"
```

### 级联客户端配置

在配置文件中配置级联客户端：

```yaml
cascade-client:
  # 上级服务器地址
  server: "192.168.1.100:44944"
  
  # 连接密钥（可选）
  secret: "your-secret-key"
  
  # 是否自动推流到上级
  autopush: true
  
  # 访问控制配置
  relayapi:
    enable: true
    whitelist:
      - "192.168.1.0/24"
```

### 配置项详细说明

#### 级联服务器配置项

| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|------|------|
| quic.listenaddr | 字符串 | 是 | ":44944" | QUIC协议监听地址和端口 |
| autoregister | 布尔值 | 否 | true | 是否允许下级节点自动注册 |
| relayapi.enable | 布尔值 | 否 | false | 是否启用API转发功能 |
| relayapi.whitelist | 字符串数组 | 否 | [] | 允许访问的IP地址白名单 |

#### 级联客户端配置项

| 配置项 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|------|------|
| server | 字符串 | 是 | - | 上级服务器地址（IP:端口） |
| secret | 字符串 | 否 | - | 连接密钥，用于身份验证 |
| autopush | 布尔值 | 否 | false | 是否自动推流到上级节点 |
| relayapi.enable | 布尔值 | 否 | false | 是否启用API转发功能 |
| relayapi.whitelist | 字符串数组 | 否 | [] | 允许访问的IP地址白名单 |

## 部署架构示例

### 简单两级级联

```
上级节点 (192.168.1.100:44944)
├── 下级节点A (192.168.1.101)
├── 下级节点B (192.168.1.102)
└── 下级节点C (192.168.1.103)
```

配置示例：

**上级节点配置：**
```yaml
cascade-server:
  quic:
    listenaddr: ":44944"
  autoregister: true
```

**下级节点配置：**
```yaml
cascade-client:
  server: "192.168.1.100:44944"
  autopush: true
```

### 多级级联架构

```
总部节点 (HQ)
├── 区域节点A (Region-A)
│   ├── 边缘节点A1
│   └── 边缘节点A2
└── 区域节点B (Region-B)
    ├── 边缘节点B1
    └── 边缘节点B2
```

## 功能使用

### 流转发

当下级节点配置了 `autopush: true` 时，所有发布到下级节点的流都会自动转发到上级节点。

#### 手动拉流

下级节点也可以从上级节点拉取特定的流：

```yaml
cascade-client:
  server: "192.168.1.100:44944"
  # 配置拉流规则
  pull:
    - streampath: "live/camera1"
      pullurl: "cascade://live/camera1"
```

### API转发

启用API转发功能后，可以通过级联服务器访问下级节点的API：

```http
GET /api/relay/{instanceId}/api/stream/list
```

其中 `{instanceId}` 是下级节点的实例ID。

## API接口

级联服务器提供了完整的管理API：

### 获取下级节点列表

```http
GET /api/cascade/clients
```

**响应示例：**
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "edge-node-1",
      "ip": "192.168.1.101",
      "online": true,
      "created_time": "2025-01-01T00:00:00Z",
      "updated_time": "2025-01-01T12:00:00Z"
    }
  ]
}
```

### 创建下级节点

```http
POST /api/cascade/clients
Content-Type: application/json

{
  "name": "edge-node-2",
  "secret": "node-secret-key"
}
```

### 更新下级节点

```http
PUT /api/cascade/clients/{id}
Content-Type: application/json

{
  "name": "updated-node-name",
  "secret": "new-secret-key"
}
```

### 删除下级节点

```http
DELETE /api/cascade/clients/{id}
```

## 安全配置

### 密钥认证

为提高安全性，建议为每个下级节点配置独立的密钥：

**服务器端创建客户端：**
```bash
curl -X POST http://server:8080/api/cascade/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "edge-node-1", "secret": "unique-secret-key"}'
```

**客户端配置对应密钥：**
```yaml
cascade-client:
  server: "server:44944"
  secret: "unique-secret-key"
```

### 网络安全

1. **防火墙配置**：确保只开放必要的端口
2. **VPN/专线**：在公网环境建议使用VPN或专线连接
3. **IP白名单**：配置访问控制白名单

## 监控和运维

### 状态监控

通过API接口可以实时监控级联状态：

```bash
# 检查所有下级节点状态
curl http://server:8080/api/cascade/clients

# 通过下级节点代理访问其API
curl http://server:8080/api/relay/1/api/stream/list
```

### 日志监控

级联相关的日志会包含以下关键信息：
- 节点连接和断开事件
- 认证成功和失败记录
- 流转发状态
- 错误和异常信息

### 性能调优

1. **QUIC参数调优**：根据网络环境调整QUIC连接参数
2. **并发控制**：合理设置最大连接数
3. **缓冲区优化**：根据带宽调整缓冲区大小

## 故障排查

### 常见问题

1. **连接失败**
   - 检查网络连通性
   - 确认端口是否开放
   - 验证密钥配置

2. **认证失败**
   - 检查密钥是否正确
   - 确认服务器端是否允许自动注册

3. **流转发异常**
   - 检查流路径配置
   - 确认网络带宽是否充足
   - 查看相关错误日志

### 调试模式

启用调试日志获取更详细的信息：

```yaml
log:
  level: debug
```

## 相关资源

### 配置示例
- [级联配置示例](../examples/cascade/README.md) - 完整的配置示例和部署指南
- [Docker Compose 部署](../examples/cascade/docker-compose.yml) - 容器化部署示例
- [多级级联配置](../examples/cascade/multi-level-cascade.yaml) - 复杂网络拓扑配置

### 性能优化
- [性能调优指南](../examples/cascade/performance-tuning.md) - 详细的性能优化配置
- [硬件配置建议](../examples/cascade/performance-tuning.md#硬件建议) - 不同规模部署的硬件推荐

### 测试和监控
- [集成测试](../examples/cascade/integration-tests/README.md) - 自动化测试套件
- [故障排除指南](../examples/cascade/troubleshooting.md) - 常见问题解决方案
- [监控配置](../examples/cascade/troubleshooting.md#监控工具) - 实时监控和告警设置

### 数据库
- [数据库配置](../examples/cascade/init.sql) - PostgreSQL 初始化脚本
- [级联状态管理](../examples/cascade/init.sql) - 级联连接状态跟踪

## 最佳实践

1. **网络规划**：合理规划级联网络拓扑，避免单点故障
2. **负载均衡**：在多个上级节点间分散负载
3. **监控告警**：设置节点状态监控和告警机制
4. **定期维护**：定期清理离线节点和过期数据
5. **安全更新**：及时更新密钥和安全配置
6. **性能测试**：定期进行负载测试和性能评估
7. **文档维护**：保持网络拓扑和配置文档的更新

## 注意事项

1. **版本兼容性**：确保上下级节点使用兼容的Monibuca版本
2. **时钟同步**：保持各节点时钟同步，避免时间戳问题
3. **资源限制**：合理配置资源限制，防止级联风暴
4. **数据一致性**：在多级级联中注意数据一致性问题
5. **网络稳定性**：确保级联节点间网络连接的稳定性
6. **备份策略**：制定数据备份和恢复策略

## 快速开始

如果您是初次使用级联功能，建议按以下顺序进行：

1. 阅读 [配置示例](../examples/cascade/README.md) 了解基本配置
2. 使用 [Docker Compose](../examples/cascade/docker-compose.yml) 快速搭建测试环境
3. 运行 [集成测试](../examples/cascade/integration-tests/README.md) 验证功能
4. 参考 [性能调优指南](../examples/cascade/performance-tuning.md) 优化配置
5. 遇到问题时查阅 [故障排除指南](../examples/cascade/troubleshooting.md)

通过级联功能，Monibuca可以构建大规模、高可用的分布式流媒体网络，满足不同场景下的部署需求。
