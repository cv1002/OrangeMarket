<template>
  <div>
    <OrderCard :order="order" :place="'SetOrder'" :value="value"/>
    <div class="card">
      <ARow justify="space-between" type="flex">
        <ACol style="padding-left: 16px">
          选择数量：
        </ACol>
        <ARow>
          <van-stepper v-model="value" @change="checkOver"/>
        </ARow>
      </ARow>
      <van-cell is-link @click="showPopup">{{ postNow.logisticsName }}</van-cell>
      <van-popup v-model="show" closeable position="bottom" round style="height: 70%">
        <div style="margin: 10px;padding-left:10px;font-weight: bold">
          {{ postNow.logisticsName }}
        </div>
        <div v-for="(item,index) in postList"
             :key="index" style="margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    border:1px solid #96c2f1;
    background:#eff7ff">
          <VanCell :label="item.logisticsName" :title="'物流'+ item.logisticsId" size="large" @click="choosePost(index)"/>
        </div>
      </van-popup>
      <van-field
          v-model="message"
          :autosize="{}"
          label="留言"
          maxlength="200"
          placeholder="请输入留言"
          rows="2"
          show-word-limit
          type="textarea"
      />
    </div>
    <van-submit-bar :price="value*order.price*100" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import OrderCard from "@/components/subcomponents/OrderCard";
import { Toast } from "vant";

export default {
  components: { OrderCard },
  name: "orderBlock",
  data() {
    return {
      message: "",
      value: 1,
      show: false,
      postNow: {
        "logisticsName": "请选择物流",
        "logisticsId": Number,
      },
      order: {
        shopName: String,
        subIcon: String,
        commodityName: String,
        subName: String,
        price: Number,
        countCommodity: Number,
        subId: Number,
        cid: Number,
        shopId: Number,
        stock: Number
      },
      postList: [],
    }
  },
  methods: {
    onSubmit() {
      if (this.postNow.logisticsName === "请选择物流") {
        Toast("请选择物流");
      } else {
        this.$emit('postorder', this.order, this.postNow, this.message);
      }
    },
    showPopup() {
      this.show = true;
    },
    choosePost(index) {
      this.postNow = this.postList[index];
      this.show = false;
      Toast("物流变更")
    },
    checkOver(value) {
      if (value > this.order.stock) {
        this.value--;
        Toast("没有那么多库存");
      }
    }
  },
  async created() {
    this.order = this.$store.state.order;
    this.value = this.order.countCommodity;
    const { $ } = await import('@/util/ajax');
    const result = await $.get(`/logistic`);
    this.postList = result.data.information;
  }
}
</script>

<style scoped>
.card {
  background-color: white;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  border-radius: 25px;
  padding: 10px;

}
</style>