<template>
  <div>
    <div class="row align-center">
      <code>RouterList:</code>
    </div>
    <ARow>
      <ACol v-for="(router, index) in routes" :key="index" class="align-center" span="6">
        <AButton class="fillfull align-center" @click="$router.push(router.path)">{{ router.meta.title }}</AButton>
      </ACol>
    </ARow>
  </div>
</template>

<script>
import "@/assets/css/grid.css";

import { routes } from "@/extend/router";

export default {
  name: "RouterList",
  data() {
    return {
      /* 存储页面 */
      routes: routes,
    }
  }
}
</script>

<style scoped>

</style>