<template>
  <div class="protected-websites">
    <div class="websites-summary">
      <div class="websites-counter">
        <div class="counter-value">{{ websites.length }}</div>
        <div class="counter-circle-bg">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" class="counter-circle-track" />
            <circle cx="50" cy="50" r="45" class="counter-circle-progress" :style="counterStyle" />
          </svg>
        </div>
      </div>
      <div class="websites-stats">
        <div class="stat-item">
          <div class="stat-value">{{ activeWebsitesCount }}</div>
          <div class="stat-label">Active</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ websites.length - activeWebsitesCount }}</div>
          <div class="stat-label">Inactive</div>
        </div>
      </div>
    </div>

    <div class="website-list-container">
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading websites...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button class="btn btn-secondary" @click="fetchWebsites">Retry</button>
      </div>
      
      <div v-else-if="websites.length === 0" class="empty-state">
        <div class="empty-icon"></div>
        <p>You don't have any protected websites yet.</p>
        <p class="empty-help">Click "Manage Websites" to add your first website.</p>
      </div>
      
      <div v-else class="website-list">
        <div v-if="activeWebsites.length > 0" class="website-category">
          <div class="category-header">
            <div class="category-indicator active"></div>
            <h4 class="category-title">Active Protection</h4>
          </div>
          
          <div v-for="website in activeWebsites" :key="website.id" class="website-item">
            <div class="website-icon" :class="getDomainType(website.domain)"></div>
            <div class="website-details">
              <a :href="`https://${website.domain}`" target="_blank" class="website-name">
                {{ website.domain }}
              </a>
              <div class="website-meta">
                <span class="protection-duration">Protected for {{ getProtectionDuration(website) }}</span>
              </div>
            </div>
            <div class="website-status">
              <div class="status-indicator active"></div>
            </div>
          </div>
        </div>
        
        <div v-if="inactiveWebsites.length > 0" class="website-category">
          <div class="category-header">
            <div class="category-indicator inactive"></div>
            <h4 class="category-title">Inactive</h4>
          </div>
          
          <div v-for="website in inactiveWebsites" :key="website.id" class="website-item">
            <div class="website-icon" :class="getDomainType(website.domain)"></div>
            <div class="website-details">
              <a :href="`https://${website.domain}`" target="_blank" class="website-name">
                {{ website.domain }}
              </a>
              <div class="website-meta">
                <span class="website-added">Added {{ getAddedDate(website) }}</span>
              </div>
            </div>
            <div class="website-status">
              <div class="status-indicator inactive"></div>
            </div>
          </div>
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
    
    const activeWebsites = computed(() => {
      return websites.value.filter(website => website.active);
    });
    
    const inactiveWebsites = computed(() => {
      return websites.value.filter(website => !website.active);
    });
    
    const activeWebsitesCount = computed(() => activeWebsites.value.length);
    
    const counterStyle = computed(() => {
      // Calculate stroke-dashoffset based on active websites percentage
      const percentage = websites.value.length > 0 
        ? activeWebsitesCount.value / websites.value.length 
        : 0;
      const circumference = 2 * Math.PI * 45;
      const dashoffset = circumference * (1 - percentage);
      return { 
        strokeDashoffset: dashoffset,
        strokeDasharray: circumference
      };
    });
    
    const fetchWebsites = async () => {
      try {
        await websiteStore.fetchWebsites();
      } catch (err) {
        console.error('Error fetching websites:', err);
      }
    };
    
    // Helper function to get an icon class based on domain type
    const getDomainType = (domain: string) => {
      if (domain.includes('shop') || domain.includes('store') || domain.includes('market')) {
        return 'icon-shop';
      } else if (domain.includes('blog') || domain.includes('news')) {
        return 'icon-blog';
      } else if (domain.includes('app')) {
        return 'icon-app';
      } else {
        return 'icon-website';
      }
    };
    
    const getProtectionDuration = (website: any) => {
      const createdDate = new Date(website.created_at);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 1) return 'today';
      if (diffDays === 1) return '1 day';
      if (diffDays < 30) return `${diffDays} days`;
      if (diffDays < 60) return '1 month';
      return `${Math.floor(diffDays / 30)} months`;
    };
    
    // Helper function to format the date when the website was added
    const getAddedDate = (website: any) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(website.created_at).toLocaleDateString(undefined, options);
    };
    
    onMounted(fetchWebsites);
    
    return {
      websites,
      isLoading,
      error,
      activeWebsites,
      inactiveWebsites,
      activeWebsitesCount,
      counterStyle,
      fetchWebsites,
      getDomainType,
      getProtectionDuration,
      getAddedDate
    }
  }
})
</script>

<style scoped>
.protected-websites {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.websites-summary {
  display: flex;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border-light);
}

.websites-counter {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 1.5rem;
}

.counter-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  z-index: 2;
}

.counter-circle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.counter-circle-track {
  fill: none;
  stroke: var(--color-background-secondary);
  stroke-width: 8;
}

.counter-circle-progress {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease;
}

.websites-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-item {
  margin-bottom: 0.75rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.website-list-container {
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--color-background-tertiary);
}

.category-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.category-indicator.active {
  background-color: var(--color-success);
}

.category-indicator.inactive {
  background-color: var(--color-text-tertiary);
}

.category-title {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  margin: 0;
  color: var(--color-text-secondary);
}

.website-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-light);
  transition: background-color var(--transition-base);
}

.website-item:last-child {
  border-bottom: none;
}

.website-item:hover {
  background-color: var(--color-background-tertiary);
}

.website-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  margin-right: 0.75rem;
  background-color: var(--color-background-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: 16px;
}

.icon-website::after {
  content: '🌐';
}

.icon-shop::after {
  content: '🛒';
}

.icon-blog::after {
  content: '📝';
}

.icon-app::after {
  content: '📱';
}

.website-details {
  flex: 1;
  min-width: 0; /* text truncation */
}

.website-name {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.website-meta {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.protection-duration {
  color: var(--color-success);
}

.website-added {
  color: var(--color-text-tertiary);
}

.website-status {
  display: flex;
  align-items: center;
  margin-left: 0.75rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.active {
  background-color: var(--color-success);
  box-shadow: 0 0 8px rgba(184, 187, 38, 0.6);
}

.status-indicator.inactive {
  background-color: var(--color-text-tertiary);
}

/* States */
.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  padding: 1rem;
}

.loading-state .loading-spinner {
  margin-bottom: 1rem;
}

.error-state p {
  margin-bottom: 1rem;
  color: var(--color-error);
}

.empty-state .empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  opacity: 0.7;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23a89984' d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z'/%3E%3Cpath fill='%23a89984' d='M11 11h2v6h-2zm0-4h2v2h-2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.empty-help {
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
  font-style: italic;
}
</style>
