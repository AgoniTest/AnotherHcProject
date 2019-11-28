<template>
<el-scrollbar class="el-scrollbar" style="height:150%">
   <div class="hjj">
     <canvas :height="{height:CanvesHeight*0.8}">
     </canvas>
   <el-row :gutter="5">
       <el-col :span="8">
         <LineBox id="pie" :style="{height:MyHeight,width:MyWidth}">
         </LineBox>
       </el-col>
       <el-col :span="8">
         <div id="pie1" class="mgb" :style="{height:CanvesHeight,width:MyWidth}">
           
         </div>
           <div id="bar" class="mgb" :style="{height:CanvesHeight,width:MyWidth}">
           </div>
       </el-col>
       <el-col :span="8">
            <el-table :style="{width:MyWidth}" stripe>
                 <el-table-column label="日期">

                 </el-table-column>
                 <el-table-column label="日期">

                 </el-table-column>
                 <el-table-column label="日期">

                 </el-table-column>
            </el-table>
       </el-col>
   </el-row>
   <canvas :height="{height:CanvesHeight*1.2}">

   </canvas>

   </div>
</el-scrollbar>
</template>
<script lang="ts">

import LineBox from '../BackGroud/LineBox.vue';
import {Component,Vue,Provide,Prop} from "vue-property-decorator"
import { State,Getter,Mutation,Action} from 'vuex-class';
 @Component({
    components:{ LineBox}
  })
export default class GroupPortal extends Vue{
 public $echarts:any;
 @Provide() MyWidth:string="";
 @Provide() MyHeight:string="";
 @Provide() CanvesHeight:string="";
 generatorMyWidthAndHeight(){
   this.MyWidth = `${document.body.offsetWidth*0.27}px`;
   this.MyHeight =`${document.body.offsetHeight*0.8}px`;
   this.CanvesHeight =`${document.body.offsetHeight*0.4}px`
 }
 created(){
   this.generatorMyWidthAndHeight();
 }
 option(){
   return{
         title : {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        right:"4%",
         textStyle:{
            fontSize:18,
            fontWeight:'bolder',
            color:'white'
        },
        subtextStyle:{
            color:'white'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        textStyle:{
          color:'#fffff'
        }
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            // radius:['30%','60%'],
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
   }
 }
 options(){
    return {
   title: {
        text: '近一周支出',
        subtext: 'From ExcelHome',
        textStyle:{
          color:'white'
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine:{
          lineStyle:{
            color:'white'
          }
        }
    },
    yAxis: {
        type: 'value',
        splitLine:{
          lineStyle:{
            color:['white']
          }
        },
        axisLine:{
          lineStyle:{
            color:'white'
          }
        }
    },
    series: [{
        data: [120, 210, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle:{
          normal:{
            label:{
              show:true,
              position:'top',
              textStyle:{
                color:'yellow',
                fontSize:""
              }
            }
          }
        }
    }]
    };
  

 }
 options1(){
   return{
       tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['项目进行中个数','项目已完成个数','项目未完成个数'],
        textStyle:{
          color:'#fffff'
        }
    },
    series: [
        {
            name:'项目情况',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'项目进行中个数'},
                {value:310, name:'项目已完成个数'},
                {value:234, name:'项目未完成个数'},
            ]
        }
    ]
   }
 }
  private mounted() {
     const ele= document.getElementById('pie');
     const ele1=document.getElementById('bar');
     const ele2=document.getElementById('pie1');
     const chart2=this.$echarts.init(ele2);
     const chart1=this.$echarts.init(ele1);
     const chart =this.$echarts.init(ele);
     chart.setOption(this.option(),true);
     chart1.setOption(this.options(),true);
     chart2.setOption(this.options1(),true);
  }
};
</script>

<style lang="scss">
.hjj{
  width: 100%;
  height: 150%;
  background: url('../../assets/true.png')
}
.mgb{
   margin-bottom: 20px;
}
.el-table,
.el-table__expanded-cell{
  background-color: #3f5c6d2c;
}

</style>
