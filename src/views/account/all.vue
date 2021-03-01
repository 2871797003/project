<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="8">
          <el-input v-model="searchValue" placeholder="手机号、名字、角色类型">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8" style="text-align: right">
          <el-button type="primary" @click="handleopen">新建角色</el-button>
          <el-button :disabled="!selection.length">启动</el-button>
          <el-button :disabled="!selection.length">冻结</el-button>
          <el-button :disabled="!selection.length" @click="removeAll(selection)">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableData" @selection-change="select">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="account" label="账户"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="character" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="reason" label="创建原因"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{
            scope.row.status == 1 ? "启用" : "禁用"
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="removeRow(scope.row)">删除</el-button>
            <el-button>{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--  
      dialog弹框组件
    -->
    <edit :ruleForm="ruleForm" @refer="determine" :visible="visible" @editclose="handleClose"></edit>
    <div style="text-align:center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb";
import { get } from "@/utils/http";
import edit from "@/components/edit.vue";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      searchValue: "",
      tableData: [],
      selection: [],
      total: 0,
      visible:false,
      ruleForm:{}, //传当前行数据
      currentPage:1
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    search() {
      //搜索
      alert("无法搜索，暂无接口");
    },
    list() {
      //拿到表格接口数据
      get("/all").then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    select(selection) {
      //点击勾选
      this.selection = selection;
    },
    //打开新建角色
    handleopen() {
      this.visible = true;
      this.ruleForm = {
        character: "",
        remarks: "",
        reason: "",
      }
    },
    //打开编辑角色
    edit(row) {
      this.visible=true
      this.ruleForm = {
        character: row.character,
        remarks: row.remark,
        reason: row.reason,
      }
    },
    //关闭修改/新建角色
    handleClose() {
      this.visible = false;
    },
    //确认修改/确定新建
    determine() {
       //接受一个参数作为请求参数来发送请求
         //post("/数据库",forms).then((res)=>{})
      this.$message.success("恭喜您,创建成功");
      this.list();
      this.visible=false
    },
    //多少条改变时触发
    handleSizeChange(){
        //调用请求接口获取多少条数据
    },
    //第几页触发
    handleCurrentChange(){
        //调用接口拿到第几页数据
    },
    //单个删除人员
    removeRow(row){
        this.$message.success(`您成功删除账户为${row.account}的角色`)
        this.list()
    },
    //删除所以选中成员
    removeAll(data){
      let list=data.map((item)=>{return item.account})
      this.$message.success(`您成功删除账户为${list}的角色`)
      this.list()
    }
  },
  components:{
    edit
  }
};
</script>

<style lang="less" scoped>
</style>