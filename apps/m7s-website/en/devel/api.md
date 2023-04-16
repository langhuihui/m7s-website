# Plugin API Definition

Usually plugins need to provide external HTTP API call capability. The engine has done some encapsulation to facilitate the definition of these APIs.

## Rules

When the plugin configuration definition contains a method of `func XXX(w http.ResponseWriter, r *http.Request)`, it will be automatically registered as an HTTP API according to the method name. For example:

```go
import (
  . "m7s.live/engine/v4"
  "m7s.live/engine/v4/config"
)
type MyPluginConfig struct {
    config.HTTP
}
func (p *MyPluginConfig) API_abc(w http.ResponseWriter, r *http.Request) {
  
}
```
then an HTTP API path `/myplugin/api/abc` will be automatically generated. That is, the underline `_` will be converted to `/`.

## ServeHTTP

If the method name is `ServeHTTP`, for example:
```go
import (
  . "m7s.live/engine/v4"
  "m7s.live/engine/v4/config"
)
type MyPluginConfig struct {
    config.HTTP
}
func (p *MyPluginConfig) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  
}
```
then an HTTP API path `/myplugin/*` will be generated, which is used for requests with unspecified routes.

## CORS

CORS header injection is enabled by default.

To disable it, you need to configure it in the configuration item:

```yaml
myplugin:
  http:
    cors: false
```

## Custom HTTP port

The global port is used by default (default to 8080).

Each plugin can customize the port number:

```yaml
myplugin:
  http:
    listenaddr: :8081
```

## Custom HTTPS

The global HTTPS configuration is used by default (HTTPS is not enabled by default).

```yaml
myplugin:
  http:
    listenaddrtls: :8081
    certfile: monibuca.com.pem
    keyfile: monibuca.com.key
```
