import { useEffect, useCallback, useReducer } from "react"

import { ComicInterface } from "./getComics"


type ReadandSavedComicState = {
  recentlyReadComics: ComicInterface[],
  savedComics: ComicInterface[],
  setRecentlyReadComic: (value: ComicInterface) => void
  saveAComic: (value: ComicInterface) => void
  deleteASavedComic: (value: ComicInterface) => void
}

const initialReadAndSavedComicState: ReadandSavedComicState = {
  recentlyReadComics: [],
  savedComics: [],
  setRecentlyReadComic: () => {},
  saveAComic: () => {},
  deleteASavedComic: () => {},
}

type ReadandSavedComicActions = {
  type: "setRecentlyReadComics"
  payload: ComicInterface
} | {
  type: "createRecentlyReadComicsStorage"
  payload: ComicInterface[]
} | {
  type: "createSavedComicsStorage"
  payload: ComicInterface[]
} | {
  type: "setSavedComics"
  payload: ComicInterface
} | {
  type: "addSavedComic"
  payload: ComicInterface
} | {
  type: "deleteSavedComic"
  payload: ComicInterface
}


// THE REDUCER 
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
  
    case "createSavedComicsStorage":{
      return {
        ...state,
        savedComics: action.payload
      }
    }
    case "setSavedComics":{
      return {
        ...state,
        savedComics: [action.payload, ...state.savedComics]
      }
    }
    case "addSavedComic":{
      const existingComic = state.savedComics.find((comic) => comic.slug === action.payload.slug)

      if(existingComic){
        
        state.savedComics = state.savedComics.filter((comic) => comic.slug !== action.payload.slug)

        localStorage.setItem("savedComics", JSON.stringify([action.payload, ...state.savedComics, ]))

        return {
          ...state,
          savedComics: [action.payload ,...state.savedComics, ]
        }
      }
      
      localStorage.setItem("savedComics", JSON.stringify([action.payload, ...state.savedComics]))

      return {
        ...state,
        savedComics: [action.payload, ...state.savedComics]
      }
    }
    case "deleteSavedComic":{
      const filteredSavedComics = state.savedComics.filter((comic) => comic.slug !== action.payload.slug)
      
      localStorage.setItem("savedComics", JSON.stringify(filteredSavedComics))

      return {
        ...state,
        savedComics: filteredSavedComics
      }
    }
    default:
      return state
  }
}

const manageReadandSavedComics = ():ReadandSavedComicState => {
  const [{recentlyReadComics, savedComics}, dispatch] = useReducer(readandSavedComicReducer, initialReadAndSavedComicState)

  const setRecentlyReadComic = useCallback((value: ComicInterface) => {
    dispatch({
      type: "setRecentlyReadComics",
      payload: value
    })
  }, [])

  const setComicStorage = () => {
    localStorage.setItem("recentlyReadComics", JSON.stringify(recentlyReadComics))
    localStorage.setItem("savedComics", JSON.stringify(savedComics))
  }

  const saveAComic = (value: ComicInterface) => {
    dispatch({
      type: "addSavedComic",
      payload: value
    })
  }

  const deleteASavedComic = (value: ComicInterface) => {
    dispatch({
      type: "deleteSavedComic",
      payload: value
    })
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

  useEffect(() => {
    const savedData = localStorage.getItem("savedComics")
    
    if(savedData){
      dispatch({
        type: "createSavedComicsStorage",
        payload: JSON.parse(savedData)
      })
    }
    else{
      setComicStorage()
    }
  }, [])

  return {
    recentlyReadComics,
    savedComics,
    setRecentlyReadComic,
    saveAComic,
    deleteASavedComic
  }
}

export default manageReadandSavedComics