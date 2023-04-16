# Hook Plugin

WebHook For Monibuca

## Plugin Address

https://github.com/Monibuca/plugin-hook

## Plugin Import

```go
import (
    _ "m7s.live/plugin/hook/v4"
)
```

## Configuration

```yaml
hook:
  keepalive: 0 # Send heartbeat request every X seconds (default 0 is off)
  retrytimes: 3 # Retry times
  baseurl: "" # Prefix of the URL
  header: {} # Custom HTTP request header
  urllist: {} # URL list
  requestlist: {} # Request list
  extra: {} # Additional custom data to send
```

where urllist is a simple address list such as:

```yaml
hook:
  urllist:
    "*": "http://www.example.com" # Always send request
    startup: "http://www.example.com" # Send request on m7s startup
    publish: "http://www.example.com/publish" # Send request on publish
    subscribe: "http://www.example.com/subscribe" # Send request on subscribe
    unsubscribe: "http://www.example.com/unsubscribe" # Send request on unsubscribe
    streamClose: "http://www.example.com/streamClose" # Send request on streamClose
    keepalive: "http://www.example.com/keepalive" # Send request on heartbeat
```

requestlist is used when you need to configure method and header separately:

```yaml
hook:
  requestlist:
    "*":
      method: GET
      header:
        referer: http://www.example.com
      url: "http://www.example.com"
```

## Sending Request Data

By default, a JSON data is sent using the POST method:

```json
{
  "stream": {
    "StartTime": "0001-01-01T00:00:00Z",
    "WaitTimeout": 10000000000,
    "PublishTimeout": 10000000000,
    "WaitCloseTimeout": 0,
    "Path": "live/test",
    "Publisher": {
      "ID": "",
      "Type": "RTMPReceiver",
      "StartTime": "2022-05-03T13:00:22.5353264+08:00",
      "Args": {},
      "StreamID": 1
    },
    "State": 1,
    "Subscribers": [
      {
        "ID": "",
        "Type": "RTSPSubscriber",
        "StartTime": "2022-05-03T13:00:23.8753554+08:00",
        "Args": {}
      }
    ],
    "Tracks": {
      "aac": {
        "Name": "aac",
        "BPS": 72480,
        "SampleRate": 44100,
        "SampleSize": 16,
        "CodecID": 10,
        "Channels": 2,
        "AVCCHead": "rwE=",
        "Profile": 2
      },
      "h264": {
        "Name": "h264",
        "BPS": 2226142,
        "SampleRate": 90000,
        "SampleSize": 0,
        "CodecID": 7,
        "SPSInfo": {
          "ProfileIdc": 66,
          "LevelIdc": 31,
          "MbWidth": 80,
          "MbHeight": 45,
          "CropLeft": 0,
          "CropRight": 0,
          "CropTop": 0,
          "CropBottom": 0,
          "Width": 1280,
          "Height": 720
        },
        "GOP": 27
      }
    },
    "AppName": "live",
    "StreamName": "test"
  },
  "extra": {},
  "event": "publish",
  "time": 1257894000
}
```

If specified as the GET method, no JSON is sent. Instead, the event and streamPath are appended to the URL.