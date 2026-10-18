import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Mystical Terrain',
  description: 'Official Documentation & Encyclopedia for Mystical Terrain (Minecraft 1.21.2+ / 1.21.11)',
  appearance: 'force-dark',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/icon.png' }],
    ['meta', { name: 'theme-color', content: '#8b5cf6' }],
    ['meta', { property: 'og:title', content: 'Mystical Terrain Official Wiki' }],
    ['meta', { property: 'og:description', content: 'Explore procedural space-colonization trees, 10 realm colossi, and custom rituals.' }]
  ],
  themeConfig: {
    logo: '/icon.png',
    siteTitle: 'Mystical Terrain',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'World & Biomes',
        items: [
          { text: 'World Generation & Trees', link: '/worldgen/' },
          { text: 'Biomes Encyclopedia', link: '/biomes/' }
        ]
      },
      {
        text: 'Bosses & Rituals',
        items: [
          { text: 'The 10 Realm Colossi', link: '/bosses/' },
          { text: 'Void Dragon Rework', link: '/bosses/void-dragon' },
          { text: 'Ritual Altars & Catalysts', link: '/rituals/' }
        ]
      },
      { text: 'Portals', link: '/portals/' },
      { text: 'Items & Gear', link: '/items/' },
      {
        text: 'ShuDynamics Wiki ↗',
        link: 'https://shudynamics.shufunk.net'
      }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Overview & Compatibility', link: '/' },
          { text: 'Commands & Cheatsheet', link: '/getting-started/commands' }
        ]
      },
      {
        text: 'World Generation',
        collapsed: false,
        items: [
          { text: 'Space-Colonization Trees', link: '/worldgen/' },
          { text: 'Landscape Formations', link: '/worldgen/formations' }
        ]
      },
      {
        text: 'Biomes',
        collapsed: false,
        items: [
          { text: 'Biome Overview & TerraBlender', link: '/biomes/' },
          { text: 'Overworld Sanctuaries', link: '/biomes/overworld' },
          { text: 'Nether & The End Realms', link: '/biomes/nether-end' }
        ]
      },
      {
        text: 'Colossi & Boss Encounters',
        collapsed: false,
        items: [
          { text: 'The 10 Realm Colossi', link: '/bosses/' },
          { text: 'Overhauled Void Dragon', link: '/bosses/void-dragon' }
        ]
      },
      {
        text: 'Rituals & Catalysts',
        collapsed: false,
        items: [
          { text: 'Ritual Altar Multiblock', link: '/rituals/' },
          { text: 'Summoning Catalysts', link: '/rituals/catalysts' }
        ]
      },
      {
        text: 'Dimensional Portals',
        collapsed: false,
        items: [
          { text: 'Gateway Ignition & Anchoring', link: '/portals/' }
        ]
      },
      {
        text: 'Materials & Equipment',
        collapsed: false,
        items: [
          { text: 'Unique Weapon Archetypes', link: '/items/' },
          { text: 'Rune & Regalia Armor Sets', link: '/items/armor' },
          { text: 'Crafting & Recipes Directory', link: '/items/recipes' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shufunk-dev/Mystical-Terrain' }
    ],

    footer: {
      message: 'Mystical Terrain (Community Patch Edition) | Sister mod of <a href="https://shudynamics.shufunk.net" target="_blank" style="color: #a78bfa; font-weight: 600;">ShuDynamics</a>',
      copyright: 'Released under CC0-1.0 Public Domain. Originally created by VexiraRBX.'
    }
  }
})
