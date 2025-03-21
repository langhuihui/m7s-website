# Authentication
Authentication is an important feature in Monibuca for controlling access to video streams.

## Feature Highlights
- Supports multiple authentication methods
- Supports custom and built-in authentication
- Distinguishes between publisher and subscriber authentication

## Authentication Classification

### Classification by Implementation
1. **Built-in Authentication** - Uses Monibuca's built-in Token verification based on key and expiration time
2. **Custom Authentication** - Customizes authentication logic by implementing `OnAuthPub` and `OnAuthSub` callback functions

### Classification by Application Object
1. **Publisher Authentication** - Controls who can publish video streams to the system
2. **Subscriber Authentication** - Controls who can subscribe to video streams from the system

## Configuration
In Monibuca's configuration file, you can configure authentication-related parameters as follows:

```yaml
global:
  enableauth: true
  # Publisher authentication configuration
  publish:
    key: "publishSecretKey"  # Publishing authentication key

  # Subscriber authentication configuration
  subscribe:
    key: "subscribeSecretKey"  # Subscription authentication key
```

## Usage Examples

### Built-in Authentication Configuration
You can set authentication parameters separately in plugin configuration:

```yaml
rtmp:
  enableauth: true
  publish:
    key: "rtmpPublishKey"  # RTMP publishing authentication key
  subscribe:
    key: "rtmpSubscribeKey"  # RTMP subscription authentication key

hls:
  enableauth: true
  subscribe:
    key: "hlsSubscribeKey"  # HLS subscription authentication key
```

### Custom Authentication Implementation
Through the plugin mechanism, you can implement custom authentication logic:

```go
func MyAuthPublisher(pub *Publisher) *util.Promise {
    // Custom publisher authentication logic
    promise := util.NewPromise()
    // Check authentication information
    if checkAuth(pub.Args) {
        promise.Resolve(nil)
    } else {
        promise.Reject(errors.New("authentication failed"))
    }
    return promise
}

func MyAuthSubscriber(sub *Subscriber) *util.Promise {
    // Custom subscriber authentication logic
    promise := util.NewPromise()
    // Check authentication information
    if checkAuth(sub.Args) {
        promise.Resolve(nil)
    } else {
        promise.Reject(errors.New("authentication failed"))
    }
    return promise
}

// Provide authentication callbacks when registering plugin
InstallPlugin[MyPlugin](
    AuthPublisher(MyAuthPublisher),
    AuthSubscriber(MyAuthSubscriber),
)
```

### Publishing or Subscribing to Streams with Built-in Authentication
To publish or subscribe to streams using built-in authentication, you need to add the following parameters to the request:

- `key`: Configured key name
- `secret`: MD5 signature generated based on stream path and expiration time
- `expire`: Hexadecimal representation of expiration time

Example:
```
rtmp://example.com/live/stream1?key=publishKey&secret=md5sum&expire=hex_time
```

You can obtain the secret through the following APIs:
```
GET /api/secret/publish/stream1?expire=hex_time
GET /api/secret/subscribe/stream1?expire=hex_time
```

Authentication process:
1. Client generates expiration time in hexadecimal format (Unix timestamp)
2. Calculate MD5(key + stream path + expiration time) to get secret
3. Include key, secret, and expire parameters in request URL
4. Server verifies if secret is correct and expiration time is valid

## Important Notes
1. Safely store keys
2. Set reasonable Token validity period
3. Regularly update keys
4. Monitor access logs
5. Handle abnormal access promptly

## Common Issues
1. Authentication Failure
   - Check if secret is calculated correctly
   - Check if expiration time is valid
   - Verify if configured keys match
2. Token Leakage
   - Update keys immediately
   - Set shorter expiration times
   - Strengthen security measures
3. Performance Issues
   - Optimize authentication logic
   - Use caching mechanism
   - Monitor response time 