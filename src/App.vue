<template>
  <div class="app-container">
    <button @click="toggleColor" style="position: absolute; top: 10px; right: 10px;">Toggle Color</button>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { useMainStore } from "@/store"
import { computed } from 'vue';
export default {
  setup() {
    const store = useMainStore();
    const toggleColor = () => {
      store.toggleClickedState();
    };
    const bgColor = computed(() => store.toggleClicked ? 'var(--white)' : 'var(--grey)');

    return {
      toggleColor,
      bgColor
    };
  },
  mounted() {
    console.log(`
    /*
#   _     _  ___   ___                          
#  | | _ | ||   | |   |                         
#  | || || ||   | |   |                         
#  |       ||   | |   |                         
#  |       ||   | |   |___                      
#  |   _   ||   | |       |                     
#  |__| |__||___| |_______|                     
#   __   __  _______  __   __                   
#  |  |_|  ||       ||  | |  |                  
#  |       ||  _____||  |_|  |                  
#  |       || |_____ |       |                  
#  |       ||_____  ||       |                  
#  | ||_|| | _____| ||   _   |                  
#  |_|   |_||_______||__| |__|                  
#   __   __  ______    _______  _______         
#  |  | |  ||    _ |  |       ||       |        
#  |  | |  ||   | ||  |  _____||_     _|        
#  |  |_|  ||   |_||_ | |_____   |   |          
#  |       ||    __  ||_____  |  |   |          
#  |       ||   |  | | _____| |  |   |   _____  
#  |_______||___|  |_||_______|  |___|  |_____| 
#
#
*/`)
  }
};
</script>

<style>
:root {
  --white: #FFFFFF;
  --black: #2A263D;
  --green: #39b54a;
  --grey: #38344d;
}

body,
html,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
} 

.app-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  background-color: v-bind(bgColor);
}
</style>
