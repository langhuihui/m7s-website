import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'
import { nav } from './constants'
import { sidebar } from './sidebar/en'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  dir: "../en",

  themeConfig: {
    nav,
    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/Monibuca/' }],

    editLink: {
      pattern:
        'https://github.com/langhuihui/m7s-website/edit/main/apps/m7s-website/src/:path',
      text: 'Edit this page on GitHub'
    }
  }
}
