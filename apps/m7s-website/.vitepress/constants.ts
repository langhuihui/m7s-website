import { NavItem } from "@vue/theme/src/vitepress/config";

const data = [
  {
    name: '视频教程',
    children: [
      {
        name: 'B站视频',
        url: 'https://space.bilibili.com/328443019/channel/collectiondetail?sid=514619'
      },
      { name: 'RTS分享', url: 'https://www.bilibili.com/video/BV1jg411H7qE/' }
    ]
  },
  {
    name: '不卡系列',
    children: [
      { name: 'Monibuca', url: 'https://monibuca.com' },
      { name: 'Jessibuca', url: 'https://jessibuca.com' },
      { name: 'Rebebuca', url: 'https://rebebuca.com' }
    ]
  },
  {
    name: '下载',
    children: [
      {
        name: 'Windows',
        url: 'https://download.m7s.live/bin/m7s_windows_amd64.tar.gz'
      },
      {
        name: 'Mac',
        url: 'https://download.m7s.live/bin/m7s_darwin_amd64.tar.gz'
      },
      {
        name: 'Mac(arm64)',
        url: 'https://download.m7s.live/bin/m7s_darwin_arm64.tar.gz'
      },
      {
        name: 'Linux',
        url: 'https://download.m7s.live/bin/m7s_linux_amd64.tar.gz'
      },
      {
        name: 'Linux(arm64)',
        url: 'https://download.m7s.live/bin/m7s_linux_arm64.tar.gz'
      }
    ]
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
        url: child.url + '.html',
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
        link: child.url,
        target: child.url.startsWith('#') ? '_self' : '_blank'
      }))
    };
  }
  return {
    text: item.name,
    link: item.url,
    target: item.url.startsWith('#') ? '_self' : '_blank'
  };
});