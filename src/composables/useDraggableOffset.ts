import { computed, onBeforeUnmount, type Ref, ref } from 'vue'

interface DraggableOffsetOptions {
  targetRef: Ref<HTMLElement | null>
  enabled: () => boolean
  padding?: number
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value))
}

export const useDraggableOffset = ({
  targetRef,
  enabled,
  padding = 24,
}: DraggableOffsetOptions) => {
  const offsetX = ref(0)
  const offsetY = ref(0)
  const dragging = ref(false)

  let dragStartX = 0
  let dragStartY = 0
  let originOffsetX = 0
  let originOffsetY = 0
  let limitX = 0
  let limitY = 0

  const stopDragging = () => {
    dragging.value = false
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerEnd)
    window.removeEventListener('pointercancel', onPointerEnd)
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging.value) {
      return
    }

    const deltaX = event.clientX - dragStartX
    const deltaY = event.clientY - dragStartY
    offsetX.value = clamp(originOffsetX + deltaX, -limitX, limitX)
    offsetY.value = clamp(originOffsetY + deltaY, -limitY, limitY)
  }

  const onPointerEnd = () => {
    stopDragging()
  }

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !enabled()) {
      return
    }

    const target = event.target as HTMLElement | null
    if (target?.closest('.window-controls')) {
      return
    }

    const rect = targetRef.value?.getBoundingClientRect()
    if (!rect) {
      return
    }

    limitX = Math.max(0, (window.innerWidth - rect.width) / 2 - padding)
    limitY = Math.max(0, (window.innerHeight - rect.height) / 2 - padding)
    dragStartX = event.clientX
    dragStartY = event.clientY
    originOffsetX = offsetX.value
    originOffsetY = offsetY.value
    dragging.value = true

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)
  }

  const style = computed(() => ({
    transform: `translate3d(${offsetX.value}px, ${offsetY.value}px, 0)`,
  }))

  onBeforeUnmount(() => {
    stopDragging()
  })

  return {
    dragging,
    onPointerDown,
    style,
  }
}
