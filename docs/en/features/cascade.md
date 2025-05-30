# Cascade Feature

The cascade feature is an advanced capability of Monibuca that enables multiple Monibuca instances to establish cascading relationships, facilitating distributed deployment and load sharing of streaming media. Through the cascade feature, you can build multi-tier streaming media distribution networks, improving system scalability and reliability.

## Key Features

- **QUIC Protocol Communication**: High-performance, low-latency data transmission based on QUIC protocol
- **Automatic Registration**: Lower-level nodes can automatically register with upper-level nodes
- **Security Authentication**: Support for key-based security authentication mechanism
- **Stream Forwarding**: Support for upstream and downstream forwarding of streaming media data
- **Status Management**: Real-time monitoring of cascade node online status
- **HTTP Proxy**: Support for cascaded forwarding of HTTP API requests
- **Database Storage**: Persistent storage of cascade configuration information
- **Access Control**: Fine-grained access control mechanism

## Architecture Overview

The cascade feature consists of two core components:

### Cascade Server (CascadeServerPlugin)
- Acts as an upper-level node, accepting connections from lower-level nodes
- Manages registration and status of lower-level nodes
- Provides stream forwarding and API proxy services
- Supports automatic registration of lower-level nodes

### Cascade Client (CascadeClientPlugin)
- Acts as a lower-level node, connecting to upper-level nodes
- Supports automatic stream pushing to upper-level nodes
- Provides pull proxy functionality

## Configuration

### Cascade Server Configuration

Configure the cascade server in the configuration file:

```yaml
cascade-server:
  # QUIC listening address configuration
  quic:
    listenaddr: ":44944"  # Cascade server listening port
  
  # Whether to allow automatic registration of lower-level nodes
  autoregister: true      # Default is true, allowing automatic registration
  
  # Access control configuration
  relayapi:
    enable: true          # Whether to enable API forwarding
    whitelist:            # IP whitelist
      - "192.168.1.0/24"
      - "10.0.0.0/8"
```

### Cascade Client Configuration

Configure the cascade client in the configuration file:

```yaml
cascade-client:
  # Upper-level server address
  server: "192.168.1.100:44944"
  
  # Connection secret (optional)
  secret: "your-secret-key"
  
  # Whether to automatically push streams to upper level
  autopush: true
  
  # Access control configuration
  relayapi:
    enable: true
    whitelist:
      - "192.168.1.0/24"
```

### Detailed Configuration Options

#### Cascade Server Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| quic.listenaddr | string | Yes | ":44944" | QUIC protocol listening address and port |
| autoregister | boolean | No | true | Whether to allow automatic registration of lower-level nodes |
| relayapi.enable | boolean | No | false | Whether to enable API forwarding functionality |
| relayapi.whitelist | string array | No | [] | IP address whitelist for access |

#### Cascade Client Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| server | string | Yes | - | Upper-level server address (IP:port) |
| secret | string | No | - | Connection secret for authentication |
| autopush | boolean | No | false | Whether to automatically push streams to upper-level node |
| relayapi.enable | boolean | No | false | Whether to enable API forwarding functionality |
| relayapi.whitelist | string array | No | [] | IP address whitelist for access |

## Deployment Architecture Examples

### Simple Two-Level Cascade

```
Upper Node (192.168.1.100:44944)
├── Lower Node A (192.168.1.101)
├── Lower Node B (192.168.1.102)
└── Lower Node C (192.168.1.103)
```

Configuration example:

**Upper Node Configuration:**
```yaml
cascade-server:
  quic:
    listenaddr: ":44944"
  autoregister: true
```

**Lower Node Configuration:**
```yaml
cascade-client:
  server: "192.168.1.100:44944"
  autopush: true
```

### Multi-Level Cascade Architecture

```
Headquarters Node (HQ)
├── Regional Node A (Region-A)
│   ├── Edge Node A1
│   └── Edge Node A2
└── Regional Node B (Region-B)
    ├── Edge Node B1
    └── Edge Node B2
```

