# Directory Structure Explanation
```bash
monibuca/
├── api.go               # API interface definitions
├── plugin.go            # Core implementation of plugin system
├── publisher.go         # Publisher implementation
├── subscriber.go        # Subscriber implementation
├── server.go            # Core server implementation
├── puller.go            # Stream puller implementation
├── pusher.go            # Stream pusher implementation
├── pull-proxy.go        # Pull proxy implementation
├── push-proxy.go        # Push proxy implementation
├── recoder.go           # Recorder implementation
├── transformer.go       # Transcoder implementation
├── wait-stream.go       # Stream waiting implementation
├── prometheus.go        # Prometheus monitoring implementation
│
├── pkg/                 # Core packages
│   ├── auth/            # Authentication related
│   ├── codec/           # Codec implementation
│   ├── config/          # Configuration related
│   ├── db/              # Database related
│   ├── task/            # Task system
│   ├── util/            # Utility functions
│   ├── filerotate/      # File rotation management
│   ├── log.go           # Logging implementation
│   ├── raw.go           # Raw data processing
│   ├── error.go         # Error handling
│   ├── track.go         # Media track implementation
│   ├── track_test.go    # Media track tests
│   ├── annexb.go        # H.264/H.265 Annex-B format processing
│   ├── av-reader.go     # Audio/video reader
│   ├── avframe.go       # Audio/video frame structure
│   ├── ring-writer.go   # Ring buffer writer
│   ├── ring-reader.go   # Ring buffer reader
│   ├── adts.go          # AAC-ADTS format processing
│   ├── port.go          # Port management
│   ├── ring_test.go     # Ring buffer tests
│   └── event.go         # Event system
│
├── plugin/              # Plugin directory
│   ├── rtmp/            # RTMP protocol plugin
│   ├── rtsp/            # RTSP protocol plugin
│   ├── hls/             # HLS protocol plugin
│   ├── flv/             # FLV protocol plugin
│   ├── webrtc/          # WebRTC protocol plugin
│   ├── gb28181/         # GB28181 protocol plugin
│   ├── onvif/           # ONVIF protocol plugin
│   ├── mp4/             # MP4 related plugin
│   ├── room/            # Room management plugin
│   ├── monitor/         # Monitoring plugin
│   ├── rtp/             # RTP protocol plugin
│   ├── srt/             # SRT protocol plugin
│   ├── sei/             # SEI data processing plugin
│   ├── snap/            # Screenshot plugin
│   ├── crypto/          # Encryption plugin
│   ├── debug/           # Debug plugin
│   ├── cascade/         # Cascade plugin
│   ├── logrotate/       # Log rotation plugin
│   ├── stress/          # Stress testing plugin
│   ├── vmlog/           # Virtual memory log plugin
│   ├── preview/         # Preview plugin
│   └── transcode/       # Transcoding plugin
│
├── pb/                  # Protocol Buffers definitions and generated code
├── scripts/             # Script files
├── doc/                 # English documentation
├── doc_CN/              # Chinese documentation
├── example/             # Example code
├── test/                # Test code
│
├── go.mod               # Go module definition
├── go.sum               # Go dependency version lock
├── Dockerfile           # Docker build file
└── README.md            # Project documentation
```