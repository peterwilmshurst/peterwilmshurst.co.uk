<template>
  <div class="app-container">
    <label class="switch">
      <input
        type="checkbox"
        @change="toggleColor"
      >
      <span class="slider round" />
    </label>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store'
import { computed, onMounted } from 'vue'

const store = useMainStore()

const toggleColor = () => {
  store.toggleClickedState()
}

const bgColor = computed(() => (store.toggleClicked ? 'var(--white)' : 'var(--grey)'))

onMounted(() => {
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
})
</script>

<style>
:root {
  --white: #ffffff;
  --black: #2a263d;
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

.switch {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--green);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--green);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
