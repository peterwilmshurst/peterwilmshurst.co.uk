<template>
  <div id="container">
    <Logo />
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/logo.vue'
</script>

<style scoped>
  #container {
  position: relative;
  width: 500px;
  height: 500px;
  perspective: 1000px;
}
</style>
