import { createContext, useContext as useReactContext } from "react"

export const Context = createContext()

export default function useContext() { return useReactContext(Context) }
