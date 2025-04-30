# What is Monibuca

Monibuca (abbreviated as m7s) is an open-source streaming media server development framework built entirely in Go language. It features high scalability and easy deployment, designed specifically for building high-performance, low-latency streaming media applications, while also providing developer-friendly secondary development interfaces that make it easy to quickly customize your own streaming media solutions.

## Core Features of Monibuca

Monibuca has the following core features that make it a powerful tool in the streaming media service domain:

### Outstanding Performance

- **High-Performance Architecture** - Employs lock-free design, partial manual memory management, and multi-core computing technologies to achieve extremely high processing efficiency
- **Low-Latency Transmission** - Zero-wait forwarding mechanism ensures sub-second end-to-end latency, suitable for real-time interactive scenarios
- **Efficient Resource Utilization** - Optimized memory and CPU usage supporting high concurrent loads

### Flexible Extension

- **Plugin Architecture** - Core functionality implemented through plugins, loaded as needed, with unlimited extension capabilities
- **Customization Ability** - Supports development of custom plugins to meet specific business requirements
- **Multi-Protocol Support** - Built-in support for mainstream streaming media protocols including RTMP, RTSP, HTTP-FLV, WS-FLV, HLS, WebRTC, GB28181, ONVIF, SRT, and more

### Rich Functionality

- **Media Processing** - Supports screenshots, transcoding, SEI data processing
- **Clustering Capability** - Built-in cascading and room management functions, supports distributed deployment
- **Preview Features** - Supports video preview, split-screen preview, custom split-screen
- **Security Guarantees** - Provides encrypted transmission and stream authentication capabilities
- **Recording and Playback** - Supports MP4, HLS, FLV format recording, with speed adjustment, fast-forward dragging, pause, and other interactive capabilities
- **Dynamic Time-Shift** - Dynamic cache design, supports live broadcast time-shift viewing
- **Remote Calling** - Supports gRPC interfaces, facilitating cross-language integration
- **Stream Aliasing** - Supports dynamic setting of stream aliases, flexible management of multiple streams, implementing director functionality
- **AI Integration** - Integrates inference engines, supports ONNX models, with customizable pre-processing, post-processing, and frame drawing

### Developer-Friendly

- **Debugging Support** - Built-in debugging plugins, supporting real-time performance monitoring and analysis
- **Monitoring System** - Supports Prometheus monitoring, providing comprehensive performance metrics
- **Log Management** - Log rotation, automatic cleanup, custom extension
- **WebHook** - Supports subscribing to stream lifecycle events, enabling business system linkage
- **Complete Examples** - Rich example code helping quick onboarding

## Monibuca Architecture Design

Monibuca adopts a modular, plugin-based architectural design, mainly composed of the following core parts:

### Core Framework

- **Streaming Media Engine** - Core component processing audio and video data forwarding
- **Plugin System** - Provides complete plugin lifecycle management
- **Task System** - Manages asynchronous tasks, optimizing performance
- **Configuration Management** - Unified configuration loading and management mechanism
- **Logging System** - Customizable log recording and processing
- **API Services** - Provides HTTP and gRPC interfaces

### Core Forwarding Process

The core forwarding process of Monibuca mainly includes the following key links:

#### Publisher

The publisher is an object that writes audio and video data to the server's RingBuffer, responsible for:
- Writing data via WriteVideo and WriteAudio methods
- Creating Tracks, parsing data, generating ICodecCtx
- Supporting multiple data sources:
  - Accepting stream pushing (RTMP, RTSP, and other protocols)
  - Pulling streams from remote sources (RTMP, RTSP, HTTP-FLV, etc.)
  - Pulling streams from local recording files

#### Subscriber

The subscriber is an object that reads audio and video data from the RingBuffer, with main functions including:
- Subscribing to specific streams, reading data, and processing
- Supporting multiple data outputs:
  - Accepting stream pulling requests (RTMP, RTSP, HTTP-FLV, HLS, etc.)
  - Pushing streams to remote destinations
  - Writing to local files (recording function)

#### On-Demand Stream Pulling Mechanism

Monibuca supports intelligent on-demand stream pulling:
- Triggered by subscribers, automatically pulls streams when no publisher is present
- Configured through regular expressions to prevent duplicate stream pulling
- Supports advanced scenarios like cascading, on-demand recording and playback

### Plugin Lifecycle

Monibuca plugins have complete lifecycle management:

1. **Registration Phase** - Plugins register via the `InstallPlugin` function
2. **Initialization Phase** - Loading configuration, preparing resources
3. **Startup Phase** - Starting services, network listening
4. **Stopping Phase** - Stopping services, cleaning up resources
5. **Destruction Phase** - Completely releasing resources, preventing memory leaks

### Stream Processing Mechanism

Monibuca employs efficient stream processing mechanisms:

- **Publisher-Subscriber Pattern** - Supports one-to-many distribution
- **Forwarding Mechanism** - Efficient data forwarding, reducing intermediate steps
- **Alias Mechanism** - Flexibly maps different streams, supports dynamic switching
- **Authentication Mechanism** - Customizable stream publishing and subscription authentication

## Use Cases

Monibuca is suitable for multiple streaming media application scenarios:

### 1. Live Streaming Platforms

- **Functional Support**: Stream pushing, pulling, transcoding, recording, screenshots, delayed playback
- **Feature Advantages**: High concurrency, low latency, multi-protocol support
- **Usage Examples**: Video live streaming platforms, game streaming, event broadcasting

### 2. Video Conferencing

- **Functional Support**: WebRTC, multi-party calling, recording and playback
- **Feature Advantages**: End-to-end low latency, high-quality transmission, secure encryption
- **Usage Examples**: Remote meetings, online training, remote collaboration

### 3. Security Surveillance

- **Functional Support**: GB28181, ONVIF, NVR integration, cloud storage, intelligent analysis
- **Feature Advantages**: 24/7 stable operation, multi-device access, dynamic expansion
- **Usage Examples**: Safe city projects, smart campuses, surveillance centers

### 4. Online Education

- **Functional Support**: Course live streaming, recording and playback, interactive features
- **Feature Advantages**: Stable and reliable, low-latency interaction, recorded viewing
- **Usage Examples**: Online classrooms, remote education, training systems

### 5. AI Visual Analysis

- **Functional Support**: Video stream AI analysis, ONNX model integration, real-time processing
- **Feature Advantages**: Stream processing + AI integration, low-latency analysis, parallel multi-stream
- **Usage Examples**: Intelligent transportation, behavior recognition, industrial quality inspection

## Community Support

- **WeChat Official Account**: Buka Technology
- **QQ Group**: 751639168
- **QQ Channel**: p0qq0crz08
- **Official Website**: [https://monibuca.com](https://monibuca.com)

## License

Monibuca uses the AGPL license. For commercial use, please contact the development team to obtain a commercial license. 