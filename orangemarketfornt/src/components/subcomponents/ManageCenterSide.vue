<template>
  <div>
    <AMenu
        :default-selected-keys="['1']"
        :open-keys.sync="openKeys"
        class="mySide"
        mode="inline"
        @click="handleClick"
    >
      <AMenuItem>流水表</AMenuItem>
      <AMenuItem>新增用户表</AMenuItem>
      <AMenuItem>新增商铺表</AMenuItem>
    </AMenu>
  </div>
</template>

<script>
export default {
  name: "ManageCenterSide",
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1']
    };
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val);
    },
  },
  methods: {
    handleClick(e) {
      console.log('click', e);
    },
    titleClick(e) {
      console.log('titleClick', e);
    },
  },
};
</script>


<style scoped>
.mySide {
  width: 20%;
  height: 100vw;
}

</style>