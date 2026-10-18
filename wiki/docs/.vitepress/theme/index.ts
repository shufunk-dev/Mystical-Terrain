import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import MinecraftRecipe from './components/MinecraftRecipe.vue'
import ItemDisplay from './components/ItemDisplay.vue'
import BossCard from './components/BossCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MinecraftRecipe', MinecraftRecipe)
    app.component('ItemDisplay', ItemDisplay)
    app.component('BossCard', BossCard)
  }
} satisfies Theme
