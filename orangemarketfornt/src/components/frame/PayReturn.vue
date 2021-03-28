<template>
  <a-result
      :sub-title="`订单号：${$route.query.trade_no}`"
      status="success"
      title="支付成功!"
  >
    <template #extra>
      <a-button key="console" type="primary" @click="$router.push('/')">
        返回主页
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "PayReturn",
  async created() {
    const { $ } = await import("@/util/ajax");
    const inputParam = this.$route.query;
    const formData = new FormData();
    formData.append("orderId", inputParam.out_trade_no);
    formData.append("recordId", 2);
    await $.put("/orderStateflow", formData);
  },
  data() {
    return {};
  },
};
</script>

<style scoped>

</style>