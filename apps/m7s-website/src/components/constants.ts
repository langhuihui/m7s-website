import { NavItem } from "@vue/theme/src/vitepress/config";

const data = [
  { name: '首页', url: '/' },
  {
    name: '文档',
    activeMatch: `^/(guide)/`,
    children: [
      { name: '使用指南', url: '/guide/introduction' },
      { name: '开发指南', url: '/devel/startup' }
    ]
  },
  {
    name: 'B站视频',
    children: [
      {
        name: '视频教程',
        url: 'https://space.bilibili.com/328443019/channel/collectiondetail?sid=514619'
      },
      { name: 'RTS分享', url: 'https://www.bilibili.com/video/BV1jg411H7qE/' }
    ]
  },
  {
    name: '不卡系列',
    children: [
      { name: 'Monibuca', url: '/' },
      { name: 'Jessibuca', url: 'https://jessibuca.com' },
      { name: 'Rebebuca', url: 'https://rebebuca.com' }
    ]
  },
  {
    name: '下载',
    children: [
      {
        name: 'Windows',
        url: 'https://m7s.live/bin/m7s_windows_amd64.tar.gz'
      },
      {
        name: 'Mac',
        url: 'https://m7s.live/bin/m7s_darwin_amd64.tar.gz'
      },
      {
        name: 'Mac(arm64)',
        url: 'https://m7s.live/bin/m7s_darwin_arm64.tar.gz'
      },
      {
        name: 'Linux',
        url: 'https://m7s.live/bin/m7s_linux_amd64.tar.gz'
      },
      {
        name: 'Linux(arm64)',
        url: 'https://m7s.live/bin/m7s_linux_arm64.tar.gz'
      }
    ]
  },
  {
    name: '控制台',
    url: 'https://console.monibuca.com'
  },
  {
    name: '关于',
    activeMatch: `^/(about)/`,
    children: [
      { name: 'FAQ', url: '/about/faq' },
      { name: '开发团队', url: '/about/team' },
      { name: '诞生故事', url: '/about/born' }
    ]
  }
];

export const menu = data.slice(1).map((item) => {
  if (item.activeMatch) {
    const result = {
      name: item.name,
      children: item.children?.map((child) => ({
        name: child.name,
        url: child.url + '.html'
      }))
    };
    return result;
  }
  return item;
});
export const nav = data.map<NavItem>((item) => {
  if (item.children) {
    return {
      text: item.name,
      items: item.children.map((child) => ({
        text: child.name,
        link: child.url
      }))
    };
  }
  return  {
    text: item.name,
    link: item.url,
  };
});
