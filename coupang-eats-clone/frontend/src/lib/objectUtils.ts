export function removeEmpty(obj: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== 'undefined')
  )
}
