# Admin Service Mechanism

Monibuca provides powerful administrative service support for system monitoring, configuration management, plugin management, and other administrative functions. This document details the implementation mechanism and usage of the Admin service.

## Service Architecture

### 1. UI Interface

The Admin service provides a Web management interface by loading the `admin.zip` file. This interface has the following features:

- Unified management interface entry point
- Access to all server-provided HTTP interfaces
- Responsive design, supporting various devices
- Modular function organization

### 2. Configuration Management

Admin service configuration is located in the admin node within global configuration, including:

```yaml
admin:
  enableLogin: false    # Whether to enable login mechanism
  filePath: admin.zip  # Management interface file path
  homePage: home      # Management interface homepage
  users:             # User list (effective only when login is enabled)
    - username: admin   # Username
      password: admin   # Password
      role: admin      # Role, options: admin, user
```

When `enableLogin` is false, all users access as anonymous users.
When login is enabled and no users exist in the database, the system automatically creates a default admin account (username: admin, password: admin).

### 3. Authentication Mechanism

Admin provides dedicated user login verification interfaces for:

- User identity verification
- Access token management (JWT)
- Permission control
- Session management

### 4. Interface Specifications

All Admin APIs must follow these specifications:

- Response format uniformly includes code, message, and data fields
- Successful responses use code = 0
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

### 3. Stream Media Management

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

- Role-Based Access Control (RBAC)
- Fine-grained permission management
- Operation audit logging
- Sensitive operation confirmation

## Best Practices

1. Security
   - Use HTTPS encryption
   - Implement strong password policies
   - Regular key updates
   - Monitor abnormal access

2. Performance Optimization
   - Reasonable caching strategy
   - Paginated query optimization
   - Asynchronous processing of time-consuming operations

3. Maintainability
   - Complete operation logs
   - Clear error messages
   - Hot configuration updates 