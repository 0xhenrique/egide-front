<template>
  <div class="traffic-chart-container">
    <div class="chart-wrapper">
      <canvas ref="chartCanvas" width="400" height="300"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

interface TrafficData {
  label: string
  legitimate: number
  crawlers: number
  ddos: number
}

export default defineComponent({
  name: 'TrafficChart',
  setup() {
    const chartCanvas = ref<HTMLCanvasElement | null>(null)
    const chart = ref<Chart | null>(null)
    
    // @TODO: remove mock when API is ready
    const mockMonthlyData: TrafficData[] = [
      { label: 'Jan', legitimate: 4200, crawlers: 850, ddos: 120 },
      { label: 'Feb', legitimate: 3800, crawlers: 920, ddos: 150 },
      { label: 'Mar', legitimate: 4500, crawlers: 780, ddos: 200 },
      { label: 'Apr', legitimate: 5200, crawlers: 850, ddos: 180 },
      { label: 'May', legitimate: 5800, crawlers: 1020, ddos: 250 },
      { label: 'Jun', legitimate: 6200, crawlers: 1100, ddos: 320 }
    ]
    
    const createChart = () => {
      const canvas = chartCanvas.value
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const data = mockMonthlyData
      const labels = data.map(item => item.label)
      const legitimateData = data.map(item => item.legitimate)
      const crawlersData = data.map(item => item.crawlers)
      const ddosData = data.map(item => item.ddos)
      
      chart.value = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Legitimate',
              data: legitimateData,
              backgroundColor: 'rgba(67, 160, 71, 0.6)',
              borderColor: 'rgba(67, 160, 71, 1)',
              borderWidth: 1
            },
            {
              label: 'Crawlers',
              data: crawlersData,
              backgroundColor: 'rgba(255, 152, 0, 0.6)',
              borderColor: 'rgba(255, 152, 0, 1)',
              borderWidth: 1
            },
            {
              label: 'DDoS',
              data: ddosData,
              backgroundColor: 'rgba(229, 57, 53, 0.6)',
              borderColor: 'rgba(229, 57, 53, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: false,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              stacked: false,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Requests'
              }
            }
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false
            },
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Monthly Traffic Overview'
            }
          }
        }
      })
    }
    
    onMounted(() => {
      // @TODO: this is just a hack to wait for DOM to be fully loaded
      setTimeout(createChart, 100)
    })
    
    return {
      chartCanvas
    }
  }
})
</script>

<style scoped>
.traffic-chart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chart-wrapper {
  flex: 1;
  min-height: 300px;
  position: relative;
}
</style>
