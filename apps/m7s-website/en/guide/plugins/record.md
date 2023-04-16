# RECORD Plugin

A function plugin for recording streams, providing Flv, fmp4, hls, and naked stream formats.

## Plugin Address

https://github.com/Monibuca/plugin-record

## Plugin Introduction
```go
import (
    _ "m7s.live/plugin/record/v4"
)
```
## Configuration

- The path in the configuration represents the root path of the file to be saved, and can use relative or absolute paths.
- Filter represents the regular expression for the StreamPath to be filtered. If it does not match, it means that it is not recorded. Empty means no filtering.
- Fragment represents the size of the fragment (in seconds), 0 means no fragmentation.
```yaml
record:
  subscribe:
      subaudio: true # Whether to subscribe to the audio stream
      subvideo: true # Whether to subscribe to the video stream
      subaudioargname: ats # Audio track parameter name
      subvideoargname: vts # Video track parameter name
      subdataargname: dts # Data track parameter name
      subaudiotracks: [] # Audio track name list to subscribe to
      subvideotracks: [] # Video track name list to subscribe to
      submode: 0 # Subscription mode, 0 is frame skipping and chasing mode, 1 is no chasing (mostly used for recording), 2 is time rewind mode
      iframeonly: false # Only subscribe to key frames
      waittimeout: 10s # Timeout for waiting for the publisher, used to subscribe to unpublished streams
  flv:
      ext: .flv
      path: record/flv
      autorecord: false
      filter: ""
      fragment: 0
  mp4:
      ext: .mp4
      path: record/mp4
      autorecord: false
      filter: ""
      fragment: 0
  hls:
      ext: .m3u8
      path: record/hls
      autorecord: false
      filter: ""
      fragment: 0
  raw:
      ext: .
      path: record/raw
      autorecord: false
      filter: ""
      fragment: 0
```

## API

- `/record/api/list/recording` list all the information of the current recording stream
- `/record/api/list?type=flv` list all the recorded flv files
- `/record/api/start?type=flv&streamPath=live/rtc` start recording a stream and return a string for stopping the recording
- `/record/api/stop?id=xxx` stop recording a stream

Change the value of type to mp4 to record in fmp4 format.

## VOD Function

Access format:
[http/https]://[host]:[port]/record/[streamPath].[flv|mp4|m3u8|h264|h265]

For example:
- `http://localhost:8080/record/live/test.flv` will read the corresponding flv file
- `http://localhost:8080/record/live/test.mp4` will read the corresponding fmp4 file