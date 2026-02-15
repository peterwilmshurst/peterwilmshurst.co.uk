interface TypewriterQueueOptions {
  characterDelayMs: number
  lineDelayMs: number
  appendPrompt: (command: string) => void
  appendResponsePlaceholder: () => number
  updateResponseLine: (lineId: number, text: string) => void
}

const sleep = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const useTypewriterQueue = (options: TypewriterQueueOptions) => {
  let queue: Promise<void> = Promise.resolve()
  let token = 0

  const cancelTyping = () => {
    token += 1
  }

  const enqueueCommand = (command: string, responses: string[]) => {
    const activeToken = token
    queue = queue.then(async () => {
      if (activeToken !== token) {
        return
      }

      options.appendPrompt(command)

      for (const response of responses) {
        if (activeToken !== token) {
          return
        }

        const lineId = options.appendResponsePlaceholder()
        for (let charIndex = 1; charIndex <= response.length; charIndex += 1) {
          if (activeToken !== token) {
            return
          }
          options.updateResponseLine(lineId, response.slice(0, charIndex))
          await sleep(options.characterDelayMs)
        }

        await sleep(options.lineDelayMs)
      }
    })
  }

  return {
    cancelTyping,
    enqueueCommand,
  }
}
