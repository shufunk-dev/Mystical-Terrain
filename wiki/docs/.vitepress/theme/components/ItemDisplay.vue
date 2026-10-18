<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id: string
  name?: string
  texture?: string
  count?: number
}>()

const resolvedTexture = computed(() => {
  if (props.texture) return props.texture
  const clean = props.id.replace('mysticalterrain:', '')
  if (props.id.startsWith('minecraft:')) {
    const mcId = props.id.replace('minecraft:', '')
    return `/textures/minecraft/item/${mcId}.png`
  }
  return `/textures/item/${clean}.png`
})

const resolvedName = computed(() => {
  if (props.name) return props.name
  const clean = props.id.replace('mysticalterrain:', '').replace('minecraft:', '')
  return clean
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
})
</script>

<template>
  <span class="item-display-badge">
    <img :src="resolvedTexture" :alt="resolvedName" class="mc-pixel" />
    <span class="item-name">{{ resolvedName }}</span>
    <span v-if="count && count > 1" class="item-count">x{{ count }}</span>
  </span>
</template>

<style scoped>
.item-display-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(26, 30, 48, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 2px 8px;
  border-radius: 6px;
  vertical-align: middle;
  font-size: 0.88rem;
  color: #e2e8f0;
  transition: all 0.2s ease;
}

.item-display-badge:hover {
  background: rgba(42, 46, 70, 0.9);
  border-color: rgba(167, 139, 250, 0.6);
  transform: translateY(-1px);
}

.item-display-badge img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.item-name {
  font-weight: 500;
}

.item-count {
  color: #a78bfa;
  font-weight: 700;
  font-family: monospace;
}
</style>
