# A Brief History of My Blog

The birth of Monibuca can be traced back to 2006...

## Developing Flash Video Conference System

Initially, I developed a Flash video conference system using Flash Communication Server (FCS) which was later renamed as Flash Media Server (FMS), as the streaming media server. At that time, a majority of business logic could be directly written into the script to execute. FMS was a high-performance server with clustering functionality. However, it was expensive. Therefore, the open-source Java-based Red5 was created. The biggest disadvantage of Red5 was poor performance. While reading Red5 source code, I gained insights about the entire RTMP protocol.

## Porting CRTMPserver

Due to budget constraints, the company did not allow the use of FMS as the server. As a result, an open-source RTMP server, CRTMPserver was used instead. This server had excellent performance, and could be extended easily to implement some of FMS's functions such as shared object.

## Birth of H5 Player

This player is the root of everything. Though I have not yet made this player open source, it has always been the driving force behind my research and development of streaming media servers. The first time I encountered the open-source project [https://github.com/mbebenita/Broadway](https://github.com/mbebenita/Broadway), which compiled `H264` decoding program into `js` through `emscripten` and decoded and played `H264` videos on the browser side. Based on this, I implemented the `js` compilation of the RTMP protocol and transmitted it through `websocket`. Later, I thought that there was no need to implement RTMP, as it was enough to transmit raw data through `websocket`. This could save bandwidth and reduce the decoding pressure on the browser. I gradually integrated the audio decoding program into the player, and finally integrated the `h265` decoding program. There are two `h265` decoding programs, namely `lib265` and `libhevc`. They are now open source at [https://github.com/langhuihui/jessibuca](https://github.com/langhuihui/jessibuca).

## Copying CRTMPserver with C#

In order to better expand the functionality, and based on my enthusiasm for C#, I ported most of CRTMPserver's functions to C# [https://github.com/langhuihui/csharprtmp](https://github.com/langhuihui/csharprtmp). During this process, I gained a deep understanding of multi-threading, RTMP protocol, and AMF protocol. However, due to my lack of experience, the server was not very stable.

## Extending MonaServer

In order to save bandwidth, I started to study the RTMFP protocol. Then I discovered the `OpenRTMFP`, also known as the `Cumulus Server`. This project quickly turned into MonaServer, which used more modern `C++` programming than `crtmpserver` and was easier to develop. Therefore, I chose this server for secondary development, and once again implemented some of FMS's functions, and transmitted audio and video raw data to the H5 player through `WebSocket`. However, I always had memory leaks, which prevented it from being commercially used.

## Meeting SRS

By chance, I encountered this powerful server, which could convert `srs`'s `http-flv` into the transmission of `flv` through `websocket` by a `go` program, and connect it to my H5 player. However, after one forwarding, I felt unsatisfied and wanted to modify SRS. But SRS code was difficult to read. This is not to criticize SRS, but rather my own lack of expertise in C++.

## Node-Media-Server vs. Gortmp

With the fall of Flash, I switched to Node.js and discovered a streaming media server, Node-Media-Server, written in Node.js, which was still in the early stages of development. I chatted with the author a lot, and even forked the project, wanting to perform secondary development on it. However, with the rise of `go` language, many streaming media servers written in `go` came out. After comparing various `go` projects, I finally chose Gortmp as the basis for secondary development.

## Influenced by Vue Progressive Thinking

Gortmp was quickly and easily developed into a good experience, which gave me an insight. After so many rounds of secondary development, secondary development of streaming media servers is a very difficult task. `Go` has opened a new door, but it does not meet the need for quick customization by anyone. The progressive development idea of `vue` was great. Inspired by this, I separated the core and peripheral functions of the streaming media server and achieved a plug-in framework design.