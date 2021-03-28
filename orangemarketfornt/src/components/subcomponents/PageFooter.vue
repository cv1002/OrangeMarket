<template>
  <div style="height:50px">
    <VanTabbar v-if="shouldTabbar" v-model="active">
      <VanTabbarItem icon="home-o" @click="$router.push('/')">商城</VanTabbarItem>
      <VanTabbarItem icon="friends-o" @click="$router.push('/mails')">消息</VanTabbarItem>
      <VanTabbarItem icon="user-o" @click="$router.push('/personalinfo')">我的</VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script>
export default {
  name: "PageFoot",
  async created() {
    const { mainRoutes } = await import('@/extend/router');
    this.mainRoutes = mainRoutes.slice(0, 4);
    this.$store.subscribe(mutation => {
      if (mutation.type === 'changeTitle') {
        this.active = this.mainRoutes.indexOf(mutation.payload) - 1;
      }
    });
    this.active = this.mainRoutes.indexOf(document.title) - 1;
  },
  data() {
    return {
      title: '',
      active: 0
    }
  },
  computed: {
    shouldTabbar() {
      return this.active >= 0;
    }
  },
  methods: {
    onSearch() {
    }
  }
}
</script>

<style scoped>

</style>