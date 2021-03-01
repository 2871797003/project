<template>
  <div id="login">
    <el-row type="flex" justify="center" class="row-bg">
      <el-card class="box-card">
        <div slot="header">
          <span>卡片名称</span>
          <el-button type="text">操作按钮</el-button>
        </div>
        <div>
          <el-form label-width="80px" :rules="rules" :model="ruleform" ref="ruleform" >
            <el-form-item label="用户名:" prop="username">
              <el-input v-model="ruleform.username" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="ruleform.password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="login-btn" @click="submit()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import {setToken} from "@/utils/auth"
import {post} from "@/utils/http"
export default {
  data() {
    var checkAge = (rule, value, callback) => {  //自定义配置
      var target = /^[0-9a-zA-Z]{4,8}$/;
      if (value === "") {
        return callback(new Error("不能为空啊"));
      } else if (!target.test(value)) {
        return callback(new Error("长度在 4 到 8 个字符"));
      } else {
        callback();
      }
    };
    return {
      rules: { //检验配置
        username: [{ required: true, validator: checkAge }],
        password: [
          { required: true, message: "不能为空啊" },
          { min: 6, message: "长度在 6 以上字符" },
        ],
      },
      ruleform: { //双向绑定
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submit() { //点击登录
      this.$refs["ruleform"].validate((valid) => {    //拿到整个form表单检验是否通过定义的检验配置
        if (valid) {
          post("/login",this.ruleform).then((res) => { //登录成功后发送请求拿到token存入本地，再跳转页面
                setToken(res.token)
                sessionStorage.setItem("nickname",res.nickname)
                this.$router.push("/");
            })
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  width: 480px;
  button {
    float: right;
    padding: 3px 0;
  }
}
.row-bg {
  margin-top: 200px;
}
.login-btn {
  width: 100%;
  height: 50px;
}
</style>