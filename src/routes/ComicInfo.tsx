import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ComicInterface } from '@/custom-hooks/getComics'


const ComicInfo = () => {

  
  const location = useLocation()
  // getStateFromTheRoute
  const [loadingManga, setLoadingManga] = useState<boolean>(true)

  const comicInfo:ComicInterface  =  location.state?.comic

  

  return (
    <div>ComicInfo</div>
  )
}

export default ComicInfo