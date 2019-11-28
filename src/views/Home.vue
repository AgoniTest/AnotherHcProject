<template>
  <el-scrollbar class="el-scrollbar" style="height:100%">
  <div  class="home">
       <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../assets/admin.jpg" class="user-avator" alt="">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{getUser.human_name}}</div>
                            <div>{{getUser.uc}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">{{$t("commen.The Login Time")}}：<span>{{getUser.svrtime}}</span></div>
                    <div class="user-info-list">{{$t("commen.The Login Site")}}：<span>深圳</span></div>
                </el-card>
                <div shadow="hover" style="height:252px;">
                 
                         <Valendar></Valendar>
                    
                 
                </div>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>{{$t("commen.User Visits")}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>{{$t("commen.System Message")}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1</div>
                                    <div>{{$t("commen.Schedule")}}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>{{$t("commen.Schedule")}}</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                    </div>
                    <el-table :data="todoList" :show-header="false" style="height:304;width:100%;font-size:14px">
                       <el-table-column type="index" width="60"></el-table-column>
                       <el-table-column prop="title" ></el-table-column>
                       <el-table-column label="操作">
                           <el-button  type="mini" icon="el-icon-view" @click="dialogFormVisible=true">{{$t("commen.Check")}}</el-button>
                       </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="myEcharts"  :style="{width:chartWidth,height:chartHeight}" >
                     </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div id="weEcharts" :style="{width:chartWidth,height:chartHeight}" >
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :title="$t('commen.Schedule')" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
              <el-table :data="todoList">
                   <el-table-column property="title" :label="$t('commen.Item')" width="100%"></el-table-column>
              </el-table>
               <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">{{$t("commen.Cancel")}}</el-button>
  </div>
        </el-dialog>
    </div>
  </div>

</el-scrollbar>
</template>

<script lang="ts">
import Valendar from '../components/Valendar.vue'
import {Component,Vue,Provide} from "vue-property-decorator";
import { State,Getter,Mutation,Action} from 'vuex-class';
// import getCurrentCityName from './getUserLocation';

@Component({
  components:{
   Valendar
  }
})
export default class FormData extends Vue{
  public $echarts:any;
  @Getter("user") getUser:any;
  @Provide() dialogFormVisible:Boolean=false;//是否展示编辑页面
  @Provide() chartWidth: string =  "";
  @Provide() chartHeight: string = "";
  @Provide() todoList=[
    {
      title:'天天写BUG',
      status:false
    }
    ]
  created() {
    this.generatorWidthAndHeight();
    //console.log(this.getUser)
  }
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
            saveAsImage: {show:true}
        }
    },
    legend: {
        data: ['展现','点击','访问','咨询','订单']
    },
    calculable: true,
    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
            ]
        }
    ]
  }
  }
//   getCurrentCity(){
//       getCurrentCityName().then((city:any)=>{
//           console.log(city)
//       })
//   }
  generatorWidthAndHeight() {
    // 图表生成宽度和高度
    this.chartWidth = `${document.body.offsetWidth * 0.4}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.35}px`;
  }
 
  private mounted() {
    const ele = document.getElementById('myEcharts');
    const eee= document.getElementById('weEcharts');
    const chart: any = this.$echarts.init(ele);
    const chart1:any = this.$echarts.init(eee);
    //调接口获取数据
    chart.setOption(this.options(),true);
    chart1.setOption(this.options1(),true);
    //this.getCurrentCity()
  }
}
</script>



<style lang="scss" scoped>
.el-scrollbar{
    height: 100%;
}
.el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }





</style>