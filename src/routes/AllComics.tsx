import { useComics } from "@/contexts/AllComicsContext"
import { ComicInterface } from "@/custom-hooks/getComics";
import { Link } from "react-router-dom";




const AllComics = () => {




  const {allComics,} = useComics()

  const beginningAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', ];

  


  return (
    <div className="">
      <div className="text-center text-white text-2xl mb-10">Select a comic to read</div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-white px-10 md:px-20 lg:px-32 ">
        {
          beginningAlphabets.map((letter, index) => {
            const contents: ComicInterface[] = allComics.filter((comic) => 
              comic.title.slice(0, 1) === letter
            )
            return (
              <div key={index} className="">
                <div className="text-xl font-bold">{letter}</div>
                {
                  contents && contents.map((comic, index) => 
                    <div key={index} className="mb-1">
                      <Link to={`../comics/${comic.slug}`} state={{comic}}
                        className=" text-slate-200 duration-150 hover:text-violet-500 "
                      >{comic.title}</Link>
                    </div>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllComics