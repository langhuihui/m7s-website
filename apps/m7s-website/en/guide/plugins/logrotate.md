# LogRotate Plugin

The LogRotate plugin can be used to view the logs in real-time and query logs, currently only supporting Linux systems.

## Plugin Address
https://github.com/Monibuca/plugin-logrotate

# Plugin Introduction
```go
import (
    _ "m7s.live/plugin/logrotate/v4"
)
```
## Default Configuration
```yaml
logrotate:
 path: ./logs # directory where the logs are generated
 size: 0 # size of each log file in bytes, with 0 indicating unlimited size
 days: 1 # divide logs by time, in days, i.e. 24 hours
 formatter : 2006-01-02T15 # log file name format, formatted according to the go layout by default, in hourly format by default
```
## API Interface

- `logrotate/api/tail` Listens for log output, which is an SSE (server-sent Event) request.
- `logrotate/api/find` Finds logs, currently only supporting Linux systems (using grep)
- `logrotate/api/list` Lists all log files.
- `logrotate/api/open?file=xxx` Views the log content, where the input parameter is the file name.
- `logrotate/api/download?file=xxx` Downloads a certain log, where the input parameter is the file name.