# GRPC 服务机制

Monibuca 提供了 gRPC 服务支持，允许插件通过 gRPC 协议提供服务。本文档说明了 gRPC 服务的实现机制和使用方法。

## 服务注册机制

### 1. 服务注册

插件注册 gRPC 服务需要在 `InstallPlugin` 时传入 ServiceDesc 和 Handler：

```go
// 示例：在插件中注册 gRPC 服务
type MyPlugin struct {
    pb.UnimplementedApiServer
    m7s.Plugin
}

var _ = m7s.InstallPlugin[MyPlugin](
    m7s.DefaultYaml(`your yaml config here`),
    &pb.Api_ServiceDesc,           // gRPC service descriptor
    pb.RegisterApiHandler,         // gRPC gateway handler
    // ... 其他参数
)
```

### 2. Proto 文件规范

所有的 gRPC 服务都需要遵循以下 Proto 文件规范：

- 响应结构体必须包含 code、message、data 字段
- 错误处理采用直接返回 error 的方式，无需手动设置 code 和 message
- 修改 global.proto 后需要运行 `sh scripts/protoc.sh` 生成 pb 文件
- 修改插件相关的 proto 文件后需要运行 `sh scripts/protoc.sh {pluginName}` 生成对应的 pb 文件

## 服务实现机制

### 1. 服务器配置

gRPC 服务使用全局 TCP 配置中的端口设置：

```yaml
global:
  tcp:
    listenaddr: :8080     # gRPC 服务监听地址和端口
    listentls: :8443      # gRPC TLS 服务监听地址和端口（如果启用）
```

配置项包括：
- 监听地址和端口设置（在全局 TCP 配置中指定）
- TLS/SSL 证书配置（如果启用）

### 2. 错误处理

错误处理遵循以下原则：

- 直接返回 error，无需手动设置 code 和 message
- 系统会自动处理错误并设置响应格式

## 最佳实践

1. 服务定义
   - 清晰的服务接口设计
   - 合理的方法命名
   - 完整的接口文档

2. 性能优化
   - 使用流式处理大数据
   - 合理设置超时时间

3. 安全考虑
   - 根据需要启用 TLS 加密
   - 实现必要的访问控制 