# Core Relay Process

## Publisher

A Publisher is an object that writes audio/video data to the RingBuffer on the server. It exposes WriteVideo and WriteAudio methods.
When writing through WriteVideo and WriteAudio, it creates Tracks, parses data, and generates ICodecCtx. To start publishing, simply call the Plugin's Publish method.

### Accepting Stream Push

Plugins like rtmp, rtsp listen on a port to accept stream pushes.

### Pulling Streams from Remote

- Plugins that implement OnPullProxyAdd method can pull streams from remote sources.
- Plugins that inherit from HTTPFilePuller can pull streams from http or files.

### Pulling from Local Recording Files

Plugins that inherit from RecordFilePuller can pull streams from local recording files.

## Subscriber

A Subscriber is an object that reads audio/video data from the RingBuffer. Subscribing to a stream involves two steps:

1. Call the Plugin's Subscribe method, passing StreamPath and Subscribe configuration.
2. Call the PlayBlock method to start reading data, which blocks until the subscription ends.

The reason for splitting into two steps is that the first step might fail (timeout etc.), or might need some interaction work after the first step succeeds.
The first step will block for some time, waiting for the publisher (if there's no publisher initially) and waiting for the publisher's tracks to be created.

### Accepting Stream Pull

For example, rtmp and rtsp plugins listen on a port to accept playback requests.

### Pushing to Remote

- Plugins that implement OnPushProxyAdd method can push streams to remote destinations.

### Writing to Local Files

Plugins with recording functionality need to subscribe to the stream before writing to local files.

## On-Demand Pull (Publishing)

Triggered by subscribers, when calling plugin's OnSubscribe, it notifies all plugins of a subscription demand, at which point plugins can respond to this demand by publishing a stream. For example, pulling recording streams falls into this category. It's crucial to configure using regular expressions to prevent simultaneous publishing. 