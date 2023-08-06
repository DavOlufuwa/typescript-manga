import { ChapterInterface } from "@/custom-hooks/getChapters"
import { Link } from "react-router-dom"

type ChapterStateType = {
  chapters: ChapterInterface[]
}
const AllChapters = ({chapters}: ChapterStateType) => {
  
  

  return (
    <>
      <div className="mt-10 mb-6 text-lg text-center font-bold">Select A chapter To Read</div>
      <div className=" grid gap-4 ">
        {
          chapters.map((chapter, index) => {
            const indexofT = chapter.updatedAt.indexOf("T")
            
            return <Link to="" key={index}  className="border border-gray-700 p-2 transition duration-200 ease-in-out rounded-md hover:border-gray-300">
                  <div className="grid grid-rows-3">
                    <div className="text-gray-300 text-xl font-bold">Chapter {index + 1}</div>
                  <div className="text-gray-400 text-md self-center">Pages: {chapter.contentURL.length}</div>
                    <div className="text-gray-500 text-xs self-center">Updated : {chapter.updatedAt.slice(0, indexofT)}</div>
                  </div>
              </Link>
          })
        }
        
      </div>
    </>
  )
}

export default AllChapters