import { useState, useMemo,  } from 'react'
import { useLocation } from 'react-router-dom'
import getChapters from '@/custom-hooks/getChapters'
import { useEffect } from 'react'
import Overview from '@/components/Overview'
import AllChapters from '@/components/AllChapters'
import { useSavedAndReadComics } from '@/contexts/SavedAndReadComicsContext'
import { ComicInterface } from '@/custom-hooks/getComics'

import Redheart from '/red-heart.svg'
import Emptyheart from '/empty-heart.svg'
import AOS from 'aos'
import 'aos/dist/aos.css';





const ComicDetails = () => {
  
  // getStateFromTheRoute
  const location = useLocation()

  const comicInfo: ComicInterface  =  location.state?.comic
  
  // destructure comicInfo
  const {provider, slug, } = comicInfo

  // getting values from the custom hook
  const {allChapters} = getChapters(provider, slug)

  // loading state
 
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

  const {setRecentlyReadComic, saveAComic, savedComics, deleteASavedComic} = useSavedAndReadComics()

  useEffect(() => {   
    setRecentlyReadComic(comicInfo)
    AOS.init();
  },[])


  const isSaved = savedComics.find(comic => comic.slug === comicInfo.slug)

  return (
      <section className={`bg-center min-h-screen text-white`}>  
            
            <div data-aos="zoom-in" className='border border-gray-600 bg-black top-12 left-0 right-0 min-w-64 mx-8 md:mx-20 lg:mx-64 px-4 py-6 pt-10 md:px-6'>
            <div className=" flex justify-start gap-3  mb-5">

                <div className='bg-gray-700 px-4 rounded-md'>
                  <div className='flex justify-between h-14 items-center gap-5'>
                    <p className={`text-slate-400 font-semibold cursor-pointer duration-200 hover:text-teal-400 ${active && 'bg-teal-400 text-slate-800 focus:text-slate-800 px-3 py-1 rounded-md shadow-lg  hover:text-slate-800'}`} onClick={handleOverviewBadgeState}>Overview</p>
                    <p className={`text-slate-400 font-semibold cursor-pointer duration-200 hover:text-teal-400 ${!active && 'bg-teal-400 px-3 py-1 rounded-md shadow-lg text-slate-800 hover:text-slate-800'}`} onClick={handleAllChaptersBadgeState}>Chapters</p>
                  </div>
                </div>

                {
                  isSaved ? 
                  <div className={`cursor-pointer w-10`} onClick={() => deleteASavedComic(comicInfo)}><img src={Redheart} alt="like button" /></div>
                  :
                  <div className={`cursor-pointer w-10`} onClick={() => saveAComic(comicInfo)}><img src={Emptyheart} alt="like button" /></div>
                }
               

                
            </div>
              {
                active ? 
                <Overview data-aos="fade-up" comic={comicInfo}/> 
                :
                <AllChapters chapters={sortedChapters} comic={comicInfo}/> 
              }
            </div>
         
      </section>
  )
}

export default ComicDetails