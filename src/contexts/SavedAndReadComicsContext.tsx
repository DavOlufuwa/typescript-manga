import manageReadandSavedComics from "@/custom-hooks/manageReadandSavedComics"
import { createContext , useContext } from "react"



type SavedAndReadComicsContextProviderType = {
  children: React.ReactNode
}

export const SavedAndReadComicsContext = createContext<ReturnType <typeof manageReadandSavedComics>>({} as ReturnType <typeof manageReadandSavedComics>)

export function useSavedAndReadComics() {
  return useContext(SavedAndReadComicsContext)
}

export const SavedAndReadComicsProvider = ({children}: SavedAndReadComicsContextProviderType) => {
  return (
    <SavedAndReadComicsContext.Provider value={manageReadandSavedComics()}>
      {children}
    </SavedAndReadComicsContext.Provider>
  )
}

  


