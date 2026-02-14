<template>
  <div class="portfolio-stage">
    <div
      ref="terminalWindow"
      class="terminal-window"
      :style="terminalStyle"
      :class="{
        'terminal-window--dragging': isDragging,
        'terminal-window--draggable': isWindowDraggable,
        'terminal-window--minimized': windowMode === 'minimized',
        'terminal-window--maximized': windowMode === 'maximized',
      }"
    >
      <header class="terminal-titlebar" @pointerdown="onTitleBarPointerDown">
        <div class="window-controls">
          <button
            type="button"
            class="window-control window-control--close"
            @click="setWindowMode('closed')"
            aria-label="Close terminal"
          />
          <button
            type="button"
            class="window-control window-control--minimize"
            @click="setWindowMode('minimized')"
            aria-label="Minimize terminal"
          />
          <button
            type="button"
            class="window-control window-control--maximize"
            @click="toggleMaximize"
            aria-label="Maximize terminal"
          />
        </div>
        <p class="terminal-title">portfolio ~/terminal</p>
      </header>

      <section
        v-if="windowMode !== 'closed'"
        class="terminal-body"
      >
        <aside class="terminal-brand">
          <pre class="ascii-logo" aria-label="ASCII logo">{{ asciiLogo }}
{{ asciiLogoTailTop }}<span class="ascii-cursor-block">   _____</span>
{{ asciiLogoTailBottom }}<span class="ascii-cursor-block">  |_____|</span></pre>
          <p class="brand-copy">
            Front-end engineer focused on performant interfaces, clean architecture, and AI-assisted
            workflows.
          </p>
        </aside>

        <main class="terminal-console">
          <div class="console-output">
            <p
              v-for="line in terminalLines"
              :key="line.id"
              class="console-line"
              :class="{
                'console-line--prompt': line.kind === 'prompt',
                'console-line--response': line.kind === 'response',
                'console-line--system': line.kind === 'system',
              }"
            >
              {{ line.text }}
            </p>
          </div>

          <form class="console-form" @submit.prevent="submitCommand">
            <label for="command-input" class="sr-only">Ask a portfolio question</label>
            <span class="prompt-prefix">visitor@site:~$</span>
            <input
              id="command-input"
              ref="commandInput"
              v-model="activeCommand"
              type="text"
              class="console-input"
              autocomplete="off"
              placeholder="type a question, e.g. what skills do you have?"
              @focus="setWindowMode('open')"
            >
          </form>

          <div class="suggestion-grid">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              type="button"
              class="suggestion-chip"
              @click="runSuggestion(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </main>
      </section>

      <section v-else class="terminal-closed">
        <p class="terminal-closed-text">Terminal closed.</p>
        <button type="button" class="reopen-button" @click="setWindowMode('open')">Reopen shell</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useDraggableOffset } from '@/composables/useDraggableOffset'

type WindowMode = 'open' | 'minimized' | 'maximized' | 'closed'
type LineKind = 'system' | 'prompt' | 'response'

interface TerminalLine {
  id: number
  kind: LineKind
  text: string
}

const asciiLogo = `
   _     _  ___   ___
  | | _ | ||   | |   |
  | || || ||   | |   |
  |       ||   | |   |
  |       ||   | |   |___
  |   _   ||   | |       |
  |__| |__||___| |_______|
   __   __  _______  __   __
  |  |_|  ||       ||  | |  |
  |       ||  _____||  |_|  |
  |       || |_____ |       |
  |       ||_____  ||       |
  | ||_|| | _____| ||   _   |
  |_|   |_||_______||__| |__|
   __   __  ______    _______  _______
  |  | |  ||    _ |  |       ||       |
  |  | |  ||   | ||  |  _____||_     _|
  |  |_|  ||   |_||_ | |_____   |   |
  |       ||    __  ||_____  |  |   |`

const asciiLogoTailTop = '  |       ||   |  | | _____| |  |   |'
const asciiLogoTailBottom = '  |_______||___|  |_||_______|  |___|'

const suggestions = [
  'what skills do you have?',
  'what is your experience?',
  'what services do you offer?',
  'show recent projects',
  'how can i contact you?',
  'help',
]

const responses: Record<string, string[]> = {
  'what skills do you have?': [
    'Core: Vue 3, TypeScript, JavaScript, HTML, CSS, Tailwind.',
    'Tooling: Vite, Pinia, Vue Router, Playwright, Biome, GitHub Actions.',
    'Approach: design systems, accessibility, and performance-first implementation.',
  ],
  'what is your experience?': [
    'I build production web interfaces end-to-end, from UX direction to deployment.',
    'I focus on maintainable component architecture and measurable speed improvements.',
    'I also integrate AI-assisted workflows for faster delivery and higher quality.',
  ],
  'what services do you offer?': [
    'Frontend architecture and implementation.',
    'Portfolio/business websites with strong visual identity.',
    'UI refactors, performance audits, and automated quality gates.',
  ],
  'show recent projects': [
    'Projects showcase coming next: this terminal will link to case studies and live demos.',
    'Current highlight: this interactive portfolio shell built with Vue + TypeScript.',
  ],
  'how can i contact you?': [
    'Email: hello@peterwilmshurst.co.uk',
    'LinkedIn and GitHub links can be added here as next step.',
  ],
  help: ['Try one of the quick prompts below or type your own question.'],
}

const windowMode = ref<WindowMode>('open')
const lastMode = ref<Exclude<WindowMode, 'closed'>>('open')
const activeCommand = ref('')
const commandInput = ref<HTMLInputElement | null>(null)
const terminalWindow = ref<HTMLElement | null>(null)
const sequence = ref(2)
const terminalLines = ref<TerminalLine[]>([
  { id: 0, kind: 'system', text: 'Booting portfolio terminal...' },
  {
    id: 1,
    kind: 'system',
    text: 'Type "help" or click a quick prompt to get started.',
  },
])

const appendLine = (kind: LineKind, text: string) => {
  terminalLines.value.push({ id: sequence.value, kind, text })
  sequence.value += 1
}

const resolveResponse = (command: string) => {
  const normalized = command.trim().toLowerCase()
  if (responses[normalized]) {
    return responses[normalized]
  }
  return [
    `No direct match for "${command.trim()}".`,
    'Try: what skills do you have? | what is your experience? | help',
  ]
}

const focusInput = async () => {
  await nextTick()
  commandInput.value?.focus()
}

const setWindowMode = (mode: WindowMode) => {
  if (mode !== 'closed') {
    lastMode.value = mode
  }
  windowMode.value = mode
  if (mode !== 'closed' && mode !== 'minimized') {
    focusInput()
  }
}

const toggleMaximize = () => {
  if (windowMode.value === 'closed') {
    setWindowMode(lastMode.value)
    return
  }
  setWindowMode(windowMode.value === 'maximized' ? 'open' : 'maximized')
}

const submitCommand = () => {
  if (!activeCommand.value.trim()) {
    return
  }

  if (windowMode.value === 'closed' || windowMode.value === 'minimized') {
    setWindowMode('open')
  }

  const command = activeCommand.value
  appendLine('prompt', `visitor@site:~$ ${command}`)
  for (const answer of resolveResponse(command)) {
    appendLine('response', answer)
  }
  activeCommand.value = ''
}

const runSuggestion = (suggestion: string) => {
  activeCommand.value = suggestion
  submitCommand()
  focusInput()
}

const isWindowDraggable = computed(() => {
  return windowMode.value !== 'closed' && windowMode.value !== 'maximized'
})

const {
  dragging: isDragging,
  onPointerDown: onTitleBarPointerDown,
  style: terminalDragStyle,
} = useDraggableOffset({
  targetRef: terminalWindow,
  enabled: () => isWindowDraggable.value,
})

const terminalStyle = computed(() => {
  if (windowMode.value === 'maximized') {
    return {}
  }
  return terminalDragStyle.value
})
</script>
