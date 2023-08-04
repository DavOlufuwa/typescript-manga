import { createContext , useContext } from "react"
import getComics from "../custom-hooks/getComics"


type AllComicsContextProviderType = {
  children: React.ReactNode
}

export const AllComicsContext = createContext<ReturnType <typeof getComics>>({} as ReturnType <typeof getComics>)

export function useComics() {
  return useContext(AllComicsContext)
}

export const AllComicsProvider = ({children}: AllComicsContextProviderType) =>{

  return (
    <AllComicsContext.Provider value={getComics()}>
      {children}
    </AllComicsContext.Provider>
  )
} 

