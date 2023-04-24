# 鉴权

## 内置鉴权机制

在publish 和 subscribe 中配置 key 引擎会自动进行鉴权,
推流或者拉流时需要在url中添加参数 secret=xxx&expire=xxx。

- secret为鉴权前面，MD5(key+StreamPath+expire)
- expire为鉴权失效时间，格式是十六进制 UNIX 时间戳

### 时间戳计算
```
设置时间：2018.12.01 08:30:00
十进制 UNIX 时间戳：1543624200
十六进制 UNIX 时间戳：5C01D608（云直播鉴权配置使用十六进制 UNIX 时间戳，十六进制不区分字母大小写）
```
### 鉴权签名计算
```
secret = MD5(key+StreamPath+expire) 
secret = MD5(ngoeiq03+test/01+5C01D608)
secret = MD5(ngoeiq03test/015C01D608)
secret = ce797dc6238156d548ef945e6ad1ea20
```
## 针对单协议自定义鉴权

引擎中定义如下两个接口，插件中的发布者或者订阅者可以实现这两个接口，引擎会在发布或者订阅时调用这两个接口进行鉴权
```go
type AuthSub interface {
	OnAuth(*util.Promise[ISubscriber]) error
}

type AuthPub interface {
	OnAuth(*util.Promise[IPublisher]) error
}
```
- OnAuth返回错误即鉴权失败
- Promise方便异步鉴权，可以后续调用其Resolve或Reject方法进行鉴权结果的返回

例如：
### 同步鉴权
```go
import . "m7s.live/engine/v4"
type MyAuthPublisher struct {
  Publisher
}

func (p *MyAuthPublisher) AuthPub(promise *util.Promise[IPublisher]) error {
  var auth bool
  var puber = promise.Value
  // do auth
  if !auth {
    return errors.New("auth failed")
  }
  return nil
}

```
### 异步鉴权
如果鉴权发生在其他协程中，为了方便返回结果可以利用promise传递信息。
```go
import . "m7s.live/engine/v4"
type MyAuthPublisher struct {
  Publisher
}

func (p *MyAuthPublisher) AuthPub(promise *util.Promise[IPublisher]) error {
  go func(){
    var auth bool
    var puber = promise.Value
    // do auth
    if !auth {
      promise.Reject(errors.New("auth failed"))
    } else {
      promise.Resolve()
    }
  }()
  return nil
}

```

## 自定义全局鉴权
引擎中定义如下两个全局函数的变量，插件中可以对这两个变量进行赋值，引擎会在发布或者订阅时调用这两个接口进行鉴权
```go
var OnAuthSub func(p *util.Promise[ISubscriber]) error
var OnAuthPub func(p *util.Promise[IPublisher]) error
```
** 注意：如果单独鉴权和全局鉴权同时存在，优先使用单独鉴权 **
** 全局鉴权函数可以被多次覆盖，所以需要自己实现鉴权逻辑的合并 **

例如：
```go
import . "m7s.live/engine/v4"

func init() {
  OnAuthSub = func(p *util.Promise[ISubscriber]) error {
    var auth bool
    var suber = p.Value
    switch suber.(type) {
      case *MyAuthSubscriber:
        // do auth
        if !auth {
          return errors.New("auth failed")
        }
        return nil
    }
    return nil
  }
}

```
同步和异步的区别看单协议鉴权
