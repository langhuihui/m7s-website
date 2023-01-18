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
    title: '极致简洁'
  },
  {
    title: '高可扩展'
  },
  {
    title: '简单易用'
  }
]
const list2 = ['官方插件','第三方开源','收费插件']
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
  rtmp: "rtmp协议接受推拉、对外推拉",
  rtsp: "rtsp协议接受推拉、对外推拉",
  hls: "1、提供HLS协议拉流播放。2、远程拉取HLS到m7s",
  gb28181: "GB28181协议拉流播放、查看录像",
  webrtc: "WebRTC协议的推流和拉流",
  webtransport: "通过WebTransport进行推拉流",
  record: "hls、flv、mp4、裸流格式录制功能以及回放",
  hdl: "1、HTTP-FLV格式拉流播放。2、远程拉取HTTP-FLV到m7s",
  jessica: "1、提供WS-FLV协议拉流播放。2、提供WS-RAW协议拉流播放。",
  fmp4: "提供FMP4格式拉流播放",
  preview: "借助Jessibuca提供视频实时预览能力",
  snap: "提供对I帧的实时截图能力",
  room: "提供房间功能，可以向房间内用户广播信息",
  hook: "提供API钩子回调能力，通知远程服务器",
  exporter: "提供监控数据导出能力，支持Prometheus、InfluxDB、ElasticSearch",
  logrotate: "提供日志轮转能力",
  edge: "可以m7s实例作为边缘节点",
  debug: "提供调试能力"
}
const plugins2 = [
  {
    name:"mpegts",
    desc:"提供MPEG-TS格式拉流播放",
    url:"https://github.com/kingecg/mpegts"
  },
  {
    name:"虚位以待",
    desc:"可联系作者添加到此列表",
    url:""
  }
]
const plugins3 = [
  {
    name:"transcode",
    desc: "提供转码能力，可以将流转码为其他格式",
  },
  {
    name:"虚位以待",
    desc:"可联系作者添加到此列表",
  }
]
</script>

<template>
  <!--顶部导航 -->
  <div class="content">
    <section id="m7s">
      <div class="box">
        <div class="title">
          <div>优势</div>
          <img src="/images/m7s/title-bar.png" alt="">
        </div>
        <div class="m7s-feature">
          <div class="tab">
            <div class="item" @click="change(index)" v-for="(item, index) in list" :class="active == index ? 'active' : ''">{{ item.title }}</div>
          </div>
          <div class="m7s-item" v-if="active == 0">
            <div class="left">
              <div class="feature-desc">
                <div class="h1">简洁</div>
                <p>Go语言本身的简洁+代码设计追求极致精简、优雅，阅读源码变成一件愉快的事</p>
                <p>启动工程提供了标准化的接入示例，插件引入十分简单</p>
              </div>
              <a href="https://github.com/langhuihui/monibuca">
                <div class="btn">查看示例</div>
              </a>
            </div>
            <div class="right">
              <img src="/images/m7s/plugin-go-code.png" alt="" srcset="">
            </div>
          </div>
          <div class="m7s-item" v-if="active == 1">
            <div class="left">
              <div class="feature-desc">
                <div class="h1">精致</div>
                <p>设计精巧的插件机制，实现高内聚低耦合，具有高超的扩展能力</p>
                <p>无锁化设计以及手术刀般精确的内存复用，充分利用多核计算，性能强悍</p>
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
                <div class="h1">易用</div>
                <p>无需配置环境，无需安装运行时，直接下载可执行文件</p>
                <p>为arm架构提供贴心的编译版本，可以直接下载运行</p>
              </div>
              <a href="https://github.com/langhuihui/monibuca/releases">
                <div class="btn">所有版本</div>
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
              <div class="download-desc">windows直接双击exe运行，mac需要设置一下文件的可执行权限</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="plugin">
      <div class="box">
        <div class="title">
          <div>插件生态</div>
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
          <div class="plugin-item" @click="jump2(item.url)" v-for="(item, name) in plugins2">
            <img class="plugin-item-logo" src="/images/m7s/plugin.png" />
            <div class="plugin-item-title">{{ item.name }}</div>
            <div class="plugin-item-content">{{ item.desc }}</div>
          </div>
        </div>
        <div class="plugin-content"  v-if="active2 == 2">
          <div class="plugin-item" v-for="(item, name) in plugins3">
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
          <div>推拉地址生成</div>
          <img src="/images/m7s/title-bar.png" alt="">
        </div>
        <div class="stream-path-content">
          <div>
            <div>选择推流协议：</div>
            <select @change="onChangePush">
              <option value="rtmp">rtmp</option>
              <option value="rtsp">rtsp</option>
            </select>
            <div>推流地址：</div>
            <div class="URL">{{ pushURL }}</div>
          </div>
          <div>
            <div>Server:</div>
            <input type="text" class="stream-path-input" :value="server" @input="onChangeServer" />
            <div>StreamPath:</div>
            <input type="text" class="stream-path-input" :value="streamPath" @input="onChangeStreamPath" />
          </div>
          <div>
            <div>选择拉流协议：</div>
            <select @change="onChangePull">
              <option value="rtmp">rtmp</option>
              <option value="rtsp">rtsp</option>
              <option value="hls">hls</option>
              <option value="hdl">hdl</option>
              <option value="ws-flv">ws-flv</option>
              <option value="ws-raw">ws-raw</option>
            </select>
            <div>拉流地址：</div>
            <div class="URL">{{ pullURL }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="less" scoped src="./index.less">
</style>
