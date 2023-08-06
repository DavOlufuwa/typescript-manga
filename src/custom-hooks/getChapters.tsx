import { useReducer ,useEffect, useCallback} from 'react'
import axios from "axios"

export interface ChapterInterface {
  provider: string
  slug: string
  fullTitle: string
  shortTitle: string
  chapterNum: number
  sourceURL: string
  shortURL: string
  chapterNav: {
    nextSlug: string,
    nextUrl: string,
    prevSlug: string,
    prevUrl: string,
  }
  contentURL: string[]
  createdAt: string
  updatedAt: string
}


type ChapterStateType = {
  allChapters: ChapterInterface[]
  activeChapter: number
  setActiveChapter: (value: number) => void
}

const initialState: ChapterStateType = {
  allChapters: [],
  activeChapter: 0, 
  setActiveChapter: () => {},
}

// Action Types
type ChapterActions = {
  type: "setAllChapters" 
  payload: ChapterInterface[]
} | {
  type: "setActiveChapter"
  payload: number
}
// Chapter Reducer

const chapterReducer = (state: ChapterStateType , action: ChapterActions) => {
  switch (action.type) {
    case "setAllChapters":
      return {
        ...state,
        allChapters: action.payload
      }
    case "setActiveChapter":
      return {
        ...state,
        activeChapter: action.payload
      }
    default:
      return state
    }
  }


const getChapters = (provider: string, webtoon: string):ChapterStateType  => {



  const [{allChapters, activeChapter}, dispatch] = useReducer(chapterReducer, initialState)

  const options = {
    method: 'GET',
    url: 'https://manga-scrapper.p.rapidapi.com/chapters/all',
    params: {
      provider: provider,
      webtoon: webtoon
    },
    headers: {
      'X-RapidAPI-Key': '76fadf03admshc7d99749ca28ab8p16c57ajsn55c84d8e9759',
      'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await axios.request(options)
        
        dispatch({
          type: "setAllChapters",
          payload: response.data
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchChapters()    
  }, [])


  const setActiveChapter = useCallback((value: number) => {
    dispatch({
      type: "setActiveChapter",
      payload: value
    })
  }, [])

  return {
    allChapters,
    activeChapter,
    setActiveChapter
  }

}

export default getChapters