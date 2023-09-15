<script setup>
import { ref } from 'vue';
const showWx = ref(false);
const showZf = ref(false);
</script>
<template>
  <div class="footer" id="footer">
    <div class="box">
      <div class="p1">
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
          <img class="qun" src="/images/m7s/footer/wx-mp.jpg" alt />
          <div class="pic">关注公众号获取更多信息</div>
        </div>
        <div class="item">
          <img class="qun" src="/images/m7s/footer/qqgroup.jpg" alt />
          <div class="pic">加入QQ频道互动交流
          </div>
        </div>
        <div class="item">
          <img class="qun" src="/images/m7s/footer/qq-qun.jpeg" alt />
          <div class="pic">QQ群</div>
        </div>
      </div>
      <div class="p2">
        <div class="rights">@2023 Monibuca All Rights Reserved 南京莫妮不卡科技有限公司</div>
        <div style="margin:0 auto;">
          <a href="https://beian.miit.gov.cn/" target="_blank" style="display:inline-block;color:#939393;height:20px;line-height:20px;">
            <p style="float:left;height:20px;line-height:20px;margin: 0px 5px 0px 5px; color:#939393;">苏ICP备2023025807号-1</p>
          </a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011302321580"
            style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/images/beian.png"
              style="float:left;" />
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">苏公网安备
              32011302321580号</p>
          </a>
        </div>
      </div>
  </div>
</div></template>
<style lang="less" scoped src="./index.less"></style>
