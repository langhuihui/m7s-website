<script setup>
import { ref } from 'vue'
import { menu } from '../constants'
const showWx = ref(false)
const showZf = ref(false)
</script>
<template>
  <div class="footer" id="footer">
    <div class="box">
      <div class="p1">
        <div class="item" >
          <a href="https://opencollective.com/monibuca" style="color: #fff;" target="_blank">Monibuca 开源社区</a>
        </div>
        <div class="item">
          <div class="title">支持我们</div>
          <div class="icon-list">
            <div class="hover" v-if="showWx">
              <img src="/images/m7s/footer/wx-pay.jpg" alt />
            </div>
            <div class="hover" v-if="showZf">
              <img src="/images/m7s/footer/zf-pay.jpg" alt />
            </div>
            <div class="icon" @mouseover="showWx = true" @mouseleave="showWx = false">
              <img v-if="!showWx" src="/images/m7s/footer/wx.png" alt />
              <img v-if="showWx" class="active" src="/images/m7s/footer/wx-active.png" alt />
            </div>
            <div class="icon" @mouseover="showZf = true" @mouseleave="showZf = false">
              <img v-if="!showZf" src="/images/m7s/footer/zf.png" alt />
              <img v-if="showZf" class="active" src="/images/m7s/footer/zf-active.png" alt />
            </div>
          </div>
        </div>
        <div class="item">
          <img class="qun" src="https://console.monibuca.com/api/files/wxqrcode.png" alt />
        </div>
         <div class="item">
          <img class="qun" src="/images/m7s/footer/qq-qun.jpeg" alt />
        </div>
      </div>
      <div class="p2">
        <div class="rights">Copyright © Monibuca 开发团队</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./index.less">
</style>
