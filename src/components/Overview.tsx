
import { ComicInterface } from '@/custom-hooks/getComics'

type ComicStateType = {
  comic: ComicInterface
}

const Overview = ({comic}: ComicStateType) => {
  const {coverURL, title, synopsis} = comic
  return (
    <>
       <div className='h-48 w-48 mx-auto md:h-64 md:w-64 lg:h-72 lg:w-72 '>
              <img src={coverURL} alt={title}/>
            </div>
            
            <h3 className='text-2xl my-4 font-bold text-center'>{title}</h3>
            <h5 className='text-md underline mb-3 text-center font-bold text-gray-300'>synopsis</h5>
            <p className='text-sm font-thin text-justify leading-6 px-2 md:px-16'>{synopsis.replace(/<br\s*\/?>/gi, " ")}</p>
    </>
  )
}

export default Overview