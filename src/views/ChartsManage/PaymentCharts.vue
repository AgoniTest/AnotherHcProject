<template>
<el-scrollbar class="el-scrollbar" style="height:100%;">
  <div class="acceptence" >
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
  <el-col :span="12"><div class="grid-content bg-purple">
    <div id="funnel" :style="{width:chartWidth,height:chartHeight}">       
    </div>
  </div>
  </el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div id="nestedCharts" :style="{width:chartWidth,height:chartHeight}">
      </div>     
    </div>
    </el-col>
  </el-row>
  <el-row :gutter="10" type="flex" class="row-bg" justify="center">
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <div id="myEcharts" :style="{width:chartWidth,height:chartHeight}" >
      </div>
    </div>
    </el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
        <div id="mixCharts" :style="{width:chartWidth,height:chartHeight}">
        </div>
      </div>
      </el-col>
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
export default class PaymentCharts extends Vue{
  public $echarts:any;
  options(){
    return{
     title: {
        text: '深圳月最低生活费组成（单位:元）',
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
       title:{
        text:'嵌套环形图'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        top:'6%',
        orient: 'vertical',
        x: 'left',
        data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直达', selected:true},
                {value:679, name:'营销广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // shadowBlur:3,
                    // shadowOffsetX: 2,
                    // shadowOffsetY: 2,
                    // shadowColor: '#999',
                    // padding: [0, 7],
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:[
                {value:335, name:'直达'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1048, name:'百度'},
                {value:251, name:'谷歌'},
                {value:147, name:'必应'},
                {value:102, name:'其他'}
            ]
        }
    ]
    }
  }
  options2(){
    return{
       title: {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: ['展现','点击','访问','咨询','订单']
    },
    series: [
        {
            name: '预期',
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
                normal: {
                    formatter: '{b}预期'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}预期: {c}%'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.7
                }
            },
            data: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
            ]
        },
        {
            name: '实际',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
                normal: {
                    position: 'inside',
                    formatter: '{c}%',
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}实际: {c}%'
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.5,
                    borderColor: '#fff',
                    borderWidth: 2
                }
            },
            data: [
                {value: 30, name: '访问'},
                {value: 10, name: '咨询'},
                {value: 5, name: '订单'},
                {value: 50, name: '点击'},
                {value: 80, name: '展现'}
            ]
        }
    ]
    }
  }
  options3(){
      return{
             backgroundColor:'white',
      	    legend: {
    	    	data: ['超出费用', '基金使用率'],
 		        textStyle: {
 		            color: '#B5C9FF'
 		        },
 		        show:true,
 		        x: "left",
 		        left:'20%',
 		        top:'0%', 	        		
    	    },
    	    tooltip: {
				show:true,
				 trigger: 'axis',
    	    },
		   
		    grid: {
		    	 left: '3%',
			        right: '30%',
			        top: '16%',
			        bottom: '5%',
		        containLabel: true
		    },
		    toolbox: {
		        "show": false,
		        feature: {
		            saveAsImage: {
		            }
		        }
		    },
		    xAxis: {
		        type: 'category',
		        axisTick: {
		            "show": false
		        },
		        axisLabel: {
		            textStyle: {
		                color: '#B5C9FF'
		            }
		        },
		        axisLine: {
    	            lineStyle: {
    	                color: '#484d8d'
    	            }
    	        },
		        data: ["1月", "2月", "3月", "4月", "5月", "6月"]
		    },
		    
		    yAxis: [{
 	            color:'#B5C9FF',
		        splitLine: {
    	            show: false
    	        },
		        axisLabel: {
		        	formatter: '{value}万元',
		            textStyle: {
		                color: '#B5C9FF'
		            }
		        },
		        axisLine: {
    	            lineStyle: {
    	                color: '#484d8d'
    	            }
    	        },
		        type: 'value'
		    },
		    {
		    	  color:'#B5C9FF',
		        splitLine: {
    	            show: false,
    	        },
		        axisLabel: {
		        	formatter: '{value}%',
		            textStyle: {
		                color: '#B5C9FF'
		            }
		        },
		        type: 'value'
		    },    
		    {
		        splitLine: {
    	            show: false,
    	            lineStyle: {
    	                color: '#FFF'
    	            }
    	        },
		        axisLabel: {
		            textStyle: {
		                color: '#00ecff'
		            }
		        },
		        axisLine: {
    	            lineStyle: {
    	                color: '#484d8d'
    	            }
    	        },
		        type: 'value'
		    },    	
		    ],  		    
		    series: [{
		    	name:'未超出费用',
		    	stack: "基金支出", 
	            type: "bar",
	            barMaxWidth: 10,
	            barGap: "10%",
	            itemStyle: {
	                normal: {
	                    color: "#1772ef",
	                    label: {
	                        show: false,
	                        textStyle: {
	                            color: "#fff"
	                        },
	                       
	                    }
	                }
	            },
		        data: [50,40,60,55,43,30]
		    }, 
		    {
		    	name:'超出费用',
		    	stack: "基金支出", 
	            type: "bar",
	            barMaxWidth: 10,
	            barGap: "10%",
	            itemStyle: {
	                normal: {
	                    color: "#F1667A",
	                    label: {
	                        show: false,
	                        textStyle: {
	                            color: "#fff"
	                        },
	                       
	                    }
	                }
	            },
		        data: [24,45,41,12,32,0]
		    }, 
		    {
	            name: "预警线",
	            type: "line",
	            symbolSize:2,
	            symbol:'circle',
	           itemStyle: {
	                normal: {
	                    color: "red",
	                    barBorderRadius: 0,
	                    label: {
	                        show: false,
	                        position: "top",
	                    }
	                }
	            },
	            data: [50,40,60,55,43,65]
	        },
		    {
	            name: "基金使用率",
	            type: "line",
	            yAxisIndex: 1,
	            symbolSize:2,
	            symbol:'circle',
	           itemStyle: {
	                normal: {
	                    color: "rgba(252,230,48,1)",
	                    barBorderRadius: 0,
	                    label: {
	                        show: false,
	                        position: "top",
	                    }
	                }
	            },
	            data: [73,55,65,55,33,55]
	        },
		    {
		        name: "收入占比",
		        type: 'pie',
		        center: ['83%', '20%'],
		        radius:  ['32%', '37%'],
		        label: {
		            normal: {
		                position: 'center'
		            }
		        },
		        
		        data: [{
                	itemStyle:{
                		normal: {color: "#203de0"}
                	},
                	label:{
                			normal: {formatter: "收入占比\n{d} %", 
                			textStyle: {color: "#ffd285", fontSize: 14}}
                		},
                	name: "",
                	value: 30
                },{
                	itemStyle:{
                		normal: {color: "#87cffb"}
                	},
                	value: 70
                },
                ]
		    },
		    {
		        name: "",
		        type: 'pie',
		        center: ['83%', '68%'],
		        radius:  ['32%', '37%'],
		        label: {
		            normal: {
		                position: 'center'
		            }
		        },
		        data: [{
                	itemStyle:{
                		normal: {color: "#203de0"}
                	},
                	label:{
                			normal: {formatter: "支出占比\n{d} %", 
                			textStyle: {color: "#ffd285", fontSize: 14}}
                		},
                	name: "",
                	value: 30
                },{
                	itemStyle:{
                		normal: {color: "#87cffb"}
                	},
                	value: 70
                },
                ]
		    },
		    
		    ]
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
    const eee = document.getElementById('nestedCharts');
    const ele1= document.getElementById('funnel');
    const ele2= document.getElementById('mixCharts');
    const chart3:any=this.$echarts.init(ele2);
    const chart2:any =this.$echarts.init(ele1)
    const chart1:any = this.$echarts.init(eee);
    const chart: any = this.$echarts.init(ele);
    //调接口获取数据
    chart.setOption(this.options(),true);
    chart1.setOption(this.options1(),true);
    chart2.setOption(this.options2(),true);
    chart3.setOption(this.options3(),true);
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