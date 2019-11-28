<template>
  <el-scrollbar class="el-scrollbar" style="height:100%">
    <div class="acceptence" style="height:100%;width:100%">
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-row :gutter="0">
              <el-col :span="12">
                <div id="gauge1" :style="{width:chartWidth/2,height:chartHeight}"></div>
              </el-col>
              <el-col :span="12">
                <div id="gauge2" :style="{width:chartWidth/2,height:chartHeight}"></div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="twoEcharts" :style="{width:chartWidth,height:chartHeight}"></div>
          </div>
          <div id="fullScreenMask">
            <div id="fullScreen"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div id="myEcharts" :style="{width:chartWidth,height:chartHeight}"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
  </el-scrollbar>
</template>


<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

@Component({
  components: {}
})
export default class TurnOverCharts extends Vue {
  public $echarts: any;
  @Provide() chartScreen = null;
  options() {
    return {
      title: {
        text: "费用支出统计(单位/元)",
        subtext: "From ExcelHome"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function(params: any) {
          var tar = params[1];
          return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
        }
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: {},
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        splitLine: { show: false },
        data: ["总费用", "房租", "水电费", "交通费", "伙食费", "日用品数"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "辅助",
          type: "bar",
          stack: "总量",
          itemStyle: {
            normal: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            },
            emphasis: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            }
          },
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: "生活费",
          type: "bar",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "inside"
            }
          },
          data: [2900, 1200, 300, 200, 900, 300]
        }
      ]
    };
  }
  options1() {
    return {
      //backgroundColor:'#12cf96',
      title: {
        text: "三年销售情况"
      },
      legend: {
        show: true,
        top: "6%"
      },
      tooltip: {},
      toolbox: {
        orient: "vertical",
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
          // myScreen:{
          //   show:true,
          //   title:"全屏查看",
          //   icon:'image://../assets/fullscreen.png',
          //   onclick:function(e:any){
          // var docEle=document.documentElement;
          // if (docEle.requestFullscreen) {
          //   docEle.requestFullscreen();
          // }
          // if (docEle.requestFullscreen) {
          //   document.exitFullscreen();
          // }
          // var opts=e.getOption()
          // opts.toolbox[0].feature.fullScreen.show=false;
          // window.top.layer.open({
          //   title:false,
          //   type:1,
          //   content:'<div class=""> </div>'
          // })
          // const element = document.getElementById("twocharts");
          // if (element.requestFullScreen) {
          //   element.requestFullScreen();
          // }
          //   }
          // }
        }
      },
      dataset: {
        source: [
          ["product", "2012", "2013", "2014", "2015"],
          ["Matcha Latte", 41.1, 30.4, 65.1, 53.3],
          ["Milk Tea", 86.5, 92.1, 85.7, 83.1],
          ["Cheese Cocoa", 24.1, 67.2, 79.5, 86.4]
        ]
      },
      xAxis: [
        { type: "category", gridIndex: 0 },
        { type: "category", gridIndex: 1 }
      ],
      yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
      grid: [{ bottom: "53%" }, { top: "55%" }],
      series: [
        // {
        //   type:'bar',
        //   bar:name,
        //   zoom:1,
        //   roam:true,
        //   scaleLimit:{
        //     min:1,
        //     max:2
        //   }
        // },

        // These series are in the first grid.
        {
          type: "bar",
          seriesLayoutBy: "row",
          label: {
            show: true
          }
        },
        {
          type: "bar",
          seriesLayoutBy: "row",
          label: {
            show: true
          }
        },
        {
          type: "bar",
          seriesLayoutBy: "row",
          label: {
            show: true
          }
        },
        // These series are in the second grid.
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1, label: { show: true } },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1, label: { show: true } },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1, label: { show: true } },
        { type: "bar", xAxisIndex: 1, yAxisIndex: 1, label: { show: true } }
      ]
    };
  }
  options2() {
    return {
      title: {
        text: "合同完成指标",
        subtext: "如图"
      },
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: "业务指标2",
          type: "gauge",
          detail: { formatter: "{value}%" },
          data: [{ value: 50, name: "完成率" }],
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.2, "#c23531"], [0.8, "#63869e"], [1, "#91c7ae"]]
            }
          }
        }
      ]
    };
  }
  options3() {
    return {
      title: {
        text: "产值完成指标",
        subtext: "如图"
      },
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: "业务指标",
          type: "gauge",
          detail: { formatter: "{value}%" },
          data: [{ value: 50, name: "未完成率" }],
          axisLine: {
            // 坐标轴线
            lineStyle: {
              // 属性lineStyle控制线条样式
              color: [[0.3, "#c23531"], [0.8, "#63869e"], [1, "#91c7ae"]]
            }
          }
        }
      ]
    };
  }
  @Provide() chartWidth: string = "";
  @Provide() chartHeight: string = "";

  created() {
    this.generatorWidthAndHeight();
  }

  generatorWidthAndHeight() {
    // 图表生成宽度和高度
    this.chartWidth = `${document.body.offsetWidth * 0.42}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.42}px`;
  }
  private mounted() {
    const ele = document.getElementById("myEcharts");
    const ele1 = document.getElementById("gauge1");
    const ele2 = document.getElementById("gauge2");
    const eee = document.getElementById("twoEcharts");
    const chart1: any = this.$echarts.init(eee);
    const chart: any = this.$echarts.init(ele);
    const chart2: any = this.$echarts.init(ele1);
    const chart3: any = this.$echarts.init(ele2);
    //调接口获取数据
    chart.setOption(this.options(), true);
    chart1.setOption(this.options1(), true);
    chart2.setOption(this.options2(), true);
    chart3.setOption(this.options3(), true);
  }
}
</script>



<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item1 {
  padding: 18px 0;
}

.box-card {
  width: 633px;
  height: 250px;
}
.el-row {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
}
.bg-purple-dark {
  background: white;
}
.bg-purple {
  background: white;
}
.bg-purple-light {
  background: white;
}
.grid-content {
  border-radius: 0px;
  min-height: 300px;
}
.row-bg {
  padding: 0px 0;
  background-color: #f9fafc;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>