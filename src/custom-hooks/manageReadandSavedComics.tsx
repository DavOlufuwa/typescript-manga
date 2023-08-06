import { useEffect, useReducer } from "react"
import { ComicInterface } from "./getComics"



type SavedComicsStateType = {
  savedComics: ComicInterface[]
  recentlyReadComics: ComicInterface[]
  addToSavedComics: (comic: ComicInterface) => void
  removeFromSavedComics: (comic: ComicInterface) => void
  addToReadComics: (comic: ComicInterface) => void
}


const initialState: SavedComicsStateType = {
  savedComics: [],
  recentlyReadComics: [],
  addToSavedComics: () => {},
  removeFromSavedComics: () => {},
  addToReadComics: () => {},
}

type SavedComicsActionType = {
  type: "addToSavedComics"
  payload: ComicInterface
} | {
  type: "removeFromSavedComics"
  payload: ComicInterface
} | {
  type: "addToReadComics"
  payload: ComicInterface
} | {
  type: "setSavedComics"
  payload: ComicInterface[]
} | {
  type: "setRecentlyReadComics"
  payload: ComicInterface[]
}

const savedComicsReducer = (state: SavedComicsStateType, action: SavedComicsActionType) => {
  switch (action.type) {
    case "addToSavedComics":{
      
      const existingSavedComic = state.savedComics.find(comic => comic.slug === action.payload.slug)
      if (existingSavedComic) {
        return {
          ...state
        }
      }

      return {
        ...state,
        savedComics: [...state.savedComics, action.payload]
      }
    }

    case "addToReadComics":{

      const existingReadComic = state.recentlyReadComics.find(comic => comic.slug === action.payload.slug)

      if (existingReadComic) {
        // remove from recently read
        state.recentlyReadComics.filter(comic => comic.slug !== action.payload.slug)
        console.log(state.recentlyReadComics)
        // then add again to recently read
        return{
          ...state,
          recentlyReadComics: [...state.recentlyReadComics, action.payload]
        }
      }

      return{
        ...state,
        recentlyReadComics: [...state.recentlyReadComics, action.payload]
      }
    }
      
      
    case "removeFromSavedComics":
      return {
        ...state,
        savedComics: state.savedComics.filter(comic => comic.slug !== action.payload.slug)
      }
    default:
      return state
  }
}

const manageReadandSavedComics = () => {
  const [{savedComics, recentlyReadComics}, dispatch] = useReducer(savedComicsReducer, initialState)

  useEffect(() => {
  
    const savedData = localStorage.getItem("savedComics")
    const readData = localStorage.getItem("readComics")
    if (savedData){ 
      dispatch({
        type: "setSavedComics",
        payload: JSON.parse(savedData)
      }) 
    }else if(readData){
      dispatch({
        type: "setRecentlyReadComics",
        payload: JSON.parse(readData)
      })
    }
    else{
      return
    }
  }, [])

  const addToSavedComics = (comic: ComicInterface) => {
    dispatch({
      type: "addToSavedComics",
      payload: comic
    })
  }

  const removeFromSavedComics = (comic: ComicInterface) => {
    dispatch({
      type: "removeFromSavedComics",
      payload: comic
    })
  }

  const addToReadComics = (comic: ComicInterface) => {
    dispatch({
      type: "addToReadComics",
      payload: comic
    })
  }

  useEffect(() => {
    localStorage.setItem("savedComics", JSON.stringify(savedComics))
    localStorage.setItem("readComics", JSON.stringify(recentlyReadComics))
  },[recentlyReadComics, savedComics])

  return {
    savedComics,
    recentlyReadComics,
    addToSavedComics,
    removeFromSavedComics,
    addToReadComics
  }
}

export default manageReadandSavedComics