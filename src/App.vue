<template>
  <div
    class="relative flex min-h-screen w-full items-center justify-center perspective-[1000px]"
    :class="store.toggleClicked ? 'bg-white' : 'bg-brand-grey'"
  >
    <label class='absolute top-2.5 right-2.5 h-8.5 w-15'>
      <input
        type="checkbox"
        class="peer sr-only"
        @change="toggleColor"
      >
      <span
        class="absolute inset-0 cursor-pointer rounded-full bg-light-grey transition-colors duration-300 before:absolute before:bottom-1 before:left-1 before:h-6.5 before:w-6.5 before:rounded-full before:bg-white before:transition-transform before:duration-300 before:content-[''] peer-checked:bg-brand-green peer-checked:before:translate-x-6.5 peer-focus-visible:shadow-[0_0_1px_var(--color-brand-green)]"
      />
    </label>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store'
import { onMounted } from 'vue'

const store = useMainStore()

const toggleColor = () => {
  store.toggleClickedState()
}

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
