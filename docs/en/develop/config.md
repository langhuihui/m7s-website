# Monibuca Configuration Mechanism

Monibuca employs a flexible configuration system that supports multiple configuration methods. Configuration files use the YAML format and can be initialized either through files or by directly passing configuration objects.

## Configuration Loading Process

1. Configuration initialization occurs during Server startup and can be provided through one of three methods:
   - YAML configuration file path
   - Byte array containing YAML configuration content
   - Raw configuration object (RawConfig)

2. Configuration parsing process:
   ```go
   // Supports three configuration input methods
   case string:  // Configuration file path
   case []byte:  // YAML configuration content
   case RawConfig:  // Raw configuration object
   ```

## Configuration Structure

### Simplified Configuration Syntax

When a configuration item's value is a struct or map type, the system supports a simplified configuration approach: if a simple type value is configured directly, that value will be automatically assigned to the first field of the struct.

For example, given the following struct:
```go
type Config struct {
    Port int
    Host string
}
```

You can use simplified syntax:
```yaml
plugin: 1935  # equivalent to plugin: { port: 1935 }
```

### Configuration Deserialization Mechanism

Each plugin contains a `config.Config` type field for storing and managing configuration information. The configuration loading priority from highest to lowest is:

1. User configuration (via `ParseUserFile`)
2. Default configuration (via `ParseDefaultYaml`)
3. Global configuration (via `ParseGlobal`)
4. Plugin-specific configuration (via `Parse`)
5. Common configuration (via `Parse`)

Configurations are automatically deserialized into the plugin's public properties. For example:

```go
type MyPlugin struct {
    Plugin
    Port    int    `yaml:"port"`
    Host    string `yaml:"host"`
}
```

Corresponding YAML configuration:
```yaml
myplugin:
    port: 8080
    host: "localhost"
```

The configuration will automatically deserialize to the `Port` and `Host` fields. You can query configurations using methods provided by `Config`:
- `Has(name string)` - Check if a configuration exists
- `Get(name string)` - Get the value of a configuration
- `GetMap()` - Get a map of all configurations

Additionally, plugin configurations support saving modifications:
```go
func (p *Plugin) SaveConfig() (err error)
```
This saves the modified configuration to `{settingDir}/{pluginName}.yaml`.

### Global Configuration

Global configuration is located under the `global` node in the YAML file and includes these main configuration items:

```yaml
global:
  disableall: false         # Whether to disable all plugins
  streamalias:              # Stream alias configuration
    pattern: "target"       # Regex -> target path
  location:                 # HTTP routing rules
    pattern: "target"       # Regex -> target address
  admin:                    # Admin interface configuration
    enablelogin: false      # Whether to enable login mechanism
    filepath: "admin.zip"   # Admin interface file path
    homepage: "home"        # Admin interface homepage
    users:                  # User list (effective only when login is enabled)
      - username: "admin"   # Username
        password: "admin"   # Password
        role: "admin"       # Role (admin/user)
```

### Database Configuration

If database connection is configured, the system will automatically:

1. Connect to the database
2. Auto-migrate data models
3. Initialize user data (if login is enabled)
4. Initialize proxy configurations

```yaml
global:
  db:
    dsn: ""                # Database connection string
    dbtype: ""              # Database type
```

### Proxy Configuration

The system supports pull and push proxy configurations:

```yaml
global:
  pullProxy:              # Pull proxy configuration
    - id: 1              # Proxy ID
      name: "proxy1"     # Proxy name
      url: "rtmp://..."  # Proxy address
      type: "rtmp"       # Proxy type
      pullonstart: true  # Whether to pull on startup

  pushProxy:              # Push proxy configuration
    - id: 1              # Proxy ID
      name: "proxy1"     # Proxy name
      url: "rtmp://..."  # Proxy address
      type: "rtmp"       # Proxy type
      pushonstart: true  # Whether to push on startup
      audio: true        # Whether to push audio
```

## Plugin Configuration

Each plugin can have its own configuration node, named as the lowercase version of the plugin name:

```yaml
rtmp:                    # RTMP plugin configuration
  tcp: :1935            # Listen port

rtsp:                   # RTSP plugin configuration
  tcp: :554             # Listen port
```

## Configuration Priority

The configuration system uses a multi-level priority mechanism, from highest to lowest:

1. URL Query Parameter Configuration - Configurations specified via URL query parameters during publishing or subscribing have the highest priority
   ```
   Example: rtmp://localhost/live/stream?audio=false
   ```

2. Plugin-Specific Configuration - Configuration items under the plugin's configuration node
   ```yaml
   rtmp:
     publish:
       pubaudio: true
     subscribe:
       subaudio: true
   ```

3. Global Configuration - Configuration items under the global node
   ```yaml
   global:
     publish:
       pubaudio: true
     subscribe:
       subaudio: true
   ```

## Common Configuration

There are some common configuration items that can appear in both global and plugin configurations. When plugins use these items, they prioritize values from plugin configuration, falling back to global configuration if not set in plugin configuration.

Main common configurations include:

1. Publish Configuration
   ```yaml
   publish:
     pubaudio: true          # Whether to include audio
     pubvideo: true          # Whether to include video
     bufferlength: 1000   # Buffer length
   ```

2. Subscribe Configuration
   ```yaml
   subscribe:
     subaudio: true          # Whether to subscribe to audio
     subvideo: true          # Whether to subscribe to video
     bufferlength: 1000   # Buffer length
   ```

3. HTTP Configuration
   ```yaml
   http:
     listenaddr: :8080  # Listen address
   ```

4. Other Common Configurations
   - PublicIP - Public IP
   - PublicIPv6 - Public IPv6
   - LogLevel - Log level
   - EnableAuth - Whether to enable authentication

Usage example:

```yaml
# Global configuration
global:
  publish:
    pubaudio: true
    pubvideo: true
  subscribe:
    subaudio: true
    subvideo: true

# Plugin configuration (higher priority than global)
rtmp:
  publish:
    pubaudio: false  # Overrides global configuration
  subscribe:
    subvideo: false  # Overrides global configuration

# URL query parameters (highest priority)
# rtmp://localhost/live/stream?subaudio=true&subvideo=false
```

## Hot Configuration Update

Currently, the system supports hot updates for the admin interface file (admin.zip), periodically checking for changes and automatically reloading.

## Configuration Validation

The system performs basic validation of configurations at startup:

1. Checks necessary directory permissions
2. Validates database connections
3. Validates user configurations (if login is enabled) 