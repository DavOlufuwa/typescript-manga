import { ChapterInterface } from "@/custom-hooks/getChapters"
import { ComicInterface } from "@/custom-hooks/getComics"
import { Link } from "react-router-dom"

type ChapterStateType = {
  chapters: ChapterInterface[] 
  comic: ComicInterface
}




const AllChapters = ({chapters, comic}: ChapterStateType) => {

  const filteredChapters: ChapterInterface[] = chapters?.filter(chapter => chapter.contentURL !== null)

  if(chapters) {

    return (
      <>
        <div className="mt-8 mb-6 text-lg text-center font-bold">Select a chapter to read</div>
          <div className=" grid  gap-4 max-h-[450px] relative overflow-y-scroll md:max-h-[400px] lg:grid-cols-2 pr-2">
          {
             filteredChapters.map((chapter, index) => {
              const indexofT = chapter.updatedAt.indexOf("T")
              // if(chapter.contentURL === null){
              //   return (
              //     <div
              //       key={index}
              //       className="border border-gray-700 p-2 transition duration-200 ease-in-out rounded-md  hover:border-teal-400 hidden"  
              //     >
                    
              //       Content is being uploaded for this chapter
              //     </div>
              //   )
              // }

              return (
                <Link 
                to={`../comics/${comic.slug}/chapter/${chapter.chapterNum}`}
                state={{
                  comic: comic,
                  chapterNumber: chapter.chapterNum
                }} 
                key={index}  
                className="border border-gray-700 p-2 transition duration-200 ease-in-out rounded-md  hover:border-teal-400">
                    <div className="grid grid-rows-3 hover:text-teal-400">
                      <div className=" text-xl font-bold">Chapter {chapter.chapterNum}</div>
                    <div className=" text-md self-center">Pages: {chapter.contentURL?.length}</div>
                      <div className=" text-xs self-center">Updated : {chapter.updatedAt.slice(0, indexofT)}</div>
                    </div>
                </Link>
              )
         
            })
          }
        </div>
      </>
    )  
  }

  if(chapters === null)
     return (
       <div>
         <div>
           <div className="text-xl font-bold">No Chapters yet for this release</div>
         </div>
       </div>
     )
}

export default AllChapters