# Room Plugin

Can be used for video conferencing and other real-time video scenarios.

## Plugin Address
https://github.com/Monibuca/plugin-room

## Plugin Introduction
```go
    import (  _ "m7s.live/plugin/room/v4" )
```

## Configuration

The default configuration is as follows:
```yaml
room:
  subscribe: # The room is a special stream, only subscribe to the data track for signaling transmission
    subaudio: false # By default, audio is not subscribed
    subvideo: false # By default, video is not subscribed
  http: # Use global http configuration by default
    listenaddr: :8080
    listenaddrtls: ""
    certfile: ""
    keyfile: ""
    cors: true
    username: ""
    password: ""
  appname: room # The AppName (StreamPath=AppName/RoomID) for the stream used for broadcasting data in the room
  size: 20 # Room size (maximum number of people)
  private: {} # Private room configuration, the key is the room ID, and the value is the password
  verify: # Remote request for admission verification
    url: ""
    method: ""
    header: {}
```

## Plugin Usage
Establish a connection with this plugin through WebSocket, as follows:
- `ws://localhost:8080/room/[roomID]/[userID]` Establish a connection, if it is a private room, you need to carry the password（?password=xxx).
- After the connection is established, the client receives `{"data":{"token":"4f8990a1-e7ae-4926-81b0-a3ab191c8e3b","userList":[]},"event":"joined"}`, indicating that joining the room is successful, and the token is used as a parameter for publishing streams. 
   - When a user enters the room, the client will receive `{"data":{"ID":"xxx","StreamPath":"xxx"},"event":"userjoin"}` to notify that the user has entered the room. Data is user information.
   - When a user leaves the room, the client will receive `{"userId":xxx,"event":"userleave"}` to notify that the user has left the room. UserId represents the ID of the user who left.
   - When a user publishes a stream, others in the room will receive the event: `{"data":"[streamPath]","event":"publish","userId":"dexter"}`, and users can choose to subscribe to this stream.
- After entering the room, you can send any text data through WebSocket, which will be broadcast to other users in the room (including yourself). Format: `{"data":"abc","event":"msg","userId":"dexter"}`
- You can publish a video stream in the room. When publishing it, you need to carry the token parameter after StreamPath.