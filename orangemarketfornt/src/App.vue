<template>
  <div id="app">
    <PageHeader/>
    <RouterView/>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from "@/components/subcomponents/PageHeader";
import PageFooter from "@/components/subcomponents/PageFooter";

export default {
  name: 'App',
  components: {
    PageFooter,
    PageHeader
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue",
  Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, "Helvetica Neue",
  Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: .5rem;
  font-weight: 500;
  line-height: 1.2;
}

body {
  background-color: #F5F5F5;
}
</style>
