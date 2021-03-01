<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="220"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="400"
          ></el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="220"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="edit(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <el-transfer v-model="value" :data="data"></el-transfer>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">
        <el-tree
          :data="menuData"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[2]"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
    </el-tabs>
    <!--
      弹框组件
    -->
    <edit :visible="visible" :ruleForm="ruleForm" @refer="determine"  @editclose="handleClose"></edit>
  </div>
</template>

<script>
import edit from "@/components/edit.vue";
export default {
  data() {
    return {
      activeName: "first",
      tableData: [],
      data: this.generateData(),
      value: [1, 4],
      visible: false, //弹框显示隐藏
      ruleForm:{},  //弹框的双向绑定
      //菜单数据
      menuData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 5,
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 6,
              label: "二级 2-1",
              children: [
                {
                  id: 7,
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              id: 8,
              label: "二级 2-2",
              children: [
                {
                  id: 9,
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 10,
              label: "二级 3-1",
              children: [
                {
                  id: 11,
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              id: 12,
              label: "二级 3-2",
              children: [
                {
                  id: 13,
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        //对应的配置选项，默认就是children和label
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleView(row) {
      //查看
      console.log(row);
    },
    tables() {
      //生成表格数据
      for (let i = 0; i < 15; i++) {
        this.tableData.push({
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        });
      }
    },
    generateData() {
      //穿梭框
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    },
    edit(row) {
      //打开编辑
      this.visible=true
     this.ruleForm = {
        character: row.name,
        remarks: row.province,
        reason: row.city,
      }
    },
    determine(){
      //弹框点击确认事件
      //发送请求
      this.$message.success("恭喜您,创建成功");
      this.tables();
      this.visible=false
    },
    handleClose(){
      //关闭弹框
      this.visible=false
    }
  },
  mounted() {
    this.tables();
  },
  components: {
    edit,
  },
};
</script>

<style scoped>
</style>