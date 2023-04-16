# Quick Start

Depending on your usage scenario and personal preferences, you can choose to compile and start the project by yourself when using Monibuca.

## Installation
- The official provides pre-compiled binary executable files (i.e. green software) for various platforms, so no other software needs to be installed to run it.
- If you need to compile and start the project by yourself, you need to install go1.19 or higher.

:::tip Configure the Go environment
- Go can be downloaded from https://golang.google.cn/dl
- In China, execute `go env -w GOPROXY=https://goproxy.cn` to download the third-party libraries that are blocked.
:::

The official provides download links for the latest version:
- [Linux](https://download.m7s.live/bin/m7s_linux_amd64.tar.gz)
- [Linux-arm64](https://download.m7s.live/bin/m7s_linux_arm64.tar.gz)
- [Mac](https://download.m7s.live/bin/m7s_darwin_amd64.tar.gz)
- [Mac-arm64](https://download.m7s.live/bin/m7s_darwin_arm64.tar.gz)
- [Windows](https://download.m7s.live/bin/m7s_windows_amd64.tar.gz)

## Run

### Running Executable Files Directly

- Linux, for example, if downloaded to /opt/m7s_linux_x86, then `cd /opt` and run `./m7s_linux_x86`
- Mac is similar to Linux. Note that executable permissions of the files may need to be modified. You can also double-click to run them.
- Windows, simply double-click m7s_windows_x86.exe to start.

:::tip Running Multiple Instances
Since the instance listens on the http port, to run multiple instances, a different http port needs to be specified for each instance at startup. Therefore, the configuration file needs to be specified at startup, for example, `./m7s_linux_x86 -c config.yaml`.
:::

### Compile the Starting Project by Yourself
1. `git clone https://github.com/langhuihui/monibuca`
2. `cd monibuca`
3. `go run main.go`

### Create a Starting Project by Yourself

You can watch the video tutorial:
- [Start m7s V4 from scratch](https://www.bilibili.com/video/BV1iq4y147N4/)
- [m7s v4 Video Tutorial - Plugin Introduction](https://www.bilibili.com/video/BV1sP4y1g7BF/)

## Usage
m7s has enabled all plugins by default, so it has started listening on ports of all protocols such as rtmp, rtsp, and gb28181, and streams can be pushed to m7s directly.

### Push Stream

- Use OBS to push to `rtmp://localhost/live/test`.
- Use ffmpeg, `ffmpeg -i [video source] -c:v h264 -c:a aac -f flv rtmp://localhost/live/test`
- Use ffmpeg, `ffmpeg -i [video source] -c:v h264 -c:a aac -f rtsp rtsp://localhost/live/test`
- Use the webrtc test page to push streams, access `http://localhost:8080/webrtc/test/publish`
- Configure the camera's SIP server address to the local machine and specify port 5060 to send the device streams to m7s.

### Play

> For details on play, please refer to [Play](/guide/qa/play.html)

- You can preview all streams (multiple protocol preview pages) by visiting `http://localhost:8080/preview/`.
- ffplay can play rtmp streams, `ffplay rtmp://localhost/live/test`
- ffplay can play rtsp streams, `ffplay rtsp://localhost/live/test`
- ffplay can play hls streams, `ffplay http://localhost:8080/hls/live/test.m3u8`