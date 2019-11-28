<template>
<el-scrollbar class="el-scrollbar" style="height:100%">
  <div class="acceptence" style="height:100%;width:100%">
 
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
  <el-col :span="12">
    <div class="grid-content bg-purple">
    
     <div id="precipitationEcharts" :style="{width:chartWidth,height:chartHeight}">
     </div>
     
  </div>
  </el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div id="radar" :style="{width:chartWidth,height:chartHeight}">
      </div>
    </div>
    </el-col>
  </el-row>
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div id="myEcharts"  :style="{width:chartWidth,height:chartHeight}" >
      </div>
    </div>
    </el-col>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  </div>
</el-scrollbar>
</template>

<script lang="ts">
import {Component,Vue,Provide} from "vue-property-decorator"


@Component({
  components:{

  }
})

export default class CollectionCharts extends Vue{
  public $echarts:any;
  options(){
    return{
     title: {
        text: '总部费用情况（单位:元）',
        subtext: 'From ExcelHome'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params:any) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type : 'category',
        splitLine: {show:false},
        data : ['总费用','房租','水电费','交通费','伙食费','日用品数']
    },
    yAxis: {
        type : 'value'
    },
    series: [
        {
            name: '辅助',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[2900, 1200, 300, 200, 900, 300]
        }
    ]
    }
  }
  options1(){
    return{
        title : {
        text: '年度收支情况',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['收入','支出']
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            // axisLabel:{
            //   formatter:function(value:any){
            //     return value.split("").join("\n");
            //   }
            // }
            //X轴文字纵向显示
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'收入',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            label:{show:true},
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'支出',
            type:'bar',
            label:{show:true},
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
    }
  }
  options2(){
    return{
    title: {
        text: '核心竞争力',
        
    },
    tooltip: {},
    legend: {
        data: ['计划', '实际'],
        top:'3%',
        right:'20%'
    },
    radar: {
        // shape: 'circle',
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
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '计划'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际'
            }
        ]
    }]
    }
  }
  @Provide() chartWidth: string =  "";
  @Provide() chartHeight: string = "";
  created() {
    this.generatorWidthAndHeight();
  }
  generatorWidthAndHeight() {
    // 图表生成宽度和高度
    this.chartWidth = `${document.body.offsetWidth * 0.41}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.42}px`;
  }
//  private mounted() {
//    window.onresize=()=>{
//      const ele = document.getElementById('myEcharts');
//     const chart: any = this.$echarts.init(ele);
//     //调接口获取数据
//     chart.setOption(this.options(),true);
//     chart.resize();
//      }
//   }
  private mounted() {
    const ele = document.getElementById('myEcharts');
    const ele1 =document.getElementById('radar');
    const eee = document.getElementById('precipitationEcharts');
    const chart1: any = this.$echarts.init(eee);
    const chart: any = this.$echarts.init(ele);
    const chart2:any=this.$echarts.init(ele1);
    //调接口获取数据
    chart1.setOption(this.options1(),true);
    chart.setOption(this.options(),true);
    chart2.setOption(this.options2(),true)
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
    background: white;;
  }
  .bg-purple-light {
    background: white;
  }
  .grid-content {
    border-radius: 0px;
    min-height: 250px;
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