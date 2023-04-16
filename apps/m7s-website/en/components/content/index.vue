<script lang="ts" setup>
import { UrlEnum } from '@m7s/shared/types'
import { ref, computed } from 'vue'
import Roles from '../Roles.vue'
const active = ref(0)
const active2 = ref(0)
const server = ref("localhost")
const streamPath = ref("live/test")
const pushProtocol = ref("rtmp")
const pullProtocol = ref("rtmp")
const list = [
  {
    title: 'Extremely Simple'
  },
  {
    title: 'Highly Scalable'
  },
  {
    title: 'Easy To Use'
  }
]
const list2 = ['Official plugins', 'Third-party open source', 'Paid plugins']
const url = ref({
  ...UrlEnum,
})

function change(index: number) {
  active.value = index
}

function change2(index: number) {
  active2.value = index
}

function init() {
  const time = setInterval(() => {
    if (active.value == 2) {
      active.value = 0
      clearInterval(time)
    } else active.value = active.value + 1
  }, 3000)
}

init()

function jump(url: string) {
  window.open(`https://github.com/Monibuca/${url}`)
}
function jump2(url: string) {
  window.open(url)
}
function onChangeServer(evt: Event) {
  server.value = evt.target.value
}
function onChangeStreamPath(evt) {
  streamPath.value = evt.target.value
}
function onChangePush(evt) {
  pushProtocol.value = evt.target.value
}
function onChangePull(evt) {
  pullProtocol.value = evt.target.value
}
const pushURL = computed(() => {
  switch (pushProtocol.value) {
    case "rtmp":
      return "rtmp://" + server.value + "/" + streamPath.value
    case "rtsp":
      return "rtsp://" + server.value + "/" + streamPath.value
  }
})
const pullURL = computed(() => {
  switch (pullProtocol.value) {
    case "rtmp":
      return "rtmp://" + server.value + "/" + streamPath.value
    case "rtsp":
      return "rtsp://" + server.value + "/" + streamPath.value
    case "hls":
      return "http://" + server.value + ":8080/hls/" + streamPath.value + ".m3u8"
    case "hdl":
      return "http://" + server.value + ":8080/hdl/" + streamPath.value + ".flv"
    case "ws-flv":
      return "ws://" + server.value + ":8080/jessica/" + streamPath.value + ".flv"
    case "ws-raw":
      return "ws://" + server.value + ":8080/jessica/" + streamPath.value
  }
})
const plugins = {
  rtmp: "Accept push and pull of RTMP protocol, and push and pull to external",
  rtsp: "Accept push and pull of RTSP protocol, and push and pull to external",
  hls: "1. Provide HLS protocol for pulling and playing streams. 2. Remotely pull HLS to m7s",
  gb28181: "GB28181 protocol for pulling and playing streams, and viewing recordings",
  onvif: "ONVIF protocol for pulling and playing streams",
  webrtc: "Push and pull of WebRTC protocol",
  webtransport: "Push and pull streams through WebTransport",
  record: "Recording function for HLS, FLV, MP4, raw stream format and playback",
  hdl: "1. HTTP-FLV format for pulling and playing streams. 2. Remotely pull HTTP-FLV to m7s",
  jessica: "1. Provide WS-FLV protocol for pulling and playing streams. 2. Provide WS-RAW protocol for pulling and playing streams.",
  fmp4: "Provide FMP4 format for pulling and playing streams",
  preview: "Provide real-time video preview capability with Jessibuca",
  snap: "Provide real-time screenshot capability for I-frame",
  room: "Provide room function to broadcast information to users in the room",
  hook: "Provide API hook callback capability to notify remote servers",
  exporter: "Provide monitoring data export capability, supporting Prometheus, InfluxDB, ElasticSearch",
  logrotate: "Provide log rotation capability",
  edge: "Use m7s instance as edge node",
  debug: "Provide debugging capability",
  monitor: "Provide monitoring data storage and access"
}
const plugins2 = [
  {
    name: "mpegts",
    desc: "Provides MPEG-TS format for pulling and playing streams",
    url: "https://github.com/kingecg/mpegts"
  },
  {
    name: "plugin-snapplug",
    desc: "Automatically generates video cover images when recording starts or ends",
    url: "https://github.com/3201301734/plugin-snapplug"
  },
  {
    name: "Vacancy",
    desc: "Contact the author to add to this list",
    url: ""
  }
]

const plugins3 = [
  {
    name: "transcode",
    desc: "Provides transcoding capabilities to convert streams to other formats"
  },
  {
    name: "cryptor",
    desc: "Provides encryption capabilities for streams"
  },
  {
    name: "gb28181pro",
    desc: "Provides cascade functionality for GB28181 protocol"
  },
  {
    name: "recordpro",
    desc: "Advanced recording plugin with additional features like scheduling"
  },
  {
    name: "Vacancy",
    desc: "Contact the author to add to this list"
  }
]
</script>

