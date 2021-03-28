<template>
  <div class="outerBlock">
    <VanCell v-if="noAddress" is-link style="border-radius: 25px" title="没有收货地址？立即添加！" @click="toAddressManage"/>
    <VanCell v-else :title="addressNow.addressDetails" center is-link style="border-radius: 25px" @click="showPopup"/>
    <VanPopup v-if="!noAddress" v-model="show" closeable position="bottom" style="height: 70%">
      <div style="margin-top: 10px;margin-left: 20px; font-weight: bold;border-radius: 25px">
        选择你的地址
      </div>
      <div style="
    margin-top: 20px;
    border:1px solid #96c2f1;
    background:#eff7ff">
        <VanCell :label="addressList[0].addressDetails" size="large" title="默认地址"
                 @click="changeAddress(0)"/>
      </div>
      <div v-for="(item,index) in addressList"
           :key="index" style="
    margin-top: 20px;
    border:1px solid #96c2f1;
    background:#eff7ff">
        <VanCell v-if="index !== 0" :label="item.addressDetails" :title="'地址'+index"
                 size="large"
                 @click="changeAddress(index)"/>
      </div>
    </VanPopup>
  </div>
</template>

<script>
export default {
  name: "AddressBlock",
  data() {
    return {
      show: false,
      noAddress: true,
      addressList: [],
      addressNow: null
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    changeAddress(index) {
      this.addressNow = this.addressList[index];
      this.$emit('postaddress', this.addressNow);
      this.show = false;
    },
    toAddressManage() {
      this.$router.push({
        name: '地址管理'
      })
    }
  },
  async created() {
    const { $ } = await import('@/util/ajax');
    const result = await $.get(`/address`);
    if (result.data.information.length === 0) {
      this.noAddress = true
    } else {
      for (let i = 0; i < result.data.information.length; i++) {
        if (result.data.information[i].isDefault === true) {
          this.addressList.unshift(result.data.information[i]);
        } else {
          this.addressList.push(result.data.information[i]);
        }
      }
      this.addressNow = this.addressList[0];
      this.noAddress = false
      this.$emit('postaddress', this.addressNow)
    }
  }
}
</script>

<style scoped>
.outerBlock {
  margin: 5px;
  padding: 5px;
  border-radius: 25px;
  background-color: white;
}
</style>