# 录制
录制是 Monibuca 的一个重要功能，允许将视频流保存为文件，方便后续回放和存档。
## 功能特点
- 支持多种录制格式（FLV、MP4、TS、HLS）
- 支持定时录制
- 支持按大小分段
- 支持按时间分段
- 支持录制文件自动清理

## 使用示例
### 配置录制规则
在YAML配置文件中配置录制规则：

```yaml
# 全局配置
global:
  loglevel: debug

# MP4插件配置
mp4:   
  # 当有流被发布时的行为配置
  onpub:
    record:
      ^live/.+:               # 匹配所有live/开头的流
        fragment: 1m          # 分片时长为1分钟
        filepath: record/$0   # 保存路径，$0表示匹配的完整流名
```

## 注意事项
1. 确保存储空间充足
2. 合理设置分段时长
3. 注意文件命名规则
4. 定期清理过期文件
5. 监控磁盘使用情况

## 常见问题
1. 录制失败
   - 检查存储空间
   - 验证文件权限
   - 确认配置是否正确
2. 文件损坏
   - 检查磁盘状态
   - 验证文件完整性
   - 确认录制过程是否正常
3. 自动清理
   - 检查清理策略
   - 验证文件保留时间
   - 确认清理日志