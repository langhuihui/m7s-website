<script setup lang="ts">
const data = [
  {
    title: "快速上手",
    children: [
      {
        title: '📖 介绍',
        content: '什么是Monibuca',
        href: '/guide/introduction.html',
      },
      {
        title: '⏬ 下载',
        content: '安装与运行',
        href: '/guide/startup.html',
      },
      {
        title: '💿 版本',
        content: '最新版本和更新记录',
        href: '/guide/v4.html',
      },
    ]
  },
  {
    title: "使用手册",
    children: [
      {
        title: '🛠️ 配置',
        content: '配置文件如何修改',
        href: '/guide/config.html',
      },
      {
        title: '🔑 API',
        content: '通过HTTP请求控制Monibuca',
        href: '/guide/api.html',
      },
      {
        title: '🔐 鉴权',
        content: '对推拉流安全性控制',
        href: '/guide/authentication.html'
      },
    ]
  },
  {
    title: "常见问题",
    children: [
      {
        title: '💢 崩溃',
        content: '程序崩溃后如何找到崩溃的原因',
        href: '/guide/qa/error.html',
      },
      {
        title: '🎥 推流',
        content: '推流时需要注意什么',
        href: '/guide/qa/push.html',
      },
      {
        title: '🖥️ 播放',
        content: '播放地址是什么？',
        href: '/guide/qa/play.html'
      },
    ]
  },
  {
    title: "二次开发",
    children: [
      {
        title: '🦾 开发准备',
        content: 'IDE、语言、环境',
        href: '/devel/startup.html',
      },
      {
        title: '🧩 定义插件',
        content: '如何定义一个插件',
        href: '/devel/plugin.html',
      },
      {
        title: '🔌 插件接口',
        content: '如何对外提供HTTP接口',
        href: '/devel/api.html'
      },
    ]
  },
];
</script>

<template>
  <n-space vertical style="margin:30px">
    <n-descriptions label-placement="top" v-for="item in data" :title="item.title">
      <n-descriptions-item v-for="child in item.children">
        <template #label>
          <a :href="child.href">
            <n-card :title="child.title" hoverable content-style="color:gray">
              {{ child.content }}
            </n-card>
          </a>
        </template>
      </n-descriptions-item>
    </n-descriptions>
  </n-space>
</template>

<style>
body {
  background-color: rgb(240, 240, 240);
}

a {
  text-decoration: none;
}

.n-card {
  width: 300px;
  margin: 30px;
}
</style>
