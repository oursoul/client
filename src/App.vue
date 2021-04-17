<template>
<div>
  <v-chart class="chart" ref="pie" @mouseover="stopActions" @mouseout="startActions" id="pie" :option="option1" autoresize />
  <!-- <div id="pie"></div> -->
  
  <v-chart class="chart" id="radar" ref="radar"  :option = "option2" />

  <v-chart class="chart"   :option = "option3" />
  
</div>
  

</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent, onMounted } from "vue";
import axios from 'axios'
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light"
  },
  setup: () => {
    // 饼图
    // const option1 = ref({
    //   title: {
    //     text: "Traffic Sources",
    //     left: "center"
    //   },
    //   tooltip: {
    //     trigger: "item",
    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
    //   },
    //   legend: {
    //     orient: "vertical",
    //     left: "left",
    //     data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
    //   },
    //   series: [
    //     {
    //       name: "Traffic Sources",
    //       type: "pie",
    //       radius: "55%",
    //       center: ["50%", "60%"],
    //       data: [
    //         { value: 335, name: "Direct" },
    //         { value: 310, name: "Email" },
    //         { value: 234, name: "Ad Networks" },
    //         { value: 135, name: "Video Ads" },
    //         { value: 1548, name: "Search Engines" }
    //       ],
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: "rgba(0, 0, 0, 0.5)"
    //         }
    //       }
    //     }
    //   ]
    // });
    const option1 = ref({
      title: {
        text: '饼图程序调用高亮示例',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    })
    // 雷达图
    const option2 = ref({
      title:{
        text:'雷达'
      },
       tooltip: {},
       legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    }, radar: {
        shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '销售（sales）', max: 6500},
            { name: '管理（Administration）', max: 16000},
            { name: '信息技术（Information Techology）', max: 30000},
            { name: '客服（Customer Support）', max: 38000},
            { name: '研发（Development）', max: 52000},
            { name: '市场（Marketing）', max: 25000}
        ]
    }, series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
            },
            {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }
        ]
    }]
    })
    // 折线图堆叠
    const option3 = ref({
      title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
    })
    
     let pie= ref(null)
     let actionTimer = null
 
    onMounted(()=>{
      startActions()
      axios.get('api/predict').then((res)=>{
        console.log(res);
      })
     })

      const stopActions = ()=> {
      clearInterval(actionTimer);
    }
    
    
    let dataIndex = -1;
    const startActions = () => {
      stopActions()
      if (!pie.value) {
        return;
      }
      const dataLen = pie.value.option.series[0].data.length;
      actionTimer = setInterval(() => {
        pie.value.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex
        });
        dataIndex = (dataIndex + 1) % dataLen;
        pie.value.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex
        });
        // 显示 tooltip
        pie.value.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex
        });
      }, 2000);
    }


   

  
    return { option1,option2,option3,pie,stopActions,startActions };
  }
});

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>