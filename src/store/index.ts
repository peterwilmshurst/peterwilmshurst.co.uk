import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',

  state: () => ({
    toggleClicked: false,
  }),

  actions: {
    toggleClickedState() {
      this.toggleClicked = !this.toggleClicked
    },
  },
})
