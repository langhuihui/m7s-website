# HLS 支持

本文档概述了 Monibuca 中的 HTTP Live Streaming (HLS) 协议支持。HLS 是由 Apple 开发的自适应流媒体协议，它通过将媒体流分解为一系列基于 HTTP 的小文件段（.ts 文件）和一个索引文件（.m3u8）来工作，客户端使用这些文件来访问媒体内容。

## 概述

Monibuca 中的 HLS 实现提供以下功能：

* 通过 HTTP 端点提供 HLS 流
* 将内部流转换为 HLS 格式
* 将流录制为 HLS 片段
* 从外部源拉取 HLS 流
* 支持直播流和视频点播（VOD）播放

## 架构

HLS 功能作为 Monibuca 架构中的一个插件实现。

<SVG src="hls_architecture"/>

## 插件注册和初始化

HLS 插件通过 `InstallPlugin` 函数注册到 Monibuca 核心系统：

<SVG src="hls_initialization"/>

`OnInit` 中的初始化过程配置了用于访问 HLS 流的 HTTP 和 HTTPS 端点。它构建的 URL 格式为 `http://{hostName}/hls/{streamPath}.m3u8` 或 `https://{hostName}/hls/{streamPath}.m3u8`。

## HLS HTTP 处理器

该插件注册了用于提供 HLS 内容的 HTTP 处理器：

<SVG src="hls_handlers"/>

处理请求时：

1. 对于 `.m3u8` 请求：
   - 直播流：从内存生成播放列表
   - VOD：从文件系统读取播放列表
   
2. 对于 `.ts` 片段请求：
   - 直播流：从内存缓存提供服务
   - VOD：从文件系统读取

3. 对于 VOD 请求：
   - 同时检查内存和文件系统
   - 支持范围请求以实现跳转

## 流转换为 HLS

`HLSWriter` 组件将内部 Monibuca 流转换为 HLS 格式：
<SVG src="hls_transformation"/>
关键方面：

* 可配置的片段持续时间（`Fragment`）和播放列表窗口大小（`Window`）
* 在达到持续时间阈值时，在 IDR 帧上创建新片段
* 在内存中维护片段的滚动窗口
* 为客户端生成和更新 m3u8 播放列表

## HLS 录制

`Recorder` 组件实现 HLS 录制功能：
<SVG src="hls_recroding"/>
录制器：

* 在磁盘上而不是内存中创建 TS 文件
* 使用流元数据更新数据库记录
* 在 IDR 帧上达到片段持续时间阈值时创建新文件
* 支持各种录制模式，包括基于事件的录制

## HLS 拉流

`Puller` 组件支持从外部源拉取 HLS 流：
<SVG src="hls_pulling"/>
拉流器支持三种中继模式：

1. **中继模式**：简单地提供原始 HLS 片段和播放列表
2. **重封装模式**：将 HLS 流转换为 Monibuca 的内部格式
3. **混合模式**：同时中继和重封装流

## 内存管理

HLS 依赖于两个关键的内存数据结构：

| 数据结构    | 类型     | 用途                                           |
| ----------- | -------- | ---------------------------------------------- |
| MemoryM3u8  | sync.Map | 按流路径存储 m3u8 播放列表内容                 |
| MemoryTs    | sync.Map | 按片段文件路径存储 TS 片段数据                 |

这些结构使 HLS 内容能够高效传递，无需重复访问文件系统。系统根据配置的窗口大小自动清理旧片段，以防止内存泄漏。

## HLS 播放列表生成

`Playlist` 结构处理标准兼容的 m3u8 播放列表的创建：

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:123
#EXT-X-TARGETDURATION:5
#EXTINF:4.500,
stream/segment_123.ts
#EXTINF:5.000,
stream/segment_124.ts
#EXTINF:4.800,
stream/segment_125.ts
```

关键组件包括：

* 带有版本和目标持续时间的播放列表头部
* 用于客户端同步的媒体序列号
* 带有片段持续时间和文件路径的 EXTINF 条目
* VOD 内容的可选 EXT-X-ENDLIST 标签

## MPEG-TS 片段生成

系统通过以下方式生成兼容的 MPEG-TS 片段：

1. 写入 PAT（节目关联表）和 PMT（节目映射表）数据包
2. 将音频帧（ADTS）和视频帧（AnnexB）转换为 PES 数据包
3. 将 PES 数据包分段为标准 188 字节的 TS 数据包
4. 处理适当的时间戳管理和连续性计数器

对于录制，此过程写入文件（`TsInFile`），而对于直播流，它将片段存储在内存中（`TsInMemory`）。

## VOD 支持

HLS 插件通过以下方式提供 VOD（视频点播）功能：

1. 数据库集成以跟踪录制的 HLS 片段
2. 专用的 `/vod/{streamPath...}` 端点
3. 支持时间范围查询以检索录制内容的特定部分
4. 为 VOD 播放生成带有 `EXT-X-ENDLIST` 标签的播放列表

这允许客户端使用标准 HLS 播放器访问先前录制的内容。

## 与 Monibuca 核心的集成

HLS 插件通过多个接口与 Monibuca 核心集成：

| 接口         | 实现       | 用途                                   |
| ------------ | ---------- | -------------------------------------- |
| ITransformer | HLSWriter  | 将内部流转换为 HLS 格式                |
| IRecorder    | Recorder   | 将流录制为 HLS 片段                    |
| IPuller      | Puller     | 从外部源拉取 HLS 流                    |

这些接口使插件系统能够作为更大的 Monibuca 生态系统的一部分正确管理 HLS 功能。

## 结论

Monibuca 中的 HLS 插件提供了 HTTP Live Streaming 协议的全面实现，支持直播流和 VOD 功能。通过高效的内存管理和与 Monibuca 核心架构的正确集成，它为各种用例提供了高性能的 HLS 传输。
