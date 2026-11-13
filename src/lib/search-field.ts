import { createFocusRecovery, definePrimitive } from "@ui-sdk/core"

const searchField = definePrimitive({
  name: "search-field",
  state: () => ({ value: "" }),
  api: (context) => ({
    set: (value: string) => context.store.set({ value }),
    recovery: createFocusRecovery({ fallback: () => context.element("input") }),
  }),
  slots: (slot) => ({
    root: slot({}),
    input: slot({
      attrs: (state) => ({ value: state.value }),
      on: {
        input: (event, { api }) =>
          api.set((event.target as HTMLInputElement).value),
      },
    }),
    clear: slot({
      present: (state) => state.value !== "",
      attrs: () => ({ type: "button" }),
      press: ({ api }) => api.set(""),
      bind: (el, part) => part.api.recovery.bind(el, part),
    }),
  }),
})

export { searchField }
