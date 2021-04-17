import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ECharts from 'vue-echarts'
import { use } from "echarts/core";
// 手动引入 ECharts 各模块来减小打包体积
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  RadarChart,
  LineChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  DatasetComponent,
  TitleComponent,
  
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  RadarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  DatasetComponent,
  TitleComponent,
  
]);


createApp(App).component('v-chart', ECharts).use(store).use(router).mount('#app')
