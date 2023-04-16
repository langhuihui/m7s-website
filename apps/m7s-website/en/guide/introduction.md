---
footer: false
---

# Introduction

:::tip You are reading the documentation for Monibuca (m7s) v4.
- For m7s v3 documentation, please visit https://docs.m7s.live
- Learn about [v4 upgraded features](/guide/v4).
:::

## What is Monibuca (m7s)?

Monibuca (pronounced as "mo-ni-bu-ca", abbreviated as "m7s", similar to "k8s") is an open-source Go language-based streaming server development framework. Built on go1.19+, it has no other dependencies and provides a plug-in-based secondary development model that helps you develop streaming media servers efficiently. You can use official plugins or develop your own plugins to extend any functionality. Therefore, Monibuca is a framework that supports **any** streaming media protocol!

:::tip If you need secondary development
- Please visit the [Documentation](/devel/startup)
- It is recommended to familiarize yourself with the usage documentation before second development.
:::

> A streaming media server is software used to distribute streaming media and is used in scenarios that require real-time viewing of audio and video, such as live broadcasts, monitoring, and conferences. Streaming media servers differ from traditional web servers in that they have extremely high real-time performance requirements and require the use of various transmission protocols, while web servers are mainly based on the http/https protocol.

Monibuca consists of three parts: engine, plugin, and instance project.
- The engine provides a set of general streaming media data caching and forwarding mechanisms, and does not care about how the protocol is implemented
- The plugin provides all other functions and can be extended indefinitely
- The instance project is a project that introduces the engine and plugins and starts the engine, and can be fully self-written

## Plug-in-based framework

Monibuca is designed to build a universal streaming media development ecosystem, so it has considered the decoupling of business and stream forwarding since version v1, thus designing a plugin mechanism that can be extended arbitrarily according to your needs:
- Provide streaming media protocol packaging/unpacking, such as rtmp plugin and rtsp plugin
- Provide log persistence processing-logrotate plugin
- Provide recording function-record plugin
- Provide rich debugging functions-debug plugin
- Provide http callback capability-hook plugin

If you are an experienced developer, the best way is to perform secondary development based on existing plugins to provide reusable plugins to enrich the ecosystem for more people.
If you are a beginner in streaming media, the best way is to use existing plugins to patch together the functions you need, and seek help from experienced developers.

## Main Functions

### In terms of engine
- Provide plugin mechanism, unified management of plugin startup, configuration parsing, event dispatch, etc.
- Provide forwarding of H264, H265, AAC, G711 formats
- Provide reusable pre-packaging mechanisms such as AVCC format, RTP format, AnnexB format, ADTS format, etc.
- Provide multi-track mechanism, support for large and small streams, encrypted streams extension
- Provide DataTrack mechanism, which can be used to implement room text chat functions
- Provide timestamp synchronization mechanism, speed limiting mechanism
- Provide RTP packet disorder and sorting mechanism
- Provide subscriber chasing and skipping mechanism (first screen seconds opening)
- Provide basic architecture for publishing and subscribing to external pushes and pulls
- Provide underlying architecture support for authentication mechanism
- Provide memory reuse mechanism
- Provide publisher disconnection reconnection mechanism
- Provide on-demand streaming mechanism
- Provide HTTP service port sharing mechanism
- Provide automatic registration mechanism for HTTP API interface
- Provide middleware mechanism for HTTP interface
- Provide structured logging
- Provide streaming information statistics and output
- Provide event bus mechanism, which can broadcast events to all plugins
- Provide configuration hot update mechanism

### In terms of plugins

- Provide push and pull streams of RTMP protocol, and external push and pull streams (support RTMPS)
- Provide push and pull streams of RTSP protocol, and external push and pull streams
- Provide pull streams of HTTP-FLV protocol, external pull streams, and read local FLV files
- Provide pull streams of WebSocket protocol
- Provide pull streams of HLS protocol, external pull streams
- Provide push and pull streams of WebRTC protocol
- Provide push stream of GB28181 protocol, and provide dump replay analysis capabilities
- Support for Onif protocol
- Provide streaming media transfer with WebTransport protocol
- Provide pull streams of fmp4 protocol
- Provide edge server function to implement cascading streaming
- Provide recording function, support flv, mp4, hls, raw formats
- Provide logging persistence function, support multiple methods such as daily, hourly, minute, second, size, and file number
- Provide screenshot function
- Provide HTTP callback function
- Provide preview function (integrated with Jessibuca Pro)
- Provide room function (can implement video conference)
- Provide integration with Prometheus function

Third-party plugins and paid plugins provide additional functionality, which is not listed here.
### Remote Console
- Provides multi-instance management function
- Provides stream details display
- Provide visual editing of configurations
- Provide visual display of logs
- Provide visual management of plugins
- Provide GB device management
- Provide dynamically added remote push-pull interface
- Provide WebRTC background wall function
- Provide multi-person video demonstration

## The Story of the Name `Monibuca`

The name Monibuca is derived from "Monica" and was created to solve naming difficulties. Three names, Monica, Jessica, and Rebecca, were used to represent the server, player, and streaming respectively. As Monica, Jessica, and Rebecca all contain the character "ka," which is not suitable for live streaming, they were changed to Monibuca, Jessibuca, and Rebebuca.