# 快速起步

根据你的使用场景和个人偏好，使用Monibuca时，你可以选择是否自己编译启动工程。

## 安装
- 官方提供已编译好的各个平台的二进制可执行文件（即绿色软件），所以无需安装任何其他软件即可运行。
- 如果需要自己编译启动工程，则需要安装go1.18以上版本。

:::tip 配置go环境
- go可以在https://golang.google.cn/dl 中下载到
- 国内需要执行go env -w GOPROXY=https://goproxy.cn 来下载到被屏蔽的第三方库
:::

官方提供了最新版本的下载链接：
- [Linux](https://m7s.live/bin/m7s_linux_amd64.tar.gz)
- [Linux-arm64](https://m7s.live/bin/m7s_linux_arm64.tar.gz)
- [Mac](https://m7s.live/bin/m7s_darwin_amd64.tar.gz)
- [Mac-arm64](https://m7s.live/bin/m7s_darwin_arm64.tar.gz)
- [Windows](https://m7s.live/bin/m7s_windows_amd64.zip)

## 运行

### 可执行文件直接运行

- Linux 例如下载到了/opt/m7s_linux_x86,则 `cd /opt` 然后 `./m7s_linux_x86`
- Mac 和Linux类似，需要注意的时候可能需要修改文件的可执行权限，也可以双击运行
- Windows，直接双击m7s_windows_x86.exe即可启动

:::tip 运行多实例
由于实例会监听http端口，所以如果需要运行多实例，就需要为每个实例指定不同的http端口，因此需要启动时指定配置文件，例如./m7s_linux_x86 -c config.yaml
:::

### 自行编译启动工程
1. `git clone https://github.com/langhuihui/monibuca`
2. `cd monibuca`
3. `go run main.go`

### 自行创建启动工程

可以观看视频教程：

- [从零启动 m7s V4](https://www.bilibili.com/video/BV1iq4y147N4/)

- [m7s v4 视频教程——插件引入](https://www.bilibili.com/video/BV1sP4y1g7BF/)

