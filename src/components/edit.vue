<template>
  <div>
    <el-dialog title="提示" :visible="visible" width="30%" @close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="forms" label-width="100px">
        <el-form-item label="角色" prop="character">
          <el-select
            v-model="ruleForm.character"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <el-option label="业务人员" value="1"></el-option>
            <el-option label="审核人员" value="2"></el-option>
            <el-option label="风控经理" value="3"></el-option>
            <el-option label="管理员" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" prop="remarks">
          <el-input v-model="ruleForm.remarks"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:["ruleForm","visible"],
  data(){
    return {
      rules: {
        //表带检验配置
        character: [{ required: true, message: "不能为空", trigger: "change" }],
        remarks: [{ required: true, message: "不能为空", trigger: "blur" }],
        reason: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    }
  },
  methods:{
    determine(){  //校验表单
      this.$refs["forms"].validate((vilid)=>{
        if(vilid){
            this.$emit("refer",this.ruleForm)
        }
      })
    },
    //关闭弹窗
    handleClose(){
      this.$emit('editclose')
    },
  },
  
};
</script>

<style scoped>
</style>