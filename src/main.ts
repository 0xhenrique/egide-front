import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/theme.css'
// Note: Tokyo Night theme will be loaded dynamically by the ThemeSwitcher component

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
