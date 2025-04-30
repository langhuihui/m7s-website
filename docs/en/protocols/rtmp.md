# RTMP Protocol

The Real-Time Messaging Protocol (RTMP) is a TCP-based protocol designed for streaming audio, video, and data between a server and client. This document describes the implementation of RTMP within the Monibuca (m7s) streaming server, focusing on the protocol's architecture, handshake process, messaging format, and media handling capabilities.

## Architecture Overview

The RTMP implementation in Monibuca is structured as a plugin that enables both publishing (pushing) and playing (pulling) of media streams over RTMP. The plugin automatically registers standard RTMP support on port 1935 and can also handle secure RTMPS connections.

### Core Components

The RTMP plugin is composed of the following primary components:

| Component     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| RTMPPlugin    | Main plugin structure with configuration and initialization logic |
| RTMPServer    | Server implementation that handles incoming connections           |
| RTMPClient    | Implementation of handling proactive requests to remote servers (pulling or pushing streams) |
| NetConnection | Manages RTMP connection state and message exchange                |
| NetStream     | Logical channel for media transmission                            |

The plugin is registered using Monibuca's plugin system and implements the necessary interfaces for pushing and pulling media streams.

## RTMP Protocol Flow

### Connection Establishment

When a client connects to the RTMP server, the following sequence occurs:

1. TCP connection is established
2. RTMP handshake is performed
3. Connect command is exchanged
4. Stream is created
5. Publish or play operation begins

<SVG src="rtmp_timeline"/>

### Handshake Process

The RTMP handshake is a three-way process that consists of the following steps:

1. **C0/S0**: Single byte version exchange (typically 0x03)
2. **C1/S1**: Exchange of 1536 bytes containing time, version, and random data
3. **C2/S2**: Exchange of another 1536 bytes, echoing the peer's timestamp

Monibuca supports both simple and complex (encrypted) handshakes:

```
C0: Version byte (0x03)
C1: Time (4 bytes) + Zero (4 bytes) + Random data (1528 bytes)
S0: Version byte (0x03)
S1: Time (4 bytes) + Zero (4 bytes) + Random data (1528 bytes)
C2/S2: Time (4 bytes) + Time2 (4 bytes) + Random data (1528 bytes)
```

For complex handshakes, the server calculates and verifies HMAC-SHA256 digests to authenticate the client.

## Message Format and Chunk Processing

### Chunk Format

RTMP transmits messages as chunks to enable multiplexing and bandwidth control. Each chunk has a header that varies in size depending on the type:

| Chunk Type    | Header Size | Contents                                                                         |
| ------------- | ----------- | -------------------------------------------------------------------------------- |
| Type 0 (Full) | 12 bytes    | Timestamp (3) + Message Length (3) + Message Type ID (1) + Message Stream ID (4) |
| Type 1        | 8 bytes     | Timestamp Delta (3) + Message Length (3) + Message Type ID (1)                   |
| Type 2        | 4 bytes     | Timestamp Delta (3)                                                              |
| Type 3        | 1 byte      | No additional header (continuation)                                              |

The chunk header begins with a basic header that includes the chunk stream ID and chunk type.

### Chunk Processing

The NetConnection class handles chunk processing with these primary functions:

1. **readChunk()**: Reads a chunk from the connection
2. **readChunkStreamID()**: Extracts the chunk stream ID from the header
3. **readChunkType()**: Processes the chunk type and assembles the message
4. **sendChunk()**: Splits a message into chunks for transmission

### Message Types

RTMP defines several message types, which are handled by the implementation:

| Message Type ID | Description                 |
| --------------- | --------------------------- |
| 1               | Set Chunk Size              |
| 2               | Abort Message               |
| 3               | Acknowledgement             |
| 4               | User Control Message        |
| 5               | Window Acknowledgement Size |
| 6               | Set Peer Bandwidth          |
| 8               | Audio Message               |
| 9               | Video Message               |
| 20              | AMF0 Command                |

The `RecvMessage()` function processes these messages and dispatches them to appropriate handlers based on type.

## Media Data Handling

### Video Processing

The RTMP implementation supports multiple video codecs including:

1. **H.264 (AVC)**: Standard video codec
2. **H.265 (HEVC)**: High-efficiency video codec
3. **AV1**: Next-generation video codec (experimental support)

Video data in RTMP is formatted with a header byte indicating frame type and codec ID, followed by composition time and actual encoded data.

The `RTMPVideo` structure implements the `IAVFrame` interface, providing methods to:

1. **Parse()**: Extract codec information from video frames
2. **Demux()**: Convert RTMP video format to raw NAL units
3. **Mux()**: Convert raw NAL units to RTMP video format
4. **ConvertCtx()**: Create codec context from sequence headers

For H.264/H.265, the implementation handles sequence headers (SPS/PPS/VPS) and can filter problematic NAL units.

### Audio Processing

The implementation supports multiple audio formats:

1. **AAC**: Advanced Audio Coding
2. **PCMA**: A-law PCM
3. **PCMU**: μ-law PCM

Audio data in RTMP includes a header byte that indicates codec type, sample rate, sample size, and channel count.

The `RTMPAudio` structure also implements the `IAVFrame` interface with similar methods as `RTMPVideo`.

## Stream Management

### Publishing and Playing

RTMP distinguishes between two primary operations:

1. **Publishing**: Sending media data to the server
2. **Playing**: Receiving media data from the server

The implementation handles these through command messages.

The implementation creates `NetStream` objects to manage individual streams and connects them to the Monibuca core's `Publisher` and `Subscriber` components.

## Configuration and Initialization

The RTMP plugin can be configured with these settings:

| Setting   | Default | Description                  |
| --------- | ------- | ---------------------------- |
| ChunkSize | 1024    | Size of RTMP chunks          |
| KeepAlive | false   | Enable connection keep-alive |
| C2        | false   | Verify C2 handshake packet   |

On initialization, the plugin registers its capabilities and address formats:

```
rtmp://{hostName}/{streamPath}       (Port 1935)
rtmp://{hostName}:{port}/{streamPath} (Custom port)
rtmps://{hostName}/{streamPath}      (Port 443)
rtmps://{hostName}:{port}/{streamPath} (Custom port)
```

## Integration with Monibuca Core

The RTMP plugin integrates with the Monibuca core system through several mechanisms:

1. Plugin registration via `m7s.InstallPlugin`
2. Task system for connection handling
3. Publisher/Subscriber interfaces for media handling
4. Memory allocation systems for efficient data processing

This design allows the RTMP functionality to be seamlessly integrated while maintaining the modularity of the overall system.

## Summary

The RTMP protocol implementation in Monibuca provides a robust foundation for streaming media applications. It supports:

1. Full RTMP protocol with simple and complex handshakes
2. Multiple video (H.264, H.265, AV1) and audio (AAC, PCMA, PCMU) codecs
3. Publishing and playing operations
4. Secure connections via RTMPS
5. Memory-efficient processing of media data

This implementation enables Monibuca to interact with a wide range of RTMP clients, including media encoders, players, and other streaming servers.