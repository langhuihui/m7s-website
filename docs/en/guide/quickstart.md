# Monibuca Quick Start Guide

This guide will help you get started with Monibuca v5, a high-performance streaming server framework developed purely in Go.

## Prerequisites

- Go 1.23 or higher ([Download Go](https://go.dev/dl/))
- Basic understanding of streaming protocols

## Installation

### Method 1: Run Pre-built Example

The easiest way to start with Monibuca is to use the default example configuration:

```bash
git clone https://github.com/langhuihui/monibuca.git
# Or use Gitee
git clone https://gitee.com/m7s/monibuca.git
cd monibuca/example/default
go run -tags sqlite main.go
```

This will start Monibuca with the default configuration and SQLite database support.

### Method 2: Include Monibuca in Your Own Project

Add Monibuca to your Go project:

```bash
go get m7s.live/v5
```

Create a simple `main.go` file:

```go
package main

import (
	"context"
	"flag"

	"m7s.live/v5"
	// Import the plugins you need
	_ "m7s.live/v5/plugin/flv"
	_ "m7s.live/v5/plugin/rtmp"
	_ "m7s.live/v5/plugin/hls"
	// Add more plugins as needed
)

func main() {
	conf := flag.String("c", "config.yaml", "config file")
	flag.Parse()
	m7s.Run(context.Background(), *conf)
}
```

Create a basic `config.yaml` file:

```yaml
global:
  loglevel: debug
```

Then run your application:

```bash
go run -tags sqlite main.go
```

## Web UI

Monibuca comes with a built-in web UI for management and monitoring. To use it:

1. Download the latest `admin.zip` from the releases or use the one included in the example.
2. Place the `admin.zip` file (do not unzip) in the same directory as your configuration file.
3. Visit `http://localhost:8080` in your browser to access the UI.

## Basic Usage

### Stream Publishing

You can publish streams to Monibuca using various protocols:

#### RTMP

Use FFmpeg or OBS to publish an RTMP stream:

```bash
# Using FFmpeg
ffmpeg -re -i your_video.mp4 -c copy -f flv rtmp://localhost:1935/live/test

# In OBS, set the server to: rtmp://localhost:1935/live
# And the stream key to: test
```

#### RTSP

For RTSP publishing:

```bash
ffmpeg -re -i your_video.mp4 -c copy -f rtsp -rtsp_transport tcp rtsp://localhost:8554/live/test
```

### Stream Playback

You can play streams using different protocols:

- **HLS**: [http://localhost:8080/hls/live/test.m3u8](http://localhost:8080/hls/live/test.m3u8)
- **LLHLS**: [http://localhost:8080/llhls/live/test/index.m3u8](http://localhost:8080/llhls/live/test/index.m3u8)
- **HTTP-FLV**: [http://localhost:8080/flv/live/test](http://localhost:8080/flv/live/test)
- **WebSocket-FLV**: [ws://localhost:8080/flv/live/test](ws://localhost:8080/flv/live/test)
- **MP4**: [http://localhost:8080/mp4/live/test.mp4](http://localhost:8080/mp4/live/test.mp4)
- **RTMP**: [rtmp://localhost/live/test](rtmp://localhost/live/test)
- **RTSP**: [rtsp://localhost/live/test](rtsp://localhost/live/test)
- **SRT**: [srt://localhost?streamid=subscribe:/live/test](srt://localhost?streamid=subscribe:/live/test)
- **WebRTC**: [webrtc://localhost:8080/webrtc/play/live/test](webrtc://localhost:8080/webrtc/play/live/test) (requires Jessibuca player)

## Configuration Options

Monibuca is highly configurable through the `config.yaml` file. Here are some key configuration sections:

### Global Configuration

```yaml
global:
  loglevel: debug  # debug, info, warn, error
  http:
    listenaddr: :8080
  admin:
    enablelogin: false  # Enable/disable admin login
```

### Protocol Plugins

Each protocol plugin has its own configuration section:

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

### Stream Pulling

You can configure Monibuca to automatically pull streams from other sources:

```yaml
rtmp:
  pull:
    live/remote_stream: rtmp://example.com/live/source_stream

rtsp:
  pull:
    live/camera_feed: rtsp://admin:password@192.168.1.100:554/stream
```

### Stream Recording

Configure recording settings:

```yaml
mp4:
  onpub:
    record:
      ^live/.+:
        fragment: 1m
        filepath: record/$0
```

## Running Multiple Instances

You can run multiple Monibuca instances on the same machine:

```go
package main

import (
	"context"
	"flag"
	"m7s.live/v5"
	// Import your plugins
)

func main() {
	ctx := context.Background()
	conf1 := flag.String("c1", "", "config1 file")
	conf2 := flag.String("c2", "", "config2 file")
	flag.Parse()
	go m7s.Run(ctx, *conf2)  // Run second instance in a goroutine
	m7s.Run(ctx, *conf1)     // Run main instance
}
```

## Build Tags

You can customize your Monibuca build using the following build tags:

| Build Tag | Description |
|-----------|-------------|
| sqlite | Enables SQLite database support |
| sqliteCGO | Enables SQLite CGO database support |
| mysql | Enables MySQL database support |
| postgres | Enables PostgreSQL database support |
| duckdb | Enables DuckDB database support |
| disable_rm | Disables the memory pool |
| enable_buddy | Enables buddy memory pre-allocation |
| fasthttp | Enables fasthttp instead of the standard library |
| taskpanic | Enables panics for testing |

Example usage:

```bash
go run -tags "sqlite mysql" main.go
```

## Use Docker

You can run Monibuca using Docker:

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 langhuihui/monibuca:v5
```
This command will start a Monibuca container with the default configuration.

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 \
-v /etc/monibuca:/etc/monibuca langhuihui/monibuca:v5
```
You will see a config.yaml file in this directory, which you can modify and then restart the container.


### Specify Other Configuration Files by Passing Parameters

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 langhuihui/monibuca:v5 -c /your/config.yaml
```

### Use Lightweight Image

The default image includes ffmpeg, so it is large. If you do not need to use ffmpeg, you can use the lightweight image:

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 monibuca/v5:latest
```

### Notes

Since docker and the host have a network isolation, protocols like WebRTC, GB28181 need to add the host's IP address to the configuration file. Otherwise, the device will not be able to establish a connection and transmit streams. Therefore, during the early debugging process, you can enable the host mode of docker to allow docker to directly access the host's network card.

```bash
docker run -id -p 1935:1935 -p 6000:6000 -p 8080:8080 -p 554:554 -p 50051:50051 -p 5060:5060/udp -p 9000:9000 --network host langhuihui/monibuca:v5
```