<template>
  <div style="text-align: center">
    <van-cell>
      <van-card v-for="(item, index) in commodities"
                :key="index"
                :thumb="item.mainIcon"
                :title="item.commodityName"
                style="font-size: 15px; background: white; border: 1px solid #ebedf0;"
                @click="$router.push(`/ProductDetail?cid=${item.cid}`)"
      />
    </van-cell>
  </div>
</template>

<script>

export default {
  name: "Market",
  async created() {
    const { $ } = await import("@/util/ajax");
    const result = await $.get('/recommends');
    this.commodities = result.data.information;
  },
  data() {
    return {
      current: null,
      /* 存储commodities */
      commodities: []
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
