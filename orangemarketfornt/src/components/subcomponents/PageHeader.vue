<template>
  <VanSticky>
    <VanNavBar
        v-if="shouldNavbar"
        :left-arrow="checkShouldHeader"
        :title="title"
        @click-left="$router.go(-1)"
        @click-right="() => {}"
    />
    <VanSearch
        v-else
        v-model="value"
        clearable
        placeholder="请输入搜索关键词"
        shape="round"
        show-action
        @click="onSearch"
    >
      <template #action>
        <div @click="onSearch">
          搜索商品
        </div>
      </template>
    </VanSearch>
  </VanSticky>
</template>

<script>
import { loginRoutes } from '@/extend/router';

export default {
  name: "PageHeader",
  async created() {
    const { mainRoutes } = await import('@/extend/router');
    this.shouldntNavbarRoutes = mainRoutes.slice(0, 3);
    this.$store.subscribe(mutation => {
      if (mutation.type === 'changeTitle') {
        this.title = mutation.payload;
      }
    });
    this.title = document.title;
  },
  data() {
    return {
      title: '',
      value: '',
      shouldntNavbarRoutes: [],
    }
  },
  computed: {
    checkShouldHeader() {
      return this.title !== loginRoutes.meta.title;
    },
    shouldNavbar() {
      return !this.shouldntNavbarRoutes.includes(this.title);
    }
  },
  methods: {
    onSearch() {
      this.$router.push('/searchResult');
    }
  }
}
</script>

<style scoped>

</style>