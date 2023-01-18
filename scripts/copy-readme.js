#! node
const fs = require('fs');

const list = ['gb28181', 'rtsp', 'rtmp', 'hdl', 'hls', 'room', 'debug', 'record', 'logrotate', 'jessica', 'webrtc', 'webtransport', 'hook', 'preview', 'snap', 'edge', 'exporter', 'fmp4'];
list.forEach(item => {
  fs.copyFileSync(`../plugin-${item}/README.md`, `./apps/m7s-website/src/guide/plugins/${item}.md`);
});

