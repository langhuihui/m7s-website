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
        <div class="rights">@2023 Monibuca All Rights Reserved 南京莫妮不卡科技有限公司 <a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2023025807号-1</a></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./index.less"></style>
