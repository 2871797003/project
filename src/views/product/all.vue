<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-form ref="ruleform">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="allForm.name" placeholder="产品名称"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="allForm.select"
              placeholder="利率"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="allForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <span class="ml -inp" @click="toggle">
              {{ advanced ? "收起" : "展开" }}
              <i :class="'el-icon-arrow-' + (advanced ? 'up' : 'down')"></i>
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mt" v-show="advanced">
          <el-col :span="6">
            <el-input
              v-model="allForm.category"
              placeholder="产品类别"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="allForm.amount"
              placeholder="最高分期数"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="allForm.status" placeholder="状态"></el-input>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!--
        表格数据
    -->
    <el-card class="mt">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="产品类别"></el-table-column>
        <el-table-column prop="rate" label="利率"></el-table-column>
        <el-table-column prop="date" label="开发日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1" effect="dark"
              >已启用</el-tag
            >
            <el-tag type="danger" v-else effect="dark">已禁止</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="highest"
          label="最高分期数(月)"
        ></el-table-column>
        <el-table-column prop="number" label="申请客户数量"></el-table-column>
        <el-table-column prop="total" label="累计签约金额"></el-table-column>
        <el-table-column prop="average" label="件均"></el-table-column>
        <el-table-column prop="average" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="danger"
              v-if="scope.row.status == 1"
              @click="handleEnable(scope.row)"
              size="mini"
              >停用</el-button
            >
            <el-button
              type="success"
              v-else
              @click="handleDelete(scope.row)"
              size="mini"
              >启用</el-button
            >
            <el-button type="primary" size="mini" @click="detail(scope.row.id)"
              >详细</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--
          分页
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="text-align:center"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { get } from "@/utils/http";
import breadCrumb from "@/mixins/breadCrumb";
// import moment from "moment"
export default {
  mixins: [breadCrumb],
  data() {
    return {
      options: [3.8, 3.9, 4.1, 4.3],
      allForm: {
        name: "",
        select: "",
        time: [],
        category: "",
        amount: "",
        status: "",
      },
      advanced: false,  //展开或收起
      tableData: [],
      currentPage:1,
      total:0
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    //切换显示/隐藏
    toggle() {
      this.advanced = !this.advanced;
    },
    //重置表单
    reset() {
       this.allForm={
        name: "",
        select: "",
        time: [],
        category: "",
        amount: "",
        status: "",
      }
    },
    //搜索查询
    search() {
      //发送请求
      alert("暂无接口");
    },
    list() {
      get("/productList").then((res) => {
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    handleEnable() {
      //发请求
    },
    handleDelete() {
      //发请求
    },
    detail(id) {
      //点击详情拿到该行表格的id传入详细页面，去详情页再进行请求数据
      this.$router.push({ path: "/product/detail", query: { id: id } });
    },
    handleSizeChange(){
        //切换多少条时触发
        //发送请求
    },
    handleCurrentChange(){
         //切换第几页时触发
         //发送请求
    },

  },
};
</script>

<style lang="less" scoped>
.toggle-inp {
  color: #409eff;
  cursor: pointer;
}
</style>