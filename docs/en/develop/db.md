# Database Mechanism

Monibuca provides database support functionality, allowing database configuration and usage in both global settings and plugins.

## Configuration

### Global Configuration

Database can be configured in global settings using these fields:

```yaml
global:
  db:
    dsn: "database connection string"
    dbType: "database type"
```

### Plugin Configuration

Each plugin can have its own database configuration:

```yaml
pluginName:
  db:
    dsn: "database connection string"
    dbType: "database type"
```

## Database Initialization Process

### Global Database Initialization

1. When the server starts, if `dsn` is configured, it attempts to connect to the database
2. After successful connection, the following models are automatically migrated:
   - User table
   - PullProxy table
   - PushProxy table
   - StreamAliasDB table

3. If login is enabled (`Admin.EnableLogin = true`), users are created or updated based on the configuration file
4. If no users exist in the database, a default admin account is created:
   - Username: admin
   - Password: admin
   - Role: admin

### Plugin Database Initialization

1. During plugin initialization, the plugin's `dsn` configuration is checked
2. If the plugin's `dsn` matches the global configuration, the global database connection is used
3. If the plugin configures a different `dsn`, a new database connection is created
4. If the plugin implements the Recorder interface, the RecordStream table is automatically migrated

## Database Usage

### Global Database Access

The global database can be accessed through the Server instance:

```go
server.DB
```

### Plugin Database Access

Plugins can access their database through their instance:

```go
plugin.DB
```

## Important Notes

1. Database connection failures will disable related functionality
2. Plugins using independent databases need to manage their own database connections
3. Database migration failures will cause plugins to be disabled
4. It's recommended to reuse the global database connection when possible to avoid creating too many connections

## Built-in Tables

### User Table
Stores user information, including:
- Username: User's name
- Password: User's password
- Role: User's role (admin/user)

### PullProxy Table
Stores pull proxy configurations

### PushProxy Table
Stores push proxy configurations

### StreamAliasDB Table
Stores stream alias configurations

### RecordStream Table
Stores recording-related information (only created when plugin implements Recorder interface) 