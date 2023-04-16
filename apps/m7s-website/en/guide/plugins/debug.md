# Debug Plugin

This plugin allows accessing pprof through a public port, and calling profile will save the CPU analysis file as cpu.profile and automatically open the analysis UI interface.

## Plugin Address

https://github.com/Monibuca/plugin-debug

## Plugin Importing
```go
import (
    _ "m7s.live/plugin/debug/v4"
)
```

## API

### `/debug/pprof`
Open pprof interface

### `/debug/profile`
By default, sampling lasts for 30s, and you can specify the sampling time by passing in seconds=xxx.

Save the CPU analysis file as cpu.profile and automatically open the analysis UI interface.
