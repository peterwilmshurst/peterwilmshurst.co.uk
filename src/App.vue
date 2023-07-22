<template>
  <div class="app-container">
    <label class="switch">
      <input type="checkbox" @change="toggleColor">
      <span class="slider round"></span>
    </label>
    <button class="hamburger-menu" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="sidebar" :class="{active: sidebarActive}">
      <ul>
        <li><a href="#item1">Who is this kid?</a></li>
        <li><a href="#item2">What does he do?</a></li>  
      </ul>
    </div>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { useMainStore } from "@/store"
import { computed, ref } from 'vue'
export default {
  setup() {
    const store = useMainStore();
    const sidebarActive = ref(false);
    const toggleColor = () => {
      store.toggleClickedState();
    };
    const toggleSidebar = () => {
      sidebarActive.value = !sidebarActive.value;
    };
    const bgColor = computed(() => store.toggleClicked ? 'var(--white)' : 'var(--grey)');

    return {
      sidebarActive,
      toggleSidebar,
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
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
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
.hamburger-menu {
  position: absolute;
  top: 10px; 
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.hamburger-menu span {
  width: 2rem;
  height: 0.325rem;
  border-radius: 2px;
  background: var(--green);
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background: var(--grey);
  z-index: 9;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  display: flex;
  align-items: center;
  justify-content: center; 
}

.sidebar.active {
  transform: translateX(0);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0; 
  width: 100%;
}

li a {
  display: block; 
  text-decoration: none;
  color: var(--white);
  padding: 8px 16px; 
}

li:hover a {
  background: var(--green);
  cursor: pointer;
}

li:hover {
  background: var(--green);
}
</style>
