import { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { ComicInterface } from '@/custom-hooks/getComics'
import getChapters from '@/custom-hooks/getChapters'

import { Badge } from '@/components/ui/badge'
import Overview from '@/components/Overview'
import AllChapters from '@/components/AllChapters'


const ComicDetails = () => {
  
  // getStateFromTheRoute
  const location = useLocation()

  const comicInfo:ComicInterface  =  location.state?.comic
  
  // destructure comicInfo
  const {provider, slug, title, coverURL} = comicInfo

  // getting values from the custom hook
  const {allChapters, activeChapter, setActiveChapter} = getChapters(provider, slug)

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



  // setting values for the pagination
  
  const sortedChapters = useMemo(() => allChapters.sort((a, b) => a.chapterNum - b.chapterNum), [allChapters])



  // function to work with select and option
  const handleChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const value = Number(event.target.value)
    
    setActiveChapter(value)
  }

 

  return (
    <main>
      {/* Information section */}
      <section
        className={`relative bg-red-300 bg-center min-h-screen min-w-screen text-white`}
      >
        <img src={coverURL} alt={title} className="min-h-screen object-cover object-left-top brightness-[55%]"/>
        <div>
          <div className='absolute border border-gray-600 bg-black top-16 left-0 right-0 min-w-64 mx-8 md:mx-20 lg:mx-64 px-4 py-6 pt-10 md:px-6 md:py-12'>
           <div className="flex justify-start gap-4 px-4 mb-5">
              <Badge className={`cursor-pointer px-6 py-2 text-md text-gray-300 transition-colors duration-200 ease-in-out ${active ? 'text-white' : 'text-gray-500 hover:border hover:border-gray-500'}`} onClick={handleOverviewBadgeState}>Overview</Badge>

              <Badge className={`cursor-pointer px-6 py-2 text-md text-gray-300  ${active ? 'text-gray-500 hover:border hover:border-gray-500':'text-white'} `} onClick={handleAllChaptersBadgeState}>Chapters</Badge>
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
      {/* Content section */}

      {/* <select value={activeChapter} onChange={handleChapterChange}>
        <option value="">Select A Chapter to Read</option>
        {
          sortedChapters.map((chapter, index) => {
            return (
              <option key={index} value={chapter.chapterNum}>{chapter.fullTitle}</option>
            )
          })
        }
      </select> */}

      {/* <div>
        {
          imageContent && imageContent.map((image, index) => {
            return (
              <img key={index} src={image} alt={title}/>
            )
          })
        }
      </div> */}

      
    </main>
  )
}

export default ComicDetails