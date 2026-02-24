export type SavedPrompt = {
  id: string
  text: string
  createdAt: number
}

const STORAGE_KEY = "habibai_saved_prompts"
const MAX_ITEMS = 20

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function getStorage(): Storage | null {
  if (!isBrowser()) {
    return null
  }

  return window.localStorage
}

function normalizeSavedPrompts(value: unknown): SavedPrompt[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter((item): item is SavedPrompt => {
      if (!item || typeof item !== "object") {
        return false
      }

      const record = item as Record<string, unknown>
      return (
        typeof record.id === "string" &&
        typeof record.text === "string" &&
        typeof record.createdAt === "number"
      )
    })
    .map((item) => ({
      ...item,
      text: item.text.trim(),
    }))
    .filter((item) => item.text.length > 0)
    .slice(0, MAX_ITEMS)
}

function persistSavedPrompts(prompts: SavedPrompt[]): SavedPrompt[] {
  const storage = getStorage()
  const normalized = normalizeSavedPrompts(prompts)

  if (!storage) {
    return normalized
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}

function createPromptId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function loadSavedPrompts(): SavedPrompt[] {
  const storage = getStorage()

  if (!storage) {
    return []
  }

  const raw = storage.getItem(STORAGE_KEY)

  if (!raw) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    return normalizeSavedPrompts(parsed)
  } catch {
    return []
  }
}

export function savePrompt(text: string): SavedPrompt[] {
  const trimmedText = text.trim()

  if (!trimmedText) {
    return loadSavedPrompts()
  }

  const existing = loadSavedPrompts()
  const next: SavedPrompt[] = [
    {
      id: createPromptId(),
      text: trimmedText,
      createdAt: Date.now(),
    },
    ...existing,
  ]

  return persistSavedPrompts(next)
}

export function removePrompt(id: string): SavedPrompt[] {
  const next = loadSavedPrompts().filter((prompt) => prompt.id !== id)
  return persistSavedPrompts(next)
}

export function clearSavedPrompts(): void {
  const storage = getStorage()

  if (!storage) {
    return
  }

  storage.removeItem(STORAGE_KEY)
}
