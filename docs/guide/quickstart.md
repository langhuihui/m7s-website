# Monibuca 快速入门指南

本指南将帮助您开始使用 Monibuca v5，这是一个完全用 Go 语言开发的高性能流媒体服务器框架。

## 前提条件

- Go 1.23 或更高版本（[下载 Go](https://go.dev/dl/)）
- 对流媒体协议的基本了解

## 安装

### 方法 1: 运行预构建示例

开始使用 Monibuca 最简单的方法是使用默认示例配置：

```bash
git clone https://github.com/langhuihui/monibuca.git
# 或者使用 Gitee
git clone https://gitee.com/m7s/monibuca.git
cd monibuca/example/default
go run -tags sqlite main.go
```

这将使用默认配置和 SQLite 数据库支持启动 Monibuca。

### 方法 2: 在您自己的项目中包含 Monibuca

将 Monibuca 添加到您的 Go 项目中：

```bash
go get m7s.live/v5
```

创建一个简单的 `main.go` 文件：

```go
package main

import (
	"context"
	"flag"

	"m7s.live/v5"
	// 导入您需要的插件
	_ "m7s.live/v5/plugin/flv"
	_ "m7s.live/v5/plugin/rtmp"
	_ "m7s.live/v5/plugin/hls"
	// 根据需要添加更多插件
)

func main() {
	conf := flag.String("c", "config.yaml", "config file")
	flag.Parse()
	m7s.Run(context.Background(), *conf)
}
```

创建一个基本的 `config.yaml` 文件：

```yaml
global:
  loglevel: debug
```

然后运行您的应用程序：

```bash
go run -tags sqlite main.go
```

## Web 界面

Monibuca 带有内置的 Web 界面，用于管理和监控。要使用它：

1. 从发布版本下载最新的 `admin.zip` 或使用示例中包含的版本。
2. 将 `admin.zip` 文件（不要解压）放在与您的配置文件相同的目录中。
3. 在浏览器中访问 [http://localhost:8080](http://localhost:8080) 以访问界面。

## 基本用法

### 流发布

您可以使用各种协议向 Monibuca 发布流：

#### RTMP

使用 FFmpeg 或 OBS 发布 RTMP 流：

```bash
# 使用 FFmpeg
ffmpeg -re -i your_video.mp4 -c copy -f flv rtmp://localhost:1935/live/test

# 在 OBS 中，设置服务器为：rtmp://localhost:1935/live
# 流密钥设置为：test
```

#### RTSP

对于 RTSP 发布：

```bash
ffmpeg -re -i your_video.mp4 -c copy -f rtsp -rtsp_transport tcp rtsp://localhost:8554/live/test
```

### 流播放

您可以使用不同的协议播放流：

- **HLS**: [http://localhost:8080/hls/live/test.m3u8](http://localhost:8080/hls/live/test.m3u8)
- **LLHLS**: [http://localhost:8080/llhls/live/test/index.m3u8](http://localhost:8080/llhls/live/test/index.m3u8)
- **HTTP-FLV**: [http://localhost:8080/flv/live/test](http://localhost:8080/flv/live/test)
- **WebSocket-FLV**: [ws://localhost:8080/flv/live/test](ws://localhost:8080/flv/live/test)
- **MP4**: [http://localhost:8080/mp4/live/test.mp4](http://localhost:8080/mp4/live/test.mp4)
- **RTMP**: [rtmp://localhost/live/test](rtmp://localhost/live/test)
- **RTSP**: [rtsp://localhost/live/test](rtsp://localhost/live/test)
- **SRT**: [srt://localhost?streamid=subscribe:/live/test](srt://localhost?streamid=subscribe:/live/test)
- **WebRTC**: [webrtc://localhost:8080/webrtc/play/live/test](webrtc://localhost:8080/webrtc/play/live/test)  （需要 Jessibuca 播放器）

## 配置选项

Monibuca 可以通过 `config.yaml` 文件进行高度配置。以下是一些关键配置部分：

### 全局配置

```yaml
global:
  loglevel: debug  # debug, info, warn, error
  http:
    listenaddr: :8080
  admin:
    enablelogin: false  # 启用/禁用管理员登录
```

### 协议插件

每个协议插件都有自己的配置部分：

```yaml
rtmp:
  listenaddr: :1935

rtsp:
  listenaddr: :8554

flv:
  publish:
    delayclosetimeout: 3s

hls:
  fragmentduration: 5s
  segmentduration: 10s
```

### 流拉取

您可以配置 Monibuca 自动从其他源拉取流：

```yaml
rtmp:
  pull:
    live/remote_stream: rtmp://example.com/live/source_stream

rtsp:
  pull:
    live/camera_feed: rtsp://admin:password@192.168.1.100:554/stream
```

### 流录制

配置录制设置：

```yaml
mp4:
  onpub:
    record:
      ^live/.+:
        fragment: 1m
        filepath: record/$0
```

## 运行多个实例

您可以在同一台机器上运行多个 Monibuca 实例：

```go
package main

import (
	"context"
	"flag"
	"m7s.live/v5"
	// 导入您的插件
)

func main() {
	ctx := context.Background()
	conf1 := flag.String("c1", "", "config1 file")
	conf2 := flag.String("c2", "", "config2 file")
	flag.Parse()
	go m7s.Run(ctx, *conf2)  // 在 goroutine 中运行第二个实例
	m7s.Run(ctx, *conf1)     // 运行主实例
}
```

## 构建标签

您可以使用以下构建标签自定义 Monibuca 构建：

| 构建标签 | 描述 |
|-----------|-------------|
| sqlite | 启用 SQLite 数据库支持 |
| mysql | 启用 MySQL 数据库支持 |
| postgres | 启用 PostgreSQL 数据库支持 |
| duckdb | 启用 DuckDB 数据库支持 |
| disable_rm | 禁用内存池 |
| fasthttp | 启用 fasthttp 代替标准库 |
使用示例：

```bash
go run -tags "sqlite mysql" main.go
```

## 使用 Docker

您可以使用 Docker 运行 Monibuca：

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 langhuihui/monibuca:v5
```

如果你需要修改配置文件，需要挂载配置文件目录到容器中：

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 \
-v /etc/monibuca:/etc/monibuca langhuihui/monibuca:v5
```
你将会看到这个目录中有一个 config.yaml 文件，你可以修改这个文件，然后重启容器。


### 通过传入参数指定其他配置文件

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 langhuihui/monibuca:v5 -c /your/config.yaml
```