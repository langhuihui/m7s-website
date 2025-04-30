# 核心转发流程

## 发布者

发布者（Publisher） 是用来在服务器上向 RingBuffer 中写入音视频数据的对象。对外暴露 WriteVideo 和 WriteAudio 方法。
在写入 WriteVideo 和 WriteAudio 时会创建 Track，解析数据，生成 ICodecCtx。启动发布只需要调用 Plugin 的 Publish 方法即可。

### 接受推流

rtmp、rtsp 等插件会监听一个端口用来接受推流。

### 从远端拉流

- 实现了 OnPullProxyAdd 方法的插件，可以从远端拉流。
- 继承自 HTTPFilePuller 的插件，可以从 http 或文件中拉流。

### 从本地录像文件中拉流

继承自 RecordFilePuller 的插件，可以从本地录像文件中拉流。


## 订阅者

订阅者（Subscriber） 是用来从 RingBuffer 中读取音视频数据的对象。订阅流分两个步骤：

1. 调用 Plugin 的 Subscribe 方法，传入 StreamPath 和 Subscribe 配置。
2. 调用 PlayBlock 方法，开始读取数据，这个方法会阻塞直到订阅结束。

之所以分两个步骤的原因是，第一步可能会失败（超时等），也可能需要等待第一步成功后进行一些交互工作。
第一步会有一定时间的阻塞，会等待发布者（如果开始没有发布者）、会等待发布者的轨道创建完成。

### 接受拉流

例如 rtmp、rtsp 插件，会监听一个端口，来接受播放的请求。

### 向远端推流

- 实现了 OnPushProxyAdd 方法的插件，可以向远端推流。

### 写入本地文件

包含录像功能的插件，需要先订阅流，才能写入本地文件。

## 按需拉流（发布）

由订阅者触发，当调用 plugin 的 OnSubscribe 时，会通知所有插件，有订阅的需求，此时插件可以响应这个需求，发布一个流。例如拉取录像流，就是这一类。此时必须要注意的是需要通过正则表达式配置，防止同时发布。

