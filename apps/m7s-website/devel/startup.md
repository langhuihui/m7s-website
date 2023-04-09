# 开发准备

## 操作系统

不限

## 安装go环境

- 需要安装go1.18以上版本
- go可以在https://golang.google.cn/dl 中下载到
- 国内需要执行go env -w GOPROXY=https://goproxy.cn 来下载到被屏蔽的第三方库

## IDE

- 推荐vscode
- goland也可以，目前对泛型的支持不是特别完美

## 一键搭建开发项目目录

为了方便快速二次开发，目前提供一个包含git子模块的项目可供一次性拉取所有官方插件和engine方便快速开发。
`git clone --recurse-submodules git@github.com:Monibuca/workspace`

注意：为了方便在github上顺利下载项目故需要采取ssh的方式，需要在你的github上配置一下ssh key。

下载成功后，即可进入monibuca目录下运行go run main.go启动项目。
