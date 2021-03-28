<template>
  <div>
    <div>
      <VanGoodsAction class="bottomBlock">
        <VanGoodsActionIcon icon="shop-o" text="店铺" @click="toShop"/>
        <VanGoodsActionIcon icon="chat-o" text="客服" @click="toMail"/>
        <VanGoodsActionIcon :color="collectColor" :icon="collectIcon" :text="collectInfo"
                            @click="collectInfo = 0;"/>
        <VanGoodsActionButton text="立即购买" type="danger" @click="popup"/>
      </VanGoodsAction>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sid: Number,
    isCollected: Boolean,
  },
  name: "ProductDetail",
  data() {
    return {
      collect: false,
    }
  },
  computed: {
    collectInfo: {
      get() {
        return (this.isCollected === false ? '' : '已') + '收藏';
      },
      set() {
        this.$emit('collect')
      }
    },
    collectColor() {
      return this.isCollected ? '#ff5000' : ''
    },
    collectIcon() {
      return this.isCollected ? 'star' : 'star-o';
    },
  },
  created() {
  },
  methods: {
    popup() {
      this.$emit('clickbuy');
    },
    toShop() {
      this.$router.push({
        path: "/shop",
        query: {
          sid: this.sid,
        }
      })
    },
    toMail() {
      this.$router.push({
        path: "/Mails",
      })
    }
  }
}
</script>

<style scoped>
.bottomBlock {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>