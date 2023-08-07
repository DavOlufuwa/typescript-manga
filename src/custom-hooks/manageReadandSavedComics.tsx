import { useEffect, useMemo , useCallback, useReducer } from "react"

import { ComicInterface } from "./getComics"


type ReadandSavedComicState = {
  recentlyReadComics: ComicInterface[],
  recentlyReadComic: ""
  setRecentlyReadComic: (value: ComicInterface) => void
}

const initialReadAndSavedComicState: ReadandSavedComicState = {
  recentlyReadComics: [],
  recentlyReadComic: "",
  setRecentlyReadComic: () => {}
}

type ReadandSavedComicActions = {
  type: "setRecentlyReadComics"
  payload: ComicInterface
} | {
  type: "createRecentlyReadComicsStorage"
  payload: ComicInterface[]
}



const readandSavedComicReducer = (state: ReadandSavedComicState, action: ReadandSavedComicActions) => {
  switch(action.type){
    case "setRecentlyReadComics":{
      const existingComic = state.recentlyReadComics.find((comic) => comic.slug === action.payload.slug)

      if(existingComic){
        
        state.recentlyReadComics = state.recentlyReadComics.filter((comic) => comic.slug !== action.payload.slug)

        localStorage.setItem("recentlyReadComics", JSON.stringify([action.payload, ...state.recentlyReadComics, ]))

        return {
          ...state,
          recentlyReadComics: [action.payload ,...state.recentlyReadComics, ]
        }
      }
      
      localStorage.setItem("recentlyReadComics", JSON.stringify([action.payload, ...state.recentlyReadComics]))


      return {
        ...state,
        recentlyReadComics: [action.payload, ...state.recentlyReadComics, ]
      }
    }
    case "createRecentlyReadComicsStorage":{
      return {
        ...state,
        recentlyReadComics: action.payload
      }
    }
    default:
      return state
  }
}

const manageReadandSavedComics = ():ReadandSavedComicState => {
  const [{recentlyReadComics, recentlyReadComic}, dispatch] = useReducer(readandSavedComicReducer, initialReadAndSavedComicState)

  const setRecentlyReadComic = useCallback((value: ComicInterface) => {
    dispatch({
      type: "setRecentlyReadComics",
      payload: value
    })
  }, [])

  const setComicStorage = () => {
    localStorage.setItem("recentlyReadComics", JSON.stringify(recentlyReadComics))
  }

  useEffect(() => {

    const comicData = localStorage.getItem("recentlyReadComics")
    
    if(comicData) {
      dispatch({
        type: "createRecentlyReadComicsStorage",
        payload: JSON.parse(comicData)
      })
    }
    else{
      setComicStorage()
    }
  
  

  },[])

  return {
    recentlyReadComics,
    recentlyReadComic,
    setRecentlyReadComic
  }
}

export default manageReadandSavedComics