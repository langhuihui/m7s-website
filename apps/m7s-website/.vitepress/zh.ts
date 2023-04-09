import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './constants';
import { sidebar } from './sidebar/zh'

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  dir: "../zh",

  themeConfig: {
    nav,
    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/Monibuca/' }],

    editLink: {
      pattern: 'https://github.com/langhuihui/m7s-website/edit/main/apps/m7s-website/src/:path',
      text: '在 Github 编辑此页'
    }
  },
}
