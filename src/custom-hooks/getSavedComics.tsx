import { useReducer } from "react"
import { ComicInterface } from "./getComics"



type SavedComicsStateType = {
  savedComics: ComicInterface[]
  addToSavedComics: (comic: ComicInterface) => void
  removeFromSavedComics: (comic: ComicInterface) => void
}


const initialState: SavedComicsStateType = {
  savedComics: [],
  addToSavedComics: () => {},
  removeFromSavedComics: () => {},
}

type SavedComicsActionType = {
  type: "addToSavedComics"
  payload: ComicInterface
} | {
  type: "removeFromSavedComics"
  payload: ComicInterface
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
      
    case "removeFromSavedComics":
      return {
        ...state,
        savedComics: state.savedComics.filter(comic => comic.slug !== action.payload.slug)
      }
    default:
      return state
  }
}

const getSavedComics = () => {
  const [{savedComics}, dispatch] = useReducer(savedComicsReducer, initialState)


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


  return {
    savedComics,
    addToSavedComics,
    removeFromSavedComics
  }
}

export default getSavedComics