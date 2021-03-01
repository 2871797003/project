<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!--  
      表单搜索
    -->
    <el-card class="mt">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入你的名字" v-model="form.name"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="form.education"
            placeholder="请选择你的学历"
            style="width: 100%"
          >
            <el-option :value="1" label="小学及以上"></el-option>
            <el-option :value="2" label="初中"></el-option>
            <el-option :value="3" label="高中"></el-option>
            <el-option :value="4" label="本科"></el-option>
            <el-option :value="5" label="研究生"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入你的手机号"
            v-model="form.mobile"
          ></el-input>
        </el-col>
        <el-col :span="6" style="text-align: right">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!--  
      表格
    -->
    <el-card class="mt">
      <el-button type="primary" icon="el-icon-plus" @click="addClient"
        >新增客户</el-button
      >
      <el-table :data="tableData" style="width: 100%" class="mt">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="number" label="客户编号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号码"> </el-table-column>
        <el-table-column prop="idnum" label="身份证号"> </el-table-column>
        <el-table-column prop="education" label="学历">
          <template slot-scope="scope">
            <span v-if="scope.row.education == 1">小学及以下</span>
            <span v-else-if="scope.row.education == 2">初中</span>
            <span v-else-if="scope.row.education == 3">高中</span>
            <span v-else-if="scope.row.education == 4">本科</span>
            <span v-else-if="scope.row.education == 5">研究生</span>
          </template>
        </el-table-column>
        <el-table-column prop="job" label="职业"> </el-table-column>
        <el-table-column prop="address" label="住址"> </el-table-column>
        <el-table-column prop="marry" label="婚姻状况">
          <template slot-scope="scope">
            <span>{{ scope.row.marry == 1 ? "已婚" : "未婚" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="removeRow(scope.row)"
              >删除</el-button
            >
            <el-button @click="details(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--
      弹框组件
    -->
    <edit
      :visible="visible"
      :ruleForm="ruleForm"
      @refer="determine"
      @editclose="handleClose"
    ></edit>
  </div>
</template>
<script>
import breadCrumb from "@/mixins/breadCrumb";
import edit from "@/components/edit.vue"
export default {
  mixins: [breadCrumb],
  data() {
    return {
      form: {
        name: "",
        education: "",
        mobile: "",
      },
      originData: [
        {
          number: 1001,
          name: "赵铁柱",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 2,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1,
        },
        {
          number: 1001,
          name: "詹姆斯",
          mobile: "13533387675",
          idnum: "378489998776546578",
          education: 3,
          job: "球员",
          address: "广东省东莞市市南区香港中路100号",
          marry: 1,
        },
        {
          number: 1003,
          name: "李狗盛",
          mobile: "15533325375",
          idnum: "378489990876546578",
          education: 2,
          job: "厨师",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2,
        },
        {
          number: 1004,
          name: "张大彪",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 4,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2,
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1,
        },
      ],
      tableData: [
        {
          number: 1001,
          name: "赵铁柱",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 2,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1,
        },
        {
          number: 1001,
          name: "詹姆斯",
          mobile: "13533387675",
          idnum: "378489998776546578",
          education: 3,
          job: "球员",
          address: "广东省东莞市市南区香港中路100号",
          marry: 1,
        },
        {
          number: 1003,
          name: "李狗盛",
          mobile: "15533325375",
          idnum: "378489990876546578",
          education: 2,
          job: "厨师",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2,
        },
        {
          number: 1004,
          name: "张大彪",
          mobile: "18833345675",
          idnum: "378489990876546578",
          education: 4,
          job: "司机",
          address: "山东省青岛市市南区香港中路100号",
          marry: 2,
        },
        {
          number: 1005,
          name: "王老六",
          mobile: "17673345675",
          idnum: "378489990876546578",
          education: 5,
          job: "老板",
          address: "山东省青岛市市南区香港中路100号",
          marry: 1,
        },
      ],
      visible: false, //弹框显示隐藏
      ruleForm: {}, //弹框的双向绑定
    };
  },
  methods: {
    handleSearch() {
      //查询数据
      this.tableData = this.originData.filter((item) => {
        return (
          item.name == (this.form.name ? this.form.name : item.name) &&
          item.education ==
            (this.form.education ? this.form.education : item.education) &&
          item.mobile == (this.form.mobile ? this.form.mobile : item.mobile)
        );
      });
    },
    handleReset() {
      //重置
      (this.form = {
        name: "",
        education: "",
        mobile: "",
      }),
        (this.tableData = this.originData);
    },
    details() {
      //详情页面
      this.$router.push("/customer/detail");
    },
    removeRow(row) {
      this.$message.success(`名字为${row.name}的成员已删除`);
    },
    edit(row) {
      //打开编辑
      this.visible = true;
      this.ruleForm = {
        character: row.job,
        remarks: row.name,
        reason: row.address,
      };
    },
    determine() {
      //弹框点击确认事件
      //发送请求
      this.$message.success("恭喜您,创建成功");
      this.visible = false;
    },
    handleClose() {
      //关闭弹框
      this.visible = false;
    },
    //新建角色
    addClient() {
      this.visible = true;
      this.ruleForm = {
        character: "",
        remarks: "",
        reason: "",
      };
    },
  },
  components:{
    edit
  }
};
</script>

<style scoped>
</style>