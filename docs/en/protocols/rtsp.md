# RTSP Protocol

This page documents the implementation of the Real Time Streaming Protocol (RTSP) in Monibuca. It covers the server and client components, media transport mechanisms, and integration with the core platform.

## 1. Overview

RTSP (Real Time Streaming Protocol) is a network protocol designed for controlling streaming media servers. The Monibuca RTSP implementation supports both publishing (receiving streams from clients) and playing (sending streams to clients) operations with support for both TCP and UDP transport modes.

## 2. Architecture

The RTSP plugin consists of several key components that interact with both external RTSP clients/servers and the Monibuca core system.

### 2.1 RTSP Protocol Components

The RTSP implementation includes:
- Connection handling
- Media transport
- Session management
- Protocol state machine

### 2.2 RTSP Protocol Flow

The protocol flow follows the standard RTSP specification with support for:
- Session establishment
- Media description
- Transport setup
- Playback control
- Session teardown

<SVG src="rtsp_timeline"/>

## 3. RTSP Server Implementation

The RTSP server handles incoming connections and processes RTSP methods according to the protocol specification.

### 3.1 Connection Handling

The `NetConnection` class forms the foundation of RTSP communications:
- Default RTSP port: 554 (RTSPS port: 443)
- Secure connections via RTSPS (RTSP over TLS)
- Timeout handling with 10-second defaults
- Session management with automatic keep-alive OPTIONS messages
- Support for both RTP and RTCP packet handling

### 3.2 RTSP Method Handling

The `RTSPServer` class processes standard RTSP methods:

| Method   | Description               | Implementation                            |
| -------- | ------------------------- | ----------------------------------------- |
| OPTIONS  | Query available methods   | Returns supported methods list            |
| DESCRIBE | Get media information     | Generates SDP from available tracks       |
| ANNOUNCE | Receive media information | Parses SDP to set up publisher            |
| SETUP    | Establish transport       | Configures TCP or UDP transport for media |
| PLAY     | Start playback            | Initiates media streaming to client       |
| RECORD   | Start recording           | Begins receiving media from client        |
| TEARDOWN | End session               | Terminates the RTSP session               |

### 3.3 Media Transport Modes

The RTSP implementation supports two primary transport methods:

#### TCP (Interleaved) Transport

Media data is sent over the same TCP connection used for RTSP signaling. RTP packets are framed with the "$" character followed by channel ID and length.

Example of RTP packet format in TCP mode:
```
$<channel><length_high><length_low><RTP payload...>
```

#### UDP Transport

Media data is sent over separate UDP connections, with RTP for media and RTCP for control information. Features include:
- Dynamic port allocation
- Automatic fallback to TCP if UDP fails
- Separate connections for RTP and RTCP
- IPv4 and IPv6 support

## 4. Media Processing

### 4.1 Sender Implementation

The `Sender` class handles streaming media to RTSP clients:
1. Connects to the Monibuca subscriber system
2. Converts internal formats to RTP packets
3. Sends media through TCP or UDP
4. Manages RTCP for streaming statistics

### 4.2 Receiver Implementation

The `Receiver` class handles incoming media from RTSP clients:
1. Receives RTP packets from clients
2. Processes and groups packets into frames
3. Writes frames to the Monibuca publisher system
4. Handles timestamp correction and synchronization

## 5. Client Implementation

### 5.1 Pull Mode

Pull mode is used to receive streams from external RTSP servers:
1. Connect to remote server
2. Send OPTIONS to check server capability
3. Send DESCRIBE to get stream information
4. Send SETUP for each media track
5. Send PLAY to start receiving media
6. Process incoming RTP packets

### 5.2 Push Mode

Push mode is used to send streams to external RTSP servers:
1. Connect to remote server
2. Send OPTIONS to check server capability
3. Send ANNOUNCE with stream information
4. Send SETUP for each media track
5. Send RECORD to start sending media
6. Send RTP packets for each media frame

## 6. Proxy Support

### 6.1 Pull Proxy

The `RTSPPullProxy` maintains connections to external RTSP servers:
- Automatic reconnection on failure
- Periodic OPTIONS messages to maintain connection
- RTT measurement for monitoring
- Resource cleanup on shutdown

### 6.2 Push Proxy

The `RTSPPushProxy` manages connections to external RTSP servers:
- Connection state management
- Failure detection and reconnection
- Proper resource cleanup
- Support for both TCP and UDP transport

## 7. Advanced Features

### 7.1 SDP Handling

Session Description Protocol (SDP) features:
- SDP generation for outgoing streams
- SDP parsing for incoming streams
- Codec parameter extraction and conversion

### 7.2 RTP/RTCP Implementation

The implementation handles:
- RTP packet construction and parsing
- RTCP sender reports generation
- RTCP receiver reports processing
- Timestamps synchronization
- Media synchronization between audio and video

## 8. Integrating with External Systems

The RTSP implementation is designed to interoperate with:
- IP cameras
- Surveillance systems
- Media servers
- Media players like VLC, FFmpeg, GStreamer
- Hardware encoders and decoders
