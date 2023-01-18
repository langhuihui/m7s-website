<script lang="ts" setup>
import { Logo } from '@m7s/ui/vue'
import { menu } from '../constants'
</script>

<template>
  <!--顶部导航 -->
  <div class="main">
    <div class="box">
      <div class="left">
        <Logo></Logo>
        <div class="logo">Monibuca</div>
      </div>
      <div class="right">
        <div v-for="(item, index) in menu" :key="index" class="item">
          <template v-if="item.children">
            <span>{{ item.name }}</span>
            <div class="nav-sheet-container">
              <a target="_blank" :href="j.url" v-for="(j, i) in item.children" :key="i" class="nav-sheet-item">{{ j.name }}</a>
            </div>
          </template>
          <span v-else><a target="_blank" :href="item.url" class="nav-sheet-item">{{ item.name }}</a></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped src="./index.less">
</style>
