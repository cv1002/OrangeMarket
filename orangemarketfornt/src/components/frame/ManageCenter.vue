<template>
  <ALayout id="components-layout-demo-top-side">
    <ALayoutHeader class="header">
      <ARow>
        <ACol span="18">
          <div class="logo"/>
          <div class="title">
            orangesoft managePage
          </div>
        </ACol>
        <ACol>
          <AButton :style="{float : 'right', 'margin-right':'20px','margin-top':'16px'}" type="danger">
            注销
          </AButton>
        </ACol>
      </ARow>
    </ALayoutHeader>
    <ALayoutContent style="padding: 0 50px">
      <ABreadcrumb style="margin: 16px 0">
        <ABreadcrumbItem>Home</ABreadcrumbItem>
        <ABreadcrumbItem>List</ABreadcrumbItem>
        <ABreadcrumbItem>App</ABreadcrumbItem>
      </ABreadcrumb>
      <ALayout style="padding: 24px 0; background: #fff">
        <ALayoutSider :style="{background: '#fff',height : '100vh'}" width="20%">
          <AMenu
              :default-open-keys="['sub1']"
              :default-selected-keys="['1']"
              mode="inline"
              style="height: 100%"
          >
            <ASubMenu key="sub1">
              <span slot="title"><a-icon type="user"/>图表</span>
              <AMenuItem key="1" @click="show(1)">
                流水表
              </AMenuItem>
              <AMenuItem key="2" @click="show(2)">
                option2
              </AMenuItem>
              <AMenuItem key="3">
                option3
              </AMenuItem>
              <AMenuItem key="4">
                option4
              </AMenuItem>
            </ASubMenu>
            <ASubMenu key="sub2">
              <span slot="title"><a-icon type="laptop"/>subnav 2</span>
              <AMenuItem key="5">
                option5
              </AMenuItem>
              <AMenuItem key="6">
                option6
              </AMenuItem>
              <AMenuItem key="7">
                option7
              </AMenuItem>
              <AMenuItem key="8">
                option8
              </AMenuItem>
            </ASubMenu>
            <ASubMenu key="sub3">
              <span slot="title"><a-icon type="notification"/>subnav 3</span>
              <AMenuItem key="9">
                option9
              </AMenuItem>
              <AMenuItem key="10">
                option10
              </AMenuItem>
              <AMenuItem key="11">
                option11
              </AMenuItem>
              <AMenuItem key="12">
                option12
              </AMenuItem>
            </ASubMenu>
          </AMenu>
        </ALayoutSider>
        <ALayoutContent :style="{ padding: '0 24px', minHeight: '280px' }">
          <div v-show="window===1">
            <div style="width:1000px;height:500px">
              <ChartLine ref="chart_line_one"/>
            </div>
          </div>
        </ALayoutContent>
      </ALayout>
    </ALayoutContent>
    <ALayoutFooter style="text-align: center">
    </ALayoutFooter>
  </ALayout>
</template>

<script>
import ChartLine from '../subcomponents/ChartLine.vue'

export default {
  name: "ManageCenter",
  data() {
    return {
      window: 1,
      name: '流水（万元）',
      xData: ['2020-02', '2020-03', '2020-04', '2020-05'],
      yData: [114514, 1919810, 5437684, 483758],
    }
  },
  mounted() {
    const { name, xData, yData } = this;
    this.$refs.chart_line_one.initChart(name, xData, yData);
  },
  components: {
    ChartLine,
  },
  methods: {
    show(key) {
      this.window = key;
    }
  }
}
</script>

<style>
#components-layout-demo-top-side .logo {
  width: 60px;
  height: 31px;
  background: url("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2637807814,667894323&fm=26&gp=0.jpg") no-repeat;
  background-size: contain;
  margin: 16px 28px 16px 0;
  float: left;
}
.title {
  font-weight: bold;
  color: white;
  font-size: large;
}
</style>


