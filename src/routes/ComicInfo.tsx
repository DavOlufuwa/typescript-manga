import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { ComicInterface } from '@/custom-hooks/getComics'
import getChapters from '@/custom-hooks/getChapters'
import { Button } from '@/components/ui/button'


const ComicInfo = () => {
  
  // getStateFromTheRoute
  const location = useLocation()

  const comicInfo:ComicInterface  =  location.state?.comic
  
  // destructure comicInfo
  const {provider, slug, title, sourceURL, shortURL, coverURL, genre, synopsis, createdAt, updatedAt} = comicInfo

  // getting values from the custom hook
  const {allChapters, activeChapter, setActiveChapter} = getChapters(provider, slug)

  // loading state
  const [loadingManga, setLoadingManga] = useState<boolean>(true)
  
  // setting values for the pagination
  
  const sortedChapters = useMemo(() => allChapters.sort((a, b) => a.chapterNum - b.chapterNum), [allChapters])

  const displayedChapter = useMemo(()=> sortedChapters.find(chapter => chapter.chapterNum === activeChapter), [sortedChapters, activeChapter])

  const imageContent: string[] | undefined = displayedChapter?.contentURL

  // function to work with select and option
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = Number(event.target.value)
    
    setActiveChapter(value)
  }

  const currentIndex = sortedChapters.findIndex(chapter => chapter.chapterNum === Number(activeChapter))

  // handling chapter change
  const switchToPrevChapter = () => {
   if (currentIndex === 0) {
     return
   }
   setActiveChapter(sortedChapters[currentIndex - 1].chapterNum)
  }

  const switchToNextChapter = () => {
    if (currentIndex === sortedChapters.length - 1) {
      return
    }
    setActiveChapter(sortedChapters[currentIndex + 1].chapterNum)
    window.scrollTo(0, 0);
  }


  return (
    <main>
      <h1>{title}</h1>
      <h2>{provider}</h2>

      <select value={activeChapter} onChange={handleChapterChange}>
        <option value="">Select A Chapter to Read</option>
        {
          sortedChapters.map((chapter, index) => {
            return (
              <option key={index} value={chapter.chapterNum}>{chapter.fullTitle}</option>
            )
          })
        }
      </select>
      <div>
        {activeChapter}
      </div>
      <div>
        {
          imageContent && imageContent.map((image, index) => {
            return (
              <img key={index} src={image} alt={title}/>
            )
          })
        }
      </div>

      <div>
        <Button
          onClick={switchToPrevChapter}
        >Previous Page</Button>
        <Button
          onClick={switchToNextChapter}
        >Next Page</Button>
      </div>

    </main>
  )
}

export default ComicInfo