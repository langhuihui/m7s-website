# Prometheus exporter plugin
This plugin provides Prometheus information collection functionality for easy integration with Prometheus. It can collect the following information:

- Monibuca basic information, with the collector name **base**
- CPU, including CPU load percentage, user time, system time, etc., with the collector name **cpu**
- Memory, including total memory, used memory, etc., with the collector name **memory**
- Disk, including total disk space of Monibuca's disk, used space, etc., with the collector name **disk**
- Network, including network receiving bytes, sending bytes, etc., with the collector name **net**
- Media, including total number of media streams, total number of clients, etc., with the collector name **media**

# Plugin address
github.com/Monibuca/plugin-exporter

# Plugin import
```go
import (
_ "m7s.live/plugin/exporter/v4"
)
```

# Default plugin configuration


```yaml
exporter:
  printcollectors: true # Whether to print the enabled collectors, default true
  nodeaddr: zh_cn # Node location
  enabled: "[defaults]" # Default enabled collectors. If it is defaults, use double quotes in the yaml. You can enable specific collectors. See above for collector names
  collector: # Configuration for each collector, only cpu net have configuration settings
    cpu:
      percpu: false # Whether to separately calculate on each processor
    net:
      nicwhitelist: ".*" # Network card whitelist, supports regex. Default is all
      nicblacklist: ""
```

# API interface
`/exporter/api/metrics` 

# Prometheus configuration
Add a job under scrape_configs, e.g.:
```yaml
scrape_configs:
  - job_name: "monibuca_exporter"
    metrics_path: "/exporter/api/metrics"
    static_configs:
      - targets: ["ip:port"] # Monibuca's IP and port
```

# Secondary development
It is also possible to develop custom collectors based on this plugin by simply implementing the Collector interface, i.e. the **prometheus.Collector** and **engine.OnEvent** interfaces, and providing a build function. Refer to collector/cpu.go for an example.

In the build function, the configuration under exporter.collector will be provided.