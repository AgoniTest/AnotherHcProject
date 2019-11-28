<template>
  <div  class="table-data">
    <div class="search-box">
      <el-input size="small" placeholder="请输入需要查找的内容"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>
    <el-table border style="width:100%"  class="table-box">
    <el-table-column type="index" label="序号" width="60"></el-table-column>
    <el-table-column  label="序号" prop=""  width="120"></el-table-column>
    <el-table-column  label="序号" prop="" width="120" ></el-table-column>
    <el-table-column  label="序号" prop=""  width="160"></el-table-column>
    <el-table-column label="操作" width="160">
      <template> 
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="primary">新增</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="pages" ref="page-box">
      <el-pagination 
      :page-sizes="[5,10,20]" 
      :page-size="size"
      layout="total,sizes,prev,pager,next,jumper"
      :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Vue, Provide} from "vue-property-decorator"
import { State,Getter,Mutation,Action}  from "vuex-class"

@Component({
  components:{
     
  }
})
export default class TableData extends Vue{
  @Getter("user") getUser: any;
  @Provide() searchVal: string = ""; // 搜索框
  @Provide() tHeight: number = document.body.offsetHeight - 270;
  @Provide() tableData: any = []; // 表格数据
  @Provide() page: number = 1; // 当前page
  @Provide() size: number = 5; // 请求数据的个数 默认5
  @Provide() total: number = 0; // 总数据条数

  @Provide() dialogVisible: Boolean = false; // 是否展示编辑页面
  @Provide() formData: object = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: ""
  };
  loadData(){
    (this as any) .$axios('url')
    .then((res:any)=>{
     console.log(res.data);
     this.tableData=res.data.data.list;
     this.total=res.data.data.total;
    })
  }
  handleSearch(){}
  
}
</script>



<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>