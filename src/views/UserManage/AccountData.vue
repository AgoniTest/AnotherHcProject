<template>
  <div  class="home">
    <div class="search-box">
      <el-input size="large" :placeholder="$t('Message.Please enter what you want to search')" style="width:30%"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">{{$t("Message.Search")}}</el-button>
    </div>
    <el-table border style="width:100%">
   <el-table-column
      :label="$t('Message.Role Name')"
      :width="Width1">
    </el-table-column>
    <el-table-column
      :label="$t('Message.Name')"
      :width="Width2">
    </el-table-column>
    <el-table-column
      :label="$t('commen.Username')"
      :width="Width3">
    </el-table-column>
    <el-table-column
      :label="$t('Message.IsEffective')"
      :width="Width4">
    </el-table-column>
    <el-table-column
      :label="$t('Message.Email')"
      :width="Width5">
    </el-table-column>
    <el-table-column
      :label="$t('Message.Phone Number')"
      :width="Width6">
    </el-table-column>
    <el-table-column
      :label="$t('Message.Operation')"
      :width="Width7">
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
import {Component,Vue,Provide} from "vue-property-decorator"
@Component({
  components:{

  }
})
export default class AccountData extends Vue{
  @Provide() page: number = 1; // 当前page
  @Provide() size: number = 5; // 请求数据的个数 默认5
  @Provide() total: number = 0; // 总数据条数 
  @Provide() Width1:string ="";
  @Provide() Width2:string ="";
  @Provide() Width3:string ="";
  @Provide() Width4:string ="";
  @Provide() Width5:string ="";
  @Provide() Width6:string ="";
  @Provide() Width7:string ="";
  created(){
  this.generatorWidth();
  }
  generatorWidth(){
    this.Width1 = `${document.body.offsetWidth * 0.1}px`;
    this.Width2 = `${document.body.offsetWidth * 0.1}px`;
    this.Width3 = `${document.body.offsetWidth * 0.12}px`;
    this.Width4 = `${document.body.offsetWidth * 0.06}px`;
    this.Width5 = `${document.body.offsetWidth * 0.2}px`;
    this.Width6 = `${document.body.offsetWidth * 0.2}px`;
    this.Width7 = `${document.body.offsetWidth * 0.12}px`;
  }
  handleSearch(){}
}
</script>



<style lang="scss" scoped>
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
</style>