---
sidebarDepth: 3
---

# API

Monibuca 提供 HTTP 形式的 API 调用，方便用户对 Monibuca 实例进行信息的读取和指令下达。

> API 的地址都是全小写，请注意，但是参数包含大小写

## 全局 API

:::tip SSE
部分 API 默认以 SSE（[Server-Sent Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events)）形式返回信息，通常是那些需要每隔几秒就刷新的数据，通过对 API 附加 json=1 来改变返回的形式，成为一次返回 json 格式的方式。
:::
### `/api/plugins`
```json
获取所有插件的信息

{
  "Debug": {
    "Name": "Debug",
    "Version": "",
    "RawConfig": null,
    "Modified": null
  },
  "GB28181": {
    "Name": "GB28181",
    "Version": "",
    "RawConfig": {
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      }
    },
    "Modified": null
  },
  "HDL": {
    "Name": "HDL",
    "Version": "",
    "RawConfig": {
      "http": {
        "certfile": "monibuca.com.pem",
        "cors": true,
        "keyfile": "monibuca.com.key",
        "listenaddr": ":8080",
        "listenaddrtls": ":8081",
        "password": "",
        "username": ""
      },
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "HLS": {
    "Name": "HLS",
    "Version": "",
    "RawConfig": {
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "Hook": {
    "Name": "Hook",
    "Version": "",
    "RawConfig": null,
    "Modified": null
  },
  "Jessica": {
    "Name": "Jessica",
    "Version": "",
    "RawConfig": {
      "http": {
        "certfile": "monibuca.com.pem",
        "cors": true,
        "keyfile": "monibuca.com.key",
        "listenaddr": ":8080",
        "listenaddrtls": ":8081",
        "password": "",
        "username": ""
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "LogRotate": {
    "Name": "LogRotate",
    "Version": "",
    "RawConfig": null,
    "Modified": null
  },
  "Preview": {
    "Name": "Preview",
    "Version": "",
    "RawConfig": null,
    "Modified": null
  },
  "RTMP": {
    "Name": "RTMP",
    "Version": "",
    "RawConfig": {
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "RTSP": {
    "Name": "RTSP",
    "Version": "",
    "RawConfig": {
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "Record": {
    "Name": "Record",
    "Version": "",
    "RawConfig": {
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "Room": {
    "Name": "Room",
    "Version": "",
    "RawConfig": {
      "http": {
        "certfile": "monibuca.com.pem",
        "cors": true,
        "keyfile": "monibuca.com.key",
        "listenaddr": ":8080",
        "listenaddrtls": ":8081",
        "password": "",
        "username": ""
      }
    },
    "Modified": null
  },
  "WebRTC": {
    "Name": "WebRTC",
    "Version": "",
    "RawConfig": {
      "publish": {
        "kickexist": false,
        "pubaudio": true,
        "publishtimeout": 10,
        "pubvideo": true,
        "waitclosetimeout": 0
      },
      "subscribe": {
        "iframeonly": false,
        "subaudio": true,
        "subvideo": true,
        "waittimeout": 10
      }
    },
    "Modified": null
  },
  "WebTransport": {
    "Name": "WebTransport",
    "Version": "",
    "RawConfig": {
      "certfile": "monibuca.com.pem",
      "keyfile": "monibuca.com.key"
    },
    "Modified": null
  }
}
```

### `/api/summary?json=1`

获取采样数据,包括 CPU、内存、网卡数据、以及流信息

```json
{
  "Address": "",
  "Memory": {
    "Total": 16384,
    "Free": 4883,
    "Used": 11500,
    "Usage": 70.19600868225098
  },
  "CPUUsage": 26.433915211822868,
  "HardDisk": {
    "Total": 465,
    "Free": 227,
    "Used": 238,
    "Usage": 51.129761645544036
  },
  "NetWork": [
    {
      "Name": "lo0",
      "Receive": 16757188879,
      "Sent": 16757188879,
      "ReceiveSpeed": 0,
      "SentSpeed": 0
    }
  ],
  "Streams": [
    {
      "Path": "live/test",
      "State": 1,
      "Subscribers": 0,
      "Tracks": ["h264", "aac"],
      "StartTime": -62135596800,
      "Type": "HLSPuller",
      "BPS": 0
    }
  ]
}
```

### `/api/stream?streamPath=live/test`

获取流（live/test）的详细信息

```json
{
  "StartTime": "0001-01-01T00:00:00Z",
  "WaitTimeout": 5000000000,
  "PublishTimeout": 10000000000,
  "WaitCloseTimeout": 0,
  "Path": "live/test",
  "Publisher": {
    "ID": "",
    "Type": "HLSPuller",
    "StartTime": "2022-05-20T15:57:59.147079+08:00",
    "Args": {},
    "Config": {
      "RePull": 0,
      "PullOnStart": true,
      "PullOnSubscribe": false,
      "PullList": {
        "live/test": "http://111.40.196.27/PLTV/88888888/224/3221225548/index.m3u8"
      }
    },
    "StreamPath": "live/test",
    "RemoteURL": "http://111.40.196.27/PLTV/88888888/224/3221225548/index.m3u8",
    "ReConnectCount": 1,
    "Video": {
      "M3U8Count": 1,
      "TSCount": 3,
      "LastM3u8": "#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:165303343\n#EXT-X-TARGETDURATION:10\n#EXT-X-PROGRAM-DATE-TIME:2022-05-20T07:57:01Z\n#EXTINF:10,\n1653033421-1-165303343.hls.ts\n#EXT-X-PROGRAM-DATE-TIME:2022-05-20T07:57:13Z\n#EXTINF:10,\n1653033433-1-165303344.hls.ts\n#EXT-X-PROGRAM-DATE-TIME:2022-05-20T07:57:21Z\n#EXTINF:10,\n1653033441-1-165303345.hls.ts\n#EXT-X-PROGRAM-DATE-TIME:2022-05-20T07:57:33Z\n#EXTINF:10,\n1653033453-1-165303346.hls.ts\n#EXT-X-PROGRAM-DATE-TIME:2022-05-20T07:57:41Z\n#EXTINF:10,\n1653033461-1-165303347.hls.ts\n#EXT-X-ENDLIST\n",
      "M3u8Info": [
        { "DownloadCost": 1495, "DecodeCost": 0, "BufferLength": 0 },
        { "DownloadCost": 2074, "DecodeCost": 0, "BufferLength": 0 }
      ]
    },
    "Audio": { "M3U8Count": 0, "TSCount": 0, "LastM3u8": "", "M3u8Info": null }
  },
  "State": 1,
  "Subscribers": null,
  "Tracks": {
    "aac": {
      "Name": "aac",
      "BPS": 0,
      "FPS": 34,
      "SampleRate": 32000,
      "SampleSize": 16,
      "CodecID": 10,
      "Channels": 2,
      "AVCCHead": "rwE=",
      "Profile": 2
    },
    "h264": {
      "Name": "h264",
      "BPS": 0,
      "FPS": 27,
      "SampleRate": 90000,
      "SampleSize": 0,
      "CodecID": 7,
      "SPSInfo": {
        "ProfileIdc": 100,
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
      "GOP": 5
    }
  },
  "AppName": "live",
  "StreamName": "test"
}
```

### `/api/sysinfo`

系统信息，包含版本号（Version）和启动时间（StartTime）两个字段

### `/api/closestream?streamPath=xxx`

终止某一个流，入参是流标识（streamPath）

> 返回 200 代表成功，404 代表不存在这个流，400 代表没有传入入参

### `/api/getconfig`

获取配置文件信息，可以加参数 name=xxx，获取 xxx 插件的配置信息（不加参数则获取全局配置信息）

> 返回 404 代表没有这个插件

```json
{
  "consoleurl": "wss://console.monibuca.com:8080",
  "enableavcc": true,
  "enableflv": true,
  "enablertp": true,
  "http": {
    "certfile": "",
    "cors": true,
    "keyfile": "",
    "listenaddr": ":8080",
    "listenaddrtls": "",
    "password": "",
    "username": ""
  },
  "publish": {
    "kickexist": false,
    "pubaudio": true,
    "publishtimeout": 10,
    "pubvideo": true,
    "waitclosetimeout": 0
  },
  "rtpreorder": false,
  "secret": "",
  "subscribe": {
    "iframeonly": false,
    "subaudio": true,
    "subvideo": true,
    "waittimeout": 10
  }
}
```

### `/api/modifyconfig`

修改配置信息，可以加参数 name=xxx，代表修改 xxx 插件的配置信息（不加参数则修改全局配置信息）

> 返回 404 代表没有这个插件

修改的配置信息通过请求的 body（JSON 格式）提交

### `/api/updateconfig`

热更新配置信息，可以加参数 name=xxx，代表热更新 xxx 插件的配置信息（不加参数则热更新全局配置信息）

> 返回 404 代表没有这个插件
> 热更新只是调用了插件的 OnEvent 函数，具体如何更新取决于插件实现的逻辑

## 插件 API

请参考各插件说明文档
