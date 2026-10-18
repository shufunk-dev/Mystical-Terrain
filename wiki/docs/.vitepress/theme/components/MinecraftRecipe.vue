<script setup lang="ts">
import { computed } from 'vue'
import recipesData from '../../data/recipes.json'

interface SlotItem {
  id: string
  name: string
  texture: string
  count?: number
}

const props = defineProps<{
  id?: string
  title?: string
  type?: string
  result?: SlotItem
  grid?: (SlotItem | null)[]
  ingredients?: SlotItem[]
  ingredient?: SlotItem
}>()

const recipe = computed(() => {
  if (props.id) {
    const cleanId = props.id.replace('mysticalterrain:', '')
    const found = (recipesData as any).byId?.[cleanId] || (recipesData as any).byId?.[props.id]
    if (found) return found
  }
  return {
    type: props.type || 'minecraft:crafting_shaped',
    result: props.result,
    grid: props.grid || Array(9).fill(null),
    ingredients: props.ingredients || [],
    ingredient: props.ingredient
  }
})

const recipeTitle = computed(() => {
  if (props.title) return props.title
  if (recipe.value?.result?.name) {
    return `${recipe.value.result.name} Recipe`
  }
  return 'Crafting Recipe'
})
</script>

<template>
  <div class="mc-recipe-container">
    <div class="mc-recipe-title">
      <span>{{ recipeTitle }}</span>
      <span class="badge-purple">{{ (recipe?.type || 'crafting').split(':').pop()?.replace('_', ' ') }}</span>
    </div>

    <div class="mc-recipe-body">
      <!-- 3x3 Shaped Crafting Grid -->
      <div v-if="recipe?.type === 'minecraft:crafting_shaped'" class="mc-grid-3x3">
        <div v-for="(slot, idx) in (recipe.grid || Array(9).fill(null))" :key="idx" class="mc-slot">
          <template v-if="slot">
            <img :src="slot.texture" :alt="slot.name" class="mc-pixel" />
            <span v-if="slot.count && slot.count > 1" class="slot-count">{{ slot.count }}</span>
            <div class="mc-tooltip">{{ slot.name }}</div>
          </template>
        </div>
      </div>

      <!-- Shapeless Crafting Grid -->
      <div v-else-if="recipe?.type === 'minecraft:crafting_shapeless'" class="mc-grid-shapeless">
        <div v-for="(slot, idx) in (recipe.ingredients || [])" :key="idx" class="mc-slot">
          <img :src="slot.texture" :alt="slot.name" class="mc-pixel" />
          <span v-if="slot.count && slot.count > 1" class="slot-count">{{ slot.count }}</span>
          <div class="mc-tooltip">{{ slot.name }}</div>
        </div>
      </div>

      <!-- Stonecutting / Single Input -->
      <div v-else-if="recipe?.type === 'minecraft:stonecutting'" class="mc-grid-shapeless" style="max-width: 60px;">
        <div v-if="recipe.ingredient" class="mc-slot">
          <img :src="recipe.ingredient.texture" :alt="recipe.ingredient.name" class="mc-pixel" />
          <div class="mc-tooltip">{{ recipe.ingredient.name }}</div>
        </div>
      </div>

      <!-- Arrow Indicator -->
      <div class="mc-arrow">
        ➜
      </div>

      <!-- Output Slot -->
      <div class="mc-output">
        <template v-if="recipe?.result">
          <img :src="recipe.result.texture" :alt="recipe.result.name" class="mc-pixel" />
          <span v-if="recipe.result.count && recipe.result.count > 1" class="slot-count">{{ recipe.result.count }}</span>
          <div class="mc-tooltip">{{ recipe.result.name }} (x{{ recipe.result.count || 1 }})</div>
        </template>
      </div>
    </div>
  </div>
</template>
