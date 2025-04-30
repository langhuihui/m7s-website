# HLS Support

This document provides an overview of the HTTP Live Streaming (HLS) protocol support in Monibuca. HLS is an adaptive streaming protocol developed by Apple that works by breaking media streams into a sequence of small HTTP-based file segments (.ts files) and an index file (.m3u8) that clients use to access these segments.

## Overview

The HLS implementation in Monibuca provides the following capabilities:

* Serving HLS streams via HTTP endpoints
* Transforming internal streams to HLS format
* Recording streams as HLS segments
* Pulling HLS streams from external sources
* Supporting both live streaming and video-on-demand (VOD) playback

## Architecture

The HLS functionality is implemented as a plugin within the Monibuca architecture.

<SVG src="hls_architecture"/>

## Plugin Registration and Initialization

The HLS plugin is registered with the Monibuca core system using the `InstallPlugin` function:

<SVG src="hls_initialization"/>

The initialization process in `OnInit` configures HTTP and HTTPS endpoints for accessing HLS streams. It builds URLs in the form `http://{hostName}/hls/{streamPath}.m3u8` or `https://{hostName}/hls/{streamPath}.m3u8`.

## HLS HTTP Handlers

The plugin registers HTTP handlers for serving HLS content:

<SVG src="hls_handlers"/>

When handling requests:

1. For `.m3u8` requests:
   - Live streams: Generate playlist from memory
   - VOD: Read playlist from filesystem
   
2. For `.ts` segment requests:
   - Live streams: Serve from memory cache
   - VOD: Read from filesystem

3. For VOD requests:
   - Check both memory and filesystem
   - Support range requests for seeking

## Stream Transformation to HLS

The `HLSWriter` component transforms internal Monibuca streams into HLS format:
<SVG src="hls_transformation"/>
Key aspects:

* Configurable segment duration (`Fragment`) and playlist window size (`Window`)
* Creates new segments on IDR frames when duration threshold is reached
* Maintains a rolling window of segments in memory
* Generates and updates m3u8 playlists for clients

## HLS Recording

The `Recorder` component implements HLS recording functionality:
<SVG src="hls_recroding"/>
The recorder:

* Creates TS files on disk instead of in memory
* Updates database records with stream metadata
* Creates new files when segment duration threshold is reached on IDR frames
* Supports various recording modes, including event-based recording

## HLS Pulling

The `Puller` component enables pulling HLS streams from external sources:
<SVG src="hls_pulling"/>
The puller supports three relay modes:

1. **Relay Mode**: Simply serves the original HLS segments and playlists
2. **Remux Mode**: Converts the HLS stream into Monibuca's internal format
3. **Mix Mode**: Both relays and remuxes the stream

## Memory Management

HLS relies on two key in-memory data structures:

| Data Structure | Type     | Purpose                                           |
| -------------- | -------- | ------------------------------------------------- |
| MemoryM3u8     | sync.Map | Stores m3u8 playlist content keyed by stream path |
| MemoryTs       | sync.Map | Stores TS segment data keyed by segment file path |

These structures enable efficient delivery of HLS content without repeated filesystem access. The system implements automatic cleanup of old segments based on the configured window size to prevent memory leaks.

## HLS Playlist Generation

The `Playlist` struct handles the creation of standard-compliant m3u8 playlists:

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

Key components include:

* Playlist header with version and target duration
* Media sequence number for client synchronization
* EXTINF entries with segment duration and file path
* Optional EXT-X-ENDLIST tag for VOD content

## MPEG-TS Segment Generation

The system generates compliant MPEG-TS segments by:

1. Writing PAT (Program Association Table) and PMT (Program Map Table) packets
2. Converting audio frames (ADTS) and video frames (AnnexB) to PES packets
3. Segmenting PES packets into standard 188-byte TS packets
4. Handling proper timestamp management and continuity counters

For recording, this process writes to files (`TsInFile`), while for live streaming, it stores segments in memory (`TsInMemory`).

## VOD Support

The HLS plugin provides VOD (Video On Demand) capabilities through:

1. Database integration to track recorded HLS segments
2. A dedicated `/vod/{streamPath...}` endpoint
3. Support for time range queries to retrieve specific portions of recorded content
4. Generating playlists with an `EXT-X-ENDLIST` tag for VOD playback

This allows clients to access previously recorded content using standard HLS players.

## Integration with Monibuca Core

The HLS plugin integrates with the Monibuca core through several interfaces:

| Interface    | Implementation | Purpose                                  |
| ------------ | -------------- | ---------------------------------------- |
| ITransformer | HLSWriter      | Transform internal streams to HLS format |
| IRecorder    | Recorder       | Record streams as HLS segments           |
| IPuller      | Puller         | Pull HLS streams from external sources   |

These interfaces enable the plugin system to properly manage HLS functionality as part of the larger Monibuca ecosystem.

## Conclusion

The HLS plugin in Monibuca provides a comprehensive implementation of the HTTP Live Streaming protocol, supporting both live streaming and VOD capabilities. Through efficient memory management and proper integration with the Monibuca core architecture, it enables high-performance HLS delivery for a variety of use cases.
