import { useCallback, useEffect, useMemo, useReducer} from "react"

export interface ComicInterface {
  provider: string
  slug: string
  title: string
  sourceURL: string
  shortURL: string
  coverURL: string
  synopsis: string
  genre: string[]
  createdAt: string
  updatedAt: string
}

type ComicStateType = {
  allComics: ComicInterface[]
  searchValue: string
  setSearchValue: (value: string) => void

}

const initialState: ComicStateType = {
  allComics: [],
  searchValue: "", 
  setSearchValue: () => {},

}

// Action Types
type ComicActions = {
  type: "setComics" 
  payload: ComicInterface[] 
} | {
  type: "setSearchValue"
  payload: string
}

const comicReducer = (state: ComicStateType , action: ComicActions) => {
  switch (action.type) {
    case "setComics":
      return {
        ...state,
        allComics: action.payload
      }
    case "setSearchValue":
      return {
        ...state,
        searchValue: action.payload
      }
    default:
      return state
    }
  }



const getComics = ():ComicStateType  => {
  // const [allComics, setAllComics] = useState<ComicInterface[]>([])

  // using useReducer
  const[{allComics, searchValue}, dispatch] = useReducer(comicReducer, initialState)

  // using useReducer


  useEffect(() => {
    const url = `https://manga-scrapper.p.rapidapi.com/webtoons?provider=flame&page=1&limit=20`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
      }
    };
    const localData = localStorage.getItem("allComics")
    if (localData) {
      dispatch({
        type: "setComics",
        payload: JSON.parse(localData)
      })
    } 
    else{
      fetch(url, options)
      .then(response => response.json())
      .then(data => dispatch({
        type: "setComics",
        payload: data
      })) 
    }
  }, [])

  useEffect(() => {
    if(allComics.length === 0) return
    localStorage.setItem("allComics", JSON.stringify(allComics))
  },[allComics])

  // defining the search function within the state
  const setSearchValue = useCallback((value: string) => {
    dispatch({
      type: "setSearchValue",
      payload: value
    })
  }, [])

  // using useMemo for a better performance
  const filteredComics = useMemo(() => {
    return allComics.filter((comic) => {
      return comic.title.toLowerCase().includes(searchValue.toLowerCase())
    })
  }, [allComics, searchValue])

  const sortedComics = useMemo(() => {
    return [...filteredComics].sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
  }, [filteredComics])

  return {
    allComics : sortedComics,
    searchValue,
    setSearchValue,
    }
}

export default getComics