<template>
  <div id="wrap">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="box-card clear in" shadow="always">
          <div class="fl">
            <p>本月进展</p>
            <p style="font-weight: bold">6588</p>
            <p style="font-size: 12px">+20.12% <span>与上升同比</span></p>
          </div>
          <i class="el-icon-tickets ico fr"></i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card clear out" shadow="always">
          <div class="fl">
            <p>本月放款(元)</p>
            <p style="font-weight: bold">121000000</p>
            <p style="font-size: 12px">+1.25% <span>与上升同比</span></p>
          </div>
          <i class="el-icon-money ico fr"></i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card clear allin" shadow="always">
          <div class="fl">
            <p>累计进件</p>
            <p style="font-weight: bold">128700</p>
            <p style="font-size: 12px">+11.48% <span>与去年同比</span></p>
          </div>
          <i class="el-icon-date ico fr"></i>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card clear allout" shadow="always">
          <div class="fl">
            <p>累计放款</p>
            <p style="font-weight: bold">923380079</p>
            <p style="font-size: 12px">-2.06% <span>与去年同比</span></p>
          </div>
          <i class="el-icon-coin ico fr"></i>
        </el-card>
      </el-col>
    </el-row>
    <!-- 
        进件统计分析
     -->
    <el-row :gutter="24" class="mt">
      <el-col :span="18">
        <el-card>
          <div slot="header" class="tab-title">
            <div>进件统计分析</div>
          </div>
          <div ref="trend" style="height: 240px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="tab-title">
            <div>进件产品占比</div>
          </div>
          <div ref="percent" style="height: 240px"></div>
        </el-card>
      </el-col>
    </el-row>
    <!--  
        时间线
    -->
    <el-row :gutter="24" class="mt">
      <el-col :span="12">
        <el-card body-style="height:520px">
          <el-timeline v-for="(item, index) in timeline" :key="index">
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h3>{{ item.title }}</h3>
                <p class="mt">{{ item.name }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <!--  
          日历
      -->
      <el-col :span="12">
        <el-card body-style="height:520px">
            <el-calendar v-model="value"></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        { title: "审核订单", name: "李红 操作于 08:54" },
        { title: "新增贷款", name: "王小虎 操作于11:24" },
        { title: "新增渠道", name: "张浩 操作于15:23" },
      ],
      value:new Date()
    };
  },
  mounted() {
    this.drawline();
    this.drawPie();
  },
  methods: {
    drawline() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(this.$refs["trend"]);
      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["20-01", "20-02", "20-03", "20-04", "20-05", "20-06", "20-07"],
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: [30, 84, 56, 47, 84, 61, 90],
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "white", // 100% 处的颜色
                  },
                ],
              },
              global: false, // 缺省为 false
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawPie() {
      let myChart = this.$echarts.init(this.$refs["percent"]);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "房闪贷" },
              { value: 310, name: "新车贷" },
              { value: 234, name: "资金贷" },
              { value: 135, name: "合力贷" },
              { value: 1548, name: "其他" },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  .ico {
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
  }
  p {
    margin-bottom: 16px;
    color: #ffffff;
  }
}
.in {
  background: #4d87ff;
}
.out {
  background: #f25e75;
}
.allin {
  background: #504eff;
}
.allout {
  background: #f3993b;
}
.tab-title {
  text-align: center;
  line-height: 50px;
  font-size: 24px;
}
</style>