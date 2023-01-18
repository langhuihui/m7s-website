<template>
  <a class="VPNavBarTitle" href="/">
    <Logo></Logo>
    <div class="logo">Monibuca
      <span class="version">v4</span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { Logo } from '@m7s/ui/vue'
</script>


<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.6;
}

.logo {
  margin-left: 10px;
  font-size: 30px;
  position: relative;
}
::v-deep .cls-1 {
  color: #000 !important;
}

.logo + .text {
  padding-left: 8px;
}

.text {
  font-size: 16px;
  font-weight: 500;
}
.beta {
  margin-left: 3px;
  font-size: 16px;
  padding:0 4px;
  font-weight: 500;
  border-radius: 5px;
  border: rgb(255, 213, 4) solid 1px;
  color: rgb(255, 255, 255);
  background-color: darkred
}
</style>
