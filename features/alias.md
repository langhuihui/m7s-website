# Monibuca 流别名功能使用指南

## 1. 功能简介

流别名是 Monibuca 提供的一个强大功能，它允许您为同一个流创建多个不同的访问路径。这个功能不仅可以简化流的访问方式，更重要的是能够实现无缝的流内容切换，特别适合直播过程中插入广告等场景。

## 2. 基本使用方法

### 2.1 创建别名

通过 HTTP API 创建别名：

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "live/original",
    "alias": "live/simple",
    "autoRemove": false
  }'
```

### 2.2 查看当前别名列表

```bash
curl http://localhost:8080/api/stream/alias
```

### 2.3 删除别名

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "alias": "live/simple"
  }'
```

## 3. 实战案例：直播广告插入

### 3.1 场景描述

在直播过程中，经常需要在适当的时机插入广告。使用流别名功能，我们可以实现：
- 无缝切换between直播内容和广告
- 保持观众的持续观看体验
- 灵活控制广告的插入时机
- 支持多个广告源的轮换播放

### 3.2 实现步骤

1. **准备工作**
   ```bash
   # 假设主直播流的路径为：live/main
   # 广告流的路径为：ads/ad1
   ```

2. **创建主直播的别名**
   ```bash
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "live/main",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

3. **需要插入广告时**
   ```bash
   # 将别名指向广告流
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "ads/ad1",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

4. **广告播放结束后**
   ```bash
   # 将别名重新指向主直播流
   curl -X POST http://localhost:8080/api/stream/alias \
     -H "Content-Type: application/json" \
     -d '{
       "streamPath": "live/main",
       "alias": "live/show",
       "autoRemove": false
     }'
   ```

### 3.3 效果说明

1. **对观众端的影响**
   - 观众始终访问 `live/show` 这个固定地址
   - 切换过程对观众无感知
   - 不会出现黑屏或卡顿
   - 无需刷新播放器

2. **对直播系统的影响**
   - 主播端推流不受影响
   - 支持多路广告源预加载
   - 可以实现精确的时间控制
   - 系统资源占用小

## 4. 进阶使用技巧

### 4.1 广告轮播方案

```bash
# 创建多个广告流的别名
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "ads/ad1",
    "alias": "ads/current",
    "autoRemove": true
  }'

# 通过脚本定时切换不同的广告
for ad in ad1 ad2 ad3; do
  curl -X POST http://localhost:8080/api/stream/alias \
    -H "Content-Type: application/json" \
    -d "{
      \"streamPath\": \"ads/$ad\",
      \"alias\": \"ads/current\",
      \"autoRemove\": true
    }"
  sleep 30  # 每个广告播放30秒
done
```

### 4.2 使用自动移除功能

当广告流结束时自动切回主流：

```bash
curl -X POST http://localhost:8080/api/stream/alias \
  -H "Content-Type: application/json" \
  -d '{
    "streamPath": "ads/ad1",
    "alias": "live/show",
    "autoRemove": true
  }'
```

### 4.3 条件触发广告

结合 Monibuca 的其他功能，可以实现：
- 观众数量达到阈值时插入广告
- 直播时长达到特定值时插入广告
- 根据直播内容标签触发相关广告

## 5. 最佳实践建议

1. **广告内容预加载**
   - 提前准备好广告流
   - 确保广告源的稳定性
   - 使用缓存机制提高切换速度

2. **合理的切换策略**
   - 避免频繁切换影响用户体验
   - 选择适当的切换时机
   - 保持广告时长的合理控制

3. **监控和统计**
   - 记录广告播放情况
   - 监控切换过程是否平滑
   - 统计观众观看数据

4. **容错处理**
   - 广告流异常时快速切回主流
   - 设置合理的超时时间
   - 做好日志记录

## 6. 常见问题解答

1. **Q: 切换时观众会感知到卡顿吗？**
   A: 不会。流别名的切换是服务器端的操作，对客户端播放器完全透明。

2. **Q: 如何确保广告按预期时间播放？**
   A: 可以通过脚本控制切换时间，并配合自动移除功能来确保准确性。

3. **Q: 支持多少个并发的别名？**
   A: 理论上没有限制，但建议根据服务器资源合理使用。

4. **Q: 如何处理广告流异常的情况？**
   A: 建议使用自动移除功能，并配合监控系统及时发现和处理异常。

## 7. 注意事项

1. **资源管理**
   - 及时清理不再使用的别名
   - 避免创建过多无用的别名
   - 定期检查别名状态

2. **性能考虑**
   - 控制并发别名数量
   - 合理设置缓存策略
   - 监控服务器资源使用情况

3. **用户体验**
   - 控制广告频率和时长
   - 确保切换的流畅性
   - 考虑不同网络环境的用户
``` 