import getChapters from "@/custom-hooks/getChapters"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ColorRing } from "react-loader-spinner"


const ComicChapter = () => {

  const location = useLocation()

  const {comic, chapterNumber} = location?.state

  const {provider, slug} = comic

  const {allChapters, activeChapter, setActiveChapter} = getChapters(provider, slug)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    
    setActiveChapter(Number(chapterNumber))

  },[chapterNumber])
 

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5500)
    return () => clearTimeout(timer)
  }, [])
  
  const displayedChapter = allChapters.find(chapter => chapter.chapterNum === activeChapter)


  const currentIndex = allChapters.findIndex(chapter => chapter.chapterNum === Number(activeChapter))

  // handling chapter change
  const switchToPrevChapter = () => {
   if (currentIndex === 0) {
     return
   }
   setActiveChapter(allChapters[currentIndex - 1].chapterNum)
   window.scrollTo(0, 0);
  }

  const switchToNextChapter = () => {
    if (currentIndex === allChapters.length - 1) {
      return
    }
    setActiveChapter(allChapters[currentIndex + 1].chapterNum)
    window.scrollTo(0, 0);
  }



  return (
    <div className={loading ? 'min-h-[88vh] grid place-content-center' : ''}>
      {
        loading ?
        <ColorRing
          height="100"
          width="100"
          colors={['#Febf5b', '#f45cc0', '#6538d3', '#42b05c', '#20b0d9']}
        />
        :
        <div className="text-white mx-10 md:mx-32 lg:mx-56">
          <div className="text-xl font-bold">{comic.title}</div>
          <div className="text-md font-thin">Chapter {activeChapter}</div>
          <div className="grid ">
            {
              displayedChapter?.contentURL.map((url, index) => (
                <div key={index}>
                  <div>
                    <img src={url} alt={'comic page'} />
                  </div>
                  <div className=" my-2 text-center font-semibold text-[20px]">&#9734;</div>
                </div>
              ))
            }
          </div>

          <div className="flex justify-around mt-4">
            <Button
              onClick={switchToPrevChapter}
              className={`${currentIndex === 0 ? "cursor-not-allowed bg-slate-500 text-gray-600" : "text-gray-700 bg-slate-400"} `}
            >Previous Page</Button>
            <Button
              onClick={switchToNextChapter}
            >Next Page</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default ComicChapter