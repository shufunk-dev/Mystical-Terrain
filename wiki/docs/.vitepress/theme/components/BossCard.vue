<script setup lang="ts">
defineProps<{
  name: string
  title: string
  dimension: string
  health: string
  catalyst: string
  catalystTexture?: string
  drops: string[]
  phases?: string
  description: string
}>()
</script>

<template>
  <div class="boss-card glass-card">
    <div class="boss-header">
      <div class="boss-info">
        <h3 class="boss-name">{{ name }}</h3>
        <span class="boss-title">{{ title }}</span>
      </div>
      <div class="boss-badges">
        <span class="badge-purple">{{ dimension }}</span>
        <span class="badge-cyan">{{ health }}</span>
      </div>
    </div>

    <p class="boss-desc">{{ description }}</p>

    <div class="boss-details-grid">
      <div class="detail-box">
        <span class="detail-label">Summoning Catalyst</span>
        <span class="detail-val">
          <img v-if="catalystTexture" :src="catalystTexture" :alt="catalyst" class="mc-pixel catalyst-icon" />
          {{ catalyst }}
        </span>
      </div>
      <div v-if="phases" class="detail-box">
        <span class="detail-label">Combat Phases</span>
        <span class="detail-val">{{ phases }}</span>
      </div>
      <div class="detail-box drops-box">
        <span class="detail-label">Notable Drops</span>
        <div class="drops-list">
          <span v-for="(drop, i) in drops" :key="i" class="drop-tag">
            {{ drop }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boss-card {
  margin: 1.5rem 0;
  border-left: 4px solid #8b5cf6;
}

.boss-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.boss-name {
  margin: 0 !important;
  font-size: 1.4rem;
  color: #f1f5f9;
  font-weight: 700;
}

.boss-title {
  font-size: 0.85rem;
  color: #a78bfa;
  font-style: italic;
}

.boss-badges {
  display: flex;
  gap: 0.5rem;
}

.boss-desc {
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
}

.boss-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-box {
  background: rgba(18, 20, 32, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.75rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.detail-val {
  font-size: 0.92rem;
  color: #e2e8f0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.catalyst-icon {
  width: 20px;
  height: 20px;
}

.drops-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.drop-tag {
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c084fc;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