<template>
  <!--顶部导航 -->
  <div class="content">
    <section id="m7s">
      <div class="box">
        <div class="title">
          <div>Advantages</div>
          <img src="/images/m7s/title-bar.png" alt="">
        </div>
        <div class="m7s-feature">
          <div class="tab">
            <div class="item" @click="change(index)" v-for="(item, index) in list" :class="active == index ? 'active' : ''">{{ item.title }}</div>
          </div>
          <div class="m7s-item" v-if="active == 0">
            <div class="left">
              <div class="feature-desc">
                <div class="h1">Concise</div>
                <p>The Go language is known for its simplicity and pursuit of minimal and elegant code design, making it a pleasant experience to read the source code.</p>
<p>The project provides standardized access examples for easy plugin integration during startup.</p>
              </div>
              <a href="https://github.com/langhuihui/monibuca">
                <div class="btn">View example</div>
              </a>
            </div>
            <div class="right">
              <img src="/images/m7s/plugin-go-code.png" alt="" srcset="">
            </div>
          </div>
          <div class="m7s-item" v-if="active == 1">
            <div class="left">
              <div class="feature-desc">
                <div class="h1">Exquisite</div>
                <p>Exquisite plugin mechanism with high cohesion and low coupling, providing excellent scalability</p>
                <p>Designed with a lock-free approach and precise memory reuse, fully utilizing multi-core computing for powerful performance</p>
              </div>
              <a href="https://github.com/Monibuca">
                <div class="btn">Github</div>
              </a>
            </div>
            <div class="right">
              <Roles class="role" />
            </div>
          </div>
          <div class="m7s-item" v-if="active == 2">
            <div class="left">
              <div class="feature-desc">
                <div class="h1">Easy to Use</div>
                <p>No configuration of environment or installation of runtime is required. Simply download the executable file.</p>
                <p>Provides a considerate compilation version for ARM architecture, which can be downloaded and run directly.</p>
              </div>
              <a href="https://github.com/langhuihui/monibuca/releases">
                <div class="btn">All Versions</div>
              </a>
            </div>
            <div class="right">
              <div class="download">
                <div class="download-item windows">
                  <a class="iconfont icon-windows" :href="url.M7S_WIN"></a>
                </div>
                <div class="download-item apple">
                  <a class="iconfont icon-apple" :href="url.M7S_IOS"></a>
                </div>
                <div class="download-item linux">
                  <a class="iconfont icon-linux" :href="url.M7S_LINUX"></a>
                </div>
              </div>
              <div class="download-desc">For Windows, simply double-click the .exe file to run it. For Mac, you may need to set the executable permission for the file in order to run it.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="plugin">
      <div class="box">
        <div class="title">
          <div>Plugin Ecosystem</div>
          <img src="/images/m7s/title-bar.png" alt="">
        </div>
        <div class="tab">
            <div class="item" @click="change2(index)" v-for="(item, index) in list2" :class="active2 == index ? 'active' : ''">{{ item }}</div>
        </div>
        <div class="plugin-content"  v-if="active2 == 0">
          <div class="plugin-item" @click="jump('plugin-' + name)" v-for="(item, name) in plugins">
            <img class="plugin-item-logo" src="/images/m7s/plugin.png" />
            <div class="plugin-item-title">plugin-{{ name }}</div>
            <div class="plugin-item-content">{{ item }}</div>
          </div>
        </div>
        <div class="plugin-content"  v-if="active2 == 1">
          <div class="plugin-item" @click="jump2(item.url)" v-for="(item) in plugins2">
            <img class="plugin-item-logo" src="/images/m7s/plugin.png" />
            <div class="plugin-item-title">{{ item.name }}</div>
            <div class="plugin-item-content">{{ item.desc }}</div>
          </div>
        </div>
        <div class="plugin-content"  v-if="active2 == 2">
          <div class="plugin-item" v-for="(item) in plugins3">
            <img class="plugin-item-logo" src="/images/m7s/plugin.png" />
            <div class="plugin-item-title">{{ item.name }}</div>
            <div class="plugin-item-content">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="stream-path">
      <div class="box">
        <div class="title">
          <div>Push-pull address generation</div>
          <img src="/images/m7s/title-bar.png" alt="">
        </div>
        <div class="stream-path-content">
          <div>
            <div>Choosing a push protocol:</div>
            <select @change="onChangePush">
              <option value="rtmp">rtmp</option>
              <option value="rtsp">rtsp</option>
            </select>
            <div>Push url: </div>
            <div class="URL">{{ pushURL }}</div>
          </div>
          <div>
            <div>Server:</div>
            <input type="text" class="stream-path-input" :value="server" @input="onChangeServer" />
            <div>StreamPath:</div>
            <input type="text" class="stream-path-input" :value="streamPath" @input="onChangeStreamPath" />
          </div>
          <div>
            <div>Choosing a pull protocol:</div>
            <select @change="onChangePull">
              <option value="rtmp">rtmp</option>
              <option value="rtsp">rtsp</option>
              <option value="hls">hls</option>
              <option value="hdl">hdl</option>
              <option value="ws-flv">ws-flv</option>
              <option value="ws-raw">ws-raw</option>
            </select>
            <div>Pull url: </div>
            <div class="URL">{{ pullURL }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="less" scoped src="./index.less">
</style>
