import { createContext , useContext } from "react"
import manageReadandSavedComics from "@/custom-hooks/manageReadandSavedComics"


type SavedAndReadComicsContextProviderType = {
  children: React.ReactNode
}

export const SavedAndReadComicContext = createContext<ReturnType <typeof manageReadandSavedComics>>({} as ReturnType <typeof manageReadandSavedComics>)

export function useSavedAndReadComics() {
  return useContext(SavedAndReadComicContext)
}

export const SavedAndReadComicsProvider = ({children}: SavedAndReadComicsContextProviderType) =>{

  return (
    <SavedAndReadComicContext.Provider value={useSavedAndReadComics()}>
      {children}
    </SavedAndReadComicContext.Provider>
  )
} 
