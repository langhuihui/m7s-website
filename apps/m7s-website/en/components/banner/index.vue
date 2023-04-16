<template>
  <!--顶部导航 -->
  <div class="banner" id="banner">
    <div class="box">
      <div class="left">
        <div class="item-1">
          Monibuca
        </div>
        <div class="item-2">Open-source development framework for Go language multimedia servers.</div>
        <div class="item-3">
          <slot>
            <span>Latest version: v4.5.2</span>
          </slot>
        </div>
        <div class="flex">
          <a href="https://m7s.live/guide/introduction.html" target="_blank">
            <div class="item-4">Quick Started</div>
          </a>
          <a href="https://github.com/langhuihui/monibuca" target="_blank" style="margin-left: 20px;">
            <div class="item-4">Github</div>
          </a>
        </div>
        <div class="item-5">
          Monibuca is an open-source development framework for Go language multimedia servers. It aims to provide a developer-friendly and high-performance solution for companies and individuals who want to quickly get started with multimedia development. The philosophy behind Monibuca is co-building and mutual benefit, creating an ecosystem of business reuse and lowering the high cost of repetitive development in the audio and video industry for enterprises.
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