## Feature Usage

### Stream Forwarding

When a lower-level node is configured with `autopush: true`, all streams published to the lower-level node will be automatically forwarded to the upper-level node.

#### Manual Pull

Lower-level nodes can also pull specific streams from upper-level nodes:

```yaml
cascade-client:
  server: "192.168.1.100:44944"
  # Configure pull rules
  pull:
    - streampath: "live/camera1"
      pullurl: "cascade://live/camera1"
```

### API Forwarding

After enabling API forwarding functionality, you can access lower-level node APIs through the cascade server:

```http
GET /api/relay/{instanceId}/api/stream/list
```

Where `{instanceId}` is the instance ID of the lower-level node.

## API Interfaces

The cascade server provides comprehensive management APIs:

### Get Lower-Level Node List

```http
GET /api/cascade/clients
```

**Response Example:**
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

### Create Lower-Level Node

```http
POST /api/cascade/clients
Content-Type: application/json

{
  "name": "edge-node-2",
  "secret": "node-secret-key"
}
```

### Update Lower-Level Node

```http
PUT /api/cascade/clients/{id}
Content-Type: application/json

{
  "name": "updated-node-name",
  "secret": "new-secret-key"
}
```

### Delete Lower-Level Node

```http
DELETE /api/cascade/clients/{id}
```

## Security Configuration

### Key Authentication

For enhanced security, it's recommended to configure unique keys for each lower-level node:

**Server-side client creation:**
```bash
curl -X POST http://server:8080/api/cascade/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "edge-node-1", "secret": "unique-secret-key"}'
```

**Client-side corresponding key configuration:**
```yaml
cascade-client:
  server: "server:44944"
  secret: "unique-secret-key"
```

### Network Security

1. **Firewall Configuration**: Ensure only necessary ports are open
2. **VPN/Dedicated Lines**: Use VPN or dedicated connections in public network environments
3. **IP Whitelist**: Configure access control whitelists

## Monitoring and Operations

### Status Monitoring

Real-time cascade status monitoring through API interfaces:

```bash
# Check all lower-level node status
curl http://server:8080/api/cascade/clients

# Access lower-level node APIs through proxy
curl http://server:8080/api/relay/1/api/stream/list
```

### Log Monitoring

Cascade-related logs will include the following key information:
- Node connection and disconnection events
- Authentication success and failure records
- Stream forwarding status
- Error and exception information

### Performance Tuning

1. **QUIC Parameter Tuning**: Adjust QUIC connection parameters based on network environment
2. **Concurrency Control**: Set reasonable maximum connection limits
3. **Buffer Optimization**: Adjust buffer sizes based on bandwidth

## Troubleshooting

### Common Issues

1. **Connection Failure**
   - Check network connectivity
   - Confirm if ports are open
   - Verify key configuration

2. **Authentication Failure**
   - Check if key is correct
   - Confirm if server allows automatic registration

3. **Stream Forwarding Issues**
   - Check stream path configuration
   - Confirm if network bandwidth is sufficient
   - Review related error logs

### Debug Mode

Enable debug logging for more detailed information:

```yaml
log:
  level: debug
```

## Best Practices

1. **Network Planning**: Plan cascade network topology reasonably to avoid single points of failure
2. **Load Balancing**: Distribute load across multiple upper-level nodes
3. **Monitoring and Alerting**: Set up node status monitoring and alerting mechanisms
4. **Regular Maintenance**: Regularly clean up offline nodes and expired data
5. **Security Updates**: Update keys and security configurations timely

## Important Notes

1. **Version Compatibility**: Ensure upper and lower nodes use compatible Monibuca versions
2. **Clock Synchronization**: Keep node clocks synchronized to avoid timestamp issues
3. **Resource Limits**: Configure resource limits reasonably to prevent cascade storms
4. **Data Consistency**: Pay attention to data consistency in multi-level cascades

Through the cascade feature, Monibuca can build large-scale, highly available distributed streaming media networks to meet deployment requirements in various scenarios.
