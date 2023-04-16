# Middleware

Middleware refers to the functions that pre-process HTTP requests. Middleware can be used to handle requests, add logs, and verify user identity, among other things.

## Definition of Middleware

The definition of middleware is as follows:

```go
type Middleware func(string, http.Handler) http.Handler
```
The first parameter is the path, the second parameter is the next middleware, and the return value is the current middleware.

For example, to print a log for every request in the source code is a typical middleware:

```go
func (opt *Plugin) logHandler(pattern string, handler http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		opt.Debug("visit", zap.String("path", r.URL.String()), zap.String("remote", r.RemoteAddr))
		handler.ServeHTTP(rw, r)
	})
}
```

## Adding Middleware

Middleware can be added to `HTTPConfig` through the `AddMiddleware` method. The order in which middleware is added is the reverse order in which it is executed, and the last middleware added is the first to be executed.

```go
func (config *HTTP) AddMiddleware(middleware Middleware) {
	config.middlewares = append(config.middlewares, middleware)
}
```

### Adding Global Middleware

```go
func init(){
  Global.HTTP.AddMiddleware(func(pattern string, handler http.Handler) http.Handler {
    return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
      // do something
      handler.ServeHTTP(rw, r)
    })
  })
}
```

### Adding Plugin Middleware

For plugins that have HTTP request responses, middlewares can be added separately:
```go
import	"m7s.live/engine/v4/config"

type MyPluginConfig struct {
  config.HTTP
}

var myPluginConfig = MyPluginConfig{}

func init() {
  myPluginConfig.HTTP.AddMiddleware(func(pattern string, handler http.Handler) http.Handler {
    return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
      // do something
      handler.ServeHTTP(rw, r)
    })
  })
}
```

:::warning Note
When the HTTP of the plugin does not have a separately configured port, the global HTTP configuration will be reused, and the middleware set for the plugin will be invalid.
:::