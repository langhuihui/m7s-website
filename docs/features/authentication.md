# 鉴权
鉴权是 Monibuca 的一个重要功能，用于控制视频流的访问权限。

## 功能特点
- 支持多种鉴权方式
- 支持自定义鉴权和内置鉴权
- 区分发布者鉴权和订阅者鉴权

## 鉴权分类

### 按实现方式分类
1. **内置鉴权** - 使用 Monibuca 内置的基于密钥和过期时间的 Token 验证
2. **自定义鉴权** - 通过实现 `OnAuthPub` 和 `OnAuthSub` 回调函数自定义鉴权逻辑

### 按应用对象分类
1. **发布者鉴权** - 控制谁可以向系统发布视频流
2. **订阅者鉴权** - 控制谁可以从系统订阅视频流

## 配置说明
在 Monibuca 的配置文件中，可以通过以下方式配置鉴权相关参数：

```yaml
global:
  enableauth: true
  # 发布者鉴权配置
  publish:
    key: "publishSecretKey"  # 发布鉴权密钥

  # 订阅者鉴权配置
  subscribe:
    key: "subscribeSecretKey"  # 订阅鉴权密钥
```

## 使用示例

### 内置鉴权配置
在插件配置中可以单独设置鉴权参数：

```yaml
rtmp:
  enableauth: true
  publish:
    key: "rtmpPublishKey"  # RTMP发布鉴权密钥
  subscribe:
    key: "rtmpSubscribeKey"  # RTMP订阅鉴权密钥

hls:
  enableauth: true
  subscribe:
    key: "hlsSubscribeKey"  # HLS订阅鉴权密钥
```

### 自定义鉴权实现
通过插件机制，您可以实现自定义的鉴权逻辑：

```go
func MyAuthPublisher(pub *Publisher) *util.Promise {
    // 自定义发布者鉴权逻辑
    promise := util.NewPromise()
    // 检查认证信息
    if checkAuth(pub.Args) {
        promise.Resolve(nil)
    } else {
        promise.Reject(errors.New("authentication failed"))
    }
    return promise
}

func MyAuthSubscriber(sub *Subscriber) *util.Promise {
    // 自定义订阅者鉴权逻辑
    promise := util.NewPromise()
    // 检查认证信息
    if checkAuth(sub.Args) {
        promise.Resolve(nil)
    } else {
        promise.Reject(errors.New("authentication failed"))
    }
    return promise
}

// 注册插件时提供鉴权回调
InstallPlugin[MyPlugin](
    AuthPublisher(MyAuthPublisher),
    AuthSubscriber(MyAuthSubscriber),
)
```

### 使用内置鉴权发布或订阅流
要使用内置鉴权发布或订阅流，需要在请求中添加以下参数：

- `key`: 配置的密钥名
- `secret`: 根据流路径和过期时间生成的 MD5 签名
- `expire`: 过期时间的十六进制表示

例如：
```
rtmp://example.com/live/stream1?key=publishKey&secret=md5sum&expire=hex_time
```

可以通过以下API获取secret：
```
GET /api/secret/publish/stream1?expire=hex_time
GET /api/secret/subscribe/stream1?expire=hex_time
```

认证过程：
1. 客户端生成十六进制格式的过期时间（Unix时间戳）
2. 计算 MD5(密钥 + 流路径 + 过期时间) 得到 secret
3. 在请求URL中带上 key、secret 和 expire 参数
4. 服务器验证 secret 是否正确，且过期时间是否有效

## 注意事项
1. 妥善保管密钥
2. 合理设置 Token 有效期
3. 定期更新密钥
4. 监控访问日志
5. 及时处理异常访问

## 常见问题
1. 鉴权失败
   - 检查 secret 是否正确计算
   - 检查过期时间是否有效
   - 确认配置的密钥是否匹配
2. Token 泄露
   - 立即更新密钥
   - 控制过期时间较短
   - 加强安全措施
3. 性能问题
   - 优化鉴权逻辑
   - 使用缓存机制
   - 监控响应时间