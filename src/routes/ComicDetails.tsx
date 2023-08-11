import { useState, useMemo,  } from 'react'
import { useLocation } from 'react-router-dom'
import getChapters from '@/custom-hooks/getChapters'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import Overview from '@/components/Overview'
import AllChapters from '@/components/AllChapters'
import { useSavedAndReadComics } from '@/contexts/SavedAndReadComicsContext'
import { ComicInterface } from '@/custom-hooks/getComics'
import Whiteheart from '/white-heart.svg'
import Redheart from '/red-heart.svg'
import Emptyheart from '/empty-heart.svg'






const ComicDetails = () => {
  
  // getStateFromTheRoute
  const location = useLocation()

  const comicInfo: ComicInterface  =  location.state?.comic
  
  // destructure comicInfo
  const {provider, slug, title, coverURL} = comicInfo

  // getting values from the custom hook
  const {allChapters, setActiveChapter} = getChapters(provider, slug)

  // loading state
  const [loadingManga, setLoadingManga] = useState<boolean>(true)
  const [active, setActive] = useState<boolean>(true)

  const handleOverviewBadgeState = () => {
    active === false &&
    setActive(true)   
  }

  const handleAllChaptersBadgeState = () => {
    active === true && setActive(false)
  }


  // Saving into Recently Viewed Comics


  // setting values for the pagination
  
  const sortedChapters = useMemo(() => allChapters.sort((a, b) => a.chapterNum - b.chapterNum), [allChapters])

  const {setRecentlyReadComic, saveAComic} = useSavedAndReadComics()

  useEffect(() => {
    setRecentlyReadComic(comicInfo)
  },[])

  

  // function to work with select and option



  return (
      <section className={`bg-center min-h-screen text-white`}>  
          <div className='relative h-screen'>
            <img src={coverURL} alt={title} className="h-full object-cover object-left-top brightness-[55%]"/>
            <div className=' absolute border border-gray-600 bg-black top-12 left-0 right-0 min-w-64 mx-8 md:mx-20 lg:mx-64 px-4 py-6 pt-10 md:px-6'>
            <div className=" flex justify-start gap-3  mb-5">
                <Badge className={`cursor-pointer px-4 py-2 text-md text-gray-300 transition-colors duration-200 ease-in-out ${active ? 'text-white' : 'text-gray-500 hover:border hover:border-gray-500'}`} onClick={handleOverviewBadgeState}>Overview</Badge>

                <Badge className={`cursor-pointer px-5 py-2 text-md text-gray-300  ${active ? 'text-gray-500 hover:border hover:border-gray-500':'text-white'} `} onClick={handleAllChaptersBadgeState}>Chapters</Badge>

                <div className='cursor-pointer w-10' onClick={() => saveAComic(comicInfo)}><img src={Whiteheart} alt="like button"/></div>

                
            </div>
              {
                active ? 
                <Overview comic={comicInfo}/> 
                :
                <AllChapters chapters={sortedChapters} comic={comicInfo}/> 
              }
            </div>
        </div>  
      </section>
  )
}

export default ComicDetails