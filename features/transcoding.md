# 转码
转码是 Monibuca 的一个重要功能，允许将视频流转换为不同的编码格式和分辨率。

## 功能特点
- 支持多种编码格式
- 支持多种分辨率
- 支持码率控制
- 支持帧率控制
- 支持硬件加速

## 环境要求
转码插件依赖于 FFmpeg 转码引擎，使用前请确保：
1. 系统中已正确安装 FFmpeg
2. FFmpeg 的执行路径已添加到系统的 PATH 环境变量中
3. 可以通过命令行直接运行 `ffmpeg -version` 来验证安装是否正确

> **注意**：如果 FFmpeg 未正确配置，转码功能将无法正常工作。不同操作系统配置 PATH 环境变量的方法有所不同，请参考相应的系统文档。

## 使用示例
### 配置转码规则
以下是一个基于 YAML 格式的转码配置示例：

```yaml
transcode:
  onpub:
    transform:
      ^live.+:  # 使用正则表达式匹配流名称
        input:
          mode: rtsp  # 输入模式
        output:
          - target: rtmp://localhost/trans/$0/small  # 输出目标，$0 表示匹配的流名
            conf: -loglevel debug -c:a aac -c:v h264 -vf scale=320:240  # FFmpeg 配置参数
```

此配置将匹配所有以 "live" 开头的流，并为其创建一个转码输出，分辨率为 320x240。

### 自定义转码配置
您也可以为特定流设置多个不同的转码配置：

```yaml
transcode:
  transform:
    camera1:  # 特定流名称
      input:
        mode: rtsp
      output:
        - target: rtmp://localhost/trans/camera1/hd
          conf: -c:a aac -c:v h264 -vf scale=1280:720 -b:v 2000k -b:a 128k
        - target: rtmp://localhost/trans/camera1/sd
          conf: -c:a aac -c:v h264 -vf scale=640:360 -b:v 800k -b:a 64k
```

### 通过 API 添加转码规则
```http
POST /api/v1/transcode/rules
Content-Type: application/json

{
    "streamPath": "camera1",
    "transform": {
        "input": {
            "mode": "rtsp"
        },
        "output": [
            {
                "target": "rtmp://localhost/trans/camera1/hd",
                "conf": "-c:a aac -c:v h264 -vf scale=1280:720 -b:v 2000k -b:a 128k"
            }
        ]
    }
}
```

## 注意事项
1. 确保硬件资源充足
2. 合理设置转码参数
3. 注意转码延迟
4. 监控系统负载
5. 定期检查转码质量

## 常见问题
1. 转码失败
   - 检查硬件状态
   - 验证转码参数
   - 确认输入流正常
2. 转码延迟
   - 优化转码参数
   - 使用硬件加速
   - 调整缓冲区大小
3. 转码质量
   - 检查码率设置
   - 验证分辨率
   - 确认编码参数