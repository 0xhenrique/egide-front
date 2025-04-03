<template>
<div class="protected-websites">
  <div class="info-value">{{ websites.length }}</div>
  <p>{{ websites.length === 1 ? 'website' : 'websites' }} currently protected</p>
  <div class="website-list">
	<hr>
    <div v-if="isLoading" class="loading-state">
      <p>Loading websites...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="websites.length === 0" class="empty-state">
      <p>You don't have any protected websites yet.</p>
    </div>
    <div v-else>
      <div v-for="website in websites" :key="website.id" class="website-item">
        <a :href="`https://${website.domain}`" target="_blank" class="website-name">{{ website.domain }}</a>
        <span :class="['website-status', website.active ? 'active' : 'inactive']">
          {{ website.active ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useWebsiteStore } from '@/store/website'

export default defineComponent({
	name: 'ProtectedWebsites',
	setup() {
		const websiteStore = useWebsiteStore();
		
		const websites = computed(() => websiteStore.websites);
		const isLoading = computed(() => websiteStore.isLoading);
		const error = computed(() => websiteStore.error);
		
		onMounted(async () => {
			try {
				await websiteStore.fetchWebsites();
				
			} catch (err) {
				console.error('Error fetching websites:', err);
			}
		});
		
		return {
			websites,
			isLoading,
			error
		}
	}
})
</script>

<style scoped>
.info-value {
	font-size: 2.5rem;
	font-weight: 600;
	color: var(--primary-color);
	margin-bottom: 0.5rem;
}
/* @TODO: this must have a max-height + overflow */
.website-list {
	margin-top: 1.5rem;
	background-color: #f8f9fa;
}

.website-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.75rem 0;
	border-bottom: 1px solid #e9ecef;
}

.website-item:last-child {
	border-bottom: none;
}

.website-name {
	font-weight: 500;
}

.website-status {
	font-size: 0.875rem;
	padding: 0.25rem 0.5rem;
	border-radius: 12px;
}

.website-status.active {
	background-color: rgba(67, 160, 71, 0.1);
	color: var(--success-color);
}

.website-status.inactive {
	background-color: rgba(158, 158, 158, 0.1);
	color: #757575;
}

.loading-state, .error-state, .empty-state {
	text-align: center;
	padding: 1rem 0;
	color: #6c757d;
}

.error-state {
	color: var(--error-color);
}
</style>
