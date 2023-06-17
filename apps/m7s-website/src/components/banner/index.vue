<template>
  <!--顶部导航 -->
  <div class="banner" id="banner">
    <div class="box">
      <div class="left">
        <div class="item-1">
          Monibuca
        </div>
        <div class="item-2">开源Go语言流媒体服务器开发框架</div>
        <div class="item-3">
          <slot>
            <a href="https://mp.weixin.qq.com/s/pLiZedUeibYoccyIqP6mog">v4.6.4 发布说明</a>
          </slot>
        </div>
        <div class="flex">
          <a href="https://m7s.live/guide/introduction.html" target="_blank">
            <div class="item-4">快速开始</div>
          </a>
          <a href="https://github.com/langhuihui/monibuca" target="_blank" style="margin-left: 20px;">
            <div class="item-4">Github</div>
          </a>
        </div>
        <div class="item-5">
          旨在提供一个对开发者友好，兼具高性能的流媒体服务器开发框架，对于想快速入门流媒体开发的公司和个人提供一个低门槛的方案。Monibuca 的理念是共建共赢，平等互利，打造一个行业业务复用生态环境，降低企业在音视频领域重复开发付出的高昂成本。
        </div>
      </div>
      <div class="right">
        <Image/>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="./index.less"></style>
<script lang="ts" setup>
import Image from './Image.vue'

</script>
