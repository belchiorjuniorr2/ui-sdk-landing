import { createParts } from "@ui-sdk/react/primitive"
import { searchField } from "../lib/search-field"

const parts = createParts(searchField, { root: "div", input: "input", clear: "button" })

const SearchField = parts.Root
const SearchFieldInput = parts.Input
const SearchFieldClear = parts.Clear

export { SearchField, SearchFieldClear, SearchFieldInput }
