# gRPC Service Mechanism

Monibuca provides gRPC service support, allowing plugins to offer services via the gRPC protocol. This document explains the implementation mechanism and usage of gRPC services.

## Service Registration Mechanism

### 1. Service Registration

Plugins need to pass ServiceDesc and Handler when calling `InstallPlugin` to register gRPC services:

```go
// Example: Registering gRPC service in a plugin
type MyPlugin struct {
    pb.UnimplementedApiServer
    m7s.Plugin
}

var _ = m7s.InstallPlugin[MyPlugin](
    m7s.DefaultYaml(`your yaml config here`),
    &pb.Api_ServiceDesc,           // gRPC service descriptor
    pb.RegisterApiHandler,         // gRPC gateway handler
    // ... other parameters
)
```

### 2. Proto File Specifications

All gRPC services must follow these Proto file specifications:

- Response structs must include code, message, and data fields
- Error handling should return errors directly, without manually setting code and message
- Run `sh scripts/protoc.sh` to generate pb files after modifying global.proto
- Run `sh scripts/protoc.sh {pluginName}` to generate corresponding pb files after modifying plugin-related proto files

## Service Implementation Mechanism

### 1. Server Configuration

gRPC services use port settings from the global TCP configuration:

```yaml
global:
  tcp:
    listenaddr: :8080     # gRPC service listen address and port
    listentls: :8443      # gRPC TLS service listen address and port (if enabled)
```

Configuration items include:
- Listen address and port settings (specified in global TCP configuration)
- TLS/SSL certificate configuration (if enabled)

### 2. Error Handling

Error handling follows these principles:

- Return errors directly, no need to manually set code and message
- The system automatically handles errors and sets response format

## Best Practices

1. Service Definition
   - Clear service interface design
   - Appropriate method naming
   - Complete interface documentation

2. Performance Optimization
   - Use streaming for large data
   - Set reasonable timeout values

3. Security Considerations
   - Enable TLS encryption as needed
   - Implement necessary access controls 