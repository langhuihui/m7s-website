import './styles/index.css'
import './styles/iconfont/iconfont.css'
import { h, App } from 'vue'
import { VPTheme } from '@m7s/theme'
import Mermaid from "vitepress-plugin-mermaid/Mermaid.vue"

import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'


export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('Mermaid', Mermaid)
     app.provide('prefer-composition', preferComposition)
     app.provide('prefer-sfc', preferSFC)
     app.provide('filter-headers', filterHeadersByPreference)
  }
})
