
import { ComicInterface } from '@/custom-hooks/getComics'

type ComicStateType = {
  comic: ComicInterface
}

const Overview = ({comic}: ComicStateType) => {
  const {coverURL, title, synopsis, genre} = comic
  return (
    <>
       <div className='h-60 w-48 mb-2 mx-auto md:h-72 md:w-64 lg:h-80 lg:w-72 '>
          <img src={coverURL} alt={title} />
        </div>
        <div className='flex px-2 flex-wrap x-wrap  py-4 pb-3 md:px-16 justify-center gap-4 text-sm text-slate-500'>
        {
          genre && genre.map((genre, index) => 
          <div key={index} className="bg-teal-500 text-slate-700 px-2 py-xs rounded-2xl">
            <p>{genre}</p>
          </div>
          )
        }
        </div>
        <h3 className='text-2xl my-4 font-bold text-center'>{title}</h3>
        <h5 className='text-lg underline mb-3 text-center font-bold text-gray-300'>synopsis</h5>
        <p className='text-sm font-light text-justify leading-6 px-2 md:px-16'>{synopsis.replace(/<br\s*\/?>/gi, " ")}</p>
    </>
  )
}

export default Overview