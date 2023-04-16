# plugin-monitor
Generate monitor data

## Plugin Address

https://github.com/Monibuca/plugin-monitor

## Import Plugin

```go
import (
    _ "m7s.live/plugin/monitor/v4"
)
```

## Configuration

```yaml
monitor:
  path: monitor # Monitor data storage path
```

## API

### Get historical data of monitored streams

```
GET /monitor/api/list/stream?time=xxxx-xxxx&streamPath=xxxx
```
streamPath is optional, used to filter specified streams
time is optional, used to filter data within a specified time period, and returns data for the current day if not passed

### Get the track list of historical streams
  
```
GET /monitor/api/list/track?streamPath=xxxx
```
The value of streamPath comes from concatenating path and time in the previous API (time format is 2006-01-02T15:04:05)

### Get historical data

```
GET /monitor/[streamPath]/track/h264.yaml
```
Just read the file from the monitor directory, where the path is the file path and should be replaced accordingly.