# Monibuca 配置机制

Monibuca 采用灵活的配置机制，支持多种配置方式。配置文件采用 YAML 格式，可以通过文件或者直接传入配置对象的方式进行初始化。

## 配置加载流程

1. 配置初始化发生在 Server 启动阶段，通过以下三种方式之一提供配置：
   - YAML 配置文件路径
   - YAML 配置内容的字节数组
   - 原始配置对象 (RawConfig)

2. 配置解析过程：
   ```go
   // 支持三种配置输入方式
   case string:  // 配置文件路径
   case []byte:  // YAML 配置内容
   case RawConfig:  // 原始配置对象
   ```

## 配置结构

### 配置简化语法

当配置项的值是一个结构体或 map 类型时，系统支持一种简化的配置方式：如果直接配置一个简单类型的值，该值会被自动赋给结构体的第一个字段。

例如，对于以下结构体：
```go
type Config struct {
    Port int
    Host string
}
```

可以使用简化语法：
```yaml
plugin: 1935  # 等同于 plugin: { port: 1935 }
```

### 配置反序列化机制

每个插件都包含一个 `config.Config` 类型的字段，用于存储和管理配置信息。配置加载的优先级从高到低是：

1. 用户配置 (通过 `ParseUserFile`)
2. 默认配置 (通过 `ParseDefaultYaml`)
3. 全局配置 (通过 `ParseGlobal`)
4. 插件特定配置 (通过 `Parse`)
5. 通用配置 (通过 `Parse`)

配置会被自动反序列化到插件的公开属性中。例如：

```go
type MyPlugin struct {
    Plugin
    Port    int    `yaml:"port"`
    Host    string `yaml:"host"`
}
```

对应的 YAML 配置：
```yaml
myplugin:
    port: 8080
    host: "localhost"
```

配置会自动反序列化到 `Port` 和 `Host` 字段中。你可以通过 `Config` 提供的方法来查询配置：
- `Has(name string)` - 检查是否存在某个配置
- `Get(name string)` - 获取某个配置的值
- `GetMap()` - 获取所有配置的 map

此外，插件的配置支持保存修改：
```go
func (p *Plugin) SaveConfig() (err error)
```
这会将修改后的配置保存到 `{settingDir}/{pluginName}.yaml` 文件中。

### 全局配置

全局配置位于 YAML 文件的 `global` 节点下，包含以下主要配置项：

```yaml
global:
  disableall: false         # 是否禁用所有插件
  streamalias:              # 流别名配置
    pattern: "target"       # 正则表达式 -> 目标路径
  location:                 # HTTP 路由转发规则
    pattern: "target"       # 正则表达式 -> 目标地址
  admin:                    # 管理界面配置
    enablelogin: false      # 是否启用登录机制
    filepath: "admin.zip"   # 管理界面文件路径
    homepage: "home"        # 管理界面首页
    users:                  # 用户列表(仅在启用登录时生效)
      - username: "admin"   # 用户名
        password: "admin"   # 密码
        role: "admin"       # 角色(admin/user)
```

### 数据库配置

如果配置了数据库连接，系统会自动进行以下操作：

1. 连接数据库
2. 自动迁移数据模型
3. 初始化用户数据（如果启用了登录机制）
4. 初始化代理配置

```yaml
global:
  db:
    dsn: ""                # 数据库连接字符串
    dbtype: ""              # 数据库类型
```

### 代理配置

系统支持拉流代理和推流代理配置：

```yaml
global:
  pullProxy:              # 拉流代理配置
    - id: 1              # 代理ID
      name: "proxy1"     # 代理名称
      url: "rtmp://..."  # 代理地址
      type: "rtmp"       # 代理类型
      pullonstart: true  # 是否启动时拉流

  pushProxy:              # 推流代理配置
    - id: 1              # 代理ID
      name: "proxy1"     # 代理名称
      url: "rtmp://..."  # 代理地址
      type: "rtmp"       # 代理类型
      pushonstart: true  # 是否启动时推流
      audio: true        # 是否推送音频
```

## 插件配置

每个插件可以有自己的配置节点，节点名为插件名称的小写形式：

```yaml
rtmp:                    # RTMP插件配置
  tcp: :1935            # 监听端口

rtsp:                   # RTSP插件配置
  tcp: :554             # 监听端口
```

## 配置优先级

配置系统采用多级优先级机制，从高到低依次为：

1. URL 查询参数配置 - 发布或订阅时通过 URL 查询参数指定的配置具有最高优先级
   ```
   例如：rtmp://localhost/live/stream?audio=false
   ```

2. 插件特定配置 - 在插件配置节点下的配置项
   ```yaml
   rtmp:
     publish:
       pubaudio: true
     subscribe:
       subaudio: true
   ```

3. 全局配置 - 在 global 节点下的配置项
   ```yaml
   global:
     publish:
       pubaudio: true
     subscribe:
       subaudio: true
   ```

## 通用配置

系统中存在一些通用配置项，这些配置项可以同时出现在全局配置和插件配置中。当插件使用这些配置项时，会优先使用插件配置中的值，如果插件配置中没有设置，则使用全局配置中的值。

主要的通用配置包括：

1. 发布配置（Publish）
   ```yaml
   publish:
     pubaudio: true          # 是否包含音频
     pubvideo: true          # 是否包含视频
     bufferlength: 1000   # 缓冲长度
   ```

2. 订阅配置（Subscribe）
   ```yaml
   subscribe:
     subaudio: true          # 是否订阅音频
     subvideo: true          # 是否订阅视频
     bufferlength: 1000   # 缓冲长度
   ```

3. HTTP 配置
   ```yaml
   http:
     listenaddr: :8080  # 监听地址
   ```

4. 其他通用配置
   - PublicIP - 公网 IP
   - PublicIPv6 - 公网 IPv6
   - LogLevel - 日志级别
   - EnableAuth - 是否启用认证

使用示例：

```yaml
# 全局配置
global:
  publish:
    pubaudio: true
    pubvideo: true
  subscribe:
    subaudio: true
    subvideo: true

# 插件配置（优先级高于全局配置）
rtmp:
  publish:
    pubaudio: false  # 覆盖全局配置
  subscribe:
    subvideo: false  # 覆盖全局配置

# URL 查询参数（最高优先级）
# rtmp://localhost/live/stream?subaudio=true&subvideo=false
```

## 配置热更新

目前系统支持管理界面文件（admin.zip）的热更新，会定期检查文件变化并自动重新加载。

## 配置验证

系统在启动时会对配置进行基本验证：

1. 检查必要的目录权限
2. 验证数据库连接
3. 验证用户配置（如果启用登录机制）

## 配置示例

完整的配置文件示例：

```yaml
global:
  disableall: false
  streamalias:
    live/(.*): "record/$1"
  location:
    ^/live/(.*): "/hls/$1"
  admin:
    enablelogin: true
    filepath: "admin.zip"
    homepage: "home"
    users:
      - username: "admin"
        password: "admin"
        role: "admin"
  db:
    dsn: "host=localhost user=postgres password=postgres dbname=monibuca port=5432 sslmode=disable TimeZone=Asia/Shanghai"
    dbtype: "postgres"
  pullProxy:
    - id: 1
      name: "proxy1"
      url: "rtmp://example.com/live/stream"
      type: "rtmp"
      pullOnStart: true
  pushProxy:
    - id: 1
      name: "proxy1"
      url: "rtmp://example.com/live/stream"
      type: "rtmp"
      pushonstart: true
      audio: true

rtmp:
  tcp: :1935

rtsp:
  tcp: :554
```
