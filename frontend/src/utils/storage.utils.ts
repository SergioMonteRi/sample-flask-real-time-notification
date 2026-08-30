/**
 * Acesso tipado ao sessionStorage. Nunca lanca: em modo privativo ou com
 * storage bloqueado o app continua funcionando sem cache.
 */
export const sessionStorageUtils = {
  get<T>(key: string): T | null {
    try {
      const raw = window.sessionStorage.getItem(key)

      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage indisponivel: seguimos apenas com o estado em memoria */
    }
  },

  remove(key: string): void {
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      /* storage indisponivel: nada a limpar */
    }
  },
}
