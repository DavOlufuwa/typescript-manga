import { useComics } from "../contexts/AllComicsContext"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Link } from "react-router-dom"
import { useState,  } from "react"
import { Autoplay , Controller, Thumbs, Navigation } from "swiper/modules"
import { Swiper , SwiperSlide } from "swiper/react"
import 'swiper/css/bundle'
import { Button } from "@/components/ui/button"

import CaretRight from '/caret-right.svg'
import CaretLeft from '/caret-left.svg'





const Home = () => {

  // swiper function


  const {allComics} = useComics()


  // // for Pagination
  // const [pageNumber, setPageNumber] = useState<number>(0)
  // const comicsPerPage = 10
  // const indexOfLastComic = (pageNumber + 1) * comicsPerPage
  // const indexOfFirstComic = indexOfLastComic - comicsPerPage
  // const currentComics = allComics.slice(indexOfFirstComic, indexOfLastComic)

  // To handle page change
  // const paginate = ({ selected }: {selected: number}) => {
  //   setPageNumber(selected)
  // }


  const [swiping, setSwiping] = useState<any>() 
  
  
  return (
    <div className="px-14 md:px-20 lg:px-32">
      <h1>All Comics</h1>
      <section className="relative w-full">
        <Swiper
          onBeforeInit={(swiping) => setSwiping(swiping)}
          speed={700}
          autoplay={{
            delay: 5000
          }}
          breakpoints={{
            680: {
              slidesPerView: 2,
            },
            800: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          loop={true}
          modules={[Autoplay, Controller, Thumbs, Navigation]} 
        >
          {
            allComics.slice(10, 20).map((comic, index) => 
              <SwiperSlide key={index}>
                <Link 
                  to={`/comics/${comic.slug}`}
                  state={{comic}}
                >
                  <div className="h-96 sm:mr-5  ">
                    <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`} className="rounded-2xl"/>
                  </div>
                </Link>
              </SwiperSlide>
            )
          }
        </Swiper>
        
          <div className="absolute  top-36 -right-14 h-16 w-16 sm:h-20 cursor-pointer" onClick={()=> swiping?.slidePrev()}>
            <img src={CaretRight} alt="icon to scroll left"/>
          </div>
          <div className="absolute top-36 -left-16 sm:-left-20 h-16 w-20 sm:h-20 cursor-pointer" onClick={()=> swiping?.slideNext()}>
            <img src={CaretLeft} alt="icon to scroll right"/>
          </div>
        
      </section>
        
      {/* <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> */}
      {/* <section>
        <div>
          Latest Releases
        </div>
        <div>
          {
            allComics.slice(0, 8).map((comic, index) => 
              <Card key={index}>


              </Card>
            )
          }
        </div>
      </section>
      <section>
        {
          (
          <div className="grid grid-cols-2">
            {allComics.map((comic, index) => {

                // destructured each comic
                const {slug, title, coverURL , genre, } = comic
                return(
                  <Link 
                    key={index} 
                    to={`/comics/${slug}`}
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
      </section>
      <section>
        <div>
          Recently Viewed
        </div>
        <div>
          {
            (
            <div className="grid grid-cols-2">
              {allComics.map((comic, index) => {

                  // destructured each comic
                  const {slug, title, coverURL , genre, } = comic
                  return(
                    <Link 
                      key={index} 
                      to={`/comics/${slug}`}
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
      </section> */}
      
      {/* <div>
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
      </div> */}
    </div>
  )
}

export default Home