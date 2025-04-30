# SRT Protocol

The Secure Reliable Transport (SRT) is a transport protocol that enables secure, reliable streaming of data across unpredictable networks. This document describes the implementation of SRT within the Monibuca (m7s) streaming server, focusing on the protocol's architecture, connection handling, and media streaming capabilities.

## Architecture Overview

The SRT implementation in Monibuca is structured as a plugin that enables both publishing (pushing) and playing (pulling) of media streams over SRT. The plugin automatically registers standard SRT support on port 6000 and can be configured to use custom ports.

### Core Components

The SRT plugin is composed of the following primary components:

| Component     | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| SRTPlugin     | Main plugin structure with configuration and initialization logic |
| SRTServer     | Server implementation that handles incoming connections           |
| Receiver      | Handles incoming media data from publishers                       |
| Sender        | Manages outgoing media data to subscribers                        |

The plugin is registered using Monibuca's plugin system and implements the necessary interfaces for pushing and pulling media streams.

## SRT Protocol Flow

### Connection Establishment

When a client connects to the SRT server, the following sequence occurs:

1. TCP connection is established
2. SRT handshake is performed
3. Stream ID is processed to determine connection type (publish/subscribe)
4. Media streaming begins

### Stream ID Format

The SRT implementation uses a specific stream ID format to distinguish between publishing and subscribing connections:

- For publishing: `publish:/{streamPath}`
- For subscribing: `subscribe:/{streamPath}`

The stream path is extracted from the stream ID and used to create the appropriate publisher or subscriber in the Monibuca system.

## Configuration and Initialization

The SRT plugin can be configured with these settings:

| Setting     | Default | Description                  |
| ----------- | ------- | ---------------------------- |
| ListenAddr  | :6000   | Address and port to listen on |
| Passphrase  | ""      | Optional passphrase for encryption |

On initialization, the plugin registers its capabilities and address formats:

```
srt://{hostName}?streamid=publish:/{streamPath}       (Port 6000)
srt://{hostName}:{port}?streamid=publish:/{streamPath} (Custom port)
srt://{hostName}?streamid=subscribe:/{streamPath}     (Port 6000)
srt://{hostName}:{port}?streamid=subscribe:/{streamPath} (Custom port)
```

## Connection Handling

### Publisher Connection

When a publisher connects:

1. The connection is authenticated using the configured passphrase
2. A new publisher is created in the Monibuca system
3. A receiver task is started to handle incoming media data
4. The media data is processed and made available to other plugins

### Subscriber Connection

When a subscriber connects:

1. The connection is authenticated using the configured passphrase
2. A new subscriber is created in the Monibuca system
3. A sender task is started to handle outgoing media data
4. The media data is sent to the client

## Integration with Monibuca Core

The SRT plugin integrates with the Monibuca core system through several mechanisms:

1. Plugin registration via `m7s.InstallPlugin`
2. Task system for connection handling
3. Publisher/Subscriber interfaces for media handling
4. Integration with the core streaming system

## Security Features

The SRT implementation includes several security features:

1. Optional passphrase-based encryption
2. Stream ID validation
3. Connection type verification (publish/subscribe)

## Summary

The SRT protocol implementation in Monibuca provides a robust foundation for secure streaming media applications. It supports:

1. Full SRT protocol with encryption capabilities
2. Publishing and playing operations
3. Custom port configuration
4. Secure connections with passphrase protection
5. Seamless integration with other Monibuca plugins

This implementation enables Monibuca to interact with a wide range of SRT clients, including media encoders, players, and other streaming servers.
