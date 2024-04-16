import '@/assets/main.css'
import 'vue3-cute-component/dist/style.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router'
import 'animate.css';
// 导入全局路由守卫
import '@/permission'
import 'nprogress/nprogress.css'
// 引入全局状态管理 Pinia
import pinia from '@/stores'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
// 导入 element-plus 暗黑 css
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

// 应用路由
app.use(router)
// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 应用 Pinia
app.use(pinia)


app.use(VueViewer)


app.mount('#app')