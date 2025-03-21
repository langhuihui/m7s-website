# Admin Service Mechanism

Monibuca provides powerful management service support for system monitoring, configuration management, plugin management, and other administrative functions. This document details the implementation mechanism and usage of the Admin service.

## Service Architecture

### 1. UI Interface

The Admin service provides a Web management interface by loading the `admin.zip` file. The interface has the following features:

- Unified management interface entry
- Can call all HTTP interfaces provided by the server
- Responsive design, supports multiple device access
- Modular function organization

### 2. Configuration Management

Admin service configuration is located in the admin section of the global configuration, including:

```yaml
admin:
  enableLogin: false    # Whether to enable login mechanism
  filePath: admin.zip  # Management interface file path
  homePage: home      # Management interface home page
  users:             # User list (only effective when login mechanism is enabled)
    - username: admin   # Username
      password: admin   # Password
      role: admin      # Role, optional values: admin, user
```

When `enableLogin` is false, all users access as anonymous users.
When login mechanism is enabled and there are no users in the database, the system automatically creates a default administrator account (username: admin, password: admin).

### 3. Authentication Mechanism

Admin provides dedicated user login verification interface for:

- User identity verification
- Access token management (JWT)
- Permission control
- Session management

### 4. Interface Specification

All Admin APIs must follow these specifications:

- Response format uniformly includes code, message, data fields
- Success response uses code = 0
- Error handling uses unified error response format
- Must perform permission verification

## Function Modules

### 1. System Monitoring

- CPU usage monitoring
- Memory usage
- Network bandwidth statistics
- Disk usage
- System uptime
- Online user statistics

### 2. Plugin Management

- Plugin enable/disable
- Plugin configuration modification
- Plugin status viewing
- Plugin version management
- Plugin dependency checking

### 3. Streaming Media Management

- Online stream list viewing
- Stream status monitoring
- Stream control (start/stop)
- Stream information statistics
- Recording management
- Transcoding task management

## Security Mechanism

### 1. Authentication Mechanism

- JWT token authentication
- Session timeout control
- IP whitelist control

### 2. Permission Control

- Role-based access control (RBAC)
- Fine-grained permission management
- Operation audit logging
- Sensitive operation confirmation

## Best Practices

1. Security
   - Use HTTPS encryption
   - Implement strong password policy
   - Regular key updates
   - Monitor abnormal access

2. Performance Optimization
   - Reasonable caching strategy
   - Pagination query optimization
   - Asynchronous processing of time-consuming operations

3. Maintainability
   - Complete operation logs
   - Clear error messages
   - Hot configuration updates 