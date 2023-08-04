
import { useComics } from "../contexts/AllComicsContext"
import { Card, CardContent, CardFooter } from "../components/ui/card"



const Home = () => {

  const {allComics, searchValue, setSearchValue,} = useComics()

  

  return (
    <div>
      <h1>All Comics</h1>
      <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      
      <div>
        {allComics.length === 0 ? "No comics found for this search term" :
          (
          <div className="grid grid-cols-2">
            {allComics.map((comic, index) => {

                // destructured each comic
                const {slug, title, sourceURL, shortURL, coverURL , genre, } = comic
                return(
                  <Card key={index}>
                    <CardContent>
                      <div>
                        <img src={coverURL} alt={`cover of comic with title ${slug}`}/>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <div>{title}</div>
                      <div>{genre.join(", ")}</div>
                    </CardFooter>
                  </Card>
                )
              }
            )}
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Home