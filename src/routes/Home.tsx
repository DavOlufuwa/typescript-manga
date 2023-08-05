import { useComics } from "../contexts/AllComicsContext"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Link } from "react-router-dom"
import { useState,  } from "react"
import ReactPaginate from "react-paginate"
import { Autoplay , Controller, Thumbs, Navigation } from "swiper/modules"
import { Swiper , SwiperSlide } from "swiper/react"
import 'swiper/css/bundle'
import { Button } from "@/components/ui/button"





const Home = () => {

  // swiper function


  const {allComics, searchValue, setSearchValue,} = useComics()


  // for Pagination
  const [pageNumber, setPageNumber] = useState<number>(0)
  const comicsPerPage = 10
  const indexOfLastComic = (pageNumber + 1) * comicsPerPage
  const indexOfFirstComic = indexOfLastComic - comicsPerPage
  const currentComics = allComics.slice(indexOfFirstComic, indexOfLastComic)

  // To handle page change
  const paginate = ({ selected }: {selected: number}) => {
    setPageNumber(selected)
  }


  const [swiping, setSwiping] = useState<any>() 
  
  
  return (
    <div>
      <h1>All Comics</h1>
      <div>
        <Swiper
          onBeforeInit={(swiping) => setSwiping(swiping)}
          slidesPerView={3}
          speed={500}
          autoplay={{
            delay: 5000
          }}
          loop={true}
          modules={[Autoplay, Controller, Thumbs, Navigation]}
          navigation= {{
          
          }} 
        >

          {
            allComics.slice(10, 20).map((comic, index) => 
              <SwiperSlide key={index}>
                <Link to={`/comic/${comic.slug}`}>
                  <Card>
                    <CardContent>
                      <div>
                        <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`}/>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div>{comic.title}</div>
                      <div>{comic.genre}</div>
                    </CardFooter>
                  </Card>
                </Link>
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>
      <Button onClick={()=> swiping?.slidePrev()}>Next</Button>
      <Button onClick={()=> swiping?.slideNext()}>prev</Button>
        
      <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      
      <div>
        {allComics.length === 0 ? "No comics found for this search term" :
          (
          <div className="grid grid-cols-2">
            {currentComics.map((comic, index) => {

                // destructured each comic
                const {slug, title, coverURL , genre, } = comic
                return(
                  <Link 
                    key={index} 
                    to={"comic"}
                    state={{comic}}
                  >
                    <Card>
                      <CardContent>
                        <div>
                          <img src={coverURL} alt={`cover of comic with title ${slug}`}/>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col">
                        <div>{title}</div>
                        <div>{genre?.join(", ")}</div>
                      </CardFooter>
                    </Card>
                  </Link>
                )
              }
            )}
          </div>
          )
        }
      </div>
      <div>
        <ReactPaginate 
          previousLabel={`${indexOfLastComic > 10 ? "Prev" : ""}`}
          nextLabel={"Next Page"}
          breakLabel={"..."}
          pageCount={Math.ceil(allComics.length / comicsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={paginate}
          containerClassName={"flex items-center justify-center gap-2"}
          activeClassName="bg-red-100"
        />
      </div>
    </div>
  )
}

export default Home