### `/api/sysinfo`

System information, including version number (Version) and start time (StartTime).

### `/api/closestream?streamPath=xxx`

Terminates a certain stream. Parameter is the stream identifier (streamPath).

> Returns 200 for success, 404 for non-existent stream, and 400 for missing parameter.

### `/api/getconfig`

Gets configuration file information. Can add parameter name=xxx to get configuration information for plugin xxx (get global configuration information without parameter).

> Returns 404 for non-existent plugin.

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
    "publishtimeout": "10s",
    "pubvideo": true,
    "waitclosetimeout": 0
  },
  "rtpreorder": false,
  "secret": "",
  "subscribe": {
    "iframeonly": false,
    "subaudio": true,
    "subvideo": true,
    "waittimeout": "10s"
  }
}
```

### `/api/modifyconfig`

Modifies configuration information. Can add parameter name=xxx to modify configuration information for plugin xxx (modifies global configuration information without parameter).

> Returns 404 for non-existent plugin.

Modified configuration information is submitted through the body of the request (in JSON format).

### `/api/updateconfig`

Hot updates configuration information. Can add parameter name=xxx to hot update configuration information for plugin xxx (hot updates global configuration information without parameter).

> Returns 404 for non-existent plugin.
> Hot update just calls the OnEvent function of the plugin, and how to update depends on the logic implemented by the plugin.

## Plugin API

Please refer to the documentation for each plugin.