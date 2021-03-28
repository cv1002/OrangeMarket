<template>
  <div>
    <van-contact-list
        v-model="chosenContactId"
        :add-text="'新建收货地址'"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
    <van-popup v-model="showAdd" closeable position="bottom" style="height: 30%">
      <div style="margin: 10px;padding:10px;font-weight: bold">
        添加收货地址
      </div>
      <div style="margin: auto">
        <van-field v-model="address" label="新地址" placeholder="请输入新地址"/>
        <van-cell center title="是否设为默认地址？">
          <template #right-icon>
            <van-switch v-model="checked" size="24"/>
          </template>
        </van-cell>
        <div style="text-align: center">
          <van-button round style="width:90%;" type="info" @click="addAddress">增加地址</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showUpdate" closeable position="bottom" style="height: 40%">
      <div style="margin: 10px;padding:10px;font-weight: bold">
        修改收货地址
      </div>
      <div style="margin: auto">
        <van-field v-model="address" label="新地址" placeholder="请输入新地址"/>
        <van-cell center title="是否设为默认地址？">
          <template #right-icon>
            <van-switch v-model="checked" size="24"/>
          </template>
        </van-cell>
        <div style="text-align: center">
          <van-button round style="width:90%;" type="info" @click="updateAddress">修改地址</van-button>
          <div style="height:10px"/>
          <van-button round style="width:90%;" type="danger" @click="deleteAddress">删除地址</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  async created() {
    const { $ } = await import('@/util/ajax');
    const result = await $.get("/address");
    if (result.data.information.length !== 0) {
      for (let i = 0; i < result.data.information.length; i++) {
        let address = {
          id: result.data.information[i].receiveAddressId,
          name: result.data.information[i].addressDetails,
          tel: '',
          isDefault: result.data.information[i].isDefault,
        }
        this.list.push(address);
      }
    }
  },
  name: "AddressManage",
  data() {
    return {
      //地址id
      aid: Number,
      checked: false,
      address: "",
      chosenContactId: '1',
      list: [],
      showAdd: false,
      showUpdate: false,
    };
  },
  methods: {
    async reload() {
      this.checked = false;
      this.address = "";
      this.chosenContactId = '1';
      this.list = [];
      this.showAdd = false;
      this.showUpdate = false;
      const { $ } = await import('@/util/ajax');
      const result = await $.get("/address");
      if (result.data.information.length !== 0) {
        for (let i = 0; i < result.data.information.length; i++) {
          let address = {
            id: result.data.information[i].receiveAddressId,
            name: result.data.information[i].addressDetails,
            tel: '',
            isDefault: result.data.information[i].isDefault,
          }
          this.list.push(address);
        }
      }
    },
    onAdd() {
      this.address = "";
      this.checked = false;
      this.showAdd = true;
    },
    onEdit(contact) {
      this.aid = contact.id
      this.address = contact.name;
      this.checked = contact.isDefault;
      this.showUpdate = true;
    },
    async updateAddress() {
      const { $ } = await import('@/util/ajax');
      const address = {
        addressDetails: this.address,
        isDefault: this.checked,
        receiveAddressId: this.aid,
      }
      const result = await $.put("/address", address);
      if (result.data.success) {
        Toast("修改成功");
        this.reload();
      } else {
        Toast("修改失败");
      }
    },
    async deleteAddress() {
      const { $ } = await import('@/util/ajax');
      const result = await $.delete(`/address?receiveAddressId=${this.aid}`);
      if (result.data.success) {
        Toast("删除成功");
        this.reload();
      } else {
        Toast("删除成功");
      }
    },
    async addAddress() {
      const { $ } = await import('@/util/ajax');
      const address = {
        addressDetails: this.address,
        isDefault: this.checked,
      }
      const result = await $.post("/address", address);
      if (result.data.success) {
        Toast("创建成功");
        this.reload();
      } else {
        Toast("创建失败");
      }
    }
  },
}
</script>

<style scoped>

</style>