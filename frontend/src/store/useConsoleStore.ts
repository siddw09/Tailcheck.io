export function useConsoleStore() {
  return {
    error: null,
    query: "",
    setQuery: (_value: string) => undefined
  };
}