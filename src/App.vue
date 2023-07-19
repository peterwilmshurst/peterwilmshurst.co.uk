<template>
  <div :style="{ backgroundColor: backgroundColor }">
    <button @click="toggleColor" style="position: absolute; top: 10px; right: 10px;">Toggle Color</button>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useMainStore } from "@/store"
export default {
  setup() {
    const store = useMainStore();
    const backgroundColor = computed(() => store.toggleClicked ? '#2a263d' : 'white');
    const toggleColor = () => {
      store.toggleClickedState();
    };

    return {
      backgroundColor,
      toggleColor
    };
  },
};
</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}
</style>
