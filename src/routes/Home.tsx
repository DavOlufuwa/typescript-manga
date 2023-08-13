import { useComics } from "../contexts/AllComicsContext"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Autoplay , Controller, Thumbs, Navigation, Pagination } from "swiper/modules"
import { Swiper , SwiperSlide } from "swiper/react"
import 'swiper/css/bundle'
import { ComicInterface } from "@/custom-hooks/getComics"
import CaretRight from '/caret-right.svg'
import CaretLeft from '/caret-left.svg'
import PicsArt from '/pic-ads.png'
import { useSavedAndReadComics } from "@/contexts/SavedAndReadComicsContext"
import { ColorRing } from "react-loader-spinner"
import AOS from 'aos'
import 'aos/dist/aos.css';


const Home = () => {

  // swiper function

  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {

    AOS.init();

    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])


  
  const {allComics} = useComics()

  const {recentlyReadComics} = useSavedAndReadComics()
  const [swiping, setSwiping] = useState<any>() 
  const [moving, setMoving] = useState<any>() 

  
  const getBestPicks = (arr: ComicInterface[], numofObjects: number): ComicInterface[] => {
    const arrayLength = arr.length
    numofObjects = Math.min(numofObjects, arrayLength)

    const indices = Array.from({length: arrayLength}, (_, i) => i)

    const selectedIndices = indices.slice(0, numofObjects)

    const randomObjects = selectedIndices.map(i => arr[i])

    return randomObjects
  }

  const bestPicksArray = getBestPicks(allComics, 10)
  
  return (
    <div className={`${loading ? 'min-h-[88vh] grid place-content-center' : ''}`} >
        {
          loading ? 
            <ColorRing
              height="100"
              width="100"
              colors={['#Febf5b', '#f45cc0', '#6538d3', '#42b05c', '#20b0d9']}
            />
          :
          <>
            <div >
              {/* First Carousel  */}
              <div className="mt-10 px-14 md:px-20 lg:px-32">
                <section className="relative w-full" data-aos="zoom-in">
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
                      allComics.slice(15, 25).map((comic, index) => 
                        <SwiperSlide key={index}>
                          <Link 
                            to={`/comics/${comic.slug}`}
                            state={{comic}}
                          >
                            <div 
                            className="parent-cover relative h-96 sm:mr-5 text-white"
                            >
                              <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`} className="rounded-2xl"/>
                              
                              <div className="child-cover">
                                <p className="mb-5 text-2xl font-semibold text-center">{comic.title}</p>
                                <p className="mb-6 text-sm font-light">{comic.genre?.slice(0, 3).join(". ")}</p>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      )
                    }
                  </Swiper>
                  
                    <div className="absolute  top-36 -right-14 h-16 w-16 sm:h-20 cursor-pointer" onClick={()=> swiping?.slideNext()}>
                      <img src={CaretRight} alt="icon to scroll left"/>
                    </div>
                    <div className="absolute top-36 -left-16 sm:-left-20 h-16 w-20 sm:h-20 cursor-pointer" onClick={()=> swiping?.slidePrev()}>
                      <img src={CaretLeft} alt="icon to scroll right"/>
                    </div>
                  
                </section>
              </div>
                
           
              <section className="relative mx-6 text-center mt-8 md:mx-20 lg:mx-32">
                <div data-aos="fade-right" className=" text-center text-2xl text-white font-bold">
                  Read Your Favorite Comics Right Here
                </div>
                <img data-aos="fade-left" className="h-40 w-52 md:h-52 md:w-72 mx-auto" src={PicsArt} alt="PicsArt"/>
              </section>

              <section>
              <div className="px-14 md:px-20 lg:px-32 text-white">
                <div  data-aos="fade-up" className="title">Recently Viewed Comics</div>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
                {
                  recentlyReadComics && recentlyReadComics.map((comic, index) => 
                  <Link data-aos="fade-down" key={index} to={`/comics/${comic.slug}`}
                  state={{comic}}
                  className="border border-gray-500 text-gray-500 px-2 py-1 rounded-2xl duration-200  hover:text-gray-300 hover:border-gray-300 truncate"
                  >
                  
                    {comic.title}
                    
                    </Link>)
                }
                </div>
              </div>
            </section>

              {/* Latest Releases */}
              <section className="small-section ">
                <div data-aos="fade-up" className="title">
                  Latest Releases
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-16">
                  <div className="grid grid-flow-row gap-4">
                    {
                      allComics.slice(0, 4).map((comic, index) => 
                        <Link
                          to={`/comics/${comic.slug}`}
                          state={{comic}}
                          key={index}
                          data-aos="zoom-in-left"
                        >
                          <div className="grid grid-cols-4 items-center">
                            <div  className="h-full md:w-20 lg:w-32">
                              <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`} className="rounded-xl object-cover "/>
                            </div>
                            <div className="text-gray-300 text-3xl text-center font-bold col-auto">
                              <div>{index + 1}</div>
                            </div>
                            <div className="text-gray-200 col-span-2">
                              <div className="font-bold text-md">{comic.title}</div>
                              <div className="text-[0.85rem] font-extralight">{comic.genre?.slice(0, 5).join(", ")}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                  </div>
                  <div className="grid gap-4">
                    {
                      allComics.slice(12, 16).map((comic, index) => 
                        <Link
                          to={`/comics/${comic.slug}`}
                          state={{comic}}
                          key={index}
                          data-aos="zoom-in-right"
                        >
                          <div className="grid grid-cols-4 items-center">
                            <div  className="md:h-44 md:w-20 lg:w-32">
                              <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`} className="rounded-xl object-fill"/>
                            </div>
                            <div className="text-gray-300 text-3xl text-center font-bold col-auto">
                              <div>{index + 5}</div>
                            </div>
                            <div className="text-gray-200 col-span-2">
                              <div className="font-bold text-md">{comic.title}</div>
                              <div className="text-[0.85rem] font-extralight">{comic.genre?.slice(0, 5).join(", ")}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    }
                  </div>
                </div>
              </section>

              {/* Best Picks Section */}
              <section data-aos="zoom-in" className="carousel-section pb-32">
                <div  className="title px-6 md:px-20 lg:px-32">
                  Best Picks For You
                </div>
                <div className="px-14 md:px-20 lg:px-32">
                <section className="relative w-full">
                  <Swiper
                    onBeforeInit={(moving) => setMoving(moving)}
                    speed={700}
                    autoplay={{
                      delay: 5000
                    }}
                    breakpoints={{
                      680: {
                        slidesPerView: 2,
                      },
                      950: {
                        slidesPerView: 3,
                      },
                      1320: {
                        slidesPerView: 4,
                      },
                    }}
                    loop={true}
                    modules={[Autoplay, Controller, Thumbs, Pagination]} 
                  >
                    {
                      bestPicksArray.map((comic, index) => 
                        <SwiperSlide key={index}
                          className="flex items-center justify-center"
                        >
                          <Link 
                            to={`/comics/${comic.slug}`}
                            state={{comic}}
                          >
                            <div className="parent-cover relative h-64 w-64 text-white overflow-clip ">
                              <img src={comic.coverURL} alt={`cover of comic with title ${comic.title}`} className="rounded-full"/>
                              
                              <div className="child-cover rounded-full ">
                                <p className="mb-5 text-2xl font-semibold text-center">{comic.title}</p>
                                <p className="mb-6 text-sm font-light">{comic.genre?.slice(0, 3).join(". ")}</p>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      )
                    }
                  </Swiper>
                    <div className="absolute  top-24 -right-14 h-16 w-16 sm:h-20 cursor-pointer" onClick={()=> moving?.slideNext()}>
                      <img src={CaretRight} alt="icon to scroll left"/>
                    </div>
                    <div className="absolute top-24 -left-16 sm:-left-20 h-16 w-20 sm:h-20 cursor-pointer" onClick={()=> moving?.slidePrev()}>
                      <img src={CaretLeft} alt="icon to scroll right"/>
                    </div>
                </section>
              </div>
              </section>
            </div>
          </>
        }
    </div>
  )
}

export default Home