<template>
     <el-dialog>
<el-form
      :rules="rules"
      ref="ruleForm"
      :model="form"
      label-width="100px"
      size="small"
      class="form-box"
    >
      <el-form-item label="电子邮件" prop="email">
        <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="固定电话" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输固定电话"></el-input>
      </el-form-item>
      <el-form-item label="分机号" prop="phone2">
        <el-input v-model="form.phone2" placeholder="请输入分机号"></el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('closeDialog')" size="small">取消</el-button>
      <el-button @click="submitForm('ruleForm')" type="primary" size="small">确定</el-button>
      </span>
    </el-form>
     </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {}
})
export default class EditDialog extends Vue{
  @Action("setUser") setUser:any;
  @Getter("user") getUser: any;
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    email: string;
    phone: string;
    mobile: string;
    phone2: string;
  };
   @Provide() rules: any = {
    email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
    phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
    mobile: [{ required: true, message: "请输入固定电话", trigger: "blur" }],
    phone2: [{ required: true,message: "请输入分机号",trigger: "blur"}],
  };
submitForm(formName: any) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios
          .get("http://47.112.137.218:9986/Rest/TSvrMethods/PostHumanInfo/{'accountname':'hc','phone':'"+this.rules.phone+"','phone_2':'"+this.rules.phone2+"','email':'"+this.rules.email+"','mobile':'"+this.rules.mobile+"','human_sid':'"+this.getUser.human_sid+"'}")
          .then((res: any) => {
            // console.log(res.data);
            this.$emit("closeDialog");
            this.$message({
              message: '修改成功！',
              type: "success"
            });
          });
      }
    });
  }
  created() {
    //console.log(this.dialogVisible, this.form);
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>