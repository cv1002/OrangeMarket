<template>
  <div ref="input1" :style="{float:'left',width: '100%', height: '500px'}" class="echart"></div>
</template>

<script>

export default {
  name: "ChartLine",
  methods: {

    initChart(name, xData, yData) {

      let getchart = this.$echarts.init(this.$refs.input1);
      var option = {

        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [name],
          bottom: '0%'
        },
        grid: { //调整图表上下左右位置
          top: '10%',
          left: '3%',
          right: '8%',
          bottom: '11%',
          containLabel: true
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: name,
            type: 'line',
            stack: '总量',
            data: yData
          },
        ]
      };

      getchart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        getchart.resize();
      });
    },

  }

}
</script>
<style scoped>

</style>