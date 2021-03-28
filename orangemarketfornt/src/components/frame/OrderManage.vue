<template>
  <div>
    <VanTabs v-model="active" offset-top="46px" sticky>
      <VanTab title="全部">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <ARow v-for="(item,i) in list" :key="i">
            <OrderCard :order="item" :place="'OrderManage'" :value="item.countCommodity"></OrderCard>
          </ARow>
        </van-list>
      </VanTab>
      <VanTab title="待付款">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <ARow v-for="(item,i) in list" :key="i">
            <OrderCard v-if="item.itemName ==='待付款'" :order="item"
                       :place="'OrderManage'"
                       :value="item.countCommodity"></OrderCard>
          </ARow>
        </van-list>
      </VanTab>
      <VanTab title="待发货">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <ARow v-for="(item,i) in list" :key="i">
            <OrderCard v-if="item.itemName ==='待发货'" :order="item"
                       :place="'OrderManage'"
                       :value="item.countCommodity"></OrderCard>
          </ARow>
        </van-list>
      </VanTab>
      <VanTab title="待收货">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <ARow v-for="(item,i) in list" :key="i">
            <OrderCard v-if="item.itemName ==='待收货'" :order="item"
                       :place="'OrderManage'"
                       :value="item.countCommodity"></OrderCard>
          </ARow>
        </van-list>
      </VanTab>
      <VanTab title="待评价">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <ARow v-for="(item,i) in list" :key="i">
            <OrderCard v-if="item.itemName ==='待评价'" :order="item"
                       :place="'OrderManage'"
                       :value="item.countCommodity"></OrderCard>
          </ARow>
        </van-list>
      </VanTab>
    </VanTabs>
  </div>
</template>

<script>
import OrderCard from "@/components/subcomponents/OrderCard";

export default {
  name: "OrderManage",
  created() {
    const activePage = this.$route.query.active;
    if ((typeof activePage) === "string") {
      this.active = parseInt(activePage);
    } else {
      this.active = 0;
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 0,
      //激活的标签位置，默认为0
      active: 0,
    };
  },
  components: { OrderCard },
  methods: {
    async onLoad() {
      const { $ } = await import("@/util/ajax");
      this.page++;
      const result = await $.get(`/order?page=${this.page}&pageSize=${10}`);
      this.loading = false;
      if (this.page * 10 >= result.data.information.total) {
        this.finished = true;
      }
      if (result.data.information.records.length !== 0) {
        for (let i = 0; i < result.data.information.records.length; i++) {
          this.list.push(result.data.information.records[i]);
        }
      }
    },
  },
}
</script>

<style scoped>
</style>