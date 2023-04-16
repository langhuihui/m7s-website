# Streaming Issues

- For ffmpeg streaming, please add -c:v h264 -c:a aac; otherwise, the output video format cannot be used.
- StreamPath must be in the form of live/test. It cannot have only one level, or start with a slash, such as /live is incorrect.