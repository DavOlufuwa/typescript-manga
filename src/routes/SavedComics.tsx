import { useSavedAndReadComics } from '@/contexts/SavedAndReadComicsContext'
import { Link } from 'react-router-dom'
import { ComicInterface } from '@/custom-hooks/getComics'





const SavedComics = () => {
  
  const {savedComics , deleteASavedComic} = useSavedAndReadComics()

  const deleteComic = (_event: React.MouseEvent<HTMLDivElement> , value: ComicInterface) => {
    return deleteASavedComic(value)
  }

  return (
    <div className='text-white'>
      <div className="text-center text-white text-2xl mb-10">Saved Comics</div>
      <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-white px-6 md:px-20 lg:px-32'>
        {
          savedComics && savedComics.map((comic, index) => 
          <div key={index} className='big flex justify-between items-center w-full md:w-80'>
            <Link 
              to={`../comics/${comic.slug}`} 
              state={{comic}} 
              className='sweet-text text-[18px] pb-2 hover:underline duration-200 hover:text-green-400 w-[70%]'
            >
              {comic.title}
            </Link>
            <div 
              className='w-[30%] text-right'
              onClick={(event) => deleteComic(event, comic)}
            >
              <span className=' border border-white rounded-full px-2 py-1 cursor-pointer text-2xl font-extrabold hover:text-red-400 hover:border-red-400'>&#10005;</span>
            </div>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default SavedComics